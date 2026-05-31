import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../providerErrors";
import type { AppLanguage, Provider } from "../../types";
import {
  STT_TIMEOUT_MS,
  XaiRealtimeTranscriptionConfig,
} from "./config";
import { requireProviderKey } from "./errors";
import { chunkBytes, readMonoPcm16Audio } from "./realtimeAudio";

interface SharedRealtimeProviderParams {
  abortSignal?: AbortSignal;
  apiKey?: string;
  fileUri: string;
  language: AppLanguage;
  provider: Provider;
  providerModel?: string;
}

function getWebSocketConstructor() {
  const WebSocketCtor = (globalThis as any).WebSocket;

  if (!WebSocketCtor) {
    throw new Error("WebSocket is not available in this runtime.");
  }

  return WebSocketCtor as any;
}

function normalizeRealtimeLanguage(language: AppLanguage) {
  return language === "de" ? "de" : "en";
}

function encodeBase64(bytes: Uint8Array) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return BufferCtor.from(bytes).toString("base64");
  }

  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  if (typeof btoa !== "undefined") {
    return btoa(binary);
  }

  throw new Error("No base64 encoder available for realtime audio.");
}

async function readRealtimePcmChunks(fileUri: string, chunkMs = 200) {
  const audio = await readMonoPcm16Audio({
    fileUri,
    sampleRate: 16000,
  });
  const chunks = chunkBytes(audio.bytes, Math.max(3200, 32 * chunkMs));

  return {
    sampleRate: audio.sampleRate,
    chunks,
    base64Chunks: chunks.map((chunk) => encodeBase64(chunk)),
    base64: audio.base64,
  };
}

async function runRealtimeSocket(params: {
  provider: Provider;
  language: AppLanguage;
  url: string;
  headers?: Record<string, string>;
  onOpen: (socket: any) => void;
  onMessage: (
    payload: any,
    controls: { finish: (text: string) => void; fail: (error: unknown) => void; close: () => void },
  ) => void;
  idleTimeoutMs?: number;
  onIdle?: (controls: {
    finish: (text: string) => void;
    fail: (error: unknown) => void;
    close: () => void;
  }) => void;
  abortSignal?: AbortSignal;
}) {
  const WebSocketCtor = getWebSocketConstructor();

  return new Promise<string>((resolve, reject) => {
    let socket: any;
    let settled = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let hardTimeout: ReturnType<typeof setTimeout> | null = null;

    const clearTimers = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }

      if (hardTimeout) {
        clearTimeout(hardTimeout);
        hardTimeout = null;
      }
    };

    const cleanup = () => {
      clearTimers();
      params.abortSignal?.removeEventListener("abort", handleAbort);
    };

    const finish = (text: string) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      close();
      resolve(text.trim());
    };

    const fail = (error: unknown) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      close();
      reject(
        normalizeProviderTransportError({
          provider: params.provider,
          language: params.language,
          error,
          action: "transcription",
        }),
      );
    };

    const close = () => {
      if (!socket) {
        return;
      }

      try {
        socket.close();
      } catch {
        // Ignore teardown errors.
      }
    };

    const handleAbort = () => {
      close();
      fail(new Error("The request was aborted."));
    };

    try {
      socket = new WebSocketCtor(
        params.url,
        undefined,
        params.headers ? { headers: params.headers } : undefined,
      );
    } catch (error) {
      fail(error);
      return;
    }

    hardTimeout = setTimeout(() => {
      close();
      fail(new Error("Realtime transcription timed out."));
    }, STT_TIMEOUT_MS);

    params.abortSignal?.addEventListener("abort", handleAbort);

    socket.onopen = () => {
      try {
        params.onOpen(socket);
      } catch (error) {
        close();
        fail(error);
      }
    };

    socket.onmessage = (event: { data?: string }) => {
      if (settled || typeof event?.data !== "string") {
        return;
      }

      let payload: any;

      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }

      if (params.idleTimeoutMs) {
        if (idleTimer) {
          clearTimeout(idleTimer);
        }

        idleTimer = setTimeout(() => {
          if (params.onIdle) {
            params.onIdle({ finish, fail, close });
            return;
          }

          close();
        }, params.idleTimeoutMs);
      }

      params.onMessage(payload, { finish, fail, close });
    };

    socket.onerror = (event: { message?: string }) => {
      fail(new Error(event?.message || "Realtime transcription socket error."));
    };

    socket.onclose = () => {
      if (!settled) {
        fail(new Error("Realtime transcription socket closed before completion."));
      }
    };
  });
}

export async function transcribeWithXaiRealtimeProvider(
  params: SharedRealtimeProviderParams & {
    config: XaiRealtimeTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider } = params;
  const audio = await readRealtimePcmChunks(fileUri, 200);
  let socketRef: any = null;
  let transcript = "";
  let audioCommitted = false;

  return runRealtimeSocket({
    provider,
    language,
    url: config.endpoint,
    headers: {
      Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
      "Content-Type": "application/json",
    },
    abortSignal,
    onOpen: (socket) => {
      socketRef = socket;
      socket.send(
        JSON.stringify({
          type: "session.update",
          session: {
            turn_detection: {
              type: null,
            },
            audio: {
              input: {
                format: {
                  type: "audio/pcm",
                  rate: audio.sampleRate,
                },
              },
              output: {
                format: {
                  type: "audio/pcm",
                  rate: audio.sampleRate,
                },
              },
            },
          },
        }),
      );
    },
    onMessage: (payload, controls) => {
      if (payload?.type === "session.updated" && socketRef && !audioCommitted) {
        audioCommitted = true;

        for (const chunk of audio.base64Chunks) {
          socketRef.send(
            JSON.stringify({
              type: "input_audio_buffer.append",
              audio: chunk,
            }),
          );
        }

        socketRef.send(
          JSON.stringify({
            type: "input_audio_buffer.commit",
          }),
        );
        return;
      }

      if (payload?.type === "conversation.item.input_audio_transcription.completed") {
        const completedTranscript =
          typeof payload?.transcript === "string" ? payload.transcript.trim() : "";
        controls.finish(completedTranscript || transcript);
        return;
      }

      if (payload?.type === "conversation.item.added") {
        const content = Array.isArray(payload?.item?.content) ? payload.item.content : [];
        const audioContent = content.find(
          (entry: any) =>
            entry?.type === "input_audio" && typeof entry?.transcript === "string",
        );

        if (audioContent?.transcript) {
          transcript = audioContent.transcript.trim();
        }

        return;
      }

      if (payload?.type === "error" || payload?.error) {
        controls.fail(
          buildProviderHttpError({
            provider,
            language,
            status: 400,
            errorText:
              typeof payload?.error?.message === "string"
                ? payload.error.message
                : typeof payload?.message === "string"
                  ? payload.message
                  : JSON.stringify(payload),
            action: "transcription",
          }),
        );
      }
    },
  }).then((text) => text || transcript);
}

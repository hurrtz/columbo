import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../providerErrors";
import type { AppLanguage, Provider } from "../../types";
import {
  AssemblyAiRealtimeTranscriptionConfig,
  ElevenLabsRealtimeTranscriptionConfig,
  FireworksStreamingTranscriptionConfig,
  STT_TIMEOUT_MS,
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

async function readRealtimePcmChunks(fileUri: string, chunkMs = 200) {
  const audio = await readMonoPcm16Audio({
    fileUri,
    sampleRate: 16000,
  });

  return {
    sampleRate: audio.sampleRate,
    chunks: chunkBytes(audio.bytes, Math.max(3200, 32 * chunkMs)),
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

export async function transcribeWithAssemblyAiRealtimeProvider(
  params: SharedRealtimeProviderParams & {
    config: AssemblyAiRealtimeTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const selectedModel = providerModel || config.defaultModel;
  const audio = await readRealtimePcmChunks(fileUri, 100);
  const url = new URL(config.endpoint);
  url.searchParams.set("sample_rate", String(audio.sampleRate));
  url.searchParams.set("speech_model", selectedModel);

  const committedTurns: string[] = [];
  let latestTranscript = "";

  return runRealtimeSocket({
    provider,
    language,
    url: url.toString(),
    headers: {
      Authorization: requireProviderKey(provider, apiKey, language),
    },
    abortSignal,
    onOpen: (socket) => {
      for (const chunk of audio.chunks) {
        socket.send(chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength));
      }

      socket.send(JSON.stringify({ type: "Terminate" }));
    },
    onMessage: (payload, controls) => {
      if (payload?.type === "Turn") {
        const transcript =
          typeof payload?.transcript === "string" ? payload.transcript.trim() : "";

        if (!transcript) {
          return;
        }

        latestTranscript = transcript;

        if (payload?.end_of_turn === true) {
          committedTurns.push(transcript);
        }

        return;
      }

      if (payload?.type === "Termination") {
        controls.finish(
          committedTurns.join(" ").trim() || latestTranscript.trim(),
        );
        return;
      }

      if (payload?.type === "Error" || payload?.error) {
        controls.close();
        controls.fail(
          buildProviderHttpError({
            provider,
            language,
            status: 400,
            errorText:
              typeof payload?.error === "string"
                ? payload.error
                : typeof payload?.message === "string"
                  ? payload.message
                  : JSON.stringify(payload),
            action: "transcription",
          }),
        );
      }
    },
  });
}

export async function transcribeWithElevenLabsRealtimeProvider(
  params: SharedRealtimeProviderParams & {
    config: ElevenLabsRealtimeTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const selectedModel = providerModel || config.defaultModel;
  const audio = await readRealtimePcmChunks(fileUri, 200);
  const url = new URL(config.endpoint);
  url.searchParams.set("model_id", selectedModel);
  url.searchParams.set("audio_format", "pcm_16000");
  url.searchParams.set("commit_strategy", "manual");
  url.searchParams.set("include_timestamps", "true");
  url.searchParams.set("language_code", normalizeRealtimeLanguage(language));
  let transcript = "";

  return runRealtimeSocket({
    provider,
    language,
    url: url.toString(),
    headers: {
      "xi-api-key": requireProviderKey(provider, apiKey, language),
    },
    abortSignal,
    onOpen: (socket) => {
      socket.send(
        JSON.stringify({
          message_type: "input_audio_chunk",
          audio_base_64: audio.base64,
          commit: true,
          sample_rate: audio.sampleRate,
        }),
      );
    },
    onMessage: (payload, controls) => {
      if (payload?.message_type === "partial_transcript") {
        if (typeof payload?.text === "string") {
          transcript = payload.text;
        }
        return;
      }

      if (
        payload?.message_type === "committed_transcript" ||
        payload?.message_type === "committed_transcript_with_timestamps"
      ) {
        controls.finish(
          typeof payload?.text === "string" ? payload.text : transcript,
        );
        return;
      }

      if (
        payload?.message_type === "error" ||
        payload?.message_type === "auth_error"
      ) {
        controls.fail(
          buildProviderHttpError({
            provider,
            language,
            status: 400,
            errorText:
              typeof payload?.detail === "string"
                ? payload.detail
                : typeof payload?.message === "string"
                  ? payload.message
                  : JSON.stringify(payload),
            action: "transcription",
          }),
        );
      }
    },
  });
}

export async function transcribeWithFireworksStreamingProvider(
  params: SharedRealtimeProviderParams & {
    config: FireworksStreamingTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider } = params;
  const audio = await readRealtimePcmChunks(fileUri, 100);
  const url = new URL(config.endpoint);
  url.searchParams.set("response_format", "verbose_json");
  const segmentState = new Map<string, string>();
  let latestText = "";

  return runRealtimeSocket({
    provider,
    language,
    url: url.toString(),
    headers: {
      Authorization: requireProviderKey(provider, apiKey, language),
    },
    abortSignal,
    idleTimeoutMs: 1200,
    onIdle: (controls) => {
      controls.finish(latestText);
    },
    onOpen: (socket) => {
      for (const chunk of audio.chunks) {
        socket.send(chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength));
      }
    },
    onMessage: (payload, controls) => {
      if (Array.isArray(payload?.segments)) {
        for (const segment of payload.segments) {
          const segmentId = String(segment?.id ?? "");
          const segmentText =
            typeof segment?.text === "string" ? segment.text.trim() : "";

          if (!segmentId || !segmentText) {
            continue;
          }

          segmentState.set(segmentId, segmentText);
        }

        latestText = Array.from(segmentState.entries())
          .sort((left, right) => Number(left[0]) - Number(right[0]))
          .map((entry) => entry[1])
          .join(" ")
          .trim();
        return;
      }

      if (typeof payload?.text === "string") {
        latestText = payload.text.trim();
      }

      if (payload?.type === "error" || payload?.error) {
        controls.fail(
          buildProviderHttpError({
            provider,
            language,
            status: 400,
            errorText:
              typeof payload?.error === "string"
                ? payload.error
                : typeof payload?.message === "string"
                  ? payload.message
                  : JSON.stringify(payload),
            action: "transcription",
          }),
        );
      }

      if (!latestText) {
        return;
      }
    },
  }).then((text) => text || latestText);
}

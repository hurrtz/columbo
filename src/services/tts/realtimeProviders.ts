import { PROVIDER_LABELS } from "../../constants/models";
import { translate } from "../../i18n";
import type { AppLanguage, Provider } from "../../types";
import {
  buildWavAudioFileFromPcm,
  createTtsTimeoutError,
  requireProviderKey,
  writeBytesAudioFile,
} from "./shared";

interface SharedRealtimeTtsParams {
  abortSignal?: AbortSignal;
  apiKey?: string;
  language: AppLanguage;
  provider: Provider;
  text: string;
  timeoutMs: number;
  voice: string;
}

function getWebSocketConstructor() {
  const WebSocketCtor = (globalThis as any).WebSocket;

  if (!WebSocketCtor) {
    throw new Error("WebSocket is not available in this runtime.");
  }

  return WebSocketCtor as any;
}

function createEventId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function base64ToBytes(base64: string) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return new Uint8Array(BufferCtor.from(base64, "base64"));
  }

  if (typeof atob !== "undefined") {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  }

  throw new Error("No base64 decoder available for realtime TTS.");
}

function bytesToBase64(bytes: Uint8Array) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return BufferCtor.from(bytes).toString("base64");
  }

  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  if (typeof btoa !== "undefined") {
    return btoa(binary);
  }

  throw new Error("No base64 encoder available for realtime TTS.");
}

function concatBytes(chunks: Uint8Array[]) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }

  return merged;
}

function getSocketBinaryBytes(data: unknown) {
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }

  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }

  return null;
}

export async function synthesizeWithDashScopeRealtimeProvider(
  params: SharedRealtimeTtsParams & {
    endpoint: string;
    model: string;
  },
) {
  const WebSocketCtor = getWebSocketConstructor();

  return new Promise<string>((resolve, reject) => {
    let socket: any;
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const pcmChunks: Uint8Array[] = [];

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      params.abortSignal?.removeEventListener("abort", handleAbort);
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

    const fail = (error: unknown) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      close();
      reject(error);
    };

    const finish = async () => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      close();

      try {
        const pcm = concatBytes(pcmChunks);

        if (pcm.length === 0) {
          throw new Error(
            translate(params.language, "ttsDidNotReturnAudio", {
              provider: PROVIDER_LABELS[params.provider],
            }),
          );
        }

        const path = await buildWavAudioFileFromPcm({
          pcmBase64: bytesToBase64(pcm),
          sampleRate: 24000,
          language: params.language,
        });
        resolve(path);
      } catch (error) {
        reject(error);
      }
    };

    const handleAbort = () => {
      const abortError = new Error("TTS request aborted.");
      abortError.name = "AbortError";
      fail(abortError);
    };

    try {
      socket = new WebSocketCtor(
        `${params.endpoint}?model=${encodeURIComponent(params.model)}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${requireProviderKey(
              params.provider,
              params.apiKey,
              params.language,
            )}`,
          },
        },
      );
      socket.binaryType = "arraybuffer";
    } catch (error) {
      fail(error);
      return;
    }

    timeoutId = setTimeout(() => {
      fail(createTtsTimeoutError({
        provider: params.provider,
        language: params.language,
      }));
    }, params.timeoutMs);

    params.abortSignal?.addEventListener("abort", handleAbort, { once: true });

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          event_id: createEventId("dashscope_tts_session"),
          type: "session.update",
          session: {
            mode: "server_commit",
            voice: params.voice,
            response_format: "pcm_24000hz_mono_16bit",
          },
        }),
      );
      socket.send(
        JSON.stringify({
          event_id: createEventId("dashscope_tts_append"),
          type: "input_text_buffer.append",
          text: params.text,
        }),
      );
      socket.send(
        JSON.stringify({
          event_id: createEventId("dashscope_tts_finish"),
          type: "session.finish",
        }),
      );
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

      if (payload?.type === "response.audio.delta" && typeof payload?.delta === "string") {
        pcmChunks.push(base64ToBytes(payload.delta));
        return;
      }

      if (
        payload?.type === "error" ||
        payload?.type === "response.error" ||
        payload?.error
      ) {
        const message =
          typeof payload?.error?.message === "string"
            ? payload.error.message
            : typeof payload?.message === "string"
              ? payload.message
              : JSON.stringify(payload);
        fail(new Error(message));
        return;
      }

      if (payload?.type === "response.done" || payload?.type === "session.finished") {
        void finish();
      }
    };

    socket.onerror = (event: { message?: string }) => {
      fail(new Error(event?.message || "Realtime TTS socket error."));
    };

    socket.onclose = () => {
      if (!settled) {
        if (pcmChunks.length > 0) {
          void finish();
          return;
        }

        fail(
          new Error(
            translate(params.language, "ttsDidNotReturnAudio", {
              provider: PROVIDER_LABELS[params.provider],
            }),
          ),
        );
      }
    };
  });
}

export async function synthesizeWithBaiduStreamingProvider(
  params: SharedRealtimeTtsParams & {
    endpoint: string;
  },
) {
  const WebSocketCtor = getWebSocketConstructor();

  return new Promise<string>((resolve, reject) => {
    let socket: any;
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const audioChunks: Uint8Array[] = [];

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      params.abortSignal?.removeEventListener("abort", handleAbort);
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

    const fail = (error: unknown) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      close();
      reject(error);
    };

    const finish = async () => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      close();

      try {
        const audio = concatBytes(audioChunks);

        if (audio.length === 0) {
          throw new Error(
            translate(params.language, "ttsDidNotReturnAudio", {
              provider: PROVIDER_LABELS[params.provider],
            }),
          );
        }

        const path = await writeBytesAudioFile({
          bytes: audio,
          extension: "mp3",
          language: params.language,
        });
        resolve(path);
      } catch (error) {
        reject(error);
      }
    };

    const handleAbort = () => {
      const abortError = new Error("TTS request aborted.");
      abortError.name = "AbortError";
      fail(abortError);
    };

    try {
      const url = new URL(params.endpoint);
      url.searchParams.set(
        "access_token",
        requireProviderKey(params.provider, params.apiKey, params.language),
      );
      url.searchParams.set("per", params.voice);
      socket = new WebSocketCtor(url.toString());
      socket.binaryType = "arraybuffer";
    } catch (error) {
      fail(error);
      return;
    }

    timeoutId = setTimeout(() => {
      fail(createTtsTimeoutError({
        provider: params.provider,
        language: params.language,
      }));
    }, params.timeoutMs);

    params.abortSignal?.addEventListener("abort", handleAbort, { once: true });

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "system.start",
          payload: {
            spd: 5,
            pit: 5,
            vol: 5,
            aue: 3,
          },
        }),
      );
      socket.send(
        JSON.stringify({
          type: "text",
          payload: {
            text: params.text,
          },
        }),
      );
      socket.send(
        JSON.stringify({
          type: "system.finish",
        }),
      );
    };

    socket.onmessage = (event: { data?: unknown }) => {
      if (settled) {
        return;
      }

      const binary = getSocketBinaryBytes(event?.data);

      if (binary) {
        audioChunks.push(binary);
        return;
      }

      if (typeof event?.data !== "string") {
        return;
      }

      let payload: any;

      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }

      if (typeof payload?.code === "number" && payload.code !== 0) {
        fail(new Error(payload?.message || `Baidu streaming TTS error ${payload.code}`));
        return;
      }

      if (
        payload?.type === "system.finished" ||
        payload?.status === "FINISHED" ||
        payload?.event === "FINISHED"
      ) {
        void finish();
      }
    };

    socket.onerror = (event: { message?: string }) => {
      fail(new Error(event?.message || "Realtime TTS socket error."));
    };

    socket.onclose = () => {
      if (!settled) {
        if (audioChunks.length > 0) {
          void finish();
          return;
        }

        fail(
          new Error(
            translate(params.language, "ttsDidNotReturnAudio", {
              provider: PROVIDER_LABELS[params.provider],
            }),
          ),
        );
      }
    };
  });
}

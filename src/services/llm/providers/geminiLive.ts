import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../../providerErrors";
import { AppLanguage, Provider } from "../../../types";

import { ChatMessage, requireProviderKey } from "../shared";

function buildGeminiLiveUrl(apiKey: string) {
  return `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${encodeURIComponent(
    apiKey,
  )}`;
}

function buildRealtimePrompt(messages: ChatMessage[]) {
  return messages
    .map((message) =>
      message.role === "user"
        ? `User: ${message.content}`
        : `Assistant: ${message.content}`,
    )
    .join("\n\n");
}

function getWebSocketConstructor() {
  const WebSocketCtor = (globalThis as any).WebSocket;

  if (!WebSocketCtor) {
    throw new Error("WebSocket is not available in this runtime.");
  }

  return WebSocketCtor as any;
}

function getGeminiLiveTextParts(payload: any) {
  const parts = payload?.serverContent?.modelTurn?.parts;

  if (!Array.isArray(parts)) {
    return [];
  }

  return parts
    .map((part) => (typeof part?.text === "string" ? part.text : ""))
    .filter(Boolean);
}

async function requestGeminiLiveChatViaWebSocket(params: {
  provider: Provider;
  model: string;
  language: AppLanguage;
  systemPrompt: string;
  messages: ChatMessage[];
  apiKey: string;
  onChunk?: (text: string) => void;
  abortSignal?: AbortSignal;
}) {
  const prompt = buildRealtimePrompt(params.messages);
  const WebSocketCtor = getWebSocketConstructor();
  const apiKey = requireProviderKey(
    params.provider,
    params.apiKey,
    params.language,
  );

  return new Promise<string>((resolve, reject) => {
    let socket: any;
    let settled = false;
    let completed = false;
    let fullText = "";
    let emittedText = "";

    const cleanup = () => {
      params.abortSignal?.removeEventListener("abort", handleAbort);
    };

    const finish = (text: string) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve(text);
    };

    const fail = (error: unknown) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      reject(
        normalizeProviderTransportError({
          provider: params.provider,
          language: params.language,
          error,
          action: "reply",
        }),
      );
    };

    const closeSocket = () => {
      if (!socket) {
        return;
      }

      try {
        socket.close();
      } catch {
        // Ignore close failures during teardown.
      }
    };

    const handleAbort = () => {
      closeSocket();
      fail(new Error("The request was aborted."));
    };

    try {
      socket = new WebSocketCtor(buildGeminiLiveUrl(apiKey));
    } catch (error) {
      fail(error);
      return;
    }

    params.abortSignal?.addEventListener("abort", handleAbort);

    socket.onopen = () => {
      try {
        socket.send(
          JSON.stringify({
            config: {
              model: `models/${params.model}`,
              responseModalities: ["TEXT"],
              systemInstruction: {
                parts: [{ text: params.systemPrompt }],
              },
            },
          }),
        );
        socket.send(
          JSON.stringify({
            realtimeInput: {
              text: prompt,
            },
          }),
        );
      } catch (error) {
        closeSocket();
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

      if (payload?.error) {
        closeSocket();
        settled = true;
        cleanup();
        reject(
          buildProviderHttpError({
            provider: params.provider,
            language: params.language,
            status: 400,
            errorText:
              typeof payload.error?.message === "string"
                ? payload.error.message
                : event.data,
            action: "reply",
          }),
        );
        return;
      }

      const nextText = getGeminiLiveTextParts(payload).join("");

      if (nextText) {
        fullText = nextText;
        const delta = nextText.slice(emittedText.length);

        if (delta) {
          emittedText = nextText;
          params.onChunk?.(delta);
        }
      }

      if (payload?.serverContent?.turnComplete === true) {
        completed = true;
        closeSocket();
        finish(fullText.trim());
      }
    };

    socket.onerror = (event: { message?: string }) => {
      fail(new Error(event?.message || "Gemini Live socket error."));
    };

    socket.onclose = (event: { code?: number; reason?: string }) => {
      if (settled) {
        return;
      }

      if (completed) {
        finish(fullText.trim());
        return;
      }

      fail(
        new Error(
          `Gemini Live socket closed before completion (${event?.code ?? 1000}${
            event?.reason ? `: ${event.reason}` : ""
          }).`,
        ),
      );
    };
  });
}

export async function requestGeminiLiveChat(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  return requestGeminiLiveChatViaWebSocket(params);
}

export async function requestGeminiLiveChatStream(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  abortSignal?: AbortSignal;
}) {
  return requestGeminiLiveChatViaWebSocket(params);
}

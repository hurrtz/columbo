import { networkFetch } from "../../networkFetch";
import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../../providerErrors";
import { AppLanguage, Provider } from "../../../types";

import { readEventStream } from "../eventStream";
import { ChatMessage, requireProviderKey } from "../shared";

function buildGeminiModelPath(model: string) {
  const modelId = model.trim().replace(/^models\//, "");
  return `models/${encodeURIComponent(modelId)}`;
}

function buildGeminiGenerateContentUrl(params: {
  endpoint: string;
  model: string;
  stream?: boolean;
}) {
  const baseUrl = params.endpoint.replace(/\/$/, "");
  const method = params.stream
    ? "streamGenerateContent?alt=sse"
    : "generateContent";

  return `${baseUrl}/${buildGeminiModelPath(params.model)}:${method}`;
}

function toGeminiRole(role: ChatMessage["role"]) {
  return role === "assistant" ? "model" : "user";
}

function toGeminiContents(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: toGeminiRole(message.role),
    parts: [{ text: message.content }],
  }));
}

function buildGeminiGenerateContentBody(params: {
  messages: ChatMessage[];
  systemPrompt: string;
}) {
  return {
    systemInstruction: {
      parts: [{ text: params.systemPrompt }],
    },
    contents: toGeminiContents(params.messages),
  };
}

function extractGeminiGenerateContentText(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const candidates = (payload as { candidates?: unknown }).candidates;

  if (!Array.isArray(candidates)) {
    return "";
  }

  const firstCandidate = candidates[0];

  if (!firstCandidate || typeof firstCandidate !== "object") {
    return "";
  }

  const content = (firstCandidate as { content?: unknown }).content;

  if (!content || typeof content !== "object") {
    return "";
  }

  const parts = (content as { parts?: unknown }).parts;

  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) =>
      part &&
      typeof part === "object" &&
      typeof (part as { text?: unknown }).text === "string"
        ? (part as { text: string }).text
        : "",
    )
    .join("");
}

export async function requestGeminiGenerateContentChat(params: {
  endpoint: string;
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  let response: Awaited<ReturnType<typeof networkFetch>>;

  try {
    response = await networkFetch(
      buildGeminiGenerateContentUrl({
        endpoint: params.endpoint,
        model: params.model,
      }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": requireProviderKey(
            params.provider,
            params.apiKey,
            params.language,
          ),
        },
        body: JSON.stringify(
          buildGeminiGenerateContentBody({
            messages: params.messages,
            systemPrompt: params.systemPrompt,
          }),
        ),
        signal: params.abortSignal,
      },
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider: params.provider,
      language: params.language,
      error,
      action: "reply",
    });
  }

  if (!response.ok) {
    const errText = await response.text();
    throw buildProviderHttpError({
      provider: params.provider,
      language: params.language,
      status: response.status,
      errorText: errText,
      action: "reply",
    });
  }

  return extractGeminiGenerateContentText(await response.json());
}

export async function requestGeminiGenerateContentChatStream(params: {
  endpoint: string;
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  abortSignal?: AbortSignal;
}) {
  let response: Awaited<ReturnType<typeof networkFetch>>;

  try {
    response = await networkFetch(
      buildGeminiGenerateContentUrl({
        endpoint: params.endpoint,
        model: params.model,
        stream: true,
      }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": requireProviderKey(
            params.provider,
            params.apiKey,
            params.language,
          ),
        },
        body: JSON.stringify(
          buildGeminiGenerateContentBody({
            messages: params.messages,
            systemPrompt: params.systemPrompt,
          }),
        ),
        signal: params.abortSignal,
      },
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider: params.provider,
      language: params.language,
      error,
      action: "reply",
    });
  }

  if (!response.ok) {
    const errText = await response.text();
    throw buildProviderHttpError({
      provider: params.provider,
      language: params.language,
      status: response.status,
      errorText: errText,
      action: "reply",
    });
  }

  if (!response.body) {
    const fullText = await requestGeminiGenerateContentChat(params);

    if (fullText) {
      params.onChunk(fullText);
    }

    return fullText;
  }

  let fullText = "";

  await readEventStream(response.body, async ({ data }) => {
    if (!data || data === "[DONE]") {
      return;
    }

    const chunkText = extractGeminiGenerateContentText(JSON.parse(data));

    if (!chunkText) {
      return;
    }

    fullText += chunkText;
    params.onChunk(chunkText);
  });

  return fullText;
}

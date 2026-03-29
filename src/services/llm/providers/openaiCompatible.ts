import { networkFetch } from "../../networkFetch";
import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../../providerErrors";
import { AppLanguage, Provider } from "../../../types";

import { readEventStream } from "../eventStream";
import { ChatMessage, requireProviderKey, toAPIMessages } from "../shared";

function extractOpenAICompatibleText(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        if (
          typeof part === "object" &&
          part !== null &&
          "text" in part &&
          typeof part.text === "string"
        ) {
          return part.text;
        }

        return "";
      })
      .join("");
  }

  return "";
}

export async function requestChatWithOpenAiCompatibleTransport(params: {
  endpoint: string;
  headers: Record<string, string>;
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const {
    endpoint,
    headers,
    provider,
    model,
    messages,
    language,
    systemPrompt,
    abortSignal,
  } = params;
  let response: Awaited<ReturnType<typeof networkFetch>>;

  try {
    response = await networkFetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...toAPIMessages(messages),
        ],
      }),
      signal: abortSignal,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "reply",
    });
  }

  if (!response.ok) {
    const errText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText: errText,
      action: "reply",
    });
  }

  const data = await response.json();
  return extractOpenAICompatibleText(data.choices?.[0]?.message?.content);
}

export async function requestChatStreamWithOpenAiCompatibleTransport(params: {
  endpoint: string;
  headers: Record<string, string>;
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  abortSignal?: AbortSignal;
}) {
  const {
    endpoint,
    headers,
    provider,
    model,
    messages,
    language,
    systemPrompt,
    onChunk,
    abortSignal,
  } = params;
  let response: Awaited<ReturnType<typeof networkFetch>>;

  try {
    response = await networkFetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          ...toAPIMessages(messages),
        ],
      }),
      signal: abortSignal,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "reply",
    });
  }

  if (!response.ok) {
    const errText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText: errText,
      action: "reply",
    });
  }

  if (!response.body) {
    const fullText = await requestChatWithOpenAiCompatibleTransport({
      endpoint,
      headers,
      provider,
      model,
      messages,
      language,
      systemPrompt,
      abortSignal,
    });

    if (fullText) {
      onChunk(fullText);
    }

    return fullText;
  }

  let fullText = "";

  await readEventStream(response.body, async ({ data }) => {
    if (!data || data === "[DONE]") {
      return;
    }

    const payload = JSON.parse(data);
    const delta = extractOpenAICompatibleText(
      payload.choices?.[0]?.delta?.content,
    );

    if (!delta) {
      return;
    }

    fullText += delta;
    onChunk(delta);
  });

  return fullText;
}

export async function requestOpenAICompatibleChat(params: {
  endpoint: string;
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  return requestChatWithOpenAiCompatibleTransport({
    endpoint: params.endpoint,
    headers: {
      Authorization: `Bearer ${requireProviderKey(
        params.provider,
        params.apiKey,
        params.language,
      )}`,
    },
    provider: params.provider,
    model: params.model,
    messages: params.messages,
    language: params.language,
    systemPrompt: params.systemPrompt,
    abortSignal: params.abortSignal,
  });
}

export async function requestOpenAICompatibleChatStream(params: {
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
  return requestChatStreamWithOpenAiCompatibleTransport({
    endpoint: params.endpoint,
    headers: {
      Authorization: `Bearer ${requireProviderKey(
        params.provider,
        params.apiKey,
        params.language,
      )}`,
    },
    provider: params.provider,
    model: params.model,
    messages: params.messages,
    language: params.language,
    systemPrompt: params.systemPrompt,
    onChunk: params.onChunk,
    abortSignal: params.abortSignal,
  });
}

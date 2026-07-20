import { networkFetch } from "../../networkFetch";
import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../../providerErrors";
import {
  AppLanguage,
  MistralAssistantContentChunk,
  Provider,
} from "../../../types";
import { PROVIDER_LABELS } from "../../../constants/models";
import { getModelEffortRequestBody } from "../../../utils/modelEffort";
import { translate } from "../../../i18n";

import { readEventStream } from "../eventStream";
import {
  ChatMessage,
  requireProviderKey,
  toOpenAICompatibleMessages,
} from "../shared";

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

function extractMistralThinkingText(content: unknown): string {
  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .filter(
      (part) =>
        typeof part === "object" &&
        part !== null &&
        "type" in part &&
        part.type === "thinking" &&
        "thinking" in part &&
        Array.isArray(part.thinking),
    )
    .flatMap((part) => part.thinking)
    .map((part) =>
      typeof part === "object" &&
      part !== null &&
      "type" in part &&
      part.type === "text" &&
      "text" in part &&
      typeof part.text === "string"
        ? part.text
        : "",
    )
    .join("");
}

function buildMistralAssistantContent(
  thinkingText: string,
  answerText: string,
): MistralAssistantContentChunk[] | undefined {
  if (!thinkingText) {
    return undefined;
  }

  return [
    {
      type: "thinking",
      thinking: [{ type: "text", text: thinkingText }],
    },
    { type: "text", text: answerText },
  ];
}

function buildIncompleteReplyError(provider: Provider, language: AppLanguage) {
  return new Error(
    translate(language, "providerIncompleteReplyError", {
      provider: PROVIDER_LABELS[provider],
    }),
  );
}

function isSuccessfulFinishReason(finishReason: unknown) {
  return (
    finishReason === null ||
    finishReason === undefined ||
    finishReason === "stop"
  );
}

export async function requestChatWithOpenAiCompatibleTransport(params: {
  endpoint: string;
  headers: Record<string, string>;
  provider: Provider;
  model: string;
  modelEffort?: string;
  messages: ChatMessage[];
  language: AppLanguage;
  systemPrompt: string;
  onMistralAssistantContent?: (
    content: MistralAssistantContentChunk[],
  ) => void;
  abortSignal?: AbortSignal;
}) {
  const {
    endpoint,
    headers,
    provider,
    model,
    modelEffort,
    messages,
    language,
    systemPrompt,
    onMistralAssistantContent,
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
        ...getModelEffortRequestBody(provider, model, modelEffort),
        messages: [
          { role: "system", content: systemPrompt },
          ...toOpenAICompatibleMessages(provider, messages),
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
  const finishReason = data.choices?.[0]?.finish_reason;
  if (!isSuccessfulFinishReason(finishReason)) {
    throw buildIncompleteReplyError(provider, language);
  }
  const content = data.choices?.[0]?.message?.content;
  const fullText = extractOpenAICompatibleText(content);
  if (provider === "mistral") {
    const mistralAssistantContent = buildMistralAssistantContent(
      extractMistralThinkingText(content),
      fullText,
    );
    if (mistralAssistantContent) {
      onMistralAssistantContent?.(mistralAssistantContent);
    }
  }
  return fullText;
}

export async function requestChatStreamWithOpenAiCompatibleTransport(params: {
  endpoint: string;
  headers: Record<string, string>;
  provider: Provider;
  model: string;
  modelEffort?: string;
  messages: ChatMessage[];
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  onMistralAssistantContent?: (
    content: MistralAssistantContentChunk[],
  ) => void;
  abortSignal?: AbortSignal;
}) {
  const {
    endpoint,
    headers,
    provider,
    model,
    modelEffort,
    messages,
    language,
    systemPrompt,
    onChunk,
    onMistralAssistantContent,
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
        ...getModelEffortRequestBody(provider, model, modelEffort),
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          ...toOpenAICompatibleMessages(provider, messages),
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
      modelEffort,
      messages,
      language,
      systemPrompt,
      onMistralAssistantContent,
      abortSignal,
    });

    if (fullText) {
      onChunk(fullText);
    }

    return fullText;
  }

  let fullText = "";
  let mistralThinkingText = "";
  let sawDone = false;
  let finishReason: unknown;

  await readEventStream(response.body, async ({ data }) => {
    if (!data) {
      return;
    }

    if (data === "[DONE]") {
      sawDone = true;
      return;
    }

    const payload = JSON.parse(data);
    if (payload?.error) {
      throw buildProviderHttpError({
        provider,
        language,
        status: 400,
        errorText: JSON.stringify(payload),
        action: "reply",
      });
    }

    const nextFinishReason = payload.choices?.[0]?.finish_reason;
    if (nextFinishReason !== null && nextFinishReason !== undefined) {
      finishReason = nextFinishReason;
    }
    const content = payload.choices?.[0]?.delta?.content;
    const delta = extractOpenAICompatibleText(content);

    if (provider === "mistral") {
      mistralThinkingText += extractMistralThinkingText(content);
    }

    if (!delta) {
      return;
    }

    fullText += delta;
    onChunk(delta);
  });

  if (
    !isSuccessfulFinishReason(finishReason) ||
    (!sawDone && finishReason !== "stop")
  ) {
    throw buildIncompleteReplyError(provider, language);
  }

  const mistralAssistantContent = buildMistralAssistantContent(
    mistralThinkingText,
    fullText,
  );
  if (mistralAssistantContent) {
    onMistralAssistantContent?.(mistralAssistantContent);
  }

  return fullText;
}

export async function requestOpenAICompatibleChat(params: {
  endpoint: string;
  provider: Provider;
  model: string;
  modelEffort?: string;
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
    modelEffort: params.modelEffort,
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
  modelEffort?: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  onMistralAssistantContent?: (
    content: MistralAssistantContentChunk[],
  ) => void;
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
    modelEffort: params.modelEffort,
    messages: params.messages,
    language: params.language,
    systemPrompt: params.systemPrompt,
    onChunk: params.onChunk,
    onMistralAssistantContent: params.onMistralAssistantContent,
    abortSignal: params.abortSignal,
  });
}

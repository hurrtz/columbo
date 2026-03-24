import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import {
  AppLanguage,
  AssistantResponseLength,
  AssistantResponseTone,
  Message,
  Provider,
  UsageEstimate,
} from "../types";
import { estimateChatUsage } from "../utils/usageStats";

import {
  buildSystemPrompt,
  CONTEXT_SUMMARIZER_PROMPT,
  formatMessagesForSummary,
} from "./llm/prompts";
import { requestAnthropicChat, requestAnthropicChatStream } from "./llm/providers/anthropic";
import { requestCohereChat } from "./llm/providers/cohere";
import {
  requestOpenAICompatibleChat,
  requestOpenAICompatibleChatStream,
} from "./llm/providers/openaiCompatible";
import {
  ChatMessage,
  LLM_PROVIDER_CONFIGS,
  ProviderLlmConfig,
} from "./llm/shared";

export { buildSystemPrompt } from "./llm/prompts";

interface StreamChatParams {
  messages: Message[];
  model: string;
  provider: Provider;
  apiKey: string;
  assistantInstructions: string;
  responseLength: AssistantResponseLength;
  responseTone: AssistantResponseTone;
  language: AppLanguage;
  conversationSummary?: string;
  onChunk: (text: string) => void;
  onDone: (fullText: string, usage?: UsageEstimate) => void | Promise<void>;
  onError: (error: Error) => void | Promise<void>;
  abortSignal?: AbortSignal;
}

interface LlmRequestParams {
  messages: ChatMessage[];
  model: string;
  provider: Provider;
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}

interface StreamingLlmRequestParams extends LlmRequestParams {
  onChunk: (text: string) => void;
}

function buildProviderNotWiredUpError(provider: Provider, language: AppLanguage) {
  return new Error(
    translate(language, "providerNotWiredUpYet", {
      provider: PROVIDER_LABELS[provider],
    }),
  );
}

function getLlmProviderConfigOrThrow(
  provider: Provider,
  language: AppLanguage,
): ProviderLlmConfig {
  const config = LLM_PROVIDER_CONFIGS[provider];

  if (!config) {
    throw buildProviderNotWiredUpError(provider, language);
  }

  return config;
}

const LLM_TEXT_REQUESTERS = {
  "openai-compatible": async (
    params: LlmRequestParams,
    config: Extract<ProviderLlmConfig, { transport: "openai-compatible" }>,
  ) =>
    requestOpenAICompatibleChat({
      endpoint: config.endpoint,
      provider: params.provider,
      model: params.model,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      abortSignal: params.abortSignal,
    }),
  anthropic: async (params: LlmRequestParams) =>
    requestAnthropicChat({
      model: params.model,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      abortSignal: params.abortSignal,
    }),
  cohere: async (params: LlmRequestParams) =>
    requestCohereChat({
      model: params.model,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      abortSignal: params.abortSignal,
    }),
} as const;

const LLM_STREAM_REQUESTERS = {
  "openai-compatible": async (
    params: StreamingLlmRequestParams,
    config: Extract<ProviderLlmConfig, { transport: "openai-compatible" }>,
  ) =>
    requestOpenAICompatibleChatStream({
      endpoint: config.endpoint,
      provider: params.provider,
      model: params.model,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      onChunk: params.onChunk,
      abortSignal: params.abortSignal,
    }),
  anthropic: async (params: StreamingLlmRequestParams) =>
    requestAnthropicChatStream({
      model: params.model,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      onChunk: params.onChunk,
      abortSignal: params.abortSignal,
    }),
} as const;

async function requestChatText(params: {
  messages: ChatMessage[];
  model: string;
  provider: Provider;
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const config = getLlmProviderConfigOrThrow(params.provider, params.language);

  switch (config.transport) {
    case "openai-compatible":
      return LLM_TEXT_REQUESTERS["openai-compatible"](params, config);
    case "anthropic":
      return LLM_TEXT_REQUESTERS.anthropic(params);
    case "cohere":
      return LLM_TEXT_REQUESTERS.cohere(params);
    default:
      throw buildProviderNotWiredUpError(params.provider, params.language);
  }
}

export async function summarizeConversationContext(params: {
  existingSummary?: string;
  messages: Message[];
  model: string;
  provider: Provider;
  apiKey: string;
  language: AppLanguage;
  abortSignal?: AbortSignal;
}) {
  const existingSummary = params.existingSummary?.trim() ?? "";

  if (!existingSummary && params.messages.length === 0) {
    return {
      summary: "",
      usage: undefined,
    };
  }

  const promptSections: string[] = [];

  if (existingSummary) {
    promptSections.push(`Existing summary:\n${existingSummary}`);
  }

  if (params.messages.length > 0) {
    promptSections.push(
      `Conversation turns to absorb:\n${formatMessagesForSummary(params.messages)}`,
    );
  }

  const summaryRequestMessages = [
    {
      role: "user" as const,
      content: promptSections.join("\n\n"),
    },
  ];

  const summary = await requestChatText({
    provider: params.provider,
    model: params.model,
    apiKey: params.apiKey,
    language: params.language,
    systemPrompt: CONTEXT_SUMMARIZER_PROMPT,
    messages: summaryRequestMessages,
    abortSignal: params.abortSignal,
  });

  const trimmedSummary = summary.trim();

  return {
    summary: trimmedSummary,
    usage: estimateChatUsage({
      provider: params.provider,
      model: params.model,
      kind: "summary",
      systemPrompt: CONTEXT_SUMMARIZER_PROMPT,
      messages: summaryRequestMessages,
      completionText: trimmedSummary,
    }),
  };
}

export async function validateProviderConnection(params: {
  provider: Provider;
  model: string;
  apiKey: string;
  language: AppLanguage;
  abortSignal?: AbortSignal;
}) {
  await requestChatText({
    messages: [
      {
        role: "user",
        content: "Reply with OK only.",
      },
    ],
    model: params.model,
    provider: params.provider,
    apiKey: params.apiKey,
    language: params.language,
    systemPrompt:
      "You are validating a provider connection for a voice assistant app. Reply with exactly OK.",
    abortSignal: params.abortSignal,
  });
}

export async function streamChat({
  messages,
  model,
  provider,
  apiKey,
  assistantInstructions,
  responseLength,
  responseTone,
  language,
  conversationSummary,
  onChunk,
  onDone,
  onError,
  abortSignal,
}: StreamChatParams): Promise<void> {
  try {
    const systemPrompt = buildSystemPrompt({
      assistantInstructions,
      responseLength,
      responseTone,
      language,
      conversationSummary,
    });
    const config = getLlmProviderConfigOrThrow(provider, language);
    let fullText = "";

    switch (config.transport) {
      case "openai-compatible":
        fullText = await LLM_STREAM_REQUESTERS["openai-compatible"](
          {
            messages,
            model,
            provider,
            apiKey,
            language,
            systemPrompt,
            onChunk,
            abortSignal,
          },
          config,
        );
        break;
      case "anthropic":
        fullText = await LLM_STREAM_REQUESTERS.anthropic({
          messages,
          model,
          provider,
          apiKey,
          language,
          systemPrompt,
          onChunk,
          abortSignal,
        });
        break;
      case "cohere":
      default:
      fullText = await requestChatText({
        messages,
        model,
        provider,
        apiKey,
        language,
        systemPrompt,
        abortSignal,
      });

      if (fullText) {
        onChunk(fullText);
      }
    }

    await onDone(
      fullText,
      estimateChatUsage({
        provider,
        model,
        kind: "reply",
        systemPrompt,
        messages,
        completionText: fullText,
      }),
    );
  } catch (error) {
    if (abortSignal?.aborted) {
      return;
    }

    await onError(error instanceof Error ? error : new Error(String(error)));
  }
}

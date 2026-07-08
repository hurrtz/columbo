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
import {
  requestOpenAICompatibleChat,
  requestOpenAICompatibleChatStream,
} from "./llm/providers/openaiCompatible";
import {
  requestGeminiGenerateContentChat,
  requestGeminiGenerateContentChatStream,
} from "./llm/providers/geminiGenerateContent";
import {
  requestOpenAiRealtimeChat,
  requestOpenAiRealtimeChatStream,
} from "./llm/providers/openaiRealtime";
import {
  requestGeminiLiveChat,
  requestGeminiLiveChatStream,
} from "./llm/providers/geminiLive";
import {
  ChatMessage,
  getProviderLlmConfig,
  ProviderLlmConfig,
} from "./llm/shared";

export { buildSystemPrompt } from "./llm/prompts";

const LLM_REPLY_INACTIVITY_TIMEOUT_MS = 5 * 60_000;
const LOCAL_ANDROID_DEV_API_KEY = "sk-test-android-local-dev";

interface StreamChatParams {
  messages: Message[];
  model: string;
  modelEffort?: string;
  provider: Provider;
  apiKey: string;
  assistantInstructions: string;
  responseLength: AssistantResponseLength;
  responseTone: AssistantResponseTone;
  language: AppLanguage;
  conversationSummary?: string;
  webSearchContext?: string;
  onChunk: (text: string) => void;
  onDone: (fullText: string, usage?: UsageEstimate) => void | Promise<void>;
  onError: (error: Error) => void | Promise<void>;
  abortSignal?: AbortSignal;
}

interface LlmRequestParams {
  messages: ChatMessage[];
  model: string;
  modelEffort?: string;
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

function buildProviderReplyTimeoutError(
  provider: Provider,
  language: AppLanguage,
) {
  return new Error(
    translate(language, "providerTimeoutError", {
      provider: PROVIDER_LABELS[provider],
      action: translate(language, "replyGenerationAction"),
    }),
  );
}

function isLocalAndroidDevReplyEnabled(apiKey: string) {
  return (
    typeof __DEV__ !== "undefined" &&
    __DEV__ &&
    apiKey.trim() === LOCAL_ANDROID_DEV_API_KEY
  );
}

function buildLocalAndroidDevReply(messages: Message[]) {
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");
  const prompt = lastUserMessage?.content.trim();

  return prompt
    ? `local Android development reply: I received "${prompt}". This confirms the text chat pipeline is working without contacting a provider.`
    : "local Android development reply: this confirms the text chat pipeline is working without contacting a provider.";
}

function getLlmProviderConfigOrThrow(
  provider: Provider,
  model: string,
  language: AppLanguage,
): ProviderLlmConfig {
  const config = getProviderLlmConfig(provider, model);

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
      modelEffort: params.modelEffort,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      abortSignal: params.abortSignal,
    }),
  "gemini-generate-content": async (
    params: LlmRequestParams,
    config: Extract<ProviderLlmConfig, { transport: "gemini-generate-content" }>,
  ) =>
    requestGeminiGenerateContentChat({
      endpoint: config.endpoint,
      provider: params.provider,
      model: params.model,
      modelEffort: params.modelEffort,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      abortSignal: params.abortSignal,
    }),
  "openai-realtime": async (params: LlmRequestParams) =>
    requestOpenAiRealtimeChat({
      provider: params.provider,
      model: params.model,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      abortSignal: params.abortSignal,
    }),
  "gemini-live": async (params: LlmRequestParams) =>
    requestGeminiLiveChat({
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
      modelEffort: params.modelEffort,
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
      modelEffort: params.modelEffort,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      onChunk: params.onChunk,
      abortSignal: params.abortSignal,
    }),
  "gemini-generate-content": async (
    params: StreamingLlmRequestParams,
    config: Extract<ProviderLlmConfig, { transport: "gemini-generate-content" }>,
  ) =>
    requestGeminiGenerateContentChatStream({
      endpoint: config.endpoint,
      provider: params.provider,
      model: params.model,
      modelEffort: params.modelEffort,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      onChunk: params.onChunk,
      abortSignal: params.abortSignal,
    }),
  "openai-realtime": async (params: StreamingLlmRequestParams) =>
    requestOpenAiRealtimeChatStream({
      provider: params.provider,
      model: params.model,
      messages: params.messages,
      apiKey: params.apiKey,
      language: params.language,
      systemPrompt: params.systemPrompt,
      onChunk: params.onChunk,
      abortSignal: params.abortSignal,
    }),
  "gemini-live": async (params: StreamingLlmRequestParams) =>
    requestGeminiLiveChatStream({
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
      modelEffort: params.modelEffort,
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
  modelEffort?: string;
  provider: Provider;
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const config = getLlmProviderConfigOrThrow(
    params.provider,
    params.model,
    params.language,
  );

  switch (config.transport) {
    case "openai-compatible":
      return LLM_TEXT_REQUESTERS["openai-compatible"](params, config);
    case "gemini-generate-content":
      return LLM_TEXT_REQUESTERS["gemini-generate-content"](params, config);
    case "openai-realtime":
      return LLM_TEXT_REQUESTERS["openai-realtime"](params);
    case "gemini-live":
      return LLM_TEXT_REQUESTERS["gemini-live"](params);
    case "anthropic":
      return LLM_TEXT_REQUESTERS.anthropic(params);
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
  modelEffort,
  provider,
  apiKey,
  assistantInstructions,
  responseLength,
  responseTone,
  language,
  conversationSummary,
  webSearchContext,
  onChunk,
  onDone,
  onError,
  abortSignal,
}: StreamChatParams): Promise<void> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let timedOut = false;
  let releaseAbortSignal: (() => void) | null = null;

  try {
    const systemPrompt = buildSystemPrompt({
      assistantInstructions,
      responseLength,
      responseTone,
      language,
      conversationSummary,
      webSearchContext,
    });

    if (isLocalAndroidDevReplyEnabled(apiKey)) {
      const fullText = buildLocalAndroidDevReply(messages);

      onChunk(fullText);
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
      return;
    }

    const config = getLlmProviderConfigOrThrow(provider, model, language);
    const timeoutError = buildProviderReplyTimeoutError(provider, language);
    const requestAbortController = new AbortController();

    if (abortSignal?.aborted) {
      requestAbortController.abort();
    } else if (abortSignal) {
      const handleAbort = () => requestAbortController.abort();
      abortSignal.addEventListener("abort", handleAbort, { once: true });
      releaseAbortSignal = () => {
        abortSignal.removeEventListener("abort", handleAbort);
      };
    }

    let rejectTimeout: ((reason?: unknown) => void) | null = null;
    const armTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        timedOut = true;
        rejectTimeout?.(timeoutError);
        requestAbortController.abort();
      }, LLM_REPLY_INACTIVITY_TIMEOUT_MS);
    };
    const onChunkWithTimeout = (text: string) => {
      if (timedOut) {
        return;
      }

      armTimeout();
      onChunk(text);
    };
    const requestPromise = (async () => {
      let fullText = "";

      switch (config.transport) {
        case "openai-compatible":
          fullText = await LLM_STREAM_REQUESTERS["openai-compatible"](
            {
              messages,
              model,
              modelEffort,
              provider,
              apiKey,
              language,
              systemPrompt,
              onChunk: onChunkWithTimeout,
              abortSignal: requestAbortController.signal,
            },
            config,
          );
          break;
        case "gemini-generate-content":
          fullText = await LLM_STREAM_REQUESTERS["gemini-generate-content"](
            {
              messages,
              model,
              modelEffort,
              provider,
              apiKey,
              language,
              systemPrompt,
              onChunk: onChunkWithTimeout,
              abortSignal: requestAbortController.signal,
            },
            config,
          );
          break;
        case "openai-realtime":
          fullText = await LLM_STREAM_REQUESTERS["openai-realtime"]({
            messages,
            model,
            modelEffort,
            provider,
            apiKey,
            language,
            systemPrompt,
            onChunk: onChunkWithTimeout,
            abortSignal: requestAbortController.signal,
          });
          break;
        case "gemini-live":
          fullText = await LLM_STREAM_REQUESTERS["gemini-live"]({
            messages,
            model,
            provider,
            apiKey,
            language,
            systemPrompt,
            onChunk: onChunkWithTimeout,
            abortSignal: requestAbortController.signal,
          });
          break;
        case "anthropic":
          fullText = await LLM_STREAM_REQUESTERS.anthropic({
            messages,
            model,
            modelEffort,
            provider,
            apiKey,
            language,
            systemPrompt,
            onChunk: onChunkWithTimeout,
            abortSignal: requestAbortController.signal,
          });
          break;
        default:
          fullText = await requestChatText({
            messages,
            model,
            modelEffort,
            provider,
            apiKey,
            language,
            systemPrompt,
            abortSignal: requestAbortController.signal,
          });

          if (fullText) {
            onChunkWithTimeout(fullText);
          }
      }

      return fullText;
    })().catch((error) => {
      if (timedOut) {
        return "";
      }

      throw error;
    });
    const timeoutPromise = new Promise<never>((_, reject) => {
      rejectTimeout = reject;
    });

    armTimeout();
    const fullText = await Promise.race([requestPromise, timeoutPromise]);

    if (timedOut) {
      return;
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
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    releaseAbortSignal?.();
  }
}

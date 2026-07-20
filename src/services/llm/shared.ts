import { PROVIDER_LABELS } from "../../constants/models";
import { RUNTIME_PROVIDER_MANIFEST } from "../../constants/providers/runtimeManifest";
import { translate } from "../../i18n";
import { AppLanguage, MessageMetadata, Provider } from "../../types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  metadata?: MessageMetadata;
}

type OpenAiCompatibleLlmConfig = {
  transport: "openai-compatible";
  endpoint: string;
};

type OpenAiRealtimeLlmConfig = {
  transport: "openai-realtime";
};

type GeminiGenerateContentLlmConfig = {
  transport: "gemini-generate-content";
  endpoint: string;
};

type GeminiLiveLlmConfig = {
  transport: "gemini-live";
};

type AnthropicLlmConfig = {
  transport: "anthropic";
};

export type ProviderLlmConfig =
  | OpenAiCompatibleLlmConfig
  | OpenAiRealtimeLlmConfig
  | GeminiGenerateContentLlmConfig
  | GeminiLiveLlmConfig
  | AnthropicLlmConfig;

export function getProviderLlmConfig(
  provider: Provider,
  model: string,
): ProviderLlmConfig | null {
  const manifest = RUNTIME_PROVIDER_MANIFEST[provider];

  if (!manifest || manifest.llm.support !== "provider") {
    return null;
  }

  const isRealtimeModel = manifest.llm.realtimeModelIds?.includes(model) ?? false;
  const realtimeTransport = manifest.llm.realtimeTransport;

  if (isRealtimeModel) {
    if (realtimeTransport === "gemini-live") {
      return {
        transport: "gemini-live",
      };
    }

    return {
      transport: "openai-realtime",
    };
  }

  switch (manifest.llm.transport) {
    case "openai-compatible":
      if (!manifest.llm.endpoint) {
        return null;
      }

      return {
        transport: "openai-compatible",
        endpoint: manifest.llm.endpoint,
      };
    case "gemini-generate-content":
      if (!manifest.llm.endpoint) {
        return null;
      }

      return {
        transport: "gemini-generate-content",
        endpoint: manifest.llm.endpoint,
      };
    case "anthropic":
      return {
        transport: manifest.llm.transport,
      };
    default:
      return null;
  }
}

export function toAPIMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

export function toOpenAICompatibleMessages(
  provider: Provider,
  messages: ChatMessage[],
) {
  return messages.map((message) => ({
    role: message.role,
    content:
      provider === "mistral" && message.role === "assistant"
        ? message.metadata?.providerState?.mistralAssistantContent ??
          message.content
        : message.content,
  }));
}

export function requireProviderKey(
  provider: Provider,
  apiKey: string,
  language: AppLanguage,
) {
  if (!apiKey) {
    throw new Error(
      translate(language, "providerConfiguredInSettings", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  return apiKey.split("|")[0].trim();
}

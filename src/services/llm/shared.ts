import { PROVIDER_LABELS } from "../../constants/models";
import {
  RUNTIME_PROVIDER_MANIFEST,
  RuntimeLlmTransport,
} from "../../constants/providers/runtimeManifest";
import { translate } from "../../i18n";
import { AppLanguage, Provider } from "../../types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

type OpenAiCompatibleLlmConfig = {
  transport: "openai-compatible";
  endpoint: string;
};

type AzureOpenAiLlmConfig = {
  transport: "azure-openai";
};

type AzureOpenAiRealtimeLlmConfig = {
  transport: "azure-openai-realtime";
};

type OpenAiRealtimeLlmConfig = {
  transport: "openai-realtime";
};

type GeminiLiveLlmConfig = {
  transport: "gemini-live";
};

type ReplicateLlmConfig = {
  transport: "replicate";
};

type TransportOnlyLlmConfig = {
  transport: Exclude<
    RuntimeLlmTransport,
    | "azure-openai-realtime"
    | "openai-compatible"
    | "openai-realtime"
    | "replicate"
  >;
};

export type ProviderLlmConfig =
  | AzureOpenAiLlmConfig
  | AzureOpenAiRealtimeLlmConfig
  | OpenAiCompatibleLlmConfig
  | OpenAiRealtimeLlmConfig
  | GeminiLiveLlmConfig
  | ReplicateLlmConfig
  | TransportOnlyLlmConfig;

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

  switch (manifest.llm.transport) {
    case "azure-openai":
      if (isRealtimeModel && realtimeTransport === "azure-openai-realtime") {
        return {
          transport: "azure-openai-realtime",
        };
      }

      return {
        transport: "azure-openai",
      };
    case "openai-compatible":
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

      if (!manifest.llm.endpoint) {
        return null;
      }

      return {
        transport: "openai-compatible",
        endpoint: manifest.llm.endpoint,
      };
    case "replicate":
      return {
        transport: "replicate",
      };
    case "anthropic":
    case "cohere":
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

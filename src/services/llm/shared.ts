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

type OpenAiRealtimeLlmConfig = {
  transport: "openai-realtime";
};

type AzureOpenAiLlmConfig = {
  transport: "azure-openai";
};

type AzureOpenAiRealtimeLlmConfig = {
  transport: "azure-openai-realtime";
};

type AmazonBedrockLlmConfig = {
  transport: "amazon-bedrock";
};

type AlephAlphaLlmConfig = {
  transport: "aleph-alpha";
};

type IbmWatsonxLlmConfig = {
  transport: "ibm-watsonx";
};

type ReplicateLlmConfig = {
  transport: "replicate";
};

type TransportOnlyLlmConfig = {
  transport: Exclude<
    RuntimeLlmTransport,
    | "openai-compatible"
    | "openai-realtime"
    | "azure-openai"
    | "azure-openai-realtime"
    | "amazon-bedrock"
    | "aleph-alpha"
    | "ibm-watsonx"
    | "replicate"
  >;
};

export type ProviderLlmConfig =
  | OpenAiCompatibleLlmConfig
  | OpenAiRealtimeLlmConfig
  | AzureOpenAiLlmConfig
  | AzureOpenAiRealtimeLlmConfig
  | AmazonBedrockLlmConfig
  | AlephAlphaLlmConfig
  | IbmWatsonxLlmConfig
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

  switch (manifest.llm.transport) {
    case "openai-compatible":
      if (isRealtimeModel) {
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
    case "azure-openai":
      return {
        transport: isRealtimeModel ? "azure-openai-realtime" : "azure-openai",
      };
    case "amazon-bedrock":
      return {
        transport: "amazon-bedrock",
      };
    case "aleph-alpha":
      return {
        transport: "aleph-alpha",
      };
    case "ibm-watsonx":
      return {
        transport: "ibm-watsonx",
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

  return apiKey;
}

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

type TransportOnlyLlmConfig = {
  transport: Exclude<RuntimeLlmTransport, "openai-compatible">;
};

export type ProviderLlmConfig = OpenAiCompatibleLlmConfig | TransportOnlyLlmConfig;

const llmProviderConfigEntries: Array<[Provider, ProviderLlmConfig]> = [];

for (const provider of Object.keys(RUNTIME_PROVIDER_MANIFEST) as Provider[]) {
  const manifest = RUNTIME_PROVIDER_MANIFEST[provider];

  if (manifest.llm.support !== "provider") {
    continue;
  }

  switch (manifest.llm.transport) {
    case "openai-compatible":
      if (!manifest.llm.endpoint) {
        break;
      }

      llmProviderConfigEntries.push([
        provider,
        {
          transport: "openai-compatible",
          endpoint: manifest.llm.endpoint,
        },
      ]);
      break;
    case "anthropic":
    case "cohere":
      llmProviderConfigEntries.push([
        provider,
        {
          transport: manifest.llm.transport,
        },
      ]);
      break;
  }
}

export const LLM_PROVIDER_CONFIGS: Partial<Record<Provider, ProviderLlmConfig>> =
  Object.fromEntries(llmProviderConfigEntries) as Partial<
    Record<Provider, ProviderLlmConfig>
  >;

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

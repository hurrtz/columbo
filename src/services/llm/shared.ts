import { PROVIDER_LABELS } from "../../constants/models";
import { RUNTIME_PROVIDER_MANIFEST } from "../../constants/providers/runtimeManifest";
import { translate } from "../../i18n";
import { AppLanguage, Provider } from "../../types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const OPENAI_COMPATIBLE_ENDPOINTS: Partial<Record<Provider, string>> =
  Object.fromEntries(
    Object.entries(RUNTIME_PROVIDER_MANIFEST).flatMap(([provider, manifest]) =>
      manifest.llm.transport === "openai-compatible" && manifest.llm.endpoint
        ? [[provider, manifest.llm.endpoint]]
        : [],
    ),
  ) as Partial<Record<Provider, string>>;

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

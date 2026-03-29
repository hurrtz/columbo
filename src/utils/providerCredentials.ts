import type { Provider } from "../types";
import {
  parseAzureOpenAiCredentials,
  parseAzureSpeechCredentials,
} from "../services/azure";

export type ProviderCredentialCapability = "llm" | "stt" | "tts" | "search";

export function hasAnyProviderCredential(provider: Provider, apiKey: string) {
  const trimmedApiKey = apiKey.trim();

  if (!trimmedApiKey) {
    return false;
  }

  if (provider !== "microsoft-azure") {
    return true;
  }

  return (
    parseAzureOpenAiCredentials(trimmedApiKey) !== null ||
    parseAzureSpeechCredentials(trimmedApiKey) !== null
  );
}

export function hasProviderCredentialForCapability(
  provider: Provider,
  apiKey: string,
  capability: ProviderCredentialCapability,
) {
  const trimmedApiKey = apiKey.trim();

  if (!trimmedApiKey) {
    return false;
  }

  if (provider !== "microsoft-azure") {
    return true;
  }

  switch (capability) {
    case "llm":
    case "stt":
    case "search":
      return parseAzureOpenAiCredentials(trimmedApiKey) !== null;
    case "tts":
      return parseAzureSpeechCredentials(trimmedApiKey) !== null;
  }
}

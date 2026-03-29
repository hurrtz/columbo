import type { Provider } from "../types";
import {
  parseAzureOpenAiCredentials,
  parseAzureSpeechCredentials,
} from "../services/azure";
import {
  parseBytedanceArkCredentials,
  parseBytedanceSpeechCredentials,
} from "../services/bytedance";

export type ProviderCredentialCapability = "llm" | "stt" | "tts" | "search";

export function hasAnyProviderCredential(provider: Provider, apiKey: string) {
  const trimmedApiKey = apiKey.trim();

  if (!trimmedApiKey) {
    return false;
  }

  if (provider !== "microsoft-azure") {
    if (provider !== "bytedance-doubao-seed") {
      return true;
    }

    return (
      parseBytedanceArkCredentials(trimmedApiKey) !== null ||
      parseBytedanceSpeechCredentials(trimmedApiKey) !== null
    );
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
    if (provider !== "bytedance-doubao-seed") {
      return true;
    }

    switch (capability) {
      case "llm":
        return parseBytedanceArkCredentials(trimmedApiKey) !== null;
      case "stt":
        return parseBytedanceSpeechCredentials(trimmedApiKey) !== null;
      case "tts":
      case "search":
        return false;
    }
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

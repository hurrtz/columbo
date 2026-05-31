import type { Provider } from "../types";
import {
  parseBytedanceArkCredentials,
  parseBytedanceSpeechCredentials,
} from "../services/bytedance";
import {
  parseGoogleAiStudioCredentials,
  parseGoogleCloudSpeechCredentials,
} from "../services/google";

export type ProviderCredentialCapability = "llm" | "stt" | "tts" | "search";

export function hasAnyProviderCredential(provider: Provider, apiKey: string) {
  const trimmedApiKey = apiKey.trim();

  if (!trimmedApiKey) {
    return false;
  }

  if (provider === "gemini") {
    return (
      parseGoogleAiStudioCredentials(trimmedApiKey) !== null ||
      parseGoogleCloudSpeechCredentials(trimmedApiKey) !== null
    );
  }

  if (provider !== "bytedance-doubao-seed") {
    return true;
  }

  return (
    parseBytedanceArkCredentials(trimmedApiKey) !== null ||
    parseBytedanceSpeechCredentials(trimmedApiKey) !== null
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

  if (provider === "gemini") {
    switch (capability) {
      case "llm":
      case "tts":
        return parseGoogleAiStudioCredentials(trimmedApiKey) !== null;
      case "stt":
        return parseGoogleCloudSpeechCredentials(trimmedApiKey) !== null;
      case "search":
        return false;
    }
  }

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

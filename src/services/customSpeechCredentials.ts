import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import type { AppLanguage, Provider } from "../types";
import { parseEndpointApiKeyCredentials } from "./providerCredentials";

interface CustomSpeechEndpointCredentials {
  endpoint: string;
  apiKey: string;
}

function normalizeEndpoint(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function buildInvalidFormatError(
  provider: Provider,
  language: AppLanguage,
  format: string,
) {
  return new Error(
    `${PROVIDER_LABELS[provider]} speech integration requires credentials in the format ${format}.`,
  );
}

function parseNvidiaSpeechCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
  service: "stt" | "tts",
): CustomSpeechEndpointCredentials {
  const value = rawValue?.trim();

  if (!value) {
    throw new Error(
      translate(language, "providerConfiguredInSettings", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const [primaryApiKey, sttEndpoint, ttsEndpoint] = value
    .split("|")
    .map((part) => part.trim());
  const selectedEndpoint = service === "stt" ? sttEndpoint : ttsEndpoint;

  if (!primaryApiKey || !selectedEndpoint) {
    throw buildInvalidFormatError(
      provider,
      language,
      "primaryApiKey|sttEndpoint|ttsEndpoint",
    );
  }

  return {
    apiKey: primaryApiKey,
    endpoint: normalizeEndpoint(selectedEndpoint),
  };
}

export function resolveCustomSpeechEndpointCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
  service: "stt" | "tts",
): CustomSpeechEndpointCredentials {
  if (provider === "lepton-ai") {
    return parseEndpointApiKeyCredentials(provider, rawValue, language);
  }

  if (provider === "nvidia") {
    return parseNvidiaSpeechCredentials(provider, rawValue, language, service);
  }

  throw buildInvalidFormatError(provider, language, "provider-specific speech credentials");
}

export function resolveCustomSpeechEndpointUrl(endpoint: string, suffix: string) {
  return endpoint.endsWith(suffix) ? endpoint : `${endpoint}${suffix}`;
}

import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import type { AppLanguage, Provider } from "../types";

export interface AzureOpenAiCredentials {
  endpoint: string;
  apiKey: string;
}

function buildMissingProviderKeyError(
  provider: Provider,
  language: AppLanguage,
) {
  return new Error(
    translate(language, "providerConfiguredInSettings", {
      provider: PROVIDER_LABELS[provider],
    }),
  );
}

function normalizeAzureOpenAiEndpoint(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  let url: URL;

  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  let pathname = url.pathname.replace(/\/+$/u, "");

  pathname = pathname
    .replace(/\/openai\/v\d+\/chat\/completions$/iu, "")
    .replace(/\/openai\/v\d+\/audio\/transcriptions$/iu, "")
    .replace(/\/openai\/v\d+\/audio\/speech$/iu, "")
    .replace(/\/openai\/v\d+$/iu, "")
    .replace(/\/openai$/iu, "");

  url.pathname = pathname || "/";
  url.search = "";
  url.hash = "";

  return url.toString().replace(/\/$/u, "");
}

export function parseAzureOpenAiCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
): AzureOpenAiCredentials {
  const value = rawValue?.trim();

  if (!value) {
    throw buildMissingProviderKeyError(provider, language);
  }

  const separatorIndex = value.indexOf("|");

  if (separatorIndex <= 0 || separatorIndex === value.length - 1) {
    throw new Error(
      translate(language, "azureCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const endpoint = normalizeAzureOpenAiEndpoint(value.slice(0, separatorIndex));
  const apiKey = value.slice(separatorIndex + 1).trim();

  if (!endpoint || !apiKey) {
    throw new Error(
      translate(language, "azureCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  return {
    endpoint,
    apiKey,
  };
}

export function buildAzureOpenAiUrl(
  endpoint: string,
  path: "chat/completions" | "audio/transcriptions" | "audio/speech",
) {
  return `${endpoint}/openai/v1/${path}`;
}

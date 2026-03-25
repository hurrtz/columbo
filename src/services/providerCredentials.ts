import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import type { AppLanguage, Provider } from "../types";

export interface AzureOpenAiCredentials {
  endpoint: string;
  apiKey: string;
}

export interface EndpointApiKeyCredentials {
  endpoint: string;
  apiKey: string;
}

export interface AmazonAwsCredentials {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}

export interface IbmWatsonxCredentials {
  watsonxUrl: string;
  watsonxApiKey: string;
  projectId: string;
  speechToTextUrl: string;
  speechToTextApiKey: string;
  textToSpeechUrl: string;
  textToSpeechApiKey: string;
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

function normalizeEndpoint(value: string) {
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

  url.search = "";
  url.hash = "";

  return url.toString().replace(/\/$/u, "");
}

function normalizeAzureOpenAiEndpoint(value: string) {
  const endpoint = normalizeEndpoint(value);

  if (!endpoint) {
    return null;
  }

  const url = new URL(endpoint);

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

export function parseEndpointApiKeyCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
): EndpointApiKeyCredentials {
  const value = rawValue?.trim();

  if (!value) {
    throw buildMissingProviderKeyError(provider, language);
  }

  const separatorIndex = value.indexOf("|");

  if (separatorIndex <= 0 || separatorIndex === value.length - 1) {
    throw new Error(
      translate(language, "endpointCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const endpoint = normalizeEndpoint(value.slice(0, separatorIndex));
  const apiKey = value.slice(separatorIndex + 1).trim();

  if (!endpoint || !apiKey) {
    throw new Error(
      translate(language, "endpointCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  return {
    endpoint,
    apiKey,
  };
}

export function parseAmazonAwsCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
): AmazonAwsCredentials {
  const value = rawValue?.trim();

  if (!value) {
    throw buildMissingProviderKeyError(provider, language);
  }

  const parts = value.split("|").map((part) => part.trim());

  if (parts.length < 3 || parts.length > 4) {
    throw new Error(
      translate(language, "awsCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const [region, accessKeyId, secretAccessKey, sessionToken] = parts;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      translate(language, "awsCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  return {
    region,
    accessKeyId,
    secretAccessKey,
    ...(sessionToken ? { sessionToken } : {}),
  };
}

export function parseIbmWatsonxCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
): IbmWatsonxCredentials {
  const value = rawValue?.trim();

  if (!value) {
    throw buildMissingProviderKeyError(provider, language);
  }

  const parts = value.split("|").map((part) => part.trim());

  if (parts.length !== 7) {
    throw new Error(
      translate(language, "ibmCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const [
    watsonxUrlRaw,
    watsonxApiKey,
    projectId,
    speechToTextUrlRaw,
    speechToTextApiKey,
    textToSpeechUrlRaw,
    textToSpeechApiKey,
  ] = parts;

  const watsonxUrl = normalizeEndpoint(watsonxUrlRaw);
  const speechToTextUrl = normalizeEndpoint(speechToTextUrlRaw);
  const textToSpeechUrl = normalizeEndpoint(textToSpeechUrlRaw);

  if (
    !watsonxUrl ||
    !watsonxApiKey ||
    !projectId ||
    !speechToTextUrl ||
    !speechToTextApiKey ||
    !textToSpeechUrl ||
    !textToSpeechApiKey
  ) {
    throw new Error(
      translate(language, "ibmCredentialFormatInvalid", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  return {
    watsonxUrl,
    watsonxApiKey,
    projectId,
    speechToTextUrl,
    speechToTextApiKey,
    textToSpeechUrl,
    textToSpeechApiKey,
  };
}

export function buildBasicAuthorizationHeader(username: string, password: string) {
  const credentials = `${username}:${password}`;
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return `Basic ${BufferCtor.from(credentials, "utf8").toString("base64")}`;
  }

  if (typeof btoa !== "undefined") {
    return `Basic ${btoa(credentials)}`;
  }

  throw new Error("No base64 encoder available for basic authorization.");
}

export function buildAzureOpenAiUrl(
  endpoint: string,
  path: "chat/completions" | "audio/transcriptions" | "audio/speech",
) {
  return `${endpoint}/openai/v1/${path}`;
}

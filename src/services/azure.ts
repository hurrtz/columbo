import { translate } from "../i18n";
import type { AppLanguage } from "../types";

const AZURE_OPENAI_BASE_PATH = "/openai/v1";

export interface AzureOpenAiCredentials {
  endpoint: string;
  apiKey: string;
}

export interface AzureSpeechCredentials {
  subscriptionKey: string;
  region: string;
}

export interface AzureProviderCredentials {
  openAi: AzureOpenAiCredentials | null;
  speech: AzureSpeechCredentials | null;
}

function splitAzureCredentialParts(apiKey?: string | null) {
  if (!apiKey?.trim()) {
    return [];
  }

  return apiKey.split("|").map((part) => part.trim());
}

function isAzureEndpoint(value: string) {
  return /^https?:\/\//i.test(value);
}

export function normalizeAzureOpenAiEndpoint(endpoint: string) {
  const trimmedEndpoint = endpoint.trim();

  if (!trimmedEndpoint) {
    return "";
  }

  let url: URL;

  try {
    url = new URL(trimmedEndpoint);
  } catch {
    return "";
  }

  const pathname = url.pathname.replace(/\/+$/, "");

  if (!pathname || pathname === "/") {
    url.pathname = AZURE_OPENAI_BASE_PATH;
  } else if (pathname === "/openai") {
    url.pathname = AZURE_OPENAI_BASE_PATH;
  } else if (pathname.startsWith(AZURE_OPENAI_BASE_PATH)) {
    url.pathname = AZURE_OPENAI_BASE_PATH;
  } else {
    return "";
  }

  url.search = "";
  url.hash = "";

  return url.toString().replace(/\/$/, "");
}

export function parseAzureOpenAiCredentials(apiKey?: string | null) {
  const parts = splitAzureCredentialParts(apiKey);

  if (parts.length !== 2 && parts.length !== 4) {
    return null;
  }

  const [endpointPart, apiKeyPart] = parts;

  if (!isAzureEndpoint(endpointPart)) {
    return null;
  }

  const endpoint = normalizeAzureOpenAiEndpoint(endpointPart);
  const resolvedApiKey = apiKeyPart?.trim() ?? "";

  if (!endpoint || !resolvedApiKey) {
    return null;
  }

  return {
    endpoint,
    apiKey: resolvedApiKey,
  };
}

export function parseAzureSpeechCredentials(apiKey?: string | null) {
  const parts = splitAzureCredentialParts(apiKey);

  if (parts.length === 2) {
    const [subscriptionKeyPart, regionPart] = parts;

    if (isAzureEndpoint(subscriptionKeyPart)) {
      return null;
    }

    const subscriptionKey = subscriptionKeyPart?.trim() ?? "";
    const region = regionPart?.trim().toLowerCase() ?? "";

    if (!subscriptionKey || !region) {
      return null;
    }

    return {
      subscriptionKey,
      region,
    };
  }

  if (parts.length === 4) {
    const [endpointPart, _apiKeyPart, subscriptionKeyPart, regionPart] = parts;

    if (!isAzureEndpoint(endpointPart)) {
      return null;
    }

    const subscriptionKey = subscriptionKeyPart?.trim() ?? "";
    const region = regionPart?.trim().toLowerCase() ?? "";

    if (!subscriptionKey || !region) {
      return null;
    }

    return {
      subscriptionKey,
      region,
    };
  }

  return null;
}

export function parseAzureProviderCredentials(apiKey?: string | null) {
  return {
    openAi: parseAzureOpenAiCredentials(apiKey),
    speech: parseAzureSpeechCredentials(apiKey),
  } satisfies AzureProviderCredentials;
}

export function requireAzureOpenAiCredentials(
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const credentials = parseAzureOpenAiCredentials(apiKey);

  if (credentials) {
    return credentials;
  }

  throw new Error(
    translate(language, "azureCredentialFormatInvalid", {
      provider: "Microsoft Azure",
    }),
  );
}

export function requireAzureSpeechCredentials(
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const credentials = parseAzureSpeechCredentials(apiKey);

  if (credentials) {
    return credentials;
  }

  throw new Error(translate(language, "azureSpeechApiKeyFormat"));
}

export function buildAzureOpenAiChatCompletionsEndpoint(baseEndpoint: string) {
  return `${normalizeAzureOpenAiEndpoint(baseEndpoint)}/chat/completions`;
}

export function buildAzureOpenAiRealtimeEndpoint(
  baseEndpoint: string,
  model: string,
) {
  const url = new URL(`${normalizeAzureOpenAiEndpoint(baseEndpoint)}/realtime`);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.searchParams.set("model", model);
  return url.toString();
}

export function buildAzureSpeechSynthesisEndpoint(region: string) {
  return `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
}

export function buildAzureSpeechVoicesEndpoint(region: string) {
  return `https://${region}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
}

import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import type { AppLanguage } from "../types";

export interface GoogleAiStudioCredentials {
  apiKey: string;
}

export interface GoogleCloudSpeechCredentials {
  projectId: string;
  accessToken: string;
  location: string;
}

function splitGoogleCredentialParts(apiKey?: string | null) {
  if (!apiKey?.trim()) {
    return [];
  }

  return apiKey.split("|").map((part) => part.trim());
}

function hasGoogleAiStudioApiKey(value?: string) {
  return !!value?.trim();
}

export function parseGoogleAiStudioCredentials(apiKey?: string | null) {
  const parts = splitGoogleCredentialParts(apiKey);

  if (parts.length === 1 && hasGoogleAiStudioApiKey(parts[0])) {
    return {
      apiKey: parts[0]!,
    } satisfies GoogleAiStudioCredentials;
  }

  if (parts.length === 4 && hasGoogleAiStudioApiKey(parts[0])) {
    return {
      apiKey: parts[0]!,
    } satisfies GoogleAiStudioCredentials;
  }

  return null;
}

export function parseGoogleCloudSpeechCredentials(apiKey?: string | null) {
  const parts = splitGoogleCredentialParts(apiKey);

  if (parts.length === 3) {
    const [projectId, accessToken, location] = parts;

    if (!projectId || !accessToken || !location) {
      return null;
    }

    return {
      projectId,
      accessToken,
      location: location.toLowerCase(),
    } satisfies GoogleCloudSpeechCredentials;
  }

  if (parts.length === 4 && hasGoogleAiStudioApiKey(parts[0])) {
    const [_apiKey, projectId, accessToken, location] = parts;

    if (!projectId || !accessToken || !location) {
      return null;
    }

    return {
      projectId,
      accessToken,
      location: location.toLowerCase(),
    } satisfies GoogleCloudSpeechCredentials;
  }

  return null;
}

export function requireGoogleCloudSpeechCredentials(
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const credentials = parseGoogleCloudSpeechCredentials(apiKey);

  if (credentials) {
    return credentials;
  }

  throw new Error(
    translate(language, "googleCloudSpeechCredentialFormat", {
      provider: PROVIDER_LABELS.gemini,
    }),
  );
}

export function buildGoogleCloudSpeechRecognizeEndpoint(params: {
  projectId: string;
  location: string;
}) {
  const location = params.location.trim().toLowerCase();
  const host =
    location === "global"
      ? "speech.googleapis.com"
      : `${location}-speech.googleapis.com`;

  return `https://${host}/v2/projects/${encodeURIComponent(
    params.projectId,
  )}/locations/${encodeURIComponent(location)}/recognizers/_:recognize`;
}

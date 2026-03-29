import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import type { AppLanguage } from "../types";

const BYTEDANCE_DEFAULT_SPEECH_RESOURCE_ID = "volc.bigasr.auc_turbo";

function splitBytedanceCredentialParts(apiKey?: string | null) {
  if (!apiKey?.trim()) {
    return [];
  }

  return apiKey.split("|").map((part) => part.trim());
}

export function parseBytedanceArkCredentials(apiKey?: string | null) {
  const parts = splitBytedanceCredentialParts(apiKey);

  if (parts.length === 1) {
    return parts[0] ? { apiKey: parts[0] } : null;
  }

  if (parts.length === 4) {
    return parts[0] ? { apiKey: parts[0] } : null;
  }

  return null;
}

export function parseBytedanceSpeechCredentials(apiKey?: string | null) {
  const parts = splitBytedanceCredentialParts(apiKey);

  if (parts.length === 2) {
    const [appKey, accessKey] = parts;

    if (!appKey || !accessKey) {
      return null;
    }

    return {
      appKey,
      accessKey,
      resourceId: BYTEDANCE_DEFAULT_SPEECH_RESOURCE_ID,
    };
  }

  if (parts.length === 3) {
    const [appKey, accessKey, resourceId] = parts;

    if (!appKey || !accessKey) {
      return null;
    }

    return {
      appKey,
      accessKey,
      resourceId: resourceId || BYTEDANCE_DEFAULT_SPEECH_RESOURCE_ID,
    };
  }

  if (parts.length === 4) {
    const [_arkApiKey, appKey, accessKey, resourceId] = parts;

    if (!appKey || !accessKey) {
      return null;
    }

    return {
      appKey,
      accessKey,
      resourceId: resourceId || BYTEDANCE_DEFAULT_SPEECH_RESOURCE_ID,
    };
  }

  return null;
}

export function requireBytedanceSpeechCredentials(
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const credentials = parseBytedanceSpeechCredentials(apiKey);

  if (credentials) {
    return credentials;
  }

  throw new Error(
    translate(language, "bytedanceSpeechCredentialFormat", {
      provider: PROVIDER_LABELS["bytedance-doubao-seed"],
    }),
  );
}

export function createBytedanceRequestId() {
  return `schnackai-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

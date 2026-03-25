import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import type { AppLanguage, Provider } from "../types";

export interface GoogleSpeechCredentials {
  primaryApiKey: string;
  accessToken: string;
  projectId: string;
  location: string;
}

export function parseGoogleSpeechCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
): GoogleSpeechCredentials {
  const value = rawValue?.trim();

  if (!value) {
    throw new Error(
      translate(language, "providerConfiguredInSettings", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const [primaryApiKey, accessToken, projectId, location] = value
    .split("|")
    .map((part) => part.trim());

  if (!accessToken || !projectId) {
    throw new Error(
      `${PROVIDER_LABELS[provider]} Cloud Speech integration requires credentials in the format primaryApiKey|accessToken|projectId|location.`,
    );
  }

  return {
    primaryApiKey,
    accessToken,
    projectId,
    location: location || "us",
  };
}

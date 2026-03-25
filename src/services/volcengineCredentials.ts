import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import type { AppLanguage, Provider } from "../types";

export interface VolcengineSpeechCredentials {
  primaryApiKey: string;
  speechAppId: string;
  speechAccessKey: string;
}

export function parseVolcengineSpeechCredentials(
  provider: Provider,
  rawValue: string | undefined,
  language: AppLanguage,
): VolcengineSpeechCredentials {
  const value = rawValue?.trim();

  if (!value) {
    throw new Error(
      translate(language, "providerConfiguredInSettings", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const [primaryApiKey, speechAppId, speechAccessKey] = value
    .split("|")
    .map((part) => part.trim());

  if (!speechAppId || !speechAccessKey) {
    throw new Error(
      `${PROVIDER_LABELS[provider]} speech integration requires credentials in the format primaryApiKey|speechAppId|speechAccessKey.`,
    );
  }

  return {
    primaryApiKey,
    speechAppId,
    speechAccessKey,
  };
}

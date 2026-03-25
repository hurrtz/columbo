import { PROVIDER_LABELS } from "../../constants/models";
import { translate } from "../../i18n";
import type { AppLanguage, Provider } from "../../types";

export function parseBaiduSpeechCredentials(
  provider: Provider,
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const raw = apiKey?.trim();

  if (!raw) {
    throw new Error(
      translate(language, "providerConfiguredInSettings", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const [serviceApiKey, appId, appKey] = raw.split("|").map((part) => part.trim());

  return {
    serviceApiKey,
    appId: appId || null,
    appKey: appKey || null,
  };
}

export function requireBaiduRealtimeCredentials(
  provider: Provider,
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const credentials = parseBaiduSpeechCredentials(provider, apiKey, language);

  if (!credentials.appId || !credentials.appKey) {
    throw new Error(
      "Baidu realtime speech recognition requires provider credentials in the format apiKey|appId|appKey.",
    );
  }

  return {
    appId: credentials.appId,
    appKey: credentials.appKey,
  };
}

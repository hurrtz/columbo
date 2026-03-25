import { requireProviderKey } from "./errors";
import type { AppLanguage, Provider } from "../../types";

export function parseBaiduSpeechCredentials(
  provider: Provider,
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const raw = requireProviderKey(provider, apiKey, language);
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

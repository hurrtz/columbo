import {
  APP_PROVIDER_CATALOG_IDS,
  getCatalogModelForAppProvider,
  getCatalogProviderForAppProvider,
  getCatalogVerifiedServiceStateForAppProvider,
} from "../../catalog";
import type { Provider } from "../../types";
import type { ModelInfo } from "./types";
import { PROVIDER_CONFIGS, PROVIDER_ORDER } from "./catalogData";

export const PROVIDER_LABELS: Record<Provider, string> = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].label]),
) as Record<Provider, string>;

export const PROVIDER_SHORT_LABELS: Record<Provider, string> = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].shortLabel]),
) as Record<Provider, string>;

export const PROVIDER_MODELS: Record<Provider, ModelInfo[]> = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].models]),
) as Record<Provider, ModelInfo[]>;

export function getProviderModelName(provider: Provider, modelId: string) {
  const catalogMatch = getCatalogModelForAppProvider(provider, modelId, "llm");

  if (catalogMatch) {
    return catalogMatch.publicName;
  }

  const match = PROVIDER_MODELS[provider].find((model) => model.id === modelId);
  return match?.name ?? modelId;
}

export const PROVIDER_API_KEY_HINTS: Record<Provider, string> = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].apiKeyHint]),
) as Record<Provider, string>;

export const PROVIDER_API_KEY_PLACEHOLDERS: Record<Provider, string> =
  Object.fromEntries(
    PROVIDER_ORDER.map((provider) => [
      provider,
      PROVIDER_CONFIGS[provider].apiKeyPlaceholder,
    ]),
  ) as Record<Provider, string>;

export const PROVIDER_API_KEY_URLS: Record<Provider, string> = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].apiKeyUrl]),
) as Record<Provider, string>;

export const PROVIDER_CATALOG_IDS: Record<Provider, string> = APP_PROVIDER_CATALOG_IDS;

export const PROVIDER_CATALOG_VERIFIED_SUPPORT: Record<
  Provider,
  {
    llm: ReturnType<typeof getCatalogVerifiedServiceStateForAppProvider>;
    stt: ReturnType<typeof getCatalogVerifiedServiceStateForAppProvider>;
    tts: ReturnType<typeof getCatalogVerifiedServiceStateForAppProvider>;
  }
> = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [
    provider,
    {
      llm: getCatalogVerifiedServiceStateForAppProvider(provider, "llm"),
      stt: getCatalogVerifiedServiceStateForAppProvider(provider, "stt"),
      tts: getCatalogVerifiedServiceStateForAppProvider(provider, "tts"),
    },
  ]),
) as Record<
  Provider,
  {
    llm: ReturnType<typeof getCatalogVerifiedServiceStateForAppProvider>;
    stt: ReturnType<typeof getCatalogVerifiedServiceStateForAppProvider>;
    tts: ReturnType<typeof getCatalogVerifiedServiceStateForAppProvider>;
  }
>;

export const PROVIDER_NEEDS_LIVE_MODEL_DISCOVERY: Record<Provider, boolean> =
  Object.fromEntries(
    PROVIDER_ORDER.map((provider) => [
      provider,
      getCatalogProviderForAppProvider(provider)?.integration.needsLiveDiscovery ??
        false,
    ]),
  ) as Record<Provider, boolean>;

export const PROVIDER_STT_SUPPORT: Record<Provider, "none" | "provider"> =
  Object.fromEntries(
    PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].sttSupport]),
  ) as Record<Provider, "none" | "provider">;

export const PROVIDER_TTS_SUPPORT: Record<Provider, "none" | "provider"> =
  Object.fromEntries(
    PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].ttsSupport]),
  ) as Record<Provider, "none" | "provider">;

export const PROVIDER_STT_LANGUAGE_NOTES: Partial<Record<Provider, string>> =
  Object.fromEntries(
    PROVIDER_ORDER.flatMap((provider) =>
      PROVIDER_CONFIGS[provider].sttLanguageNote
        ? [[provider, PROVIDER_CONFIGS[provider].sttLanguageNote]]
        : [],
    ),
  ) as Partial<Record<Provider, string>>;

export const PROVIDER_TTS_LANGUAGE_NOTES: Partial<Record<Provider, string>> =
  Object.fromEntries(
    PROVIDER_ORDER.flatMap((provider) =>
      PROVIDER_CONFIGS[provider].ttsLanguageNote
        ? [[provider, PROVIDER_CONFIGS[provider].ttsLanguageNote]]
        : [],
    ),
  ) as Partial<Record<Provider, string>>;

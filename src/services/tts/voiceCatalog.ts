import type { TtsVoiceOption } from "../../constants/providers/types";
import type { Provider } from "../../types";

// No core provider currently exposes a dynamically fetched TTS voice catalog.
// Kept as an empty set so the public API below keeps compiling for callers.
const dynamicVoiceCatalogProviders = new Set<Provider>([]);
const listeners = new Set<() => void>();
const voiceCatalogCache: Partial<Record<Provider, TtsVoiceOption[]>> = {};
const voiceCatalogCacheKeys: Partial<Record<Provider, string>> = {};
const inflightFetches: Partial<Record<Provider, Promise<TtsVoiceOption[]>>> = {};

function notifyListeners() {
  listeners.forEach((listener) => {
    listener();
  });
}

export function providerHasDynamicTtsVoiceCatalog(provider?: Provider | null) {
  return provider ? dynamicVoiceCatalogProviders.has(provider) : false;
}

export function getDynamicProviderTtsVoiceOptions(provider: Provider) {
  return voiceCatalogCache[provider] ?? [];
}

export function hasLoadedDynamicProviderTtsVoiceOptions(provider: Provider) {
  return getDynamicProviderTtsVoiceOptions(provider).length > 0;
}

export function subscribeToProviderTtsVoiceCatalog(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function clearProviderTtsVoiceCatalogCache(provider?: Provider) {
  if (provider) {
    delete voiceCatalogCache[provider];
    delete voiceCatalogCacheKeys[provider];
    delete inflightFetches[provider];
    notifyListeners();
    return;
  }

  Object.keys(voiceCatalogCache).forEach((entry) => {
    delete voiceCatalogCache[entry as Provider];
  });
  Object.keys(voiceCatalogCacheKeys).forEach((entry) => {
    delete voiceCatalogCacheKeys[entry as Provider];
  });
  Object.keys(inflightFetches).forEach((entry) => {
    delete inflightFetches[entry as Provider];
  });
  notifyListeners();
}

export async function fetchDynamicProviderTtsVoiceOptions(params: {
  provider: Provider;
  apiKey: string;
  abortSignal?: AbortSignal;
  force?: boolean;
}): Promise<TtsVoiceOption[]> {
  void params;
  return [];
}

import type { TtsVoiceOption } from "../../constants/providers/types";
import type { Provider } from "../../types";

const ELEVENLABS_VOICES_ENDPOINT = "https://api.elevenlabs.io/v1/voices";
const ELEVENLABS_VOICE_FETCH_TIMEOUT_MS = 15000;

const dynamicVoiceCatalogProviders = new Set<Provider>(["elevenlabs"]);
const listeners = new Set<() => void>();
const voiceCatalogCache: Partial<Record<Provider, TtsVoiceOption[]>> = {};
const voiceCatalogCacheKeys: Partial<Record<Provider, string>> = {};
const inflightFetches: Partial<Record<Provider, Promise<TtsVoiceOption[]>>> = {};

function notifyListeners() {
  listeners.forEach((listener) => {
    listener();
  });
}

function getVoiceLabel(voice: any) {
  const name =
    typeof voice?.name === "string" && voice.name.trim()
      ? voice.name.trim()
      : typeof voice?.voice_id === "string"
        ? voice.voice_id
        : "";
  const accent =
    typeof voice?.labels?.accent === "string" && voice.labels.accent.trim()
      ? voice.labels.accent.trim()
      : typeof voice?.accent === "string" && voice.accent.trim()
        ? voice.accent.trim()
        : "";
  const gender =
    typeof voice?.labels?.gender === "string" && voice.labels.gender.trim()
      ? voice.labels.gender.trim()
      : typeof voice?.gender === "string" && voice.gender.trim()
        ? voice.gender.trim()
        : "";
  const qualifiers = [accent, gender].filter(Boolean);

  if (!name) {
    return "";
  }

  return qualifiers.length > 0 ? `${name} · ${qualifiers.join(" · ")}` : name;
}

function normalizeElevenLabsVoiceOptions(data: any): TtsVoiceOption[] {
  const voices: unknown[] = Array.isArray(data?.voices) ? data.voices : [];

  return voices
    .map((voice: unknown) => {
      const entry = typeof voice === "object" && voice !== null ? (voice as any) : null;
      const id =
        typeof entry?.voice_id === "string" && entry.voice_id.trim()
          ? entry.voice_id.trim()
          : "";
      const label = getVoiceLabel(entry);

      if (!id || !label) {
        return null;
      }

      return { id, label };
    })
    .filter((voice: TtsVoiceOption | null): voice is TtsVoiceOption => voice !== null)
    .sort((left: TtsVoiceOption, right: TtsVoiceOption) =>
      left.label.localeCompare(right.label),
    );
}

async function fetchJsonWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit,
  timeoutMs: number,
  abortSignal?: AbortSignal,
) {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const handleCallerAbort = () => {
    controller.abort();
  };

  if (abortSignal) {
    if (abortSignal.aborted) {
      controller.abort();
    } else {
      abortSignal.addEventListener("abort", handleCallerAbort);
    }
  }

  timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "AbortError" ||
        error.message.toLowerCase().includes("aborted"))
    ) {
      if (abortSignal?.aborted) {
        const abortError = new Error("Voice catalog request aborted.");
        abortError.name = "AbortError";
        throw abortError;
      }

      throw new Error("ElevenLabs voice catalog request timed out.");
    }

    throw error;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    abortSignal?.removeEventListener("abort", handleCallerAbort);
  }
}

async function fetchElevenLabsVoiceOptions(params: {
  apiKey: string;
  abortSignal?: AbortSignal;
}) {
  const response = await fetchJsonWithTimeout(
    ELEVENLABS_VOICES_ENDPOINT,
    {
      method: "GET",
      headers: {
        "xi-api-key": params.apiKey,
      },
    },
    ELEVENLABS_VOICE_FETCH_TIMEOUT_MS,
    params.abortSignal,
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `ElevenLabs voice catalog request failed (${response.status}): ${errorText || "Unknown error."}`,
    );
  }

  return normalizeElevenLabsVoiceOptions(await response.json());
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
}) {
  const { provider, apiKey, abortSignal, force = false } = params;
  const trimmedApiKey = apiKey.trim();
  const hasMatchingCacheKey = voiceCatalogCacheKeys[provider] === trimmedApiKey;

  if (!providerHasDynamicTtsVoiceCatalog(provider) || !trimmedApiKey) {
    return [];
  }

  if (!force && hasMatchingCacheKey && voiceCatalogCache[provider]?.length) {
    return voiceCatalogCache[provider]!;
  }

  if (!force && hasMatchingCacheKey && inflightFetches[provider]) {
    return inflightFetches[provider]!;
  }

  const promise = (async () => {
    const voices = await fetchElevenLabsVoiceOptions({
      apiKey: trimmedApiKey,
      abortSignal,
    });

    voiceCatalogCache[provider] = voices;
    voiceCatalogCacheKeys[provider] = trimmedApiKey;
    notifyListeners();
    return voices;
  })();

  inflightFetches[provider] = promise;

  try {
    return await promise;
  } finally {
    delete inflightFetches[provider];
  }
}

export const WEB_SEARCH_PROVIDER_IDS = [
  "openai",
  "perplexity",
] as const;
export type WebSearchProvider = (typeof WEB_SEARCH_PROVIDER_IDS)[number];

export type WebSearchMode = "off" | "on";
export type WebSearchDepth = "standard" | "deep";
export type WebSearchSearchMode = "quick" | "balanced" | "deep";
export type WebSearchResultLimit = 3 | 5 | 8;

export interface WebSearchProviderSettings {
  resultLimit: WebSearchResultLimit;
  depth: WebSearchDepth;
  searchMode: WebSearchSearchMode;
}

export interface WebSearchProviderControlSupport {
  resultLimit: boolean;
  depth: boolean;
  searchMode: boolean;
}

export const DEFAULT_WEB_SEARCH_PROVIDER: WebSearchProvider = "openai";
export const DEFAULT_WEB_SEARCH_MODE: WebSearchMode = "off";
export const WEB_SEARCH_RESULT_LIMIT_VALUES = [3, 5, 8] as const;
export const WEB_SEARCH_DEPTH_VALUES = ["standard", "deep"] as const;
export const WEB_SEARCH_SEARCH_MODE_VALUES = [
  "quick",
  "balanced",
  "deep",
] as const;

export const DEFAULT_WEB_SEARCH_PROVIDER_SETTINGS: Record<
  WebSearchProvider,
  WebSearchProviderSettings
> = {
  openai: {
    resultLimit: 5,
    depth: "standard",
    searchMode: "balanced",
  },
  perplexity: {
    resultLimit: 5,
    depth: "standard",
    searchMode: "balanced",
  },
};

export const WEB_SEARCH_PROVIDER_CONTROL_SUPPORT: Record<
  WebSearchProvider,
  WebSearchProviderControlSupport
> = {
  openai: {
    resultLimit: false,
    depth: false,
    searchMode: true,
  },
  perplexity: {
    resultLimit: false,
    depth: false,
    searchMode: false,
  },
};

export const WEB_SEARCH_PROVIDER_MODELS: Record<WebSearchProvider, string> = {
  openai: "gpt-4.1-mini",
  perplexity: "sonar",
};
export const WEB_SEARCH_MAX_SOURCES = 5;
export const WEB_SEARCH_RESULT_LIMIT = 5;
export const WEB_SEARCH_TIMEOUT_MS_BY_PROVIDER: Record<
  WebSearchProvider,
  number
> = {
  openai: 25000,
  perplexity: 25000,
};

export const WEB_SEARCH_PROVIDER_KIND: Record<
  WebSearchProvider,
  "grounded-answer" | "search-results"
> = {
  openai: "grounded-answer",
  perplexity: "grounded-answer",
};

export function createDefaultWebSearchProviderSettings() {
  return {
    openai: { ...DEFAULT_WEB_SEARCH_PROVIDER_SETTINGS.openai },
    perplexity: { ...DEFAULT_WEB_SEARCH_PROVIDER_SETTINGS.perplexity },
  } satisfies Record<WebSearchProvider, WebSearchProviderSettings>;
}

export function getWebSearchProviderModel(provider: WebSearchProvider) {
  return WEB_SEARCH_PROVIDER_MODELS[provider];
}

export function isWebSearchProvider(value: unknown): value is WebSearchProvider {
  return (
    typeof value === "string" &&
    WEB_SEARCH_PROVIDER_IDS.includes(value as WebSearchProvider)
  );
}

export function isWebSearchMode(value: unknown): value is WebSearchMode {
  return value === "off" || value === "on";
}

export function isWebSearchResultLimit(
  value: unknown,
): value is WebSearchResultLimit {
  return (
    typeof value === "number" &&
    WEB_SEARCH_RESULT_LIMIT_VALUES.includes(value as WebSearchResultLimit)
  );
}

export function isWebSearchDepth(value: unknown): value is WebSearchDepth {
  return (
    typeof value === "string" &&
    WEB_SEARCH_DEPTH_VALUES.includes(value as WebSearchDepth)
  );
}

export function isWebSearchSearchMode(
  value: unknown,
): value is WebSearchSearchMode {
  return (
    typeof value === "string" &&
    WEB_SEARCH_SEARCH_MODE_VALUES.includes(value as WebSearchSearchMode)
  );
}

export function getWebSearchProviderControlSupport(
  provider: WebSearchProvider,
) {
  return WEB_SEARCH_PROVIDER_CONTROL_SUPPORT[provider];
}

export function normalizeWebSearchProviderSettings(
  provider: WebSearchProvider,
  settings?: Partial<WebSearchProviderSettings> | null,
): WebSearchProviderSettings {
  const defaults = DEFAULT_WEB_SEARCH_PROVIDER_SETTINGS[provider];

  return {
    resultLimit: isWebSearchResultLimit(settings?.resultLimit)
      ? settings.resultLimit
      : defaults.resultLimit,
    depth: isWebSearchDepth(settings?.depth) ? settings.depth : defaults.depth,
    searchMode: isWebSearchSearchMode(settings?.searchMode)
      ? settings.searchMode
      : defaults.searchMode,
  };
}

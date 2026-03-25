export const WEB_SEARCH_PROVIDER_IDS = [
  "openai",
  "perplexity",
  "tavily",
  "brave",
  "exa",
  "firecrawl",
  "serpapi",
] as const;
export type WebSearchProvider = (typeof WEB_SEARCH_PROVIDER_IDS)[number];
export const WEB_SEARCH_SEARCH_ONLY_PROVIDER_IDS = [
  "tavily",
  "brave",
  "exa",
  "firecrawl",
  "serpapi",
] as const;

export const DEFAULT_WEB_SEARCH_PROVIDER: WebSearchProvider = "openai";
export const WEB_SEARCH_PROVIDER_MODELS: Record<WebSearchProvider, string> = {
  openai: "gpt-4.1-mini",
  perplexity: "sonar",
  tavily: "Tavily Search API",
  brave: "Brave Search API",
  exa: "Exa Search API",
  firecrawl: "Firecrawl Search API",
  serpapi: "SerpApi Google Search API",
};
export const WEB_SEARCH_MAX_SOURCES = 5;
export const WEB_SEARCH_RESULT_LIMIT = 5;
export const WEB_SEARCH_TIMEOUT_MS_BY_PROVIDER: Record<
  WebSearchProvider,
  number
> = {
  openai: 25000,
  perplexity: 25000,
  tavily: 25000,
  brave: 25000,
  exa: 25000,
  firecrawl: 25000,
  serpapi: 25000,
};

export const WEB_SEARCH_PROVIDER_KIND: Record<
  WebSearchProvider,
  "grounded-answer" | "search-results"
> = {
  openai: "grounded-answer",
  perplexity: "grounded-answer",
  tavily: "search-results",
  brave: "search-results",
  exa: "search-results",
  firecrawl: "search-results",
  serpapi: "search-results",
};

export function getWebSearchProviderModel(provider: WebSearchProvider) {
  return WEB_SEARCH_PROVIDER_MODELS[provider];
}

export function isWebSearchProvider(value: unknown): value is WebSearchProvider {
  return (
    typeof value === "string" &&
    WEB_SEARCH_PROVIDER_IDS.includes(value as WebSearchProvider)
  );
}

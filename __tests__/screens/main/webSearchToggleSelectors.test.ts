import { getWebSearchToggleDisplay } from "../../../src/screens/main/webSearchToggleSelectors";
import { WebSearchProvider } from "../../../src/constants/webSearch";

const providerLabels = {
  openai: "OpenAI",
  perplexity: "Perplexity",
  tavily: "Tavily",
  brave: "Brave",
  exa: "Exa",
  firecrawl: "Firecrawl",
  serpapi: "SerpAPI",
} as Record<WebSearchProvider, string>;

const t = ((key: string) =>
  ({
    webSearch: "Web Search",
    webSearchOffLabel: "Web Search · Off",
    webSearchModeAuto: "Auto",
    webSearchModeAlways: "Always",
  }[key] ?? key)) as Parameters<
  typeof getWebSearchToggleDisplay
>[0]["t"];

describe("getWebSearchToggleDisplay", () => {
  it("shows the honest off label with no provider when disabled", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: false,
      webSearchMode: "auto",
      webSearchProvider: "tavily",
      webSearchReady: true,
      providerLabels,
      t,
    });

    expect(display).toEqual({
      active: false,
      title: "Web Search · Off",
      providerLabel: null,
    });
  });

  it("shows the off label when enabled but no provider is configured", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: true,
      webSearchMode: "auto",
      webSearchProvider: null,
      webSearchReady: false,
      providerLabels,
      t,
    });

    expect(display).toEqual({
      active: false,
      title: "Web Search · Off",
      providerLabel: null,
    });
  });

  it("shows the off label when enabled with a provider that is not ready", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: true,
      webSearchMode: "auto",
      webSearchProvider: "tavily",
      webSearchReady: false,
      providerLabels,
      t,
    });

    expect(display.active).toBe(false);
    expect(display.title).toBe("Web Search · Off");
    expect(display.providerLabel).toBeNull();
  });

  it("surfaces the provider and Auto suffix when on and configured", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: true,
      webSearchMode: "auto",
      webSearchProvider: "tavily",
      webSearchReady: true,
      providerLabels,
      t,
    });

    expect(display).toEqual({
      active: true,
      title: "Web Search (Auto)",
      providerLabel: "Tavily",
    });
  });

  it("uses the Always suffix for the on mode", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: true,
      webSearchMode: "on",
      webSearchProvider: "perplexity",
      webSearchReady: true,
      providerLabels,
      t,
    });

    expect(display.title).toBe("Web Search (Always)");
    expect(display.providerLabel).toBe("Perplexity");
  });
});

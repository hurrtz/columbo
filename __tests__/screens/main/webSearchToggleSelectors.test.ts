import { getWebSearchToggleDisplay } from "../../../src/screens/main/webSearchToggleSelectors";
import { WebSearchProvider } from "../../../src/constants/webSearch";

const providerLabels = {
  openai: "OpenAI",
  perplexity: "Perplexity",
} as Record<WebSearchProvider, string>;

const t = ((key: string) =>
  ({
    webSearch: "Web Search",
  }[key] ?? key)) as Parameters<typeof getWebSearchToggleDisplay>[0]["t"];

describe("getWebSearchToggleDisplay", () => {
  it("is inactive with no provider when disabled", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: false,
      webSearchProvider: "perplexity",
      webSearchReady: true,
      providerLabels,
      t,
    });

    expect(display).toEqual({
      active: false,
      title: "Web Search",
      providerLabel: null,
    });
  });

  it("is inactive when enabled but no provider is configured", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: true,
      webSearchProvider: null,
      webSearchReady: false,
      providerLabels,
      t,
    });

    expect(display).toEqual({
      active: false,
      title: "Web Search",
      providerLabel: null,
    });
  });

  it("is inactive when enabled with a provider that is not ready", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: true,
      webSearchProvider: "perplexity",
      webSearchReady: false,
      providerLabels,
      t,
    });

    expect(display.active).toBe(false);
    expect(display.title).toBe("Web Search");
    expect(display.providerLabel).toBeNull();
  });

  it("surfaces the provider when on and configured", () => {
    const display = getWebSearchToggleDisplay({
      webSearchEnabled: true,
      webSearchProvider: "perplexity",
      webSearchReady: true,
      providerLabels,
      t,
    });

    expect(display).toEqual({
      active: true,
      title: "Web Search",
      providerLabel: "Perplexity",
    });
  });
});

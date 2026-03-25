import {
  searchWeb,
  validateWebSearchConnection,
} from "../../src/services/webSearch";

jest.mock("../../src/services/debugLogCapture", () => ({
  recordDebugLogEvent: jest.fn(),
}));

global.fetch = jest.fn();

describe("webSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a normalized summary and source list for OpenAI web search", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          output_text: "Mars has water ice near its poles.",
          output: [
            {
              type: "web_search_call",
              action: {
                sources: [
                  {
                    title: "NASA Mars Overview",
                    url: "https://example.com/nasa-mars",
                  },
                ],
              },
            },
          ],
        }),
    });

    const result = await searchWeb({
      provider: "openai",
      apiKey: "sk-test",
      language: "en",
      query: "Does Mars have water ice?",
      options: {
        resultLimit: 5,
        depth: "standard",
        searchMode: "deep",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/responses",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"search_context_size":"high"'),
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        model: "gpt-4.1-mini",
        provider: "openai",
        summary: "Mars has water ice near its poles.",
        sources: [
          {
            title: "NASA Mars Overview",
            url: "https://example.com/nasa-mars",
          },
        ],
      }),
    );
    expect(result?.context).toContain("Does Mars have water ice?");
  });

  it("returns a normalized summary and search_results list for Perplexity", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          model: "sonar",
          choices: [
            {
              message: {
                role: "assistant",
                content: "The latest Perseverance update confirms continued sampling activity.",
              },
            },
          ],
          search_results: [
            {
              title: "NASA Perseverance Rover",
              url: "https://example.com/perseverance",
              date: "2026-03-25",
            },
          ],
          citations: ["https://example.com/perseverance"],
        }),
    });

    const result = await searchWeb({
      provider: "perplexity",
      apiKey: "pplx-test",
      language: "en",
      query: "What is the latest Perseverance rover update?",
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.perplexity.ai/chat/completions",
      expect.objectContaining({
        method: "POST",
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        model: "sonar",
        provider: "perplexity",
        summary:
          "The latest Perseverance update confirms continued sampling activity.",
        sources: [
          {
            title: "NASA Perseverance Rover",
            url: "https://example.com/perseverance",
          },
        ],
      }),
    );
  });

  it("returns normalized result snippets for Tavily", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          answer: "Berlin remains the capital of Germany.",
          results: [
            {
              title: "Federal Government",
              url: "https://example.com/berlin",
              content: "Berlin is the federal capital and seat of government.",
            },
          ],
        }),
    });

    const result = await searchWeb({
      provider: "tavily",
      apiKey: "tvly-test",
      language: "en",
      query: "What is the capital of Germany?",
      options: {
        resultLimit: 8,
        depth: "standard",
        searchMode: "balanced",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.tavily.com/search",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer tvly-test",
        }),
        body: expect.stringContaining('"max_results":8'),
      }),
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://api.tavily.com/search",
      expect.objectContaining({
        body: expect.stringContaining('"search_depth":"basic"'),
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        model: "Tavily Search API",
        provider: "tavily",
        summary: "Berlin remains the capital of Germany.",
        sources: [
          {
            title: "Federal Government",
            url: "https://example.com/berlin",
          },
        ],
      }),
    );
  });

  it("returns normalized result snippets for Brave", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          web: {
            results: [
              {
                title: "European Space Agency",
                url: "https://example.com/esa",
                description: "ESA tracks missions to Jupiter and its moons.",
              },
            ],
          },
        }),
    });

    const result = await searchWeb({
      provider: "brave",
      apiKey: "brave-test",
      language: "en",
      query: "Latest ESA Jupiter mission update",
      options: {
        resultLimit: 3,
        depth: "standard",
        searchMode: "balanced",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "count=3",
      ),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "X-Subscription-Token": "brave-test",
        }),
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        model: "Brave Search API",
        provider: "brave",
        sources: [
          {
            title: "European Space Agency",
            url: "https://example.com/esa",
          },
        ],
      }),
    );
    expect(result?.summary).toContain("ESA tracks missions");
  });

  it("returns normalized result snippets for Exa", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              title: "NOAA Hurricane Center",
              url: "https://example.com/noaa",
              text: "NOAA posted the latest Atlantic hurricane outlook.",
            },
          ],
        }),
    });

    const result = await searchWeb({
      provider: "exa",
      apiKey: "exa-test",
      language: "en",
      query: "Atlantic hurricane outlook",
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.exa.ai/search",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-api-key": "exa-test",
        }),
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        model: "Exa Search API",
        provider: "exa",
        sources: [
          {
            title: "NOAA Hurricane Center",
            url: "https://example.com/noaa",
          },
        ],
      }),
    );
    expect(result?.summary).toContain("Atlantic hurricane outlook");
  });

  it("returns normalized result snippets for Firecrawl", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              title: "WHO Dengue Factsheet",
              url: "https://example.com/who-dengue",
              description: "WHO summarizes current dengue trends and risks.",
            },
          ],
        }),
    });

    const result = await searchWeb({
      provider: "firecrawl",
      apiKey: "fc-test",
      language: "en",
      query: "Current dengue trends",
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.firecrawl.dev/v1/search",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer fc-test",
        }),
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        model: "Firecrawl Search API",
        provider: "firecrawl",
        sources: [
          {
            title: "WHO Dengue Factsheet",
            url: "https://example.com/who-dengue",
          },
        ],
      }),
    );
    expect(result?.summary).toContain("current dengue trends");
  });

  it("returns normalized result snippets for SerpApi", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          organic_results: [
            {
              title: "UN Climate News",
              link: "https://example.com/un-climate",
              snippet: "UN climate reporting highlights the latest COP outcomes.",
            },
          ],
        }),
    });

    const result = await searchWeb({
      provider: "serpapi",
      apiKey: "serp-test",
      language: "en",
      query: "Latest COP climate outcomes",
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://serpapi.com/search.json?"),
      expect.objectContaining({
        method: "GET",
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        model: "SerpApi Google Search API",
        provider: "serpapi",
        sources: [
          {
            title: "UN Climate News",
            url: "https://example.com/un-climate",
          },
        ],
      }),
    );
    expect(result?.summary).toContain("latest COP outcomes");
  });

  it("skips provider requests for blank queries", async () => {
    const result = await searchWeb({
      provider: "openai",
      apiKey: "sk-test",
      language: "en",
      query: "   ",
    });

    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("validates the configured provider through the web search service", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          choices: [
            {
              message: {
                role: "assistant",
                content: "Today in UTC it is 2026-03-25.",
              },
            },
          ],
          search_results: [],
        }),
    });

    await expect(
      validateWebSearchConnection({
        provider: "perplexity",
        apiKey: "pplx-test",
        language: "en",
      }),
    ).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledWith(
      "https://api.perplexity.ai/chat/completions",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });
});

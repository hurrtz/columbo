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

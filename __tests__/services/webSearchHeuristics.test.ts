import { getWebSearchDecision } from "../../src/services/webSearchHeuristics";

describe("webSearchHeuristics", () => {
  it("triggers search for freshness-sensitive prompts in auto mode", () => {
    expect(
      getWebSearchDecision({
        enabled: true,
        mode: "auto",
        ready: true,
        language: "en",
        query: "What is the latest Claude release?",
        messages: [],
      }),
    ).toEqual(
      expect.objectContaining({
        shouldSearch: true,
        reason: "freshness-signals",
      }),
    );
  });

  it("skips search for stable prompts in auto mode", () => {
    expect(
      getWebSearchDecision({
        enabled: true,
        mode: "auto",
        ready: true,
        language: "en",
        query: "Explain photosynthesis.",
        messages: [],
      }),
    ).toEqual({
      shouldSearch: false,
      reason: "stable-query",
      matchedSignals: [],
    });
  });

  it("keeps searching for short follow-ups after a grounded assistant reply", () => {
    expect(
      getWebSearchDecision({
        enabled: true,
        mode: "auto",
        ready: true,
        language: "en",
        query: "And what about Germany?",
        messages: [
          {
            id: "assistant-1",
            role: "assistant",
            content: "Here is the current answer.",
            model: "claude-opus-4-6",
            provider: "anthropic",
            timestamp: "2026-03-25T10:00:00.000Z",
            metadata: {
              webSearch: {
                provider: "openai",
                model: "gpt-4.1-mini",
                query: "What changed?",
                summary: "Fresh answer",
                sources: [],
              },
            },
          },
        ],
      }),
    ).toEqual(
      expect.objectContaining({
        shouldSearch: true,
        reason: "grounded-follow-up",
      }),
    );
  });
});

import { getWebSearchDecision } from "../../src/services/webSearchHeuristics";

describe("webSearchHeuristics", () => {
  it("does not search when mode is off", () => {
    expect(
      getWebSearchDecision({
        enabled: false,
        mode: "off",
        ready: true,
        language: "en",
        query: "What is the latest Claude release?",
        messages: [],
      }),
    ).toEqual({
      shouldSearch: false,
      reason: "mode-off",
      matchedSignals: [],
    });
  });

  it("does not search when on but provider is not ready", () => {
    expect(
      getWebSearchDecision({
        enabled: true,
        mode: "on",
        ready: false,
        language: "en",
        query: "What is the latest Claude release?",
        messages: [],
      }),
    ).toEqual({
      shouldSearch: false,
      reason: "missing-provider-config",
      matchedSignals: [],
    });
  });

  it("always searches when on and ready", () => {
    expect(
      getWebSearchDecision({
        enabled: true,
        mode: "on",
        ready: true,
        language: "en",
        query: "Explain photosynthesis.",
        messages: [],
      }),
    ).toEqual({
      shouldSearch: true,
      reason: "manual-on",
      matchedSignals: [],
    });
  });
});

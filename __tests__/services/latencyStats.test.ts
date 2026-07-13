jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

import {
  createLatencyRouteKey,
  getDefaultLatencyEstimateMs,
  getLatencyProgress,
  getLearnedLatencyEstimateMs,
  recordLatencySample,
} from "../../src/services/latencyStats";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("latencyStats", () => {
  it("keys LLM latency by route and response settings", () => {
    expect(
      createLatencyRouteKey({
        phase: "llm-response",
        provider: "anthropic",
        model: "claude-fable-5",
        effort: "max",
        responseLength: "thorough",
        responseTone: "socratic",
        webSearchMode: "on",
        webSearchProvider: "openai",
      }),
    ).toBe(
      "llm-response-v2:anthropic:claude-fable-5:max:thorough:socratic:on:openai",
    );
  });

  it("uses conservative defaults for expensive thinking routes", () => {
    expect(
      getDefaultLatencyEstimateMs({
        phase: "llm-response",
        provider: "anthropic",
        model: "claude-fable-5",
        effort: "max",
        responseLength: "thorough",
        responseTone: "professional",
        webSearchMode: "off",
      }),
    ).toBeGreaterThan(55_000);
  });

  it("derives learned estimates from recent upper-percentile samples", () => {
    expect(
      getLearnedLatencyEstimateMs([
        8_000,
        10_000,
        12_000,
        18_000,
        24_000,
        30_000,
      ]),
    ).toBeGreaterThan(18_000);
  });

  it("caps visual progress below complete when estimates are exceeded", () => {
    expect(getLatencyProgress(5_000, 10_000)).toMatchObject({
      overEstimate: false,
    });
    expect(getLatencyProgress(25_000, 10_000)).toMatchObject({
      overEstimate: true,
    });
    expect(getLatencyProgress(60_000, 10_000).progress).toBeLessThan(1);
  });

  it("keeps long-running model samples beyond the old three-minute cutoff", async () => {
    await recordLatencySample("llm-response-v2:test", 4 * 60_000);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/latency_stats",
      expect.stringContaining("240000"),
    );
  });
});

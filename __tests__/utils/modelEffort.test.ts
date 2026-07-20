import {
  getDefaultModelEffort,
  getModelEffortOptions,
  getModelEffortRequestBody,
  getModelEffortTransportValue,
  normalizeResponseModeRouteEffort,
} from "../../src/utils/modelEffort";

describe("model effort metadata", () => {
  it("uses provider-documented defaults before the generic medium fallback", () => {
    expect(getDefaultModelEffort("openai", "gpt-5.6-sol")).toBe("medium");
    expect(getDefaultModelEffort("openai", "gpt-5.5")).toBe("medium");
    expect(getDefaultModelEffort("openai", "gpt-5.4")).toBe("none");
    expect(getDefaultModelEffort("anthropic", "claude-sonnet-5")).toBe("high");
    expect(getDefaultModelEffort("xai", "grok-4.3")).toBe("low");
    expect(getDefaultModelEffort("gemini", "gemini-3.5-flash")).toBe("medium");
    expect(getDefaultModelEffort("gemini", "gemini-3.1-pro-preview")).toBe(
      "high",
    );
    expect(getDefaultModelEffort("gemini", "gemini-3.1-flash-lite")).toBe(
      "minimal",
    );
    expect(getDefaultModelEffort("deepseek", "deepseek-v4-pro")).toBe("high");
    expect(
      getDefaultModelEffort(
        "bytedance-doubao-seed",
        "doubao-seed-2-1-turbo-260628",
      ),
    ).toBe("high");
    expect(getDefaultModelEffort("alibaba-qwen-dashscope", "qwen3.7-plus")).toBe(
      "enabled",
    );
    expect(getDefaultModelEffort("moonshot-ai-kimi", "kimi-k2.6")).toBe(
      "enabled",
    );
    expect(getDefaultModelEffort("perplexity", "sonar-deep-research")).toBe(
      "medium",
    );
  });

  it("exposes the documented Gemini thinking levels per model", () => {
    expect(
      getModelEffortOptions("gemini", "gemini-3.5-flash").map(
        (option) => option.id,
      ),
    ).toEqual(["minimal", "low", "medium", "high"]);

    expect(
      getModelEffortOptions("gemini", "gemini-3.1-pro-preview").map(
        (option) => option.id,
      ),
    ).toEqual(["low", "medium", "high"]);
  });

  it("exposes documented effort levels for non-Gemini providers", () => {
    expect(
      getModelEffortOptions("openai", "gpt-5.6-sol").map(
        (option) => option.id,
      ),
    ).toEqual(["none", "low", "medium", "high", "xhigh", "max"]);
    expect(
      getModelEffortOptions("openai", "gpt-5.5").map((option) => option.id),
    ).toEqual(["none", "low", "medium", "high", "xhigh"]);
    expect(
      getModelEffortOptions("anthropic", "claude-sonnet-5").map(
        (option) => option.id,
      ),
    ).toEqual(["low", "medium", "high", "xhigh", "max"]);
    expect(
      getModelEffortOptions("anthropic", "claude-sonnet-4-6").map(
        (option) => option.id,
      ),
    ).toEqual(["low", "medium", "high", "max"]);
    expect(
      getModelEffortOptions("anthropic", "claude-opus-4-6").map(
        (option) => option.id,
      ),
    ).toEqual(["low", "medium", "high", "max"]);
    expect(
      getModelEffortOptions("xai", "grok-4.3").map((option) => option.id),
    ).toEqual(["none", "low", "medium", "high"]);
    expect(
      getModelEffortOptions("deepseek", "deepseek-v4-pro").map(
        (option) => option.id,
      ),
    ).toEqual(["disabled", "high", "max"]);
    expect(
      getModelEffortOptions("mistral", "mistral-medium-3-5").map(
        (option) => option.id,
      ),
    ).toEqual(["none", "minimal", "low", "medium", "high", "xhigh"]);
    expect(
      getModelEffortOptions("mistral", "mistral-small-2603").map(
        (option) => option.id,
      ),
    ).toEqual(["none", "minimal", "low", "medium", "high", "xhigh"]);
    expect(
      getModelEffortOptions(
        "bytedance-doubao-seed",
        "doubao-seed-2-1-turbo-260628",
      ).map((option) => option.id),
    ).toEqual(["minimal", "low", "medium", "high"]);
    expect(
      getModelEffortOptions(
        "bytedance-doubao-seed",
        "doubao-seed-2-0-lite-260428",
      ).map((option) => option.id),
    ).toEqual(["minimal", "low", "medium", "high"]);
    expect(
      getModelEffortOptions("perplexity", "sonar-deep-research").map(
        (option) => option.id,
      ),
    ).toEqual(["low", "medium", "high"]);
  });

  it("normalizes response routes to supported effort values", () => {
    expect(
      normalizeResponseModeRouteEffort({
        provider: "gemini",
        model: "gemini-3.1-pro-preview",
      }),
    ).toEqual({
      provider: "gemini",
      model: "gemini-3.1-pro-preview",
      effort: "high",
    });

    expect(
      normalizeResponseModeRouteEffort({
        provider: "gemini",
        model: "gemini-3.5-flash",
        effort: "not-real",
      }),
    ).toEqual({
      provider: "gemini",
      model: "gemini-3.5-flash",
      effort: "medium",
    });

    expect(
      normalizeResponseModeRouteEffort({
        provider: "gemini",
        model: "gemini-2.5-flash",
        effort: "high",
      }),
    ).toEqual({
      provider: "gemini",
      model: "gemini-2.5-flash",
    });
  });

  it("maps stored effort ids to provider transport values", () => {
    expect(
      getModelEffortTransportValue("gemini", "gemini-3.5-flash", "high"),
    ).toBe("HIGH");
    expect(getModelEffortTransportValue("xai", "grok-4.3", "none")).toBe(
      "none",
    );
    expect(
      getModelEffortTransportValue("deepseek", "deepseek-v4-pro", "disabled"),
    ).toBe("disabled");
    expect(
      getModelEffortTransportValue(
        "alibaba-qwen-dashscope",
        "qwen3.7-plus",
        "enabled",
      ),
    ).toBe("enabled");
  });

  it("enables adaptive thinking on Anthropic models that require it", () => {
    expect(
      getModelEffortRequestBody("anthropic", "claude-opus-4-7", "xhigh"),
    ).toEqual({
      output_config: { effort: "xhigh" },
      thinking: { type: "adaptive" },
    });
    expect(
      getModelEffortRequestBody("anthropic", "claude-sonnet-5", "high"),
    ).toEqual({ output_config: { effort: "high" } });
  });
});

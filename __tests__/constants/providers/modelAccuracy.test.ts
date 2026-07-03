import {
  PROVIDER_DEFAULT_MODELS,
  PROVIDER_MODELS,
} from "../../../src/constants/models";
import { deriveResponseModesForProvider } from "../../../src/utils/responseModes";
import type { Provider } from "../../../src/types";

function providerModelIds(provider: Provider) {
  return PROVIDER_MODELS[provider].map((model) => model.id);
}

describe("provider model accuracy", () => {
  it("keeps curated defaults valid for the visible runtime picker", () => {
    for (const [provider, modelId] of Object.entries(PROVIDER_DEFAULT_MODELS) as [
      Provider,
      string,
    ][]) {
      if (!modelId) {
        continue;
      }

      expect(providerModelIds(provider)).toContain(modelId);
    }
  });

  it("uses the curated runtime picker, not broad catalog rows, for new response modes", () => {
    const modes = deriveResponseModesForProvider("perplexity");
    const runtimeIds = providerModelIds("perplexity");

    expect(Object.values(modes).map((mode) => mode.model)).toEqual(
      runtimeIds.slice(0, 3),
    );
    expect(Object.values(modes).map((mode) => mode.model)).not.toContain(
      "perplexity/sonar",
    );
  });

  it("exposes current Anthropic Claude 5 models and hides retired Claude 4.0 rows", () => {
    expect(providerModelIds("anthropic")).toEqual(
      expect.arrayContaining(["claude-fable-5", "claude-sonnet-5"]),
    );
    expect(providerModelIds("anthropic")).not.toEqual(
      expect.arrayContaining([
        "claude-opus-4-20250514",
        "claude-sonnet-4-20250514",
        "claude-3-haiku-20240307",
      ]),
    );
    expect(PROVIDER_DEFAULT_MODELS.anthropic).toBe("claude-sonnet-5");
  });

  it("uses current DeepSeek V4 model IDs instead of deprecated aliases", () => {
    expect(providerModelIds("deepseek")).toEqual([
      "deepseek-v4-flash",
      "deepseek-v4-pro",
    ]);
    expect(PROVIDER_DEFAULT_MODELS.deepseek).toBe("deepseek-v4-flash");
  });

  it("uses current Mistral models and avoids deprecated model rows", () => {
    expect(providerModelIds("mistral")).toEqual(
      expect.arrayContaining([
        "mistral-medium-3-5",
        "mistral-small-2603",
        "mistral-large-2512",
      ]),
    );
    expect(providerModelIds("mistral")).not.toEqual(
      expect.arrayContaining([
        "mistral-medium-2508",
        "mistral-small-2506",
        "devstral-2512",
        "magistral-medium-2509",
        "magistral-small-2509",
      ]),
    );
    expect(PROVIDER_DEFAULT_MODELS.mistral).toBe("mistral-medium-3-5");
  });

  it("surfaces current Qwen and Doubao picker models", () => {
    expect(providerModelIds("alibaba-qwen-dashscope")).toEqual(
      expect.arrayContaining([
        "qwen3.7-max",
        "qwen3.7-plus",
        "qwen3.6-plus",
        "qwen3.6-flash",
      ]),
    );
    expect(PROVIDER_DEFAULT_MODELS["alibaba-qwen-dashscope"]).toBe(
      "qwen3.6-flash",
    );

    expect(providerModelIds("bytedance-doubao-seed")).toEqual(
      expect.arrayContaining([
        "doubao-seed-2-1-pro-260628",
        "doubao-seed-2-1-turbo-260628",
        "doubao-seed-2-0-lite-260428",
        "doubao-seed-2-0-mini-260428",
      ]),
    );
    expect(PROVIDER_DEFAULT_MODELS["bytedance-doubao-seed"]).toBe(
      "doubao-seed-2-1-turbo-260628",
    );
  });

  it("surfaces current Kimi models and hides discontinued K2 rows", () => {
    expect(providerModelIds("moonshot-ai-kimi")).toEqual(
      expect.arrayContaining(["kimi-k2.6", "kimi-k2.5"]),
    );
    expect(providerModelIds("moonshot-ai-kimi")).not.toEqual(
      expect.arrayContaining([
        "kimi-k2-0905-preview",
        "kimi-k2-thinking",
        "kimi-k2-thinking-turbo",
        "kimi-latest",
        "kimi-thinking-preview",
      ]),
    );
    expect(PROVIDER_DEFAULT_MODELS["moonshot-ai-kimi"]).toBe("kimi-k2.6");
  });

  it("keeps OpenAI and Perplexity pickers aligned with their current callable endpoints", () => {
    expect(providerModelIds("openai")).not.toContain("gpt-4.1-nano");
    expect(providerModelIds("openai")).not.toContain("gpt-5.5-pro");
    expect(providerModelIds("perplexity")).toEqual([
      "sonar",
      "sonar-pro",
      "sonar-reasoning-pro",
      "sonar-deep-research",
    ]);
  });
});

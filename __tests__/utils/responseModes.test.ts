import {
  deriveResponseModesForProvider,
  getAvailableResponseModes,
  getDefaultModelForProvider,
  getProviderValidationModel,
  isResponseModeReady,
} from "../../src/utils/responseModes";
import { PROVIDER_MODELS } from "../../src/constants/models";
import { DEFAULT_SETTINGS } from "../../src/types";

describe("response mode selectors", () => {
  it("exposes no usable response mode on a fresh install without keys", () => {
    expect(getAvailableResponseModes(DEFAULT_SETTINGS)).toEqual([]);
  });

  it("returns only response modes backed by configured provider keys", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      responseModes: [
        {
          id: "mode-1",
          route: { provider: "gemini" as const, model: "gemini-2.5-flash" },
        },
        {
          id: "mode-2",
          route: {
            provider: "anthropic" as const,
            model: "claude-sonnet-4-6",
          },
        },
        {
          id: "mode-3",
          route: { provider: "openai" as const, model: "gpt-5.4" },
        },
      ],
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "gemini-test-key",
        openai: "sk-test",
      },
    };

    expect(getAvailableResponseModes(settings)).toEqual(["mode-1", "mode-3"]);
  });

  it("prefers the active response mode model when validating a provider", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      activeResponseMode: "mode-1",
      responseModes: [
        {
          id: "mode-1",
          route: {
            provider: "openai" as const,
            model: "gpt-5-mini",
          },
        },
        {
          id: "mode-2",
          route: {
            provider: "openai" as const,
            model: "gpt-5.4",
          },
        },
      ],
      providerModels: {
        ...DEFAULT_SETTINGS.providerModels,
        openai: "gpt-4.1",
      },
    };

    expect(getProviderValidationModel(settings, "openai")).toBe(
      "gpt-5-mini",
    );
  });

  it("uses the curated provider default instead of the first picker entry", () => {
    expect(getDefaultModelForProvider("anthropic")).toBe("claude-sonnet-5");
    expect(getDefaultModelForProvider("xai")).toBe("grok-4.3");
  });

  it("does not treat a search-only provider with an empty model as a usable response mode", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      responseModes: [
        { id: "mode-1", route: { provider: "brave" as const, model: "" } },
        { id: "mode-2", route: { provider: "brave" as const, model: "" } },
      ],
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        brave: "brave-search-key",
      },
    };

    expect(isResponseModeReady(settings, "mode-1")).toBe(false);
    expect(getAvailableResponseModes(settings)).toEqual([]);
  });

  it("allows any non-empty Gemini key for response modes and defers validity to server validation", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      responseModes: [
        {
          id: "mode-1",
          route: {
            provider: "gemini" as const,
            model: "gemini-2.5-flash",
          },
        },
      ],
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "not-a-google-key",
      },
    };

    expect(isResponseModeReady(settings, "mode-1")).toBe(true);
  });

  it("derives effort defaults for effort-capable Gemini response routes", () => {
    const modes = deriveResponseModesForProvider("gemini");

    expect(modes[1].route).toEqual({
      provider: "gemini",
      model: "gemini-3.5-flash",
      effort: "medium",
    });
    expect(modes[2].route).toEqual({
      provider: "gemini",
      model: "gemini-3.1-pro-preview",
      effort: "high",
    });
  });
});

describe("deriveResponseModesForProvider", () => {
  it("maps the first three dynamic modes to curated runtime models of the provider", () => {
    const expected = PROVIDER_MODELS.openai
      .slice(0, 3)
      .map((model) => model.id);

    expect(expected.length).toBe(3);

    const modes = deriveResponseModesForProvider("openai");

    expect(modes).toHaveLength(3);
    expect(modes.map((mode) => mode.id)).toEqual([
      "mode-1",
      "mode-2",
      "mode-3",
    ]);
    expect(modes[0].route).toEqual({
      provider: "openai",
      model: expected[0],
      effort: "medium",
    });
    expect(modes[1].route).toEqual({
      provider: "openai",
      model: expected[1],
      effort: "none",
    });
    expect(modes[2].route).toEqual({
      provider: "openai",
      model: expected[2],
      effort: "none",
    });

    const distinct = new Set(modes.map((mode) => mode.route.model));
    expect(distinct.size).toBe(3);
  });

  it("assigns every mode a route belonging to the requested provider", () => {
    const modes = deriveResponseModesForProvider("anthropic");

    for (const mode of modes) {
      expect(mode.route.provider).toBe("anthropic");
      expect(mode.route.model).not.toBe("");
    }
  });

  it("pads by repeating the last model when fewer than three are available", () => {
    const runtimeModels = PROVIDER_MODELS.deepseek;

    const modes = deriveResponseModesForProvider("deepseek");
    const orderedIds = runtimeModels.map((model) => model.id);

    // deepseek exposes fewer than three models today; this asserts the padding
    // contract regardless: every mode gets a real model id from the provider.
    expect(orderedIds).toContain(modes[0].route.model);
    expect(orderedIds).toContain(modes[1].route.model);
    expect(orderedIds).toContain(modes[2].route.model);
    expect(modes[2].route.model).toBe(
      orderedIds[Math.min(2, orderedIds.length - 1)],
    );
  });
});

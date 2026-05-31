import {
  getAvailableResponseModes,
  getDefaultModelForProvider,
  getProviderValidationModel,
  isResponseModeReady,
} from "../../src/utils/responseModes";
import { DEFAULT_SETTINGS } from "../../src/types";

describe("response mode selectors", () => {
  it("returns only response modes backed by configured provider keys", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "AIzaSyTestKey",
        openai: "sk-test",
      },
    };

    expect(getAvailableResponseModes(settings)).toEqual(["quick", "deep"]);
  });

  it("prefers the active response mode model when validating a provider", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      activeResponseMode: "quick" as const,
      responseModes: {
        ...DEFAULT_SETTINGS.responseModes,
        quick: {
          provider: "openai" as const,
          model: "gpt-5-mini",
        },
        deep: {
          provider: "openai" as const,
          model: "gpt-5.4",
        },
      },
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
    expect(getDefaultModelForProvider("anthropic")).toBe("claude-sonnet-4-6");
    expect(getDefaultModelForProvider("xai")).toBe("grok-4.3");
  });

  it("requires valid Google AI Studio credentials for Gemini-backed response modes", () => {
    const invalidKeySettings = {
      ...DEFAULT_SETTINGS,
      responseModes: {
        ...DEFAULT_SETTINGS.responseModes,
        quick: {
          provider: "gemini" as const,
          model: "gemini-2.5-flash",
        },
      },
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "not-a-google-key",
      },
    };

    expect(isResponseModeReady(invalidKeySettings, "quick")).toBe(false);

    const validKeySettings = {
      ...invalidKeySettings,
      apiKeys: {
        ...invalidKeySettings.apiKeys,
        gemini: "AIzaSyValidLookingKey",
      },
    };

    expect(isResponseModeReady(validKeySettings, "quick")).toBe(true);
  });
});

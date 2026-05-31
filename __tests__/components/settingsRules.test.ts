import { DEFAULT_SETTINGS } from "../../src/types";
import {
  getNormalizedProviderTtsVoices,
  getNormalizedResponseModes,
  getNormalizedSttProvider,
} from "../../src/components/settings/settingsRules";

describe("settingsRules", () => {
  it("repairs an invalid provider STT selection", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      sttMode: "provider" as const,
      sttProvider: "openai" as const,
    };

    expect(getNormalizedSttProvider(settings, ["xai"])).toBe("xai");
  });

  it("repairs response modes that point to disabled providers", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      responseModes: {
        quick: { provider: "openai" as const, model: "gpt-5.4" },
        normal: { provider: "openai" as const, model: "gpt-5.4" },
        deep: { provider: "openai" as const, model: "gpt-5.4" },
      },
      providerModels: {
        ...DEFAULT_SETTINGS.providerModels,
        deepseek: "deepseek-chat",
      },
    };

    const next = getNormalizedResponseModes(settings, ["deepseek"]);

    expect(next).toEqual({
      quick: { provider: "deepseek", model: "deepseek-chat" },
      normal: { provider: "deepseek", model: "deepseek-chat" },
      deep: { provider: "deepseek", model: "deepseek-chat" },
    });
  });

  it("repairs invalid provider voice selections", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      providerTtsVoices: {
        ...DEFAULT_SETTINGS.providerTtsVoices,
        openai: "not-a-real-voice",
      },
      ttsListenLanguages: ["en"] as const,
    };

    const nextProviderVoices = getNormalizedProviderTtsVoices(
      settings,
      ["openai"],
      "en",
    );

    expect(nextProviderVoices?.openai).toBe("alloy");
  });

  it("leaves a valid provider voice selection untouched", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      providerTtsVoices: {
        ...DEFAULT_SETTINGS.providerTtsVoices,
        openai: "alloy",
      },
      ttsListenLanguages: ["en"] as const,
    };

    const nextProviderVoices = getNormalizedProviderTtsVoices(
      settings,
      ["openai"],
      "en",
    );

    expect(nextProviderVoices).toBeNull();
  });
});

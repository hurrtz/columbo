import { DEFAULT_SETTINGS } from "../../../src/types";
import { getProviderValidationTarget } from "../../../src/components/settings/providerSupport";

describe("getProviderValidationTarget", () => {
  it("uses TTS validation for speech-only providers without llm support", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        grok: "xai-test",
      },
    };

    expect(getProviderValidationTarget(settings, "grok")).toEqual({
      kind: "tts",
      model: "grok-tts",
      configKey: JSON.stringify({
        voice: "ara",
      }),
    });
  });

  it("uses llm validation for providers with configured chat credentials", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      providerModels: {
        ...DEFAULT_SETTINGS.providerModels,
        gemini: "gemini-2.5-flash",
      },
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "AIza-test",
      },
    };

    expect(getProviderValidationTarget(settings, "gemini")).toEqual({
      kind: "llm",
      model: "gemini-2.5-flash",
    });
  });
});

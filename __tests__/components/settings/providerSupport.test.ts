import { DEFAULT_SETTINGS } from "../../../src/types";
import { getProviderValidationTarget } from "../../../src/components/settings/providerSupport";

describe("getProviderValidationTarget", () => {
  it("prefers llm validation for xAI once a key unlocks chat plus voice", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        xai: "xai-test",
      },
    };

    expect(getProviderValidationTarget(settings, "xai")).toEqual({
      kind: "llm",
      model: expect.any(String),
      configKey: undefined,
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
        gemini: "not-a-google-key",
      },
    };

    expect(getProviderValidationTarget(settings, "gemini")).toEqual({
      kind: "llm",
      model: "gemini-2.5-flash",
    });
  });
});

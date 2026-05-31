import { DEFAULT_SETTINGS } from "../../src/types";
import {
  getCurrentSetupGuideValidationState,
  resolveSetupGuideRoutes,
} from "../../src/screens/main/setupGuideSupport";

function createSettings() {
  return {
    ...DEFAULT_SETTINGS,
    apiKeys: {
      ...DEFAULT_SETTINGS.apiKeys,
    },
  };
}

describe("setupGuideSupport", () => {
  it("prefers on-device STT over provider STT when both are available", () => {
    const settings = createSettings();
    settings.apiKeys.openai = "test-openai-key";

    const routes = resolveSetupGuideRoutes({
      provider: "openai",
      settings,
      nativeSttAvailable: true,
    });

    expect(routes.llm.enabled).toBe(true);
    expect(routes.stt).toEqual({
      enabled: true,
      kind: "on-device",
    });
    expect(routes.tts).toEqual(
      expect.objectContaining({
        enabled: true,
        kind: "provider",
        provider: "openai",
      }),
    );
  });

  it("disables TTS when the provider key does not unlock provider speech", () => {
    const settings = createSettings();
    settings.apiKeys["microsoft-azure"] =
      "https://example.openai.azure.com|test-openai-key";

    const routes = resolveSetupGuideRoutes({
      provider: "microsoft-azure",
      settings,
      nativeSttAvailable: false,
    });

    expect(routes.llm.enabled).toBe(true);
    expect(routes.tts).toEqual(
      expect.objectContaining({
        enabled: false,
        kind: "disabled",
      }),
    );
  });

  it("resets validation state when the current provider config no longer matches", () => {
    const currentValidationState = getCurrentSetupGuideValidationState({
      provider: "openai",
      apiKey: "new-key",
      model: "gpt-5.4",
      validationState: {
        status: "success",
        provider: "openai",
        apiKey: "old-key",
        model: "gpt-5.4",
      },
    });

    expect(currentValidationState).toEqual({ status: "idle" });
  });
});

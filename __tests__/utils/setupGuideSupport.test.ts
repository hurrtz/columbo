import { DEFAULT_SETTINGS } from "../../src/types";
import {
  buildSetupGuideResponseModes,
  getCurrentSetupGuideValidationState,
  getSetupGuideValidationModel,
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
  it("creates one home route for a one-provider setup", () => {
    expect(buildSetupGuideResponseModes("openai")).toEqual([
      expect.objectContaining({
        id: "mode-1",
        route: expect.objectContaining({
          provider: "openai",
          model: "gpt-5.6-sol",
        }),
      }),
    ]);
  });

  it("validates Gemini onboarding with the stable REST default", () => {
    const settings = createSettings();
    settings.responseModes = [
      {
        id: "mode-1",
        route: {
          provider: "gemini",
          model: "gemini-3.1-flash-live-preview",
        },
      },
    ];
    settings.activeResponseMode = "mode-1";

    expect(getSetupGuideValidationModel("gemini")).toBe(
      "gemini-2.5-flash",
    );
  });

  it("prefers selected-provider STT over system recognition", () => {
    const settings = createSettings();
    settings.apiKeys.gemini = "test-gemini-key";

    const routes = resolveSetupGuideRoutes({
      provider: "gemini",
      settings,
      systemSttAvailable: true,
    });

    expect(routes.llm.enabled).toBe(true);
    expect(routes.stt).toEqual({
      enabled: true,
      kind: "provider",
      provider: "gemini",
      model: "gemini-3.5-flash",
    });
    expect(routes.tts).toEqual(
      expect.objectContaining({
        enabled: true,
        kind: "provider",
        provider: "gemini",
      }),
    );
  });

  it("falls back to system STT when the selected provider has no speech route", () => {
    const settings = createSettings();
    settings.apiKeys.anthropic = "test-anthropic-key";

    const routes = resolveSetupGuideRoutes({
      provider: "anthropic",
      settings,
      systemSttAvailable: true,
    });

    expect(routes.stt).toEqual({
      enabled: true,
      kind: "system",
    });
  });

  it("disables TTS when the provider key does not unlock provider speech", () => {
    const settings = createSettings();
    settings.apiKeys.deepseek = "sk-deepseek-test";

    const routes = resolveSetupGuideRoutes({
      provider: "deepseek",
      settings,
      systemSttAvailable: false,
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

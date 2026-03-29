import { DEFAULT_SETTINGS } from "../../../src/types";
import { getProviderValidationTarget } from "../../../src/components/settings/providerSupport";

describe("getProviderValidationTarget", () => {
  it("prefers Azure TTS validation when only Azure Speech credentials are configured", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        "microsoft-azure": "azure-speech-key|westeurope",
      },
    };

    expect(getProviderValidationTarget(settings, "microsoft-azure")).toEqual({
      kind: "tts",
      model: "azure-ai-speech-neural",
      configKey: JSON.stringify({
        voice: "en-US-JennyMultilingualNeural",
      }),
    });
  });

  it("uses llm validation for Azure when Azure OpenAI credentials are configured", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      providerModels: {
        ...DEFAULT_SETTINGS.providerModels,
        "microsoft-azure": "gpt-4.1-mini",
      },
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        "microsoft-azure":
          "https://example-resource.openai.azure.com|azure-openai-key",
      },
    };

    expect(getProviderValidationTarget(settings, "microsoft-azure")).toEqual({
      kind: "llm",
      model: "gpt-4.1-mini",
      configKey: undefined,
    });
  });

  it("uses TTS validation for speech-only providers without llm support", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        deepgram: "deepgram-test-key",
      },
    };

    expect(getProviderValidationTarget(settings, "deepgram")).toEqual({
      kind: "tts",
      model: "aura-2",
      configKey: JSON.stringify({
        voice: "aura-2-thalia-en",
      }),
    });
  });
});

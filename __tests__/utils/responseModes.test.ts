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
        groq: "gsk_test",
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
  });

  it("requires Azure OpenAI credentials for Azure-backed response modes", () => {
    const speechOnlySettings = {
      ...DEFAULT_SETTINGS,
      responseModes: {
        ...DEFAULT_SETTINGS.responseModes,
        quick: {
          provider: "microsoft-azure" as const,
          model: "gpt-4.1-mini",
        },
      },
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        "microsoft-azure": "azure-speech-key|westeurope",
      },
    };

    expect(isResponseModeReady(speechOnlySettings, "quick")).toBe(false);

    const azureOpenAiSettings = {
      ...speechOnlySettings,
      apiKeys: {
        ...speechOnlySettings.apiKeys,
        "microsoft-azure":
          "https://example-resource.openai.azure.com|azure-openai-key",
      },
    };

    expect(isResponseModeReady(azureOpenAiSettings, "quick")).toBe(true);
  });
});

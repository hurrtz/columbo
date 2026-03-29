import {
  getEnabledProviders,
  getEnabledSttProviders,
  getEnabledTtsProviders,
} from "../../src/utils/providerCapabilities";
import { DEFAULT_SETTINGS } from "../../src/types";

describe("provider capability selectors", () => {
  it("filters enabled providers by configured API keys", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "AIza-test",
        groq: "gsk_test",
        mistral: "mistral_test",
        together: "together_test",
        xai: "xai-test",
      },
    };

    expect(getEnabledProviders(settings)).toEqual([
      "gemini",
      "xai",
      "groq",
      "mistral",
      "together",
    ]);
    expect(getEnabledSttProviders(settings)).toEqual([
      "xai",
      "groq",
      "mistral",
      "together",
    ]);
    expect(getEnabledTtsProviders(settings)).toEqual([
      "gemini",
      "xai",
      "groq",
      "together",
    ]);
  });

  it("keeps OpenAI available for both STT and TTS when configured", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        openai: "sk-test",
        anthropic: "sk-ant-test",
      },
    };

    expect(getEnabledSttProviders(settings)).toEqual(["openai"]);
    expect(getEnabledTtsProviders(settings)).toEqual(["openai"]);
  });

  it("treats Azure Speech-only credentials as TTS-only readiness", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        "microsoft-azure": "azure-speech-key|westeurope",
      },
    };

    expect(getEnabledProviders(settings)).toEqual([]);
    expect(getEnabledSttProviders(settings)).toEqual([]);
    expect(getEnabledTtsProviders(settings)).toEqual(["microsoft-azure"]);
  });

  it("treats combined Azure credentials as ready for llm, stt, and tts", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        "microsoft-azure":
          "https://example-resource.openai.azure.com|azure-openai-key|azure-speech-key|westeurope",
      },
    };

    expect(getEnabledProviders(settings)).toEqual(["microsoft-azure"]);
    expect(getEnabledSttProviders(settings)).toEqual(["microsoft-azure"]);
    expect(getEnabledTtsProviders(settings)).toEqual(["microsoft-azure"]);
  });

  it("treats ByteDance speech-only credentials as STT-only readiness", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        "bytedance-doubao-seed": "speech-app-key|speech-access-key",
      },
    };

    expect(getEnabledProviders(settings)).toEqual([]);
    expect(getEnabledSttProviders(settings)).toEqual(["bytedance-doubao-seed"]);
    expect(getEnabledTtsProviders(settings)).toEqual([]);
  });

  it("treats combined ByteDance Ark and speech credentials as ready for llm and stt", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        "bytedance-doubao-seed":
          "ark-api-key|speech-app-key|speech-access-key|volc.bigasr.auc_turbo",
      },
    };

    expect(getEnabledProviders(settings)).toEqual(["bytedance-doubao-seed"]);
    expect(getEnabledSttProviders(settings)).toEqual(["bytedance-doubao-seed"]);
    expect(getEnabledTtsProviders(settings)).toEqual([]);
  });

  it("treats Gemini Cloud Speech-only credentials as STT-only readiness", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "my-project|ya29.test-token|us",
      },
    };

    expect(getEnabledProviders(settings)).toEqual([]);
    expect(getEnabledSttProviders(settings)).toEqual(["gemini"]);
    expect(getEnabledTtsProviders(settings)).toEqual([]);
  });

  it("treats combined Gemini AI Studio and Cloud Speech credentials as ready for llm, stt, and tts", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "AIza-test|my-project|ya29.test-token|us",
      },
    };

    expect(getEnabledProviders(settings)).toEqual(["gemini"]);
    expect(getEnabledSttProviders(settings)).toEqual(["gemini"]);
    expect(getEnabledTtsProviders(settings)).toEqual(["gemini"]);
  });
});

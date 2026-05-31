import { DEFAULT_SETTINGS } from "../../src/types";
import {
  getNormalizedProviderTtsVoices,
  getNormalizedResponseModes,
  getNormalizedSttProvider,
} from "../../src/components/settings/settingsRules";
import { clearProviderTtsVoiceCatalogCache } from "../../src/services/tts/voiceCatalog";

describe("settingsRules", () => {
  beforeEach(() => {
    clearProviderTtsVoiceCatalogCache();
  });

  it("repairs an invalid provider STT selection", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      sttMode: "provider" as const,
      sttProvider: "openai" as const,
    };

    expect(getNormalizedSttProvider(settings, ["groq"])).toBe("groq");
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
        groq: "llama-3.3-70b-versatile",
      },
    };

    const next = getNormalizedResponseModes(settings, ["groq"]);

    expect(next).toEqual({
      quick: { provider: "groq", model: "llama-3.3-70b-versatile" },
      normal: { provider: "groq", model: "llama-3.3-70b-versatile" },
      deep: { provider: "groq", model: "llama-3.3-70b-versatile" },
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

  it("preserves a custom ElevenLabs voice id before the dynamic catalog is loaded", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      providerTtsVoices: {
        ...DEFAULT_SETTINGS.providerTtsVoices,
        elevenlabs: "21m00Tcm4TlvDq8ikWAM",
      },
    };

    const nextProviderVoices = getNormalizedProviderTtsVoices(
      settings,
      ["elevenlabs"],
      "en",
    );

    expect(nextProviderVoices).toBeNull();
  });
});

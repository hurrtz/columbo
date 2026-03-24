import {
  PROVIDER_DEFAULT_TTS_MODELS,
  getProviderSttModelOptions,
  getProviderTtsModelOptions,
  getSttModelLabel,
  getTtsModelLabel,
} from "../../../src/constants/providers/speech";

describe("speech provider constants", () => {
  it("uses catalog labels for exact STT model matches", () => {
    expect(getSttModelLabel("openai", "gpt-4o-mini-transcribe")).toBe(
      "GPT-4o mini Transcribe",
    );
  });

  it("uses catalog labels for aliased STT model ids", () => {
    expect(getSttModelLabel("mistral", "voxtral-mini-latest")).toBe(
      "Voxtral Mini Transcribe 2",
    );
  });

  it("keeps the manual fallback label when the STT model is not in the workbook catalog", () => {
    expect(
      getProviderSttModelOptions("gemini").find(
        (option) => option.id === "gemini-2.5-flash",
      )?.name,
    ).toBe("Gemini 2.5 Flash");
  });

  it("surfaces newly wired catalog-backed STT providers through the runtime manifest", () => {
    expect(getProviderSttModelOptions("z-ai-zhipu-ai")).toEqual([
      { id: "glm-asr-2512", name: "GLM-ASR-2512" },
    ]);
  });

  it("uses catalog labels for exact TTS model matches", () => {
    expect(
      getProviderTtsModelOptions("openai").find(
        (option) => option.id === "gpt-4o-mini-tts",
      )?.name,
    ).toBe("GPT-4o mini TTS");
  });

  it("falls back to the configured label when the TTS model is not in the workbook catalog", () => {
    expect(getTtsModelLabel("gemini", "gemini-2.5-flash-preview-tts")).toBe(
      "Gemini 2.5 Flash Preview TTS",
    );
  });

  it("keeps xAI TTS coherent even without an exact catalog model id", () => {
    expect(getProviderTtsModelOptions("xai")).toEqual([
      { id: "grok-tts-mini", name: "Grok TTS Mini" },
    ]);
    expect(PROVIDER_DEFAULT_TTS_MODELS.xai).toBe("grok-tts-mini");
  });
});

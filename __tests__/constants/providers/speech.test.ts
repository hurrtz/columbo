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
    expect(getProviderSttModelOptions("assemblyai")).toEqual([
      { id: "universal-3-pro", name: "Universal-3 Pro" },
      { id: "universal-2", name: "Universal-2" },
    ]);
    expect(getProviderSttModelOptions("z-ai-zhipu-ai")).toEqual([
      { id: "glm-asr-2512", name: "GLM-ASR-2512" },
    ]);
    expect(getProviderSttModelOptions("alibaba-qwen-dashscope")).toEqual([
      { id: "qwen3-asr-flash", name: "Qwen3-ASR-Flash" },
    ]);
    expect(getProviderSttModelOptions("stepfun")).toEqual([
      { id: "step-asr", name: "Step ASR" },
      { id: "step-asr-1.1", name: "Step ASR 1.1" },
    ]);
    expect(getProviderSttModelOptions("siliconflow")).toEqual([
      { id: "FunAudioLLM/SenseVoiceSmall", name: "SenseVoiceSmall" },
      { id: "TeleAI/TeleSpeechASR", name: "TeleSpeechASR" },
    ]);
  });

  it("uses catalog labels for exact TTS model matches", () => {
    expect(
      getProviderTtsModelOptions("openai").find(
        (option) => option.id === "gpt-4o-mini-tts",
      )?.name,
    ).toBe("GPT-4o mini TTS");
    expect(getProviderTtsModelOptions("alibaba-qwen-dashscope")).toEqual([
      { id: "qwen3-tts-flash", name: "Qwen3-TTS-Flash" },
      { id: "qwen3-tts-instruct-flash", name: "Qwen3-TTS-Instruct-Flash" },
    ]);
    expect(
      getProviderTtsModelOptions("gemini").find(
        (option) => option.id === "gemini-2.5-flash-tts",
      )?.name,
    ).toBe("Gemini 2.5 Flash TTS");
  });

  it("keeps xAI TTS aligned to the canonical catalog service id", () => {
    expect(getProviderTtsModelOptions("xai")).toEqual([
      { id: "text-to-speech", name: "Text to Speech API" },
    ]);
    expect(PROVIDER_DEFAULT_TTS_MODELS.xai).toBe("text-to-speech");
    expect(getTtsModelLabel("xai", "text-to-speech")).toBe("Text to Speech API");
  });
});

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
    expect(getProviderSttModelOptions("deepgram")).toEqual([
      { id: "flux-general-en", name: "Flux General English" },
      { id: "nova-3", name: "Nova-3 General" },
      { id: "nova-3-medical", name: "Nova-3 Medical" },
      { id: "nova-2", name: "Nova-2 General" },
      { id: "nova-2-verticals", name: "Nova-2 Vertical Variants" },
      { id: "legacy-nova-family", name: "Legacy Nova Family" },
      { id: "legacy-enhanced-family", name: "Legacy Enhanced Family" },
      { id: "legacy-base-family", name: "Legacy Base Family" },
      { id: "whisper", name: "Deepgram Whisper Cloud" },
    ]);
    expect(getProviderSttModelOptions("elevenlabs")).toEqual([
      { id: "scribe_v2", name: "Scribe v2" },
      { id: "scribe_v1", name: "Scribe v1" },
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
    expect(getProviderTtsModelOptions("deepgram")).toEqual([
      { id: "aura-2", name: "Aura-2 Voice Family" },
      { id: "aura-1", name: "Aura-1 Voice Family" },
    ]);
    expect(getProviderTtsModelOptions("elevenlabs")).toEqual([
      { id: "eleven_v3", name: "Eleven v3" },
      { id: "eleven_multilingual_v2", name: "Eleven Multilingual v2" },
      { id: "eleven_flash_v2_5", name: "Eleven Flash v2.5" },
      { id: "eleven_turbo_v2_5", name: "Eleven Turbo v2.5" },
      { id: "eleven_turbo_v2", name: "Eleven Turbo v2" },
      { id: "eleven_monolingual_v1", name: "Eleven Monolingual v1" },
      { id: "eleven_multilingual_v1", name: "Eleven Multilingual v1" },
    ]);
  });

  it("keeps xAI TTS aligned to the canonical catalog service id", () => {
    expect(getProviderTtsModelOptions("xai")).toEqual([
      { id: "text-to-speech", name: "Text to Speech API" },
    ]);
    expect(PROVIDER_DEFAULT_TTS_MODELS.xai).toBe("text-to-speech");
    expect(getTtsModelLabel("xai", "text-to-speech")).toBe("Text to Speech API");
  });
});

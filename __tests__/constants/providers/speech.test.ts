import {
  PROVIDER_DEFAULT_TTS_MODELS,
  getProviderSttModelOptions,
  getProviderTtsModelOptions,
  getSttModelLabel,
  getTtsModelLabel,
  getTtsVoiceLabel,
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
      getProviderTtsModelOptions("gemini").find(
        (option) => option.id === "gemini-2.5-flash",
      )?.name,
    ).toBeUndefined();
  });

  it("surfaces the remaining simple Mistral STT rows from the runtime manifest", () => {
    expect(getProviderSttModelOptions("gemini")).toEqual([
      { id: "chirp_3", name: "Chirp 3: Transcription" },
      { id: "chirp_2", name: "Chirp 2: Transcription" },
      { id: "telephony", name: "Telephony" },
    ]);
    expect(getProviderSttModelOptions("mistral")).toEqual(
      [{ id: "voxtral-mini-latest", name: "Voxtral Mini Transcribe 2" }],
    );
  });

  it("surfaces newly wired catalog-backed STT providers through the runtime manifest", () => {
    expect(getProviderSttModelOptions("bytedance-doubao-seed")).toEqual([
      {
        id: "bigmodel",
        name: "Doubao Big-Model Streaming ASR",
      },
    ]);
    expect(getProviderSttModelOptions("alibaba-qwen-dashscope")).toEqual([
      { id: "qwen3-asr-flash", name: "Qwen3-ASR-Flash" },
    ]);
    expect(getProviderSttModelOptions("xai")).toEqual([
      {
        id: "voice-agent-api",
        name: "Voice Agent API (speech input inside realtime agent)",
      },
      {
        id: "grok-stt",
        name: "Grok Speech-to-Text",
      },
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
        (option) => option.id === "gemini-2.5-flash-preview-tts",
      )?.name,
    ).toBe("Gemini 2.5 Flash Preview TTS");
    expect(getProviderTtsModelOptions("bytedance-doubao-seed")).toEqual([]);
  });

  it("keeps xAI TTS aligned to the merged catalog service ids", () => {
    expect(getProviderTtsModelOptions("xai")).toEqual([
      { id: "text-to-speech", name: "Text to Speech API" },
      { id: "grok-tts", name: "Grok Text-to-Speech" },
    ]);
    expect(PROVIDER_DEFAULT_TTS_MODELS.xai).toBe("grok-tts");
    expect(getTtsModelLabel("xai", "text-to-speech")).toBe("Text to Speech API");
    expect(getTtsModelLabel("xai", "grok-tts")).toBe("Grok Text-to-Speech");
  });

  it("surfaces catalog-backed TTS voice labels", () => {
    expect(getTtsVoiceLabel("openai", "alloy", "en")).toBe("Alloy");
  });
});

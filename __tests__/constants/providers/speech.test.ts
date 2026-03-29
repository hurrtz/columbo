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
    expect(getProviderSttModelOptions("gemini")).toEqual([]);
    expect(getProviderSttModelOptions("mistral")).toEqual(
      [{ id: "voxtral-mini-latest", name: "Voxtral Mini Transcribe 2" }],
    );
  });

  it("surfaces newly wired catalog-backed STT providers through the runtime manifest", () => {
    expect(getProviderSttModelOptions("assemblyai")).toEqual([
      { id: "universal-3-pro", name: "Universal-3 Pro" },
      { id: "universal-2", name: "Universal-2" },
      { id: "u3-rt-pro", name: "Universal-3 Pro Streaming" },
      {
        id: "universal-streaming-english",
        name: "Universal-Streaming English",
      },
      {
        id: "universal-streaming-multilingual",
        name: "Universal-Streaming Multilingual",
      },
      { id: "whisper-rt", name: "Whisper Streaming" },
    ]);
    expect(getProviderSttModelOptions("z-ai-zhipu-ai")).toEqual([
      { id: "glm-asr-2512", name: "GLM-ASR-2512" },
    ]);
    expect(getProviderSttModelOptions("bytedance-doubao-seed")).toEqual([
      {
        id: "bigmodel",
        name: "Doubao Big-Model Streaming ASR",
      },
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
    expect(getProviderSttModelOptions("fireworks-ai")).toEqual([
      { id: "whisper-v3", name: "Whisper V3 Large" },
      { id: "whisper-v3-turbo", name: "Whisper V3 Turbo" },
      { id: "fireworks-asr-large", name: "Streaming ASR v1" },
      { id: "fireworks-asr-v2", name: "Streaming ASR v2" },
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
      { id: "scribe_v2_realtime", name: "Scribe v2 Realtime" },
    ]);
    expect(getProviderSttModelOptions("sambanova")).toEqual([
      { id: "Whisper-Large-v3", name: "Whisper Large v3" },
    ]);
    expect(getProviderSttModelOptions("novita-ai")).toEqual([
      { id: "glm-asr", name: "GLM Audio to Text" },
    ]);
    expect(getProviderSttModelOptions("xai")).toEqual([
      {
        id: "voice-agent-api",
        name: "Voice Agent API (speech input inside realtime agent)",
      },
    ]);
    expect(getProviderSttModelOptions("hugging-face-inference-api")).toEqual([
      { id: "openai/whisper-large-v3", name: "Whisper large-v3" },
      {
        id: "openai/whisper-large-v3-turbo",
        name: "Whisper large-v3-turbo",
      },
    ]);
    expect(getProviderSttModelOptions("baidu-ernie-qianfan")).toEqual([
      { id: "短语音识别", name: "Short Speech Recognition" },
      { id: "短语音识别极速版", name: "Short Speech Recognition Pro / 极速版" },
    ]);
  });

  it("uses catalog labels for exact TTS model matches", () => {
    expect(
      getProviderTtsModelOptions("openai").find(
        (option) => option.id === "gpt-4o-mini-tts",
      )?.name,
    ).toBe("GPT-4o mini TTS");
    expect(getProviderTtsModelOptions("microsoft-azure")).toEqual([
      { id: "azure-ai-speech-neural", name: "Azure AI Speech Neural" },
    ]);
    expect(getProviderTtsModelOptions("alibaba-qwen-dashscope")).toEqual([
      { id: "qwen3-tts-flash", name: "Qwen3-TTS-Flash" },
      { id: "qwen3-tts-instruct-flash", name: "Qwen3-TTS-Instruct-Flash" },
    ]);
    expect(
      getProviderTtsModelOptions("gemini").find(
        (option) => option.id === "gemini-2.5-flash-preview-tts",
      )?.name,
    ).toBe("Gemini 2.5 Flash Preview TTS");
    expect(getProviderTtsModelOptions("deepgram")).toEqual([
      { id: "aura-2", name: "Aura-2 Voice Family" },
      { id: "aura-1", name: "Aura-1 Voice Family" },
    ]);
    expect(getProviderTtsModelOptions("deepinfra")).toEqual([
      { id: "Qwen/Qwen3-TTS", name: "Qwen3-TTS" },
      { id: "Qwen/Qwen3-TTS-VoiceDesign", name: "Qwen3-TTS-VoiceDesign" },
      { id: "ResembleAI/chatterbox-turbo", name: "chatterbox-turbo" },
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
    expect(getProviderTtsModelOptions("fish-audio")).toEqual([
      { id: "s2-pro", name: "Fish Audio S2-Pro" },
      { id: "s1", name: "Fish Audio S1" },
      { id: "speech-1.6", name: "Fish Speech v1.6" },
      { id: "speech-1.5", name: "Fish Speech v1.5" },
    ]);
    expect(getProviderTtsModelOptions("groq")).toEqual([
      {
        id: "canopylabs/orpheus-v1-english",
        name: "Canopy Labs Orpheus V1 English",
      },
      {
        id: "canopylabs/orpheus-arabic-saudi",
        name: "Canopy Labs Orpheus Arabic Saudi",
      },
    ]);
    expect(getProviderTtsModelOptions("siliconflow")).toEqual([
      { id: "fishaudio/fish-speech-1.5", name: "Fish-Speech-1.5" },
      { id: "FunAudioLLM/CosyVoice2-0.5B", name: "CosyVoice2-0.5B" },
      { id: "IndexTeam/IndexTTS-2", name: "IndexTTS-2" },
    ]);
    expect(getProviderTtsModelOptions("stepfun")).toEqual([
      { id: "step-tts-2", name: "Step TTS 2" },
      { id: "step-tts-mini", name: "Step TTS Mini" },
      { id: "step-tts-vivid", name: "Step TTS Vivid" },
    ]);
    expect(getProviderTtsModelOptions("hyperbolic")).toEqual([
      { id: "Melo TTS", name: "Melo TTS" },
    ]);
    expect(getProviderTtsModelOptions("minimax")).toEqual([
      { id: "speech-2.8-hd", name: "MiniMax Speech 2.8 HD" },
      { id: "speech-2.8-turbo", name: "MiniMax Speech 2.8 Turbo" },
      { id: "speech-2.6-hd", name: "MiniMax Speech 2.6 HD" },
      { id: "speech-2.6-turbo", name: "MiniMax Speech 2.6 Turbo" },
      { id: "speech-02-hd", name: "MiniMax Speech 02 HD" },
      { id: "speech-02-turbo", name: "MiniMax Speech 02 Turbo" },
      { id: "speech-01-hd", name: "MiniMax Speech 01 HD" },
      { id: "speech-01-turbo", name: "MiniMax Speech 01 Turbo" },
    ]);
    expect(getProviderTtsModelOptions("novita-ai")).toEqual([
      { id: "minimax-speech-02-hd", name: "MiniMax Speech-02 HD" },
      { id: "minimax-speech-02-turbo", name: "MiniMax Speech-02 Turbo" },
      { id: "minimax-speech-2.6-hd", name: "MiniMax Speech-2.6 HD" },
      { id: "minimax-speech-2.6-turbo", name: "MiniMax Speech-2.6 Turbo" },
      { id: "minimax-speech-2.8-hd", name: "MiniMax Speech 2.8 HD" },
      { id: "glm-tts", name: "GLM Text to Speech" },
      { id: "txt2speech", name: "Legacy Text to Speech" },
    ]);
    expect(getProviderTtsModelOptions("baidu-ernie-qianfan")).toEqual([
      { id: "短文本语音合成", name: "Short Text Speech Synthesis" },
    ]);
    expect(getProviderTtsModelOptions("z-ai-zhipu-ai")).toEqual([
      { id: "glm-tts", name: "GLM-TTS" },
    ]);
    expect(getProviderTtsModelOptions("bytedance-doubao-seed")).toEqual([]);
    expect(getProviderTtsModelOptions("xiaomi-mimo")).toEqual([
      { id: "mimo-v2-tts", name: "MiMo-V2-TTS" },
    ]);
    expect(getProviderSttModelOptions("nvidia")).toEqual([]);
    expect(getProviderTtsModelOptions("nvidia")).toEqual([]);
    expect(getProviderTtsModelOptions("together")).toEqual([
      { id: "canopylabs/orpheus-3b-0.1-ft", name: "Orpheus 3B" },
      { id: "hexgrad/Kokoro-82M", name: "Kokoro" },
    ]);
  });

  it("keeps xAI TTS aligned to the canonical catalog service id", () => {
    expect(getProviderTtsModelOptions("xai")).toEqual([
      { id: "text-to-speech", name: "Text to Speech API" },
    ]);
    expect(PROVIDER_DEFAULT_TTS_MODELS.xai).toBe("text-to-speech");
    expect(getTtsModelLabel("xai", "text-to-speech")).toBe("Text to Speech API");
  });

  it("surfaces the expanded Deepgram multilingual voice labels", () => {
    expect(getTtsVoiceLabel("deepgram", "aura-2-viktoria-de", "en")).toBe(
      "Aura 2 · Viktoria",
    );
    expect(getTtsVoiceLabel("deepgram", "aura-2-marcel-fr", "en")).toBe(
      "Aura 2 · Marcel",
    );
  });
});

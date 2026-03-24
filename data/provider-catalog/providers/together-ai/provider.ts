import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition({
  providerId: "together-ai",
  providerName: "Together AI",
  categoryName: "Inference Platforms",
  hq: "US",
  verifiedSupport: {
    llm: "native",
    stt: "native",
    tts: "native",
  },
  officialSources: [
    "https://docs.together.ai/docs/serverless-models",
    "https://docs.together.ai/reference/audio-speech",
    "https://docs.together.ai/reference/audio-transcriptions",
  ],
  integration: {
    catalogType: "Dynamic hosting platform",
    coverage: "Dynamic/non-exhaustive",
    hasDynamicCatalog: true,
    needsLiveDiscovery: true,
    supportsSpeech: true,
    lowConfidence: false,
    openAiCompatible: true,
    protocols: [],
    regionSplitRecommended: false,
  },
  summaries: {
    activeModels: {
      llm: "Serverless model catalog [dynamic] — 100+ open-source/partner models; use live serverless catalog",
      tts: "Orpheus 3B 0.1 FT [canopylabs/orpheus-3b-0.1-ft]\nKokoro 82M [hexgrad/Kokoro-82M]\nCartesia Sonic 3 [cartesia/sonic-3]\nCartesia Sonic 2 [cartesia/sonic-2]\nCartesia Sonic [cartesia/sonic]",
      stt: "Whisper Large v3 [openai/whisper-large-v3]\nParakeet TDT 0.6B v3 [nvidia/parakeet-tdt-0.6b-v3]",
    },
    pricing:
      "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    limits:
      "Dynamic catalog and prices change often. Validate per-model concurrency and context windows at runtime.",
    region:
      "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    sttLanguages:
      "Depends on model (e.g., Whisper multilingual, Parakeet family).",
    ttsLanguages: "Depends on model (e.g., Kokoro vs Cartesia).",
    freeTier:
      "Free/test access may be available depending on account plan; not uniform across all models.",
    integrationNotes:
      "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
  },
});

export const providerContext = createProviderContext(providerDefinition);

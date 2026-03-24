import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition({
  providerId: "z-ai-zhipu-ai",
  providerName: "Z.ai / Zhipu AI",
  categoryName: "Chinese Providers",
  hq: "CN",
  verifiedSupport: {
    llm: "native",
    stt: "native",
    tts: "unsupported",
  },
  officialSources: [
    "https://docs.z.ai/",
    "https://docs.bigmodel.cn/",
    "https://z.ai/",
  ],
  integration: {
    catalogType: "Fixed first-party LLM + STT catalog",
    coverage: "Mostly exhaustive",
    hasDynamicCatalog: false,
    needsLiveDiscovery: false,
    supportsSpeech: true,
    lowConfidence: false,
    openAiCompatible: null,
    protocols: [],
    regionSplitRecommended: false,
  },
  summaries: {
    activeModels: {
      llm: "GLM-5 [glm-5]\nGLM-5 Turbo [glm-5-turbo]\nGLM-5 Code [glm-5-code]\nGLM-4.7 [glm-4.7]\nGLM-4.7 FlashX [glm-4.7-flashx]\nGLM-4.6 [glm-4.6]\nGLM-4.5 [glm-4.5]\nGLM-4.5-X [glm-4.5-x]\nGLM-4.5 Air [glm-4.5-air]\nGLM-4.5 AirX [glm-4.5-airx]\nGLM-4.6V [glm-4.6v]\nGLM-OCR [glm-ocr]",
      tts: null,
      stt: "GLM-ASR-2512 [glm-asr-2512]",
    },
    pricing:
      "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    limits:
      "Many current GLM models support up to ~200K context, with some air tiers at ~128K. Native public TTS was not verified in official docs.",
    region: "Z.ai/Zhipu cloud; public region details are limited.",
    sttLanguages: "Multilingual realtime streaming ASR.",
    ttsLanguages: null,
    freeTier:
      "Often yes via starter credits or temporary offers, but not guaranteed across regions.",
    integrationNotes:
      "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
  },
});

export const providerContext = createProviderContext(providerDefinition);

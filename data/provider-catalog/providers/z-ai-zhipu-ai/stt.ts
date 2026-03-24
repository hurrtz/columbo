import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt({
    providerId: "z-ai-zhipu-ai",
    providerName: "Z.ai / Zhipu AI",
    service: "stt",
    modelId: "glm-asr-2512",
    publicName: "GLM-ASR-2512",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    limitsSummary:
      "Many current GLM models support up to ~200K context, with some air tiers at ~128K. Native public TTS was not verified in official docs.",
    regionSummary: "Z.ai/Zhipu cloud; public region details are limited.",
    languagesSummary: "Multilingual realtime streaming ASR.",
    notes:
      "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    officialSources: [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/",
    ],
    openAiCompatible: null,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 0.0024,
        unit: "minute",
        sourceText: "$0.0024/min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "Multilingual realtime streaming ASR.",
      isMultilingual: true,
      languageCount: null,
      voiceCount: null,
      listedLanguages: [],
      notes: [],
    },
  }),
]);

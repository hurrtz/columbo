import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts({
    providerId: "xai",
    providerName: "xAI",
    service: "tts",
    modelId: "voice-agent",
    publicName: "Voice Agent API",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: "20 languages.",
    notes: "Session-based voice stack",
    officialSources: [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models",
    ],
    openAiCompatible: true,
    supportsRealtime: true,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.2,
        unit: "million_characters",
        sourceText: "$4.20/M chars",
      },
      {
        amountUsd: 0.05,
        unit: "minute",
        sourceText: "$0.05/min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "20 languages.",
      isMultilingual: true,
      languageCount: 20,
      voiceCount: null,
      listedLanguages: [],
      notes: [],
    },
  }),
  providerContext.tts({
    providerId: "xai",
    providerName: "xAI",
    service: "tts",
    modelId: "voice-based",
    publicName: "xAI TTS API",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: "20 languages.",
    notes:
      "Public docs expose TTS voices rather than multiple named TTS model IDs",
    officialSources: [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models",
    ],
    openAiCompatible: true,
    supportsRealtime: true,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.2,
        unit: "million_characters",
        sourceText: "$4.20/M chars",
      },
      {
        amountUsd: 0.05,
        unit: "minute",
        sourceText: "$0.05/min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "20 languages.",
      isMultilingual: true,
      languageCount: 20,
      voiceCount: null,
      listedLanguages: [],
      notes: [],
    },
  }),
]);

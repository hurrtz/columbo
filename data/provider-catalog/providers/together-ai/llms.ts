import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm({
    providerId: "together-ai",
    providerName: "Together AI",
    service: "llm",
    modelId: "dynamic",
    publicName: "Serverless model catalog",
    status: "Documented active/current",
    catalogScope: "Dynamic/non-exhaustive",
    pricingSummary:
      "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    limitsSummary: null,
    regionSummary:
      "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    languagesSummary: null,
    notes: "100+ open-source/partner models; use live serverless catalog",
    officialSources: [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions",
    ],
    openAiCompatible: true,
    supportsRealtime: null,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.0,
        unit: "million_characters",
        sourceText: "$4/M chars",
      },
      {
        amountUsd: 65.0,
        unit: "million_characters",
        sourceText: "$65/M chars",
      },
      {
        amountUsd: 0.0015,
        unit: "minute",
        sourceText: "$0.0015/audio min",
      },
    ],
    constraints: [],
    languageSupport: null,
  }),
]);

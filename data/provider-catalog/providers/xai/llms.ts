import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm({
    providerId: "xai",
    providerName: "xAI",
    service: "llm",
    modelId: "grok-4-0709",
    publicName: "Grok 4 0709",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: null,
    notes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
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
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "xai",
    providerName: "xAI",
    service: "llm",
    modelId: "grok-4-fast",
    publicName: "Grok 4 Fast",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: null,
    notes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
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
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "xai",
    providerName: "xAI",
    service: "llm",
    modelId: "grok-4-fast-non-reasoning",
    publicName: "Grok 4 Fast Non-Reasoning",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: null,
    notes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
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
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "xai",
    providerName: "xAI",
    service: "llm",
    modelId: "grok-4-1-fast",
    publicName: "Grok 4.1 Fast",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: null,
    notes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
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
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "xai",
    providerName: "xAI",
    service: "llm",
    modelId: "grok-4-1-fast-non-reasoning",
    publicName: "Grok 4.1 Fast Non-Reasoning",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: null,
    notes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
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
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "xai",
    providerName: "xAI",
    service: "llm",
    modelId: "grok-4.20",
    publicName: "Grok 4.20",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: null,
    notes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
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
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "xai",
    providerName: "xAI",
    service: "llm",
    modelId: "grok-code-fast-1",
    publicName: "Grok Code Fast 1",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limitsSummary: null,
    regionSummary:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    languagesSummary: null,
    notes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
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
    languageSupport: null,
  }),
]);

import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "aya-expanse-32b",
    publicName: "Aya Expanse 32B",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "aya-expanse-8b",
    publicName: "Aya Expanse 8B",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "aya-vision",
    publicName: "Aya Vision",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command",
    publicName: "Command",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command-a",
    publicName: "Command A",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes: "Exact dated aliases may vary",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
    aliases: ["command-a-03-2025"],
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command-a-reasoning",
    publicName: "Command A Reasoning",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
    aliases: ["command-a-reasoning-08-2025"],
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command-a-translate",
    publicName: "Command A Translate",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command-a-vision",
    publicName: "Command A Vision",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
    aliases: ["command-a-vision-07-2025"],
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command-r",
    publicName: "Command R",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
    aliases: ["command-r-08-2024"],
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command-r-plus",
    publicName: "Command R+",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
    aliases: ["command-r-plus-08-2024"],
  }),
  providerContext.llm({
    providerId: "cohere",
    providerName: "Cohere",
    service: "llm",
    modelId: "command-r7b",
    publicName: "Command R7B",
    status: "Documented active/current",
    catalogScope: "Mostly exhaustive",
    pricingSummary:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limitsSummary: null,
    regionSummary:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    languagesSummary: null,
    notes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    officialSources: [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/",
    ],
    openAiCompatible: false,
    supportsRealtime: true,
    supportsBatch: null,
    priceMeasurements: [
      {
        amountUsd: 1.0,
        unit: "million_input_tokens",
        sourceText: "$1/M input, $2/M output",
      },
      {
        amountUsd: 2.0,
        unit: "million_output_tokens",
        sourceText: "$1/M input, $2/M output",
      },
    ],
    constraints: [],
    languageSupport: null,
    aliases: ["command-r7b-12-2024"],
  }),
]);

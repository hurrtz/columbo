import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "moonshot-ai-kimi",
  "providerName": "Moonshot AI (Kimi)",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://platform.moonshot.ai/",
    "https://platform.moonshot.ai/docs",
    "https://platform.moonshot.ai/pricing"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": false,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Kimi K2.5 [kimi-k2.5]\nKimi K2 0905 Preview [kimi-k2-0905-preview]\nKimi K2 Turbo Preview [kimi-k2-turbo-preview]\nKimi K2 0711 Preview [kimi-k2-0711-preview]\nKimi K2 Thinking [kimi-k2-thinking]",
      "tts": null,
      "stt": null
    },
    "pricing": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
    "limits": "256K context on K2.5. No native public TTS/STT API verified.",
    "region": "Moonshot cloud; public region specifics not prominent.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "No permanent free tier; platform often requires recharge (e.g., minimum initial top-up).",
    "integrationNotes": "Good reasoning/text provider, but no native speech stack."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "moonshot-ai-kimi",
    "providerName": "Moonshot AI (Kimi)",
    "service": "llm",
    "modelId": "kimi-k2-0711-preview",
    "publicName": "Kimi K2 0711 Preview",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
    "limitsSummary": null,
    "regionSummary": "Moonshot cloud; public region specifics not prominent.",
    "languagesSummary": null,
    "notes": "Good reasoning/text provider, but no native speech stack.",
    "officialSources": [
      "https://platform.moonshot.ai/",
      "https://platform.moonshot.ai/docs",
      "https://platform.moonshot.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.1,
        "unit": "million_input_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      },
      {
        "amountUsd": 0.6,
        "unit": "million_output_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "moonshot-ai-kimi",
    "providerName": "Moonshot AI (Kimi)",
    "service": "llm",
    "modelId": "kimi-k2-0905-preview",
    "publicName": "Kimi K2 0905 Preview",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
    "limitsSummary": null,
    "regionSummary": "Moonshot cloud; public region specifics not prominent.",
    "languagesSummary": null,
    "notes": "Good reasoning/text provider, but no native speech stack.",
    "officialSources": [
      "https://platform.moonshot.ai/",
      "https://platform.moonshot.ai/docs",
      "https://platform.moonshot.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.1,
        "unit": "million_input_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      },
      {
        "amountUsd": 0.6,
        "unit": "million_output_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "moonshot-ai-kimi",
    "providerName": "Moonshot AI (Kimi)",
    "service": "llm",
    "modelId": "kimi-k2-thinking",
    "publicName": "Kimi K2 Thinking",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
    "limitsSummary": null,
    "regionSummary": "Moonshot cloud; public region specifics not prominent.",
    "languagesSummary": null,
    "notes": "Good reasoning/text provider, but no native speech stack.",
    "officialSources": [
      "https://platform.moonshot.ai/",
      "https://platform.moonshot.ai/docs",
      "https://platform.moonshot.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.1,
        "unit": "million_input_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      },
      {
        "amountUsd": 0.6,
        "unit": "million_output_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "moonshot-ai-kimi",
    "providerName": "Moonshot AI (Kimi)",
    "service": "llm",
    "modelId": "kimi-k2-turbo-preview",
    "publicName": "Kimi K2 Turbo Preview",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
    "limitsSummary": null,
    "regionSummary": "Moonshot cloud; public region specifics not prominent.",
    "languagesSummary": null,
    "notes": "Good reasoning/text provider, but no native speech stack.",
    "officialSources": [
      "https://platform.moonshot.ai/",
      "https://platform.moonshot.ai/docs",
      "https://platform.moonshot.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.1,
        "unit": "million_input_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      },
      {
        "amountUsd": 0.6,
        "unit": "million_output_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "moonshot-ai-kimi",
    "providerName": "Moonshot AI (Kimi)",
    "service": "llm",
    "modelId": "kimi-k2.5",
    "publicName": "Kimi K2.5",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
    "limitsSummary": null,
    "regionSummary": "Moonshot cloud; public region specifics not prominent.",
    "languagesSummary": null,
    "notes": "Good reasoning/text provider, but no native speech stack.",
    "officialSources": [
      "https://platform.moonshot.ai/",
      "https://platform.moonshot.ai/docs",
      "https://platform.moonshot.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.1,
        "unit": "million_input_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      },
      {
        "amountUsd": 0.6,
        "unit": "million_output_tokens",
        "sourceText": "$0.10/M, input $0.60/M, output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

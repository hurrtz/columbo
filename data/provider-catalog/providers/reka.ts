import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "reka",
  "providerName": "Reka",
  "categoryName": "Major Western Providers",
  "hq": "US/UK",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://www.reka.ai/",
    "https://www.reka.ai/pricing",
    "https://docs.reka.ai/"
  ],
  "integration": {
    "catalogType": "Fixed first-party multimodal LLM catalog",
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
      "llm": "Reka Core [reka-core]\nReka Flash [reka-flash]\nReka Edge [reka-edge]",
      "tts": null,
      "stt": null
    },
    "pricing": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
    "limits": "Multimodal/audio input exists, but no dedicated public TTS or STT output API was verified.",
    "region": "Reka-hosted cloud; public region details are limited.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "Not clearly documented as permanent free tier.",
    "integrationNotes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "reka",
    "providerName": "Reka",
    "service": "llm",
    "modelId": "reka-core",
    "publicName": "Reka Core",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
    "limitsSummary": null,
    "regionSummary": "Reka-hosted cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider.",
    "officialSources": [
      "https://www.reka.ai/",
      "https://www.reka.ai/pricing",
      "https://docs.reka.ai/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.8,
        "unit": "million_input_tokens",
        "sourceText": "$0.80/M input and $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$0.80/M input and $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "reka",
    "providerName": "Reka",
    "service": "llm",
    "modelId": "reka-edge",
    "publicName": "Reka Edge",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
    "limitsSummary": null,
    "regionSummary": "Reka-hosted cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider.",
    "officialSources": [
      "https://www.reka.ai/",
      "https://www.reka.ai/pricing",
      "https://docs.reka.ai/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.8,
        "unit": "million_input_tokens",
        "sourceText": "$0.80/M input and $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$0.80/M input and $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "reka",
    "providerName": "Reka",
    "service": "llm",
    "modelId": "reka-flash",
    "publicName": "Reka Flash",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
    "limitsSummary": null,
    "regionSummary": "Reka-hosted cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider.",
    "officialSources": [
      "https://www.reka.ai/",
      "https://www.reka.ai/pricing",
      "https://docs.reka.ai/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.8,
        "unit": "million_input_tokens",
        "sourceText": "$0.80/M input and $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$0.80/M input and $2/M output"
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

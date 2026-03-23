import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "cohere",
  "providerName": "Cohere",
  "categoryName": "Major Western Providers",
  "hq": "CA",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.cohere.com/docs/models",
    "https://cohere.com/pricing",
    "https://docs.cohere.com/"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": false,
    "lowConfidence": false,
    "openAiCompatible": false,
    "protocols": [],
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": "Command A [command-a] — Exact dated aliases may vary\nCommand A Translate [command-a-translate]\nCommand A Reasoning [command-a-reasoning]\nCommand A Vision [command-a-vision]\nCommand R7B [command-r7b]\nCommand R+ [command-r-plus]\nCommand R [command-r]\nCommand [command]\nAya Expanse 8B [aya-expanse-8b]\nAya Expanse 32B [aya-expanse-32b]\nAya Vision [aya-vision]",
      "tts": null,
      "stt": null
    },
    "pricing": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limits": "No public native TTS/STT. LLM quotas vary by plan and endpoint.",
    "region": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "Yes: trial API key available.",
    "integrationNotes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "aya-expanse-32b",
    "publicName": "Aya Expanse 32B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "aya-expanse-8b",
    "publicName": "Aya Expanse 8B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "aya-vision",
    "publicName": "Aya Vision",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command",
    "publicName": "Command",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command-a",
    "publicName": "Command A",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Exact dated aliases may vary",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "command-a-03-2025"
    ]
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command-a-reasoning",
    "publicName": "Command A Reasoning",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "command-a-reasoning-08-2025"
    ]
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command-a-translate",
    "publicName": "Command A Translate",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command-a-vision",
    "publicName": "Command A Vision",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "command-a-vision-07-2025"
    ]
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command-r",
    "publicName": "Command R",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "command-r-08-2024"
    ]
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command-r-plus",
    "publicName": "Command R+",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "command-r-plus-08-2024"
    ]
  },
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "service": "llm",
    "modelId": "command-r7b",
    "publicName": "Command R7B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    "limitsSummary": null,
    "regionSummary": "Cohere-hosted; sovereign/private deployments also available through partners.",
    "languagesSummary": null,
    "notes": "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input, $2/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input, $2/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "command-r7b-12-2024"
    ]
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

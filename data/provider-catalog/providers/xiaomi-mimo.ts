import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "xiaomi-mimo",
  "providerName": "Xiaomi (MiMo)",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "native"
  },
  "officialSources": [
    "https://mimo.xiaomi.com/",
    "https://mimo.xiaomi.com/mimo-v2-pro",
    "https://platform.xiaomimimo.com/"
  ],
  "integration": {
    "catalogType": "Fixed first-party multimodal catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": "MiMo-V2-Pro [mimo-v2-pro]\nMiMo-V2-Omni [mimo-v2-omni]\nMiMo-V2-Flash [mimo-v2-flash] — Open-weight / separate distribution also exists",
      "tts": "MiMo-V2-TTS [mimo-v2-tts]",
      "stt": null
    },
    "pricing": "MiMo-V2-Pro: up to 256K context $1/M input and $3/M output; 256K-1M context $2/M input and $6/M output. Flash family is much cheaper where offered.",
    "limits": "MiMo-V2-Pro supports up to 1M context. Public datacenter detail is not yet clear. No separate public STT API verified; Omni handles audio understanding inside multimodal flow.",
    "region": "Public platform launched in March 2026; exact region/data residency details not yet well documented.",
    "sttLanguages": null,
    "ttsLanguages": "Public marketing emphasizes speech + singing and expressive control; full language matrix should be validated live before launch.",
    "freeTier": "Launch promotions/free access were advertised for limited periods; not necessarily permanent.",
    "integrationNotes": "Your source sheet is outdated: Xiaomi now has public API models for LLM, omni multimodal, and TTS. STT is folded into Omni rather than a separate public STT product."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "xiaomi-mimo",
    "providerName": "Xiaomi (MiMo)",
    "service": "llm",
    "modelId": "mimo-v2-flash",
    "publicName": "MiMo-V2-Flash",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "MiMo-V2-Pro: up to 256K context $1/M input and $3/M output; 256K-1M context $2/M input and $6/M output. Flash family is much cheaper where offered.",
    "limitsSummary": null,
    "regionSummary": "Public platform launched in March 2026; exact region/data residency details not yet well documented.",
    "languagesSummary": null,
    "notes": "Open-weight / separate distribution also exists",
    "officialSources": [
      "https://mimo.xiaomi.com/",
      "https://mimo.xiaomi.com/mimo-v2-pro",
      "https://platform.xiaomimimo.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 3.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_input_tokens",
        "sourceText": "$2/M input and $6/M output"
      },
      {
        "amountUsd": 6.0,
        "unit": "million_output_tokens",
        "sourceText": "$2/M input and $6/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xiaomi-mimo",
    "providerName": "Xiaomi (MiMo)",
    "service": "llm",
    "modelId": "mimo-v2-omni",
    "publicName": "MiMo-V2-Omni",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "MiMo-V2-Pro: up to 256K context $1/M input and $3/M output; 256K-1M context $2/M input and $6/M output. Flash family is much cheaper where offered.",
    "limitsSummary": null,
    "regionSummary": "Public platform launched in March 2026; exact region/data residency details not yet well documented.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated: Xiaomi now has public API models for LLM, omni multimodal, and TTS. STT is folded into Omni rather than a separate public STT product.",
    "officialSources": [
      "https://mimo.xiaomi.com/",
      "https://mimo.xiaomi.com/mimo-v2-pro",
      "https://platform.xiaomimimo.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 3.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_input_tokens",
        "sourceText": "$2/M input and $6/M output"
      },
      {
        "amountUsd": 6.0,
        "unit": "million_output_tokens",
        "sourceText": "$2/M input and $6/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xiaomi-mimo",
    "providerName": "Xiaomi (MiMo)",
    "service": "llm",
    "modelId": "mimo-v2-pro",
    "publicName": "MiMo-V2-Pro",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "MiMo-V2-Pro: up to 256K context $1/M input and $3/M output; 256K-1M context $2/M input and $6/M output. Flash family is much cheaper where offered.",
    "limitsSummary": null,
    "regionSummary": "Public platform launched in March 2026; exact region/data residency details not yet well documented.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated: Xiaomi now has public API models for LLM, omni multimodal, and TTS. STT is folded into Omni rather than a separate public STT product.",
    "officialSources": [
      "https://mimo.xiaomi.com/",
      "https://mimo.xiaomi.com/mimo-v2-pro",
      "https://platform.xiaomimimo.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 3.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_input_tokens",
        "sourceText": "$2/M input and $6/M output"
      },
      {
        "amountUsd": 6.0,
        "unit": "million_output_tokens",
        "sourceText": "$2/M input and $6/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "xiaomi-mimo",
    "providerName": "Xiaomi (MiMo)",
    "service": "tts",
    "modelId": "mimo-v2-tts",
    "publicName": "MiMo-V2-TTS",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "MiMo-V2-Pro: up to 256K context $1/M input and $3/M output; 256K-1M context $2/M input and $6/M output. Flash family is much cheaper where offered.",
    "limitsSummary": null,
    "regionSummary": "Public platform launched in March 2026; exact region/data residency details not yet well documented.",
    "languagesSummary": "Public marketing emphasizes speech + singing and expressive control; full language matrix should be validated live before launch.",
    "notes": "Your source sheet is outdated: Xiaomi now has public API models for LLM, omni multimodal, and TTS. STT is folded into Omni rather than a separate public STT product.",
    "officialSources": [
      "https://mimo.xiaomi.com/",
      "https://mimo.xiaomi.com/mimo-v2-pro",
      "https://platform.xiaomimimo.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 1.0,
        "unit": "million_input_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 3.0,
        "unit": "million_output_tokens",
        "sourceText": "$1/M input and $3/M output"
      },
      {
        "amountUsd": 2.0,
        "unit": "million_input_tokens",
        "sourceText": "$2/M input and $6/M output"
      },
      {
        "amountUsd": 6.0,
        "unit": "million_output_tokens",
        "sourceText": "$2/M input and $6/M output"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Public marketing emphasizes speech + singing and expressive control; full language matrix should be validated live before launch.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

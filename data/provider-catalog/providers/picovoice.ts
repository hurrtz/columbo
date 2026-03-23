import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "picovoice",
  "providerName": "Picovoice",
  "categoryName": "Speech-Focused Providers",
  "hq": "CA",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://picovoice.ai/docs/",
    "https://picovoice.ai/platform/",
    "https://picovoice.ai/pricing/"
  ],
  "integration": {
    "catalogType": "On-device / edge catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "picoLLM [picollm]",
      "tts": "Orca [orca]",
      "stt": "Cheetah [cheetah]\nCheetah Fast [cheetah-fast]\nLeopard [leopard]"
    },
    "pricing": "On-device SDK pricing/plans vary by product and deployment.",
    "limits": "Offline/edge deployment; device constraints matter more than cloud file-size quotas. Language coverage is narrower than cloud hyperscalers.",
    "region": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
    "sttLanguages": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
    "ttsLanguages": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish.",
    "freeTier": "Evaluation/free developer access exists for many SDKs.",
    "integrationNotes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "picovoice",
    "providerName": "Picovoice",
    "service": "llm",
    "modelId": "picollm",
    "publicName": "picoLLM",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "On-device SDK pricing/plans vary by product and deployment.",
    "limitsSummary": null,
    "regionSummary": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
    "languagesSummary": null,
    "notes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters.",
    "officialSources": [
      "https://picovoice.ai/docs/",
      "https://picovoice.ai/platform/",
      "https://picovoice.ai/pricing/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "picovoice",
    "providerName": "Picovoice",
    "service": "stt",
    "modelId": "cheetah",
    "publicName": "Cheetah",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "On-device SDK pricing/plans vary by product and deployment.",
    "limitsSummary": "Offline/edge deployment; device constraints matter more than cloud file-size quotas. Language coverage is narrower than cloud hyperscalers.",
    "regionSummary": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
    "languagesSummary": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
    "notes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters.",
    "officialSources": [
      "https://picovoice.ai/docs/",
      "https://picovoice.ai/platform/",
      "https://picovoice.ai/pricing/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Cheetah/Cheetah Fast languages include English",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Spanish"
      ],
      "notes": []
    }
  },
  {
    "providerId": "picovoice",
    "providerName": "Picovoice",
    "service": "stt",
    "modelId": "cheetah-fast",
    "publicName": "Cheetah Fast",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "On-device SDK pricing/plans vary by product and deployment.",
    "limitsSummary": "Offline/edge deployment; device constraints matter more than cloud file-size quotas. Language coverage is narrower than cloud hyperscalers.",
    "regionSummary": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
    "languagesSummary": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
    "notes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters.",
    "officialSources": [
      "https://picovoice.ai/docs/",
      "https://picovoice.ai/platform/",
      "https://picovoice.ai/pricing/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Cheetah/Cheetah Fast languages include English",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Spanish"
      ],
      "notes": []
    }
  },
  {
    "providerId": "picovoice",
    "providerName": "Picovoice",
    "service": "stt",
    "modelId": "leopard",
    "publicName": "Leopard",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "On-device SDK pricing/plans vary by product and deployment.",
    "limitsSummary": "Offline/edge deployment; device constraints matter more than cloud file-size quotas. Language coverage is narrower than cloud hyperscalers.",
    "regionSummary": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
    "languagesSummary": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
    "notes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters.",
    "officialSources": [
      "https://picovoice.ai/docs/",
      "https://picovoice.ai/platform/",
      "https://picovoice.ai/pricing/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Cheetah/Cheetah Fast languages include English",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Spanish"
      ],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "picovoice",
    "providerName": "Picovoice",
    "service": "tts",
    "modelId": "orca",
    "publicName": "Orca",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "On-device SDK pricing/plans vary by product and deployment.",
    "limitsSummary": null,
    "regionSummary": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
    "languagesSummary": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish.",
    "notes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters.",
    "officialSources": [
      "https://picovoice.ai/docs/",
      "https://picovoice.ai/platform/",
      "https://picovoice.ai/pricing/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "English",
        "French",
        "German",
        "Italian",
        "Japanese",
        "Korean",
        "Portuguese",
        "Spanish"
      ],
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

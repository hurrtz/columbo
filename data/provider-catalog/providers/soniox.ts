import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "soniox",
  "providerName": "Soniox",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://soniox.com/docs/api-reference",
    "https://soniox.com/pricing",
    "https://soniox.com/"
  ],
  "integration": {
    "catalogType": "Speech-first STT catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "websocket"
    ],
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": null,
      "tts": null,
      "stt": "Soniox v4 Async [v4-async]\nSoniox v4 Real-Time [v4-realtime]"
    },
    "pricing": "About $0.10/hour async and $0.12/hour realtime from official pricing references.",
    "limits": "API free credits were discontinued in late 2025. Mixed-language support, speaker detection, and translation are included. Audio is not stored.",
    "region": "Global API with in-region processing / sovereign cloud options.",
    "sttLanguages": "60+ languages with mixed-language support.",
    "ttsLanguages": null,
    "freeTier": "No general API free credits now (consumer app has separate free credits).",
    "integrationNotes": "Very attractive pricing for STT. Model picker should distinguish API vs non-API free offerings so users do not assume API is free."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "soniox",
    "providerName": "Soniox",
    "service": "stt",
    "modelId": "v4-async",
    "publicName": "Soniox v4 Async",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "About $0.10/hour async and $0.12/hour realtime from official pricing references.",
    "limitsSummary": "API free credits were discontinued in late 2025. Mixed-language support, speaker detection, and translation are included. Audio is not stored.",
    "regionSummary": "Global API with in-region processing / sovereign cloud options.",
    "languagesSummary": "60+ languages with mixed-language support.",
    "notes": "Very attractive pricing for STT. Model picker should distinguish API vs non-API free offerings so users do not assume API is free.",
    "officialSources": [
      "https://soniox.com/docs/api-reference",
      "https://soniox.com/pricing",
      "https://soniox.com/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 0.1,
        "unit": "hour",
        "sourceText": "$0.10/hour"
      },
      {
        "amountUsd": 0.12,
        "unit": "hour",
        "sourceText": "$0.12/hour"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "60+ languages with mixed-language support.",
      "isMultilingual": true,
      "languageCount": 60,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "soniox",
    "providerName": "Soniox",
    "service": "stt",
    "modelId": "v4-realtime",
    "publicName": "Soniox v4 Real-Time",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "About $0.10/hour async and $0.12/hour realtime from official pricing references.",
    "limitsSummary": "API free credits were discontinued in late 2025. Mixed-language support, speaker detection, and translation are included. Audio is not stored.",
    "regionSummary": "Global API with in-region processing / sovereign cloud options.",
    "languagesSummary": "60+ languages with mixed-language support.",
    "notes": "Very attractive pricing for STT. Model picker should distinguish API vs non-API free offerings so users do not assume API is free.",
    "officialSources": [
      "https://soniox.com/docs/api-reference",
      "https://soniox.com/pricing",
      "https://soniox.com/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 0.1,
        "unit": "hour",
        "sourceText": "$0.10/hour"
      },
      {
        "amountUsd": 0.12,
        "unit": "hour",
        "sourceText": "$0.12/hour"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "60+ languages with mixed-language support.",
      "isMultilingual": true,
      "languageCount": 60,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

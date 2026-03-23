import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "bytedance-doubao-seed",
  "providerName": "ByteDance (Doubao/Seed)",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://www.volcengine.com/",
    "https://www.volcengine.com/product/doubao",
    "https://www.volcengine.com/product/voice-tech"
  ],
  "integration": {
    "catalogType": "Multi-service platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Doubao model family [doubao-*]\nSeed model family [seed-*]\nEnd-to-end realtime speech model [e2e-realtime] — Integrated voice stack",
      "tts": "Volcano Engine Voice Tech TTS [voice-tech-tts]\nSeed TTS family [seed-tts]",
      "stt": "Streaming Speech Recognition API [streaming-stt]\nRecording File Recognition [file-stt]"
    },
    "pricing": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limits": "Volcano Engine splits capability across LLM, voice-tech, and realtime speech APIs. Exact model IDs are less uniform than western API catalogs.",
    "region": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "sttLanguages": "ASR available via Volcano Engine, including streaming and integrated end-to-end voice modes.",
    "ttsLanguages": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
    "freeTier": "Trial quotas sometimes available; depends on account/program.",
    "integrationNotes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "service": "llm",
    "modelId": "doubao-*",
    "publicName": "Doubao model family",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limitsSummary": null,
    "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "languagesSummary": null,
    "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "service": "llm",
    "modelId": "e2e-realtime",
    "publicName": "End-to-end realtime speech model",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limitsSummary": null,
    "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "languagesSummary": null,
    "notes": "Integrated voice stack",
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "service": "llm",
    "modelId": "seed-*",
    "publicName": "Seed model family",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limitsSummary": null,
    "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "languagesSummary": null,
    "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "service": "stt",
    "modelId": "file-stt",
    "publicName": "Recording File Recognition",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limitsSummary": "Volcano Engine splits capability across LLM, voice-tech, and realtime speech APIs. Exact model IDs are less uniform than western API catalogs.",
    "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "languagesSummary": "ASR available via Volcano Engine, including streaming and integrated end-to-end voice modes.",
    "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "ASR available via Volcano Engine, including streaming and integrated end-to-end voice modes.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "ASR available via Volcano Engine",
        "including streaming",
        "integrated end-to-end voice modes"
      ],
      "notes": []
    }
  },
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "service": "stt",
    "modelId": "streaming-stt",
    "publicName": "Streaming Speech Recognition API",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limitsSummary": "Volcano Engine splits capability across LLM, voice-tech, and realtime speech APIs. Exact model IDs are less uniform than western API catalogs.",
    "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "languagesSummary": "ASR available via Volcano Engine, including streaming and integrated end-to-end voice modes.",
    "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "ASR available via Volcano Engine, including streaming and integrated end-to-end voice modes.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "ASR available via Volcano Engine",
        "including streaming",
        "integrated end-to-end voice modes"
      ],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "service": "tts",
    "modelId": "seed-tts",
    "publicName": "Seed TTS family",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limitsSummary": null,
    "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "languagesSummary": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
    "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Broad speech/TTS offering",
        "especially for Chinese; multilingual availability exists but is product-specific"
      ],
      "notes": []
    }
  },
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "service": "tts",
    "modelId": "voice-tech-tts",
    "publicName": "Volcano Engine Voice Tech TTS",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
    "limitsSummary": null,
    "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
    "languagesSummary": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
    "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Broad speech/TTS offering",
        "especially for Chinese; multilingual availability exists but is product-specific"
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

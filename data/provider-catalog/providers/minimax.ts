import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "minimax",
  "providerName": "MiniMax",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "native"
  },
  "officialSources": [
    "https://www.minimax.io/",
    "https://platform.minimax.io/",
    "https://platform.minimax.io/document"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM + TTS catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "MiniMax M2.7 [minimax-m2.7]\nMiniMax M2.7 Highspeed [minimax-m2.7-highspeed]\nMiniMax M2.5 Highspeed [minimax-m2.5-highspeed]",
      "tts": "Speech 2.8 HD [speech-2.8-hd]\nSpeech 2.8 Turbo [speech-2.8-turbo]\nSpeech 2.6 HD [speech-2.6-hd]\nSpeech 2.6 Turbo [speech-2.6-turbo]\nSpeech-02 HD [speech-02-hd]\nSpeech-02 Turbo [speech-02-turbo]\nSpeech-01 HD [speech-01-hd]\nSpeech-01 Turbo [speech-01-turbo]",
      "stt": null
    },
    "pricing": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limits": "TTS sync input <10,000 chars/request; streaming recommended for >3,000 chars. Standalone public STT API was not verified.",
    "region": "MiniMax cloud; public regional granularity is limited.",
    "sttLanguages": null,
    "ttsLanguages": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "freeTier": "Trial/credits may exist depending on plan; no simple universal free tier statement.",
    "integrationNotes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "llm",
    "modelId": "minimax-m2.5-highspeed",
    "publicName": "MiniMax M2.5 Highspeed",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": null,
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "llm",
    "modelId": "minimax-m2.7",
    "publicName": "MiniMax M2.7",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": null,
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "llm",
    "modelId": "minimax-m2.7-highspeed",
    "publicName": "MiniMax M2.7 Highspeed",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": null,
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-2.6-hd",
    "publicName": "Speech 2.6 HD",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-2.6-turbo",
    "publicName": "Speech 2.6 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-2.8-hd",
    "publicName": "Speech 2.8 HD",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-2.8-turbo",
    "publicName": "Speech 2.8 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-01-hd",
    "publicName": "Speech-01 HD",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-01-turbo",
    "publicName": "Speech-01 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-02-hd",
    "publicName": "Speech-02 HD",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "minimax",
    "providerName": "MiniMax",
    "service": "tts",
    "modelId": "speech-02-turbo",
    "publicName": "Speech-02 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
    "limitsSummary": null,
    "regionSummary": "MiniMax cloud; public regional granularity is limited.",
    "languagesSummary": "Speech-02 supports 32 languages; multilingual voice cloning available.",
    "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
    "officialSources": [
      "https://www.minimax.io/",
      "https://platform.minimax.io/",
      "https://platform.minimax.io/document"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Speech-02 supports 32 languages; multilingual voice cloning available.",
      "isMultilingual": true,
      "languageCount": 32,
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

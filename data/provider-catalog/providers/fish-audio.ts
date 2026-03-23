import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "fish-audio",
  "providerName": "Fish Audio",
  "categoryName": "Speech-Focused Providers",
  "hq": "CN/US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.fish.audio/",
    "https://fish.audio/",
    "https://docs.fish.audio/api-reference"
  ],
  "integration": {
    "catalogType": "Speech-first platform",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": null,
      "tts": "S2 Pro [s2-pro]\nS1 [s1]",
      "stt": "Fish Audio ASR [/v1/asr]"
    },
    "pricing": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
    "limits": "Voice/model creation and cloning supported. Community voice ecosystem is large.",
    "region": "Fish Audio cloud; region detail limited.",
    "sttLanguages": "Public ASR exists; exact official language matrix should be validated live.",
    "ttsLanguages": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
    "freeTier": "Trial/free usage may exist by account state.",
    "integrationNotes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "fish-audio",
    "providerName": "Fish Audio",
    "service": "stt",
    "modelId": "/v1/asr",
    "publicName": "Fish Audio ASR",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
    "limitsSummary": "Voice/model creation and cloning supported. Community voice ecosystem is large.",
    "regionSummary": "Fish Audio cloud; region detail limited.",
    "languagesSummary": "Public ASR exists; exact official language matrix should be validated live.",
    "notes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS.",
    "officialSources": [
      "https://docs.fish.audio/",
      "https://fish.audio/",
      "https://docs.fish.audio/api-reference"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 0.36,
        "unit": "hour",
        "sourceText": "$0.36/hour"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Public ASR exists; exact official language matrix should be validated live.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "fish-audio",
    "providerName": "Fish Audio",
    "service": "tts",
    "modelId": "s1",
    "publicName": "S1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
    "limitsSummary": null,
    "regionSummary": "Fish Audio cloud; region detail limited.",
    "languagesSummary": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
    "notes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS.",
    "officialSources": [
      "https://docs.fish.audio/",
      "https://fish.audio/",
      "https://docs.fish.audio/api-reference"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 0.36,
        "unit": "hour",
        "sourceText": "$0.36/hour"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
      "isMultilingual": true,
      "languageCount": 80,
      "voiceCount": null,
      "listedLanguages": [
        "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN",
        "ZH",
        "JA",
        "DE",
        "FR",
        "ES",
        "KO",
        "AR",
        "RU",
        "NL",
        "IT",
        "PL",
        "PT"
      ],
      "notes": []
    }
  },
  {
    "providerId": "fish-audio",
    "providerName": "Fish Audio",
    "service": "tts",
    "modelId": "s2-pro",
    "publicName": "S2 Pro",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
    "limitsSummary": null,
    "regionSummary": "Fish Audio cloud; region detail limited.",
    "languagesSummary": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
    "notes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS.",
    "officialSources": [
      "https://docs.fish.audio/",
      "https://fish.audio/",
      "https://docs.fish.audio/api-reference"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 0.36,
        "unit": "hour",
        "sourceText": "$0.36/hour"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
      "isMultilingual": true,
      "languageCount": 80,
      "voiceCount": null,
      "listedLanguages": [
        "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN",
        "ZH",
        "JA",
        "DE",
        "FR",
        "ES",
        "KO",
        "AR",
        "RU",
        "NL",
        "IT",
        "PL",
        "PT"
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

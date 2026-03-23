import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "inworld-ai",
  "providerName": "Inworld AI",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "routed",
    "stt": "routed",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.inworld.ai/",
    "https://docs.inworld.ai/tts",
    "https://inworld.ai/pricing"
  ],
  "integration": {
    "catalogType": "Realtime agent/router platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "rest",
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "LLM router / 220+ external models [dynamic] — Inworld routes to many third-party LLMs rather than only first-party LLMs",
      "tts": "Inworld TTS 1.5 Max [inworld-tts-1.5-max]\nInworld TTS 1.5 Mini [inworld-tts-1.5-mini]",
      "stt": "STT routing layer [dynamic] — Can route to Inworld experimental, Groq, AssemblyAI and others"
    },
    "pricing": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
    "limits": "100 RPS for TTS in docs. STT and LLM are exposed more as routed/runtime features than as simple fixed model catalogs.",
    "region": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
    "sttLanguages": "Depends on routed provider and experimental backend.",
    "ttsLanguages": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
    "freeTier": "Enterprise/trial access varies; not a broad simple free tier.",
    "integrationNotes": "Important nuance: Inworld is not just a TTS vendor. It is a realtime orchestration/runtime layer. Represent it differently from plain model providers in your app."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "inworld-ai",
    "providerName": "Inworld AI",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "LLM router / 220+ external models",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
    "limitsSummary": null,
    "regionSummary": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
    "languagesSummary": null,
    "notes": "Inworld routes to many third-party LLMs rather than only first-party LLMs",
    "officialSources": [
      "https://docs.inworld.ai/",
      "https://docs.inworld.ai/tts",
      "https://inworld.ai/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 5.0,
        "unit": "million_characters",
        "sourceText": "$5/M chars"
      },
      {
        "amountUsd": 10.0,
        "unit": "million_characters",
        "sourceText": "$10/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "inworld-ai",
    "providerName": "Inworld AI",
    "service": "stt",
    "modelId": "dynamic",
    "publicName": "STT routing layer",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
    "limitsSummary": "100 RPS for TTS in docs. STT and LLM are exposed more as routed/runtime features than as simple fixed model catalogs.",
    "regionSummary": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
    "languagesSummary": "Depends on routed provider and experimental backend.",
    "notes": "Can route to Inworld experimental, Groq, AssemblyAI and others",
    "officialSources": [
      "https://docs.inworld.ai/",
      "https://docs.inworld.ai/tts",
      "https://inworld.ai/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 5.0,
        "unit": "million_characters",
        "sourceText": "$5/M chars"
      },
      {
        "amountUsd": 10.0,
        "unit": "million_characters",
        "sourceText": "$10/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on routed provider and experimental backend.",
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
    "providerId": "inworld-ai",
    "providerName": "Inworld AI",
    "service": "tts",
    "modelId": "inworld-tts-1.5-max",
    "publicName": "Inworld TTS 1.5 Max",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
    "limitsSummary": null,
    "regionSummary": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
    "languagesSummary": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
    "notes": "Important nuance: Inworld is not just a TTS vendor. It is a realtime orchestration/runtime layer. Represent it differently from plain model providers in your app.",
    "officialSources": [
      "https://docs.inworld.ai/",
      "https://docs.inworld.ai/tts",
      "https://inworld.ai/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 5.0,
        "unit": "million_characters",
        "sourceText": "$5/M chars"
      },
      {
        "amountUsd": 10.0,
        "unit": "million_characters",
        "sourceText": "$10/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
      "isMultilingual": true,
      "languageCount": 15,
      "voiceCount": null,
      "listedLanguages": [
        "15 languages (en",
        "zh",
        "ja",
        "ko",
        "ru",
        "it",
        "es",
        "pt",
        "fr",
        "de",
        "pl",
        "nl",
        "hi",
        "he",
        "ar"
      ],
      "notes": []
    }
  },
  {
    "providerId": "inworld-ai",
    "providerName": "Inworld AI",
    "service": "tts",
    "modelId": "inworld-tts-1.5-mini",
    "publicName": "Inworld TTS 1.5 Mini",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
    "limitsSummary": null,
    "regionSummary": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
    "languagesSummary": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
    "notes": "Important nuance: Inworld is not just a TTS vendor. It is a realtime orchestration/runtime layer. Represent it differently from plain model providers in your app.",
    "officialSources": [
      "https://docs.inworld.ai/",
      "https://docs.inworld.ai/tts",
      "https://inworld.ai/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 5.0,
        "unit": "million_characters",
        "sourceText": "$5/M chars"
      },
      {
        "amountUsd": 10.0,
        "unit": "million_characters",
        "sourceText": "$10/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
      "isMultilingual": true,
      "languageCount": 15,
      "voiceCount": null,
      "listedLanguages": [
        "15 languages (en",
        "zh",
        "ja",
        "ko",
        "ru",
        "it",
        "es",
        "pt",
        "fr",
        "de",
        "pl",
        "nl",
        "hi",
        "he",
        "ar"
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

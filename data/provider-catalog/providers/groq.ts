import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "groq",
  "providerName": "Groq",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://console.groq.com/docs/models",
    "https://console.groq.com/docs/text-to-speech",
    "https://console.groq.com/docs/speech-to-text"
  ],
  "integration": {
    "catalogType": "Dynamic hosting platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": true,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Compound [groq/compound]\nCompound Mini [groq/compound-mini]\nHosted open models [dynamic] — Catalog changes frequently; includes Qwen, Kimi, OSS, etc.",
      "tts": "Orpheus v1 English [canopylabs/orpheus-v1-english]\nOrpheus Arabic Saudi [canopylabs/orpheus-arabic-saudi]",
      "stt": "Whisper Large v3 [whisper-large-v3]\nWhisper Large v3 Turbo [whisper-large-v3-turbo]"
    },
    "pricing": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limits": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec.",
    "region": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "sttLanguages": "Multilingual via Whisper family.",
    "ttsLanguages": "English; Arabic (Saudi) on currently documented Orpheus models.",
    "freeTier": "Yes.",
    "integrationNotes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "groq",
    "providerName": "Groq",
    "service": "llm",
    "modelId": "groq/compound",
    "publicName": "Compound",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limitsSummary": null,
    "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 22.0,
        "unit": "million_characters",
        "sourceText": "$22/M chars"
      },
      {
        "amountUsd": 40.0,
        "unit": "million_characters",
        "sourceText": "$40/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "groq",
    "providerName": "Groq",
    "service": "llm",
    "modelId": "groq/compound-mini",
    "publicName": "Compound Mini",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limitsSummary": null,
    "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 22.0,
        "unit": "million_characters",
        "sourceText": "$22/M chars"
      },
      {
        "amountUsd": 40.0,
        "unit": "million_characters",
        "sourceText": "$40/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "groq",
    "providerName": "Groq",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Hosted open models",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limitsSummary": null,
    "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Catalog changes frequently; includes Qwen, Kimi, OSS, etc.",
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 22.0,
        "unit": "million_characters",
        "sourceText": "$22/M chars"
      },
      {
        "amountUsd": 40.0,
        "unit": "million_characters",
        "sourceText": "$40/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "groq",
    "providerName": "Groq",
    "service": "stt",
    "modelId": "whisper-large-v3",
    "publicName": "Whisper Large v3",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limitsSummary": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec.",
    "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "languagesSummary": "Multilingual via Whisper family.",
    "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 22.0,
        "unit": "million_characters",
        "sourceText": "$22/M chars"
      },
      {
        "amountUsd": 40.0,
        "unit": "million_characters",
        "sourceText": "$40/M chars"
      }
    ],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "~",
        "value": 25000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec."
      },
      {
        "metric": "file_size_bytes",
        "comparator": "~",
        "value": 100000000.0,
        "unit": "bytes",
        "scope": "general",
        "sourceText": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec."
      }
    ],
    "languageSupport": {
      "rawText": "Multilingual via Whisper family.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "groq",
    "providerName": "Groq",
    "service": "stt",
    "modelId": "whisper-large-v3-turbo",
    "publicName": "Whisper Large v3 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limitsSummary": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec.",
    "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "languagesSummary": "Multilingual via Whisper family.",
    "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 22.0,
        "unit": "million_characters",
        "sourceText": "$22/M chars"
      },
      {
        "amountUsd": 40.0,
        "unit": "million_characters",
        "sourceText": "$40/M chars"
      }
    ],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "~",
        "value": 25000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec."
      },
      {
        "metric": "file_size_bytes",
        "comparator": "~",
        "value": 100000000.0,
        "unit": "bytes",
        "scope": "general",
        "sourceText": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec."
      }
    ],
    "languageSupport": {
      "rawText": "Multilingual via Whisper family.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "groq",
    "providerName": "Groq",
    "service": "tts",
    "modelId": "canopylabs/orpheus-arabic-saudi",
    "publicName": "Orpheus Arabic Saudi",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limitsSummary": null,
    "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "languagesSummary": "English; Arabic (Saudi) on currently documented Orpheus models.",
    "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 22.0,
        "unit": "million_characters",
        "sourceText": "$22/M chars"
      },
      {
        "amountUsd": 40.0,
        "unit": "million_characters",
        "sourceText": "$40/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "English; Arabic (Saudi) on currently documented Orpheus models.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "groq",
    "providerName": "Groq",
    "service": "tts",
    "modelId": "canopylabs/orpheus-v1-english",
    "publicName": "Orpheus v1 English",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
    "limitsSummary": null,
    "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
    "languagesSummary": "English; Arabic (Saudi) on currently documented Orpheus models.",
    "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 22.0,
        "unit": "million_characters",
        "sourceText": "$22/M chars"
      },
      {
        "amountUsd": 40.0,
        "unit": "million_characters",
        "sourceText": "$40/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "English; Arabic (Saudi) on currently documented Orpheus models.",
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

import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "replicate",
  "providerName": "Replicate",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://replicate.com/explore",
    "https://replicate.com/collections/text-to-speech",
    "https://replicate.com/collections/speech-to-text"
  ],
  "integration": {
    "catalogType": "Dynamic model marketplace",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": true,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": false,
    "protocols": [
      "rest",
      "sse"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "LLM marketplace [dynamic] — Thousands of models; use collections/search APIs",
      "tts": "MiniMax Speech 2.8 Turbo [minimax/speech-2.8-turbo]\nMiniMax Speech 2.8 HD [minimax/speech-2.8-hd]\nPlay Dialog [playht/play-dialog]\nChatterbox Turbo [resemble-ai/chatterbox-turbo]",
      "stt": "Whisper collection [openai/whisper-*]\nSTT marketplace [dynamic]"
    },
    "pricing": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limits": "Marketplace is huge and changes continuously. Model-level constraints come from each model page, not a unified global contract.",
    "region": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "sttLanguages": "Depends on chosen model.",
    "ttsLanguages": "Depends on chosen model.",
    "freeTier": "No broad permanent free tier; sometimes limited credits for onboarding.",
    "integrationNotes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "LLM marketplace",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limitsSummary": null,
    "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "languagesSummary": null,
    "notes": "Thousands of models; use collections/search APIs",
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 30.0,
        "unit": "million_characters",
        "sourceText": "$30/M chars"
      },
      {
        "amountUsd": 50.0,
        "unit": "million_characters",
        "sourceText": "$50/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "service": "stt",
    "modelId": "dynamic",
    "publicName": "STT marketplace",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limitsSummary": "Marketplace is huge and changes continuously. Model-level constraints come from each model page, not a unified global contract.",
    "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "languagesSummary": "Depends on chosen model.",
    "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 30.0,
        "unit": "million_characters",
        "sourceText": "$30/M chars"
      },
      {
        "amountUsd": 50.0,
        "unit": "million_characters",
        "sourceText": "$50/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen model.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "service": "stt",
    "modelId": "openai/whisper-*",
    "publicName": "Whisper collection",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limitsSummary": "Marketplace is huge and changes continuously. Model-level constraints come from each model page, not a unified global contract.",
    "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "languagesSummary": "Depends on chosen model.",
    "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 30.0,
        "unit": "million_characters",
        "sourceText": "$30/M chars"
      },
      {
        "amountUsd": 50.0,
        "unit": "million_characters",
        "sourceText": "$50/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen model.",
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
    "providerId": "replicate",
    "providerName": "Replicate",
    "service": "tts",
    "modelId": "resemble-ai/chatterbox-turbo",
    "publicName": "Chatterbox Turbo",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limitsSummary": null,
    "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "languagesSummary": "Depends on chosen model.",
    "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 30.0,
        "unit": "million_characters",
        "sourceText": "$30/M chars"
      },
      {
        "amountUsd": 50.0,
        "unit": "million_characters",
        "sourceText": "$50/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen model.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "service": "tts",
    "modelId": "minimax/speech-2.8-hd",
    "publicName": "MiniMax Speech 2.8 HD",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limitsSummary": null,
    "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "languagesSummary": "Depends on chosen model.",
    "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 30.0,
        "unit": "million_characters",
        "sourceText": "$30/M chars"
      },
      {
        "amountUsd": 50.0,
        "unit": "million_characters",
        "sourceText": "$50/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen model.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "service": "tts",
    "modelId": "minimax/speech-2.8-turbo",
    "publicName": "MiniMax Speech 2.8 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limitsSummary": null,
    "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "languagesSummary": "Depends on chosen model.",
    "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 30.0,
        "unit": "million_characters",
        "sourceText": "$30/M chars"
      },
      {
        "amountUsd": 50.0,
        "unit": "million_characters",
        "sourceText": "$50/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen model.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "service": "tts",
    "modelId": "playht/play-dialog",
    "publicName": "Play Dialog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
    "limitsSummary": null,
    "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
    "languagesSummary": "Depends on chosen model.",
    "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "openAiCompatible": false,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 30.0,
        "unit": "million_characters",
        "sourceText": "$30/M chars"
      },
      {
        "amountUsd": 50.0,
        "unit": "million_characters",
        "sourceText": "$50/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen model.",
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

import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "fireworks-ai",
  "providerName": "Fireworks AI",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.fireworks.ai/models/",
    "https://docs.fireworks.ai/api-reference/audio-transcriptions",
    "https://fireworks.ai/pricing"
  ],
  "integration": {
    "catalogType": "Dynamic hosting platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": true,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Hosted open/partner model catalog [dynamic] — LLM catalog changes frequently",
      "tts": null,
      "stt": "Whisper v3 Large [whisper-v3-large]\nWhisper v3 Large Turbo [whisper-v3-large-turbo]"
    },
    "pricing": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
    "limits": "Transcriptions API max file size ~1 GB and no duration limit. Public native TTS was not verified from official docs reviewed.",
    "region": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
    "sttLanguages": "Multilingual via Whisper family.",
    "ttsLanguages": null,
    "freeTier": "Free/test usage may exist by account plan; verify current dashboard policy.",
    "integrationNotes": "The input sheet overstates TTS support based on official docs reviewed. Treat Fireworks as LLM + STT unless you verify a newer TTS endpoint live."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "fireworks-ai",
    "providerName": "Fireworks AI",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Hosted open/partner model catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
    "limitsSummary": null,
    "regionSummary": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
    "languagesSummary": null,
    "notes": "LLM catalog changes frequently",
    "officialSources": [
      "https://docs.fireworks.ai/models/",
      "https://docs.fireworks.ai/api-reference/audio-transcriptions",
      "https://fireworks.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      },
      {
        "amountUsd": 0.0009,
        "unit": "minute",
        "sourceText": "$0.0009/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "fireworks-ai",
    "providerName": "Fireworks AI",
    "service": "stt",
    "modelId": "whisper-v3-large",
    "publicName": "Whisper v3 Large",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
    "limitsSummary": "Transcriptions API max file size ~1 GB and no duration limit. Public native TTS was not verified from official docs reviewed.",
    "regionSummary": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
    "languagesSummary": "Multilingual via Whisper family.",
    "notes": "The input sheet overstates TTS support based on official docs reviewed. Treat Fireworks as LLM + STT unless you verify a newer TTS endpoint live.",
    "officialSources": [
      "https://docs.fireworks.ai/models/",
      "https://docs.fireworks.ai/api-reference/audio-transcriptions",
      "https://fireworks.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      },
      {
        "amountUsd": 0.0009,
        "unit": "minute",
        "sourceText": "$0.0009/audio min"
      }
    ],
    "constraints": [],
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
    "providerId": "fireworks-ai",
    "providerName": "Fireworks AI",
    "service": "stt",
    "modelId": "whisper-v3-large-turbo",
    "publicName": "Whisper v3 Large Turbo",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
    "limitsSummary": "Transcriptions API max file size ~1 GB and no duration limit. Public native TTS was not verified from official docs reviewed.",
    "regionSummary": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
    "languagesSummary": "Multilingual via Whisper family.",
    "notes": "The input sheet overstates TTS support based on official docs reviewed. Treat Fireworks as LLM + STT unless you verify a newer TTS endpoint live.",
    "officialSources": [
      "https://docs.fireworks.ai/models/",
      "https://docs.fireworks.ai/api-reference/audio-transcriptions",
      "https://fireworks.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      },
      {
        "amountUsd": 0.0009,
        "unit": "minute",
        "sourceText": "$0.0009/audio min"
      }
    ],
    "constraints": [],
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

const tts = [] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

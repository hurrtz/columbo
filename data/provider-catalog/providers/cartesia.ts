import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "cartesia",
  "providerName": "Cartesia",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.cartesia.ai/",
    "https://cartesia.ai/pricing",
    "https://docs.cartesia.ai/api-reference"
  ],
  "integration": {
    "catalogType": "Speech-first realtime stack",
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
      "tts": "Sonic [sonic]\nSonic-2 [sonic-2]\nSonic-3 [sonic-3]",
      "stt": "Ink Whisper [ink-whisper]"
    },
    "pricing": "Credit-based. Batch STT has been documented at 1 credit per 2 seconds. Voice cloning uses separate credit schedules by clone type.",
    "limits": "Plan concurrency examples: Free ~2 TTS / 8 STT; Pro ~3/12; Startup ~5/20; Scale ~15/60. Older Sonic snapshots can have EOL dates.",
    "region": "Cartesia cloud; low-latency realtime focus.",
    "sttLanguages": "Whisper-based multilingual STT.",
    "ttsLanguages": "40+ languages.",
    "freeTier": "Yes.",
    "integrationNotes": "Your source sheet is outdated: Cartesia now has both TTS and STT. It is a strong developer-first realtime voice provider."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "cartesia",
    "providerName": "Cartesia",
    "service": "stt",
    "modelId": "ink-whisper",
    "publicName": "Ink Whisper",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based. Batch STT has been documented at 1 credit per 2 seconds. Voice cloning uses separate credit schedules by clone type.",
    "limitsSummary": "Plan concurrency examples: Free ~2 TTS / 8 STT; Pro ~3/12; Startup ~5/20; Scale ~15/60. Older Sonic snapshots can have EOL dates.",
    "regionSummary": "Cartesia cloud; low-latency realtime focus.",
    "languagesSummary": "Whisper-based multilingual STT.",
    "notes": "Your source sheet is outdated: Cartesia now has both TTS and STT. It is a strong developer-first realtime voice provider.",
    "officialSources": [
      "https://docs.cartesia.ai/",
      "https://cartesia.ai/pricing",
      "https://docs.cartesia.ai/api-reference"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Whisper-based multilingual STT.",
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
    "providerId": "cartesia",
    "providerName": "Cartesia",
    "service": "tts",
    "modelId": "sonic",
    "publicName": "Sonic",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based. Batch STT has been documented at 1 credit per 2 seconds. Voice cloning uses separate credit schedules by clone type.",
    "limitsSummary": null,
    "regionSummary": "Cartesia cloud; low-latency realtime focus.",
    "languagesSummary": "40+ languages.",
    "notes": "Your source sheet is outdated: Cartesia now has both TTS and STT. It is a strong developer-first realtime voice provider.",
    "officialSources": [
      "https://docs.cartesia.ai/",
      "https://cartesia.ai/pricing",
      "https://docs.cartesia.ai/api-reference"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "40+ languages.",
      "isMultilingual": true,
      "languageCount": 40,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "cartesia",
    "providerName": "Cartesia",
    "service": "tts",
    "modelId": "sonic-2",
    "publicName": "Sonic-2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based. Batch STT has been documented at 1 credit per 2 seconds. Voice cloning uses separate credit schedules by clone type.",
    "limitsSummary": null,
    "regionSummary": "Cartesia cloud; low-latency realtime focus.",
    "languagesSummary": "40+ languages.",
    "notes": "Your source sheet is outdated: Cartesia now has both TTS and STT. It is a strong developer-first realtime voice provider.",
    "officialSources": [
      "https://docs.cartesia.ai/",
      "https://cartesia.ai/pricing",
      "https://docs.cartesia.ai/api-reference"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "40+ languages.",
      "isMultilingual": true,
      "languageCount": 40,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "cartesia",
    "providerName": "Cartesia",
    "service": "tts",
    "modelId": "sonic-3",
    "publicName": "Sonic-3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based. Batch STT has been documented at 1 credit per 2 seconds. Voice cloning uses separate credit schedules by clone type.",
    "limitsSummary": null,
    "regionSummary": "Cartesia cloud; low-latency realtime focus.",
    "languagesSummary": "40+ languages.",
    "notes": "Your source sheet is outdated: Cartesia now has both TTS and STT. It is a strong developer-first realtime voice provider.",
    "officialSources": [
      "https://docs.cartesia.ai/",
      "https://cartesia.ai/pricing",
      "https://docs.cartesia.ai/api-reference"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "40+ languages.",
      "isMultilingual": true,
      "languageCount": 40,
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

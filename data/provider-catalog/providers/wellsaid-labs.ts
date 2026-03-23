import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "wellsaid-labs",
  "providerName": "WellSaid Labs",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "unsupported",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.wellsaidlabs.com/docs/getting-started",
    "https://docs.wellsaidlabs.com/reference/model-selection-with-the-api",
    "https://wellsaidlabs.com/"
  ],
  "integration": {
    "catalogType": "TTS-first platform",
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
      "llm": null,
      "tts": "WellSaid API voice models [voice-based] — Docs emphasize speaker IDs/avatars more than a small global model list",
      "stt": null
    },
    "pricing": "Subscription/custom pricing; free trial account available.",
    "limits": "Default API rate ~3 req/sec and ~1,000 chars/request.",
    "region": "WellSaid cloud; public region detail limited.",
    "sttLanguages": null,
    "ttsLanguages": "English plus selected non-English languages/accents; coverage is materially narrower than ElevenLabs/Google/Azure.",
    "freeTier": "Yes: 14-day trial key.",
    "integrationNotes": "Voice/avatar selection matters more than 'model ID'. Limited multilingual coverage may matter for a speech app with global users."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "wellsaid-labs",
    "providerName": "WellSaid Labs",
    "service": "tts",
    "modelId": "voice-based",
    "publicName": "WellSaid API voice models",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Subscription/custom pricing; free trial account available.",
    "limitsSummary": null,
    "regionSummary": "WellSaid cloud; public region detail limited.",
    "languagesSummary": "English plus selected non-English languages/accents; coverage is materially narrower than ElevenLabs/Google/Azure.",
    "notes": "Docs emphasize speaker IDs/avatars more than a small global model list",
    "officialSources": [
      "https://docs.wellsaidlabs.com/docs/getting-started",
      "https://docs.wellsaidlabs.com/reference/model-selection-with-the-api",
      "https://wellsaidlabs.com/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "English plus selected non-English languages/accents; coverage is materially narrower than ElevenLabs/Google/Azure.",
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

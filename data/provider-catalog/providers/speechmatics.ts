import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "speechmatics",
  "providerName": "Speechmatics",
  "categoryName": "Speech-Focused Providers",
  "hq": "UK",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.speechmatics.com/",
    "https://www.speechmatics.com/",
    "https://docs.speechmatics.com/api-ref/tts"
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
      "tts": "Speechmatics TTS Preview voices [preview] — Voices: sarah, theo, megan, jack",
      "stt": "Standard [standard]\nEnhanced [enhanced]"
    },
    "pricing": "Flow voice agent API free up to ~50 hours/month. TTS preview has been free during preview. STT pricing varies by deployment/plan.",
    "limits": "TTS currently preview/English-only in official material reviewed. STT available cloud/on-prem/air-gapped. Strong accent/dialect handling.",
    "region": "Cloud plus on-prem/air-gapped deployment options.",
    "sttLanguages": "55+ languages.",
    "ttsLanguages": "English only in current preview reviewed.",
    "freeTier": "Yes: preview/free usage for some flows.",
    "integrationNotes": "Your sheet is partly outdated: Speechmatics now has a TTS preview, but STT remains the main product."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "speechmatics",
    "providerName": "Speechmatics",
    "service": "stt",
    "modelId": "enhanced",
    "publicName": "Enhanced",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Flow voice agent API free up to ~50 hours/month. TTS preview has been free during preview. STT pricing varies by deployment/plan.",
    "limitsSummary": "TTS currently preview/English-only in official material reviewed. STT available cloud/on-prem/air-gapped. Strong accent/dialect handling.",
    "regionSummary": "Cloud plus on-prem/air-gapped deployment options.",
    "languagesSummary": "55+ languages.",
    "notes": "Your sheet is partly outdated: Speechmatics now has a TTS preview, but STT remains the main product.",
    "officialSources": [
      "https://docs.speechmatics.com/",
      "https://www.speechmatics.com/",
      "https://docs.speechmatics.com/api-ref/tts"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "55+ languages.",
      "isMultilingual": true,
      "languageCount": 55,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "speechmatics",
    "providerName": "Speechmatics",
    "service": "stt",
    "modelId": "standard",
    "publicName": "Standard",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Flow voice agent API free up to ~50 hours/month. TTS preview has been free during preview. STT pricing varies by deployment/plan.",
    "limitsSummary": "TTS currently preview/English-only in official material reviewed. STT available cloud/on-prem/air-gapped. Strong accent/dialect handling.",
    "regionSummary": "Cloud plus on-prem/air-gapped deployment options.",
    "languagesSummary": "55+ languages.",
    "notes": "Your sheet is partly outdated: Speechmatics now has a TTS preview, but STT remains the main product.",
    "officialSources": [
      "https://docs.speechmatics.com/",
      "https://www.speechmatics.com/",
      "https://docs.speechmatics.com/api-ref/tts"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "55+ languages.",
      "isMultilingual": true,
      "languageCount": 55,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "speechmatics",
    "providerName": "Speechmatics",
    "service": "tts",
    "modelId": "preview",
    "publicName": "Speechmatics TTS Preview voices",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Flow voice agent API free up to ~50 hours/month. TTS preview has been free during preview. STT pricing varies by deployment/plan.",
    "limitsSummary": null,
    "regionSummary": "Cloud plus on-prem/air-gapped deployment options.",
    "languagesSummary": "English only in current preview reviewed.",
    "notes": "Voices: sarah, theo, megan, jack",
    "officialSources": [
      "https://docs.speechmatics.com/",
      "https://www.speechmatics.com/",
      "https://docs.speechmatics.com/api-ref/tts"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "English only in current preview reviewed.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": [
        "preview"
      ]
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

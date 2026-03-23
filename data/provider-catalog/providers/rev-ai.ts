import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "rev-ai",
  "providerName": "Rev.ai",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.rev.ai/",
    "https://www.rev.ai/pricing",
    "https://www.rev.ai/"
  ],
  "integration": {
    "catalogType": "Fixed speech-first STT catalog",
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
      "tts": null,
      "stt": "Reverb [reverb]\nReverb Turbo / Low Cost [low_cost] — US deployment naming"
    },
    "pricing": "Speech pricing varies by deployment/model; human transcription is priced separately from ASR.",
    "limits": "Multipart uploads <2 GB. Many languages allow up to ~17h file duration; Telugu noted lower (~6h).",
    "region": "US and EU deployment options exist.",
    "sttLanguages": "Broad multilingual support; exact matrix is model/deployment dependent.",
    "ttsLanguages": null,
    "freeTier": "No broad permanent free tier found.",
    "integrationNotes": "Useful if you want both ASR and optional human transcription workflows in one vendor."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "rev-ai",
    "providerName": "Rev.ai",
    "service": "stt",
    "modelId": "reverb",
    "publicName": "Reverb",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Speech pricing varies by deployment/model; human transcription is priced separately from ASR.",
    "limitsSummary": "Multipart uploads <2 GB. Many languages allow up to ~17h file duration; Telugu noted lower (~6h).",
    "regionSummary": "US and EU deployment options exist.",
    "languagesSummary": "Broad multilingual support; exact matrix is model/deployment dependent.",
    "notes": "Useful if you want both ASR and optional human transcription workflows in one vendor.",
    "officialSources": [
      "https://docs.rev.ai/",
      "https://www.rev.ai/pricing",
      "https://www.rev.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Broad multilingual support; exact matrix is model/deployment dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "rev-ai",
    "providerName": "Rev.ai",
    "service": "stt",
    "modelId": "low_cost",
    "publicName": "Reverb Turbo / Low Cost",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Speech pricing varies by deployment/model; human transcription is priced separately from ASR.",
    "limitsSummary": "Multipart uploads <2 GB. Many languages allow up to ~17h file duration; Telugu noted lower (~6h).",
    "regionSummary": "US and EU deployment options exist.",
    "languagesSummary": "Broad multilingual support; exact matrix is model/deployment dependent.",
    "notes": "US deployment naming",
    "officialSources": [
      "https://docs.rev.ai/",
      "https://www.rev.ai/pricing",
      "https://www.rev.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Broad multilingual support; exact matrix is model/deployment dependent.",
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

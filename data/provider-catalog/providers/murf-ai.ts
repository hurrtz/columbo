import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "murf-ai",
  "providerName": "Murf.ai",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "unsupported",
    "tts": "native"
  },
  "officialSources": [
    "https://murf.ai/api",
    "https://murf.ai/api/docs/text-to-speech-models/falcon",
    "https://murf.ai/falcon"
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
      "tts": "Falcon [falcon]",
      "stt": null
    },
    "pricing": "Falcon is marketed at about $0.01/minute and also shown as ~$0.01 per 1,000 characters on pricing materials. Other studio/API plans vary.",
    "limits": "Docs/marketing cite ~5 concurrent sessions and ~1,000 RPM on free, ~15 concurrent and ~10,000 RPM on paid. Marketing also claims 10,000 concurrent calls globally for Falcon.",
    "region": "Edge deployment across 10+ regions is marketed for Falcon.",
    "sttLanguages": null,
    "ttsLanguages": "Around 35 languages / 10+ accents in current marketing; exact counts vary across pages.",
    "freeTier": "Yes: e.g., 100,000 characters on free API access offers.",
    "integrationNotes": "Good cost-focused conversational TTS candidate. Note that Murf’s published counts (voices/languages) differ slightly across pages."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "murf-ai",
    "providerName": "Murf.ai",
    "service": "tts",
    "modelId": "falcon",
    "publicName": "Falcon",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Falcon is marketed at about $0.01/minute and also shown as ~$0.01 per 1,000 characters on pricing materials. Other studio/API plans vary.",
    "limitsSummary": null,
    "regionSummary": "Edge deployment across 10+ regions is marketed for Falcon.",
    "languagesSummary": "Around 35 languages / 10+ accents in current marketing; exact counts vary across pages.",
    "notes": "Good cost-focused conversational TTS candidate. Note that Murf’s published counts (voices/languages) differ slightly across pages.",
    "officialSources": [
      "https://murf.ai/api",
      "https://murf.ai/api/docs/text-to-speech-models/falcon",
      "https://murf.ai/falcon"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.01,
        "unit": "minute",
        "sourceText": "$0.01/minute"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Around 35 languages / 10+ accents in current marketing; exact counts vary across pages.",
      "isMultilingual": true,
      "languageCount": 35,
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

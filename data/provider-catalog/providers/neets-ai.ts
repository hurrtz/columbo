import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "neets-ai",
  "providerName": "Neets.ai",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "unsupported",
    "tts": "native"
  },
  "officialSources": [
    "https://neets.ai/",
    "https://docs.neets.ai/"
  ],
  "integration": {
    "catalogType": "TTS-first platform",
    "coverage": "Low-confidence / sparse public docs",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": true,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": null,
      "tts": "Neets TTS catalog [dynamic] — Official docs exist but public indexing is sparse",
      "stt": null
    },
    "pricing": "Official public pricing/model detail was not richly retrievable from indexed docs reviewed.",
    "limits": "Sparse public technical detail from searchable official pages. Manual validation recommended before production support.",
    "region": "Not clearly published.",
    "sttLanguages": null,
    "ttsLanguages": "Public third-party descriptions claim broad multilingual support, but indexed official detail was sparse.",
    "freeTier": "Unclear from indexed official docs.",
    "integrationNotes": "Exists, but compared with other vendors it currently lacks the public operational metadata you would want for a robust model picker."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "neets-ai",
    "providerName": "Neets.ai",
    "service": "tts",
    "modelId": "dynamic",
    "publicName": "Neets TTS catalog",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / sparse public docs",
    "pricingSummary": "Official public pricing/model detail was not richly retrievable from indexed docs reviewed.",
    "limitsSummary": null,
    "regionSummary": "Not clearly published.",
    "languagesSummary": "Public third-party descriptions claim broad multilingual support, but indexed official detail was sparse.",
    "notes": "Official docs exist but public indexing is sparse",
    "officialSources": [
      "https://neets.ai/",
      "https://docs.neets.ai/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Public third-party descriptions claim broad multilingual support, but indexed official detail was sparse.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Public third-party descriptions claim broad multilingual support",
        "but indexed official detail was sparse"
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

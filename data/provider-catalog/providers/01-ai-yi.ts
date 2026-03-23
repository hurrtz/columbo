import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "01-ai-yi",
  "providerName": "01.AI (Yi)",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://www.01.ai/",
    "https://www.lingyiwanwu.com/en",
    "https://github.com/01-ai/Yi"
  ],
  "integration": {
    "catalogType": "Open-weight + enterprise platform",
    "coverage": "Low-confidence / public self-serve unclear",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": false,
    "lowConfidence": true,
    "openAiCompatible": null,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Yi 1.5 6B [yi-1.5-6b]\nYi 1.5 9B [yi-1.5-9b]\nYi 1.5 34B [yi-1.5-34b]\nYi Large [yi-large] — OpenRouter/partner visibility exists; current first-party self-serve API less clear\nWorldWise platform [worldwise] — Enterprise/platform emphasis",
      "tts": null,
      "stt": null
    },
    "pricing": "Current first-party public hosted pricing was not clearly retrievable from official sources reviewed.",
    "limits": "Provider definitely exists, but current public self-serve catalog/pricing is much less explicit than the open-weight Yi family.",
    "region": "Enterprise/platform specific; not clearly centralized publicly.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "Not clearly documented.",
    "integrationNotes": "For production BYOK, treat 01.AI as 'exists, but manual commercial validation required' rather than plug-and-play."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "01-ai-yi",
    "providerName": "01.AI (Yi)",
    "service": "llm",
    "modelId": "worldwise",
    "publicName": "WorldWise platform",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / public self-serve unclear",
    "pricingSummary": "Current first-party public hosted pricing was not clearly retrievable from official sources reviewed.",
    "limitsSummary": null,
    "regionSummary": "Enterprise/platform specific; not clearly centralized publicly.",
    "languagesSummary": null,
    "notes": "Enterprise/platform emphasis",
    "officialSources": [
      "https://www.01.ai/",
      "https://www.lingyiwanwu.com/en",
      "https://github.com/01-ai/Yi"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "01-ai-yi",
    "providerName": "01.AI (Yi)",
    "service": "llm",
    "modelId": "yi-1.5-34b",
    "publicName": "Yi 1.5 34B",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / public self-serve unclear",
    "pricingSummary": "Current first-party public hosted pricing was not clearly retrievable from official sources reviewed.",
    "limitsSummary": null,
    "regionSummary": "Enterprise/platform specific; not clearly centralized publicly.",
    "languagesSummary": null,
    "notes": "For production BYOK, treat 01.AI as 'exists, but manual commercial validation required' rather than plug-and-play.",
    "officialSources": [
      "https://www.01.ai/",
      "https://www.lingyiwanwu.com/en",
      "https://github.com/01-ai/Yi"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "01-ai-yi",
    "providerName": "01.AI (Yi)",
    "service": "llm",
    "modelId": "yi-1.5-6b",
    "publicName": "Yi 1.5 6B",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / public self-serve unclear",
    "pricingSummary": "Current first-party public hosted pricing was not clearly retrievable from official sources reviewed.",
    "limitsSummary": null,
    "regionSummary": "Enterprise/platform specific; not clearly centralized publicly.",
    "languagesSummary": null,
    "notes": "For production BYOK, treat 01.AI as 'exists, but manual commercial validation required' rather than plug-and-play.",
    "officialSources": [
      "https://www.01.ai/",
      "https://www.lingyiwanwu.com/en",
      "https://github.com/01-ai/Yi"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "01-ai-yi",
    "providerName": "01.AI (Yi)",
    "service": "llm",
    "modelId": "yi-1.5-9b",
    "publicName": "Yi 1.5 9B",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / public self-serve unclear",
    "pricingSummary": "Current first-party public hosted pricing was not clearly retrievable from official sources reviewed.",
    "limitsSummary": null,
    "regionSummary": "Enterprise/platform specific; not clearly centralized publicly.",
    "languagesSummary": null,
    "notes": "For production BYOK, treat 01.AI as 'exists, but manual commercial validation required' rather than plug-and-play.",
    "officialSources": [
      "https://www.01.ai/",
      "https://www.lingyiwanwu.com/en",
      "https://github.com/01-ai/Yi"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "01-ai-yi",
    "providerName": "01.AI (Yi)",
    "service": "llm",
    "modelId": "yi-large",
    "publicName": "Yi Large",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / public self-serve unclear",
    "pricingSummary": "Current first-party public hosted pricing was not clearly retrievable from official sources reviewed.",
    "limitsSummary": null,
    "regionSummary": "Enterprise/platform specific; not clearly centralized publicly.",
    "languagesSummary": null,
    "notes": "OpenRouter/partner visibility exists; current first-party self-serve API less clear",
    "officialSources": [
      "https://www.01.ai/",
      "https://www.lingyiwanwu.com/en",
      "https://github.com/01-ai/Yi"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "baichuan",
  "providerName": "Baichuan",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://platform.baichuan-ai.com/",
    "https://platform.baichuan-ai.com/pricing",
    "https://platform.baichuan-ai.com/docs"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": false,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Baichuan M3 Plus [baichuan-m3-plus]\nBaichuan M3 [baichuan-m3]\nBaichuan M2 Plus [baichuan-m2-plus]\nBaichuan M2 [baichuan-m2]\nBaichuan4 Turbo [baichuan4-turbo]\nBaichuan4 Air [baichuan4-air]\nBaichuan4 [baichuan4]\nBaichuan3 Turbo [baichuan3-turbo]\nBaichuan3 Turbo 128k [baichuan3-turbo-128k]\nBaichuan2 Turbo [baichuan2-turbo]\nBaichuan2 53B [baichuan2-53b]",
      "tts": null,
      "stt": null
    },
    "pricing": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limits": "No public native TTS/STT found.",
    "region": "China-centric.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "Trial quotas may exist but not clearly standardized.",
    "integrationNotes": "Strong China-focused LLM catalog, but no public speech stack verified."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan-m2",
    "publicName": "Baichuan M2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan-m2-plus",
    "publicName": "Baichuan M2 Plus",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan-m3",
    "publicName": "Baichuan M3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan-m3-plus",
    "publicName": "Baichuan M3 Plus",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan2-53b",
    "publicName": "Baichuan2 53B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan2-turbo",
    "publicName": "Baichuan2 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan3-turbo",
    "publicName": "Baichuan3 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan3-turbo-128k",
    "publicName": "Baichuan3 Turbo 128k",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan4",
    "publicName": "Baichuan4",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan4-air",
    "publicName": "Baichuan4 Air",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "service": "llm",
    "modelId": "baichuan4-turbo",
    "publicName": "Baichuan4 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
    "limitsSummary": null,
    "regionSummary": "China-centric.",
    "languagesSummary": null,
    "notes": "Strong China-focused LLM catalog, but no public speech stack verified.",
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
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

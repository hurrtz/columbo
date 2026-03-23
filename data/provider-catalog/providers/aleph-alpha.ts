import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "aleph-alpha",
  "providerName": "Aleph Alpha",
  "categoryName": "Major Western Providers",
  "hq": "DE",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://aleph-alpha.com/",
    "https://docs.aleph-alpha.com/",
    "https://docs.aleph-alpha.com/docs/phariaai/overview"
  ],
  "integration": {
    "catalogType": "Enterprise/private sovereign platform",
    "coverage": "Low-confidence / enterprise-only",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": false,
    "lowConfidence": true,
    "openAiCompatible": null,
    "protocols": [],
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": "Pharia-1 LLM 7B Control [pharia-1-llm-7b-control]\nLlama 3.1 8B [llama-3.1-8b] — Available in manager examples\nLlama 3.3 70B [llama-3.3-70b] — Available in manager examples\nLlama Guard 3 8B [llama-guard-3-8b] — Safety model in manager examples",
      "tts": null,
      "stt": null
    },
    "pricing": "Custom/enterprise pricing; no broad public self-serve price card located.",
    "limits": "Current public material emphasizes private deployment/sovereign AI rather than open self-serve API.",
    "region": "Customer-controlled / sovereign / on-prem / private cloud options.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "No public free tier found.",
    "integrationNotes": "Exists, but the public self-serve SaaS story is much weaker than older Luminous-era expectations. Best treated as enterprise/private infrastructure."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "aleph-alpha",
    "providerName": "Aleph Alpha",
    "service": "llm",
    "modelId": "llama-3.1-8b",
    "publicName": "Llama 3.1 8B",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / enterprise-only",
    "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
    "limitsSummary": null,
    "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
    "languagesSummary": null,
    "notes": "Available in manager examples",
    "officialSources": [
      "https://aleph-alpha.com/",
      "https://docs.aleph-alpha.com/",
      "https://docs.aleph-alpha.com/docs/phariaai/overview"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "aleph-alpha",
    "providerName": "Aleph Alpha",
    "service": "llm",
    "modelId": "llama-3.3-70b",
    "publicName": "Llama 3.3 70B",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / enterprise-only",
    "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
    "limitsSummary": null,
    "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
    "languagesSummary": null,
    "notes": "Available in manager examples",
    "officialSources": [
      "https://aleph-alpha.com/",
      "https://docs.aleph-alpha.com/",
      "https://docs.aleph-alpha.com/docs/phariaai/overview"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "aleph-alpha",
    "providerName": "Aleph Alpha",
    "service": "llm",
    "modelId": "llama-guard-3-8b",
    "publicName": "Llama Guard 3 8B",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / enterprise-only",
    "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
    "limitsSummary": null,
    "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
    "languagesSummary": null,
    "notes": "Safety model in manager examples",
    "officialSources": [
      "https://aleph-alpha.com/",
      "https://docs.aleph-alpha.com/",
      "https://docs.aleph-alpha.com/docs/phariaai/overview"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "aleph-alpha",
    "providerName": "Aleph Alpha",
    "service": "llm",
    "modelId": "pharia-1-llm-7b-control",
    "publicName": "Pharia-1 LLM 7B Control",
    "status": "Documented active/current",
    "catalogScope": "Low-confidence / enterprise-only",
    "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
    "limitsSummary": null,
    "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
    "languagesSummary": null,
    "notes": "Exists, but the public self-serve SaaS story is much weaker than older Luminous-era expectations. Best treated as enterprise/private infrastructure.",
    "officialSources": [
      "https://aleph-alpha.com/",
      "https://docs.aleph-alpha.com/",
      "https://docs.aleph-alpha.com/docs/phariaai/overview"
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

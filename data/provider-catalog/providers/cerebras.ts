import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "cerebras",
  "providerName": "Cerebras",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://inference-docs.cerebras.ai/",
    "https://www.cerebras.ai/",
    "https://inference-docs.cerebras.ai/capabilities/voice-ai"
  ],
  "integration": {
    "catalogType": "Dynamic fast-LLM hosting",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": true,
    "needsLiveDiscovery": true,
    "supportsSpeech": false,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Fast hosted LLM catalog [dynamic] — Examples change quickly; voice examples use external speech providers",
      "tts": null,
      "stt": null
    },
    "pricing": "Cerebras emphasizes ultra-fast LLM inference; pricing depends on model/plan.",
    "limits": "Official public docs reviewed did not show first-party native TTS/STT; voice examples pair Cerebras with third-party speech components.",
    "region": "Cerebras cloud; public region granularity limited.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "Yes: 'free to get started' style access has been promoted.",
    "integrationNotes": "Treat Cerebras as an LLM compute/inference provider, not a native speech provider."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "cerebras",
    "providerName": "Cerebras",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Fast hosted LLM catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Cerebras emphasizes ultra-fast LLM inference; pricing depends on model/plan.",
    "limitsSummary": null,
    "regionSummary": "Cerebras cloud; public region granularity limited.",
    "languagesSummary": null,
    "notes": "Examples change quickly; voice examples use external speech providers",
    "officialSources": [
      "https://inference-docs.cerebras.ai/",
      "https://www.cerebras.ai/",
      "https://inference-docs.cerebras.ai/capabilities/voice-ai"
    ],
    "openAiCompatible": true,
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

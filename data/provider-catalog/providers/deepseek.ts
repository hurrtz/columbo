import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "deepseek",
  "providerName": "DeepSeek",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://api-docs.deepseek.com/",
    "https://api-docs.deepseek.com/quick_start/pricing",
    "https://api-docs.deepseek.com/quick_start/models"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM catalog",
    "coverage": "Exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": false,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [
      "sse"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "DeepSeek Chat [deepseek-chat] — V3.2 chat mode\nDeepSeek Reasoner [deepseek-reasoner] — V3.2 thinking mode",
      "tts": null,
      "stt": null
    },
    "pricing": "deepseek-chat: cache hit $0.07/M, cache miss $0.27/M, output $1.10/M; deepseek-reasoner: cache hit $0.14/M, miss $0.55/M, output $2.19/M.",
    "limits": "No native public TTS/STT.",
    "region": "DeepSeek-hosted; region specifics are not deeply public.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "No standing free tier documented.",
    "integrationNotes": "Very cost-effective LLM option, but no native speech stack."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "deepseek",
    "providerName": "DeepSeek",
    "service": "llm",
    "modelId": "deepseek-chat",
    "publicName": "DeepSeek Chat",
    "status": "Documented active/current",
    "catalogScope": "Exhaustive",
    "pricingSummary": "deepseek-chat: cache hit $0.07/M, cache miss $0.27/M, output $1.10/M; deepseek-reasoner: cache hit $0.14/M, miss $0.55/M, output $2.19/M.",
    "limitsSummary": null,
    "regionSummary": "DeepSeek-hosted; region specifics are not deeply public.",
    "languagesSummary": null,
    "notes": "V3.2 chat mode",
    "officialSources": [
      "https://api-docs.deepseek.com/",
      "https://api-docs.deepseek.com/quick_start/pricing",
      "https://api-docs.deepseek.com/quick_start/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "deepseek",
    "providerName": "DeepSeek",
    "service": "llm",
    "modelId": "deepseek-reasoner",
    "publicName": "DeepSeek Reasoner",
    "status": "Documented active/current",
    "catalogScope": "Exhaustive",
    "pricingSummary": "deepseek-chat: cache hit $0.07/M, cache miss $0.27/M, output $1.10/M; deepseek-reasoner: cache hit $0.14/M, miss $0.55/M, output $2.19/M.",
    "limitsSummary": null,
    "regionSummary": "DeepSeek-hosted; region specifics are not deeply public.",
    "languagesSummary": null,
    "notes": "V3.2 thinking mode",
    "officialSources": [
      "https://api-docs.deepseek.com/",
      "https://api-docs.deepseek.com/quick_start/pricing",
      "https://api-docs.deepseek.com/quick_start/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
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

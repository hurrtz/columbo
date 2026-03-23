import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "ai21-labs",
  "providerName": "AI21 Labs",
  "categoryName": "Major Western Providers",
  "hq": "IL",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.ai21.com/docs/jamba-models",
    "https://docs.ai21.com/reference/get-started",
    "https://www.ai21.com/pricing"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": false,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Jamba Large [jamba-large]\nJamba Mini [jamba-mini]\nJamba 3B [jamba-3b]",
      "tts": null,
      "stt": null
    },
    "pricing": "Jamba pricing varies by model; new accounts have received $10 credit for 3 months.",
    "limits": "Typical rate limits around 10 RPS / 200 RPM for Jamba Large/Mini. 256K context on current Jamba line.",
    "region": "AI21-hosted; regional details are not deeply exposed publicly.",
    "sttLanguages": null,
    "ttsLanguages": null,
    "freeTier": "Yes: starter credits for new accounts.",
    "integrationNotes": "Supported languages are broader than English (e.g., EN/ES/FR/PT/IT/NL/DE/AR/HE), but there is no native TTS/STT."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "ai21-labs",
    "providerName": "AI21 Labs",
    "service": "llm",
    "modelId": "jamba-3b",
    "publicName": "Jamba 3B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Jamba pricing varies by model; new accounts have received $10 credit for 3 months.",
    "limitsSummary": null,
    "regionSummary": "AI21-hosted; regional details are not deeply exposed publicly.",
    "languagesSummary": null,
    "notes": "Supported languages are broader than English (e.g., EN/ES/FR/PT/IT/NL/DE/AR/HE), but there is no native TTS/STT.",
    "officialSources": [
      "https://docs.ai21.com/docs/jamba-models",
      "https://docs.ai21.com/reference/get-started",
      "https://www.ai21.com/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "ai21-labs",
    "providerName": "AI21 Labs",
    "service": "llm",
    "modelId": "jamba-large",
    "publicName": "Jamba Large",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Jamba pricing varies by model; new accounts have received $10 credit for 3 months.",
    "limitsSummary": null,
    "regionSummary": "AI21-hosted; regional details are not deeply exposed publicly.",
    "languagesSummary": null,
    "notes": "Supported languages are broader than English (e.g., EN/ES/FR/PT/IT/NL/DE/AR/HE), but there is no native TTS/STT.",
    "officialSources": [
      "https://docs.ai21.com/docs/jamba-models",
      "https://docs.ai21.com/reference/get-started",
      "https://www.ai21.com/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "ai21-labs",
    "providerName": "AI21 Labs",
    "service": "llm",
    "modelId": "jamba-mini",
    "publicName": "Jamba Mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Jamba pricing varies by model; new accounts have received $10 credit for 3 months.",
    "limitsSummary": null,
    "regionSummary": "AI21-hosted; regional details are not deeply exposed publicly.",
    "languagesSummary": null,
    "notes": "Supported languages are broader than English (e.g., EN/ES/FR/PT/IT/NL/DE/AR/HE), but there is no native TTS/STT.",
    "officialSources": [
      "https://docs.ai21.com/docs/jamba-models",
      "https://docs.ai21.com/reference/get-started",
      "https://www.ai21.com/pricing"
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

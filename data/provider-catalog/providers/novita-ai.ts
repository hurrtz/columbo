import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "novita-ai",
  "providerName": "Novita AI",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://novita.ai/docs/api-reference",
    "https://novita.ai/models",
    "https://novita.ai/pricing"
  ],
  "integration": {
    "catalogType": "Dynamic hosting platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": true,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Hosted LLM catalog [dynamic] — 200+ APIs claimed",
      "tts": "Novita TTS catalog [dynamic]",
      "stt": "Audio Transcriptions API [/audio/transcriptions]\nGLM-ASR-2512 [glm-asr-2512]"
    },
    "pricing": "Varies by model/service. Pricing page is service-specific and changes frequently.",
    "limits": "TTS marketing highlights <300 ms latency; exact quotas depend on chosen model and plan.",
    "region": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
    "sttLanguages": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
    "ttsLanguages": "Depends on chosen TTS model/voice library.",
    "freeTier": "Trial/free usage may exist; verify current dashboard.",
    "integrationNotes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "novita-ai",
    "providerName": "Novita AI",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Hosted LLM catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
    "limitsSummary": null,
    "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
    "languagesSummary": null,
    "notes": "200+ APIs claimed",
    "officialSources": [
      "https://novita.ai/docs/api-reference",
      "https://novita.ai/models",
      "https://novita.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "novita-ai",
    "providerName": "Novita AI",
    "service": "stt",
    "modelId": "/audio/transcriptions",
    "publicName": "Audio Transcriptions API",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
    "limitsSummary": "TTS marketing highlights <300 ms latency; exact quotas depend on chosen model and plan.",
    "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
    "languagesSummary": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
    "notes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting.",
    "officialSources": [
      "https://novita.ai/docs/api-reference",
      "https://novita.ai/models",
      "https://novita.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on chosen STT model (e.g",
        "GLM-ASR multilingual"
      ],
      "notes": []
    }
  },
  {
    "providerId": "novita-ai",
    "providerName": "Novita AI",
    "service": "stt",
    "modelId": "glm-asr-2512",
    "publicName": "GLM-ASR-2512",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
    "limitsSummary": "TTS marketing highlights <300 ms latency; exact quotas depend on chosen model and plan.",
    "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
    "languagesSummary": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
    "notes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting.",
    "officialSources": [
      "https://novita.ai/docs/api-reference",
      "https://novita.ai/models",
      "https://novita.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on chosen STT model (e.g",
        "GLM-ASR multilingual"
      ],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "novita-ai",
    "providerName": "Novita AI",
    "service": "tts",
    "modelId": "dynamic",
    "publicName": "Novita TTS catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
    "limitsSummary": null,
    "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
    "languagesSummary": "Depends on chosen TTS model/voice library.",
    "notes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting.",
    "officialSources": [
      "https://novita.ai/docs/api-reference",
      "https://novita.ai/models",
      "https://novita.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen TTS model/voice library.",
      "isMultilingual": false,
      "languageCount": null,
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

import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "z-ai-zhipu-ai",
  "providerName": "Z.ai / Zhipu AI",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.z.ai/",
    "https://docs.bigmodel.cn/",
    "https://z.ai/"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM + STT catalog",
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
      "llm": "GLM-5 [glm-5]\nGLM-5 Turbo [glm-5-turbo]\nGLM-5 Code [glm-5-code]\nGLM-4.7 [glm-4.7]\nGLM-4.7 FlashX [glm-4.7-flashx]\nGLM-4.6 [glm-4.6]\nGLM-4.5 [glm-4.5]\nGLM-4.5-X [glm-4.5-x]\nGLM-4.5 Air [glm-4.5-air]\nGLM-4.5 AirX [glm-4.5-airx]\nGLM-4.6V [glm-4.6v]\nGLM-OCR [glm-ocr]",
      "tts": null,
      "stt": "GLM-ASR-2512 [glm-asr-2512]"
    },
    "pricing": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limits": "Many current GLM models support up to ~200K context, with some air tiers at ~128K. Native public TTS was not verified in official docs.",
    "region": "Z.ai/Zhipu cloud; public region details are limited.",
    "sttLanguages": "Multilingual realtime streaming ASR.",
    "ttsLanguages": null,
    "freeTier": "Often yes via starter credits or temporary offers, but not guaranteed across regions.",
    "integrationNotes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.5",
    "publicName": "GLM-4.5",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.5-air",
    "publicName": "GLM-4.5 Air",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.5-airx",
    "publicName": "GLM-4.5 AirX",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.5-x",
    "publicName": "GLM-4.5-X",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.6",
    "publicName": "GLM-4.6",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.6v",
    "publicName": "GLM-4.6V",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.7",
    "publicName": "GLM-4.7",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-4.7-flashx",
    "publicName": "GLM-4.7 FlashX",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-5",
    "publicName": "GLM-5",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-5-code",
    "publicName": "GLM-5 Code",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-5-turbo",
    "publicName": "GLM-5 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "llm",
    "modelId": "glm-ocr",
    "publicName": "GLM-OCR",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": null,
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": null,
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "service": "stt",
    "modelId": "glm-asr-2512",
    "publicName": "GLM-ASR-2512",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Text pricing varies by GLM generation/context. STT roughly around $0.0024/min from official pricing snippets.",
    "limitsSummary": "Many current GLM models support up to ~200K context, with some air tiers at ~128K. Native public TTS was not verified in official docs.",
    "regionSummary": "Z.ai/Zhipu cloud; public region details are limited.",
    "languagesSummary": "Multilingual realtime streaming ASR.",
    "notes": "The input sheet appears outdated here: official docs verified LLM + STT, but not a native public TTS API.",
    "officialSources": [
      "https://docs.z.ai/",
      "https://docs.bigmodel.cn/",
      "https://z.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.0024,
        "unit": "minute",
        "sourceText": "$0.0024/min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual realtime streaming ASR.",
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

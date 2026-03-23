import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "xai",
  "providerName": "xAI",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "unsupported",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.x.ai/",
    "https://x.ai/api",
    "https://docs.x.ai/docs/models"
  ],
  "integration": {
    "catalogType": "Fixed first-party LLM + voice APIs",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [
      "grpc",
      "rest",
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Grok 4.20 [grok-4.20]\nGrok 4 0709 [grok-4-0709]\nGrok Code Fast 1 [grok-code-fast-1]\nGrok 4 Fast [grok-4-fast]\nGrok 4.1 Fast [grok-4-1-fast]\nGrok 4 Fast Non-Reasoning [grok-4-fast-non-reasoning]\nGrok 4.1 Fast Non-Reasoning [grok-4-1-fast-non-reasoning]",
      "tts": "xAI TTS API [voice-based] — Public docs expose TTS voices rather than multiple named TTS model IDs\nVoice Agent API [voice-agent] — Session-based voice stack",
      "stt": null
    },
    "pricing": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limits": "TTS max 15,000 chars/request. Voice Agent max 30 min/session, 100 concurrent sessions/team.",
    "region": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "sttLanguages": null,
    "ttsLanguages": "20 languages.",
    "freeTier": "No clear permanent free tier documented.",
    "integrationNotes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "llm",
    "modelId": "grok-4-0709",
    "publicName": "Grok 4 0709",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": null,
    "notes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "llm",
    "modelId": "grok-4-fast",
    "publicName": "Grok 4 Fast",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": null,
    "notes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "llm",
    "modelId": "grok-4-fast-non-reasoning",
    "publicName": "Grok 4 Fast Non-Reasoning",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": null,
    "notes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "llm",
    "modelId": "grok-4-1-fast",
    "publicName": "Grok 4.1 Fast",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": null,
    "notes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "llm",
    "modelId": "grok-4-1-fast-non-reasoning",
    "publicName": "Grok 4.1 Fast Non-Reasoning",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": null,
    "notes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "llm",
    "modelId": "grok-4.20",
    "publicName": "Grok 4.20",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": null,
    "notes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "llm",
    "modelId": "grok-code-fast-1",
    "publicName": "Grok Code Fast 1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": null,
    "notes": "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "tts",
    "modelId": "voice-agent",
    "publicName": "Voice Agent API",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": "20 languages.",
    "notes": "Session-based voice stack",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "20 languages.",
      "isMultilingual": true,
      "languageCount": 20,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "xai",
    "providerName": "xAI",
    "service": "tts",
    "modelId": "voice-based",
    "publicName": "xAI TTS API",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    "limitsSummary": null,
    "regionSummary": "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    "languagesSummary": "20 languages.",
    "notes": "Public docs expose TTS voices rather than multiple named TTS model IDs",
    "officialSources": [
      "https://docs.x.ai/",
      "https://x.ai/api",
      "https://docs.x.ai/docs/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.2,
        "unit": "million_characters",
        "sourceText": "$4.20/M chars"
      },
      {
        "amountUsd": 0.05,
        "unit": "minute",
        "sourceText": "$0.05/min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "20 languages.",
      "isMultilingual": true,
      "languageCount": 20,
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

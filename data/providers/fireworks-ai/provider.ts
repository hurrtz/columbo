import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "fireworks-ai",
    "providerName": "Fireworks AI",
    "categoryName": "Open-model inference cloud / hosted model catalog",
    "hq": "Unknown (official sources reviewed did not state headquarters explicitly)",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.fireworks.ai/getting-started/introduction",
      "https://docs.fireworks.ai/guides/querying-text-models",
      "https://docs.fireworks.ai/guides/querying-asr-models",
      "https://docs.fireworks.ai/api-reference/list-models",
      "https://fireworks.ai/models",
      "https://fireworks.ai/pricing",
      "https://docs.fireworks.ai/tools-sdks/openai-compatibility",
      "https://docs.fireworks.ai/guides/response-api",
      "https://docs.fireworks.ai/guides/quotas_usage/rate-limits",
      "https://docs.fireworks.ai/guides/security_compliance/data_handling",
      "https://docs.fireworks.ai/deployments/regions"
    ],
    "integration": {
      "catalogType": "Hosted open-model marketplace plus account-scoped model registry",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse",
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Serverless LLM pricing is mixed: generic size-tier pricing plus named-model overrides. Batch inference is 50% of normal serverless token pricing. STT pricing is per audio minute; Whisper v3 is $0.0015/min and Whisper v3 Turbo is $0.0009/min, while streaming ASR model pages show separate per-minute prices.",
      "limits": "List Models API paginates up to 200 items per page. Offline STT supports up to 1 GB audio files with no duration limit. Streaming STT expects 50-400 ms PCM 16-bit LE chunks at 16 kHz mono. Default serverless limits with billing include up to 6,000 RPM dynamic ceiling and 10 concurrent streaming-speech connections.",
      "region": "Dedicated deployments are multi-region by default and can target GLOBAL, US, EUROPE, or APAC; some single regions are also documented for dedicated deployments. Serverless region pinning was not clearly documented.",
      "sttLanguages": "Fireworks documents 95+ STT languages and publishes a long language list; model pages for Whisper also describe 99-language coverage. Conservative app stance: mark STT as multilingual 95+.",
      "ttsLanguages": "No public developer TTS docs/models found; unknown/unsupported.",
      "freeTier": "New accounts get $1 in free credits. After depletion, accounts without a payment method are suspended and limited to 10 RPM until billing is added.",
      "integrationNotes": "Use List Models API for completeness; hard-code only a small curated picker. Prefer full canonical model IDs for LLMs (accounts/fireworks/models/...). STT uses short IDs (whisper-v3, whisper-v3-turbo, fireworks-asr-large, fireworks-asr-v2) with separate audio endpoints / WebSocket URLs."
    },
    "sources": [
      {
        "url": "https://docs.fireworks.ai/getting-started/introduction",
        "title": "Build with Fireworks AI",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "overview",
          "llm",
          "stt"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/guides/querying-text-models",
        "title": "Text Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "models",
          "openai_compatibility"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/guides/querying-asr-models",
        "title": "Speech to Text",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "models",
          "languages"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/api-reference/audio-transcriptions",
        "title": "Transcribe audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/api-reference/audio-streaming-transcriptions",
        "title": "Streaming Transcription",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "realtime",
          "limits",
          "protocols"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/api-reference/list-models",
        "title": "List Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "catalog",
          "limits"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/faq-new/models-inference/how-to-check-if-a-model-is-available-on-serverless",
        "title": "How to check if a model is available on serverless?",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "catalog",
          "serverless",
          "live_discovery"
        ]
      },
      {
        "url": "https://fireworks.ai/models",
        "title": "Model Library",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "catalog",
          "dynamic_catalog"
        ]
      },
      {
        "url": "https://fireworks.ai/pricing",
        "title": "Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "stt",
          "batch"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/tools-sdks/openai-compatibility",
        "title": "OpenAI compatibility",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "openai_compatibility",
          "auth",
          "protocols"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/guides/response-api",
        "title": "Responses API",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "streaming",
          "tools",
          "retention"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/guides/quotas_usage/rate-limits",
        "title": "Rate Limits & Quotas",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "quotas",
          "concurrency"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/guides/security_compliance/data_handling",
        "title": "Zero Data Retention",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "security",
          "retention"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/deployments/regions",
        "title": "Regions",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "data_residency"
        ]
      },
      {
        "url": "https://docs.fireworks.ai/models/overview",
        "title": "Models Overview",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "serverless",
          "deprecation",
          "security"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

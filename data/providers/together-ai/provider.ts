import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "categoryName": "AI inference platform / model marketplace",
    "hq": "San Francisco, CA, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.together.ai/docs/openai-api-compatibility",
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/docs/recommended-models",
      "https://docs.together.ai/docs/speech-to-text",
      "https://docs.together.ai/docs/text-to-speech",
      "https://docs.together.ai/reference/audio-transcriptions",
      "https://docs.together.ai/reference/audio-transcriptions-realtime",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-speech-websocket",
      "https://docs.together.ai/reference/models",
      "https://docs.together.ai/docs/batch-inference",
      "https://docs.together.ai/docs/rate-limits",
      "https://docs.together.ai/docs/billing-usage-limits",
      "https://docs.together.ai/docs/deprecations",
      "https://docs.together.ai/docs/changelog",
      "https://docs.together.ai/docs/deployment-options",
      "https://www.together.ai/pricing",
      "https://www.together.ai/privacy",
      "https://www.together.ai/terms-of-service"
    ],
    "integration": {
      "catalogType": "Hosted multi-model catalog with serverless and dedicated offerings",
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
      "pricing": "Public serverless pricing exists for many LLMs and for some speech models. Batch API advertises up to 50% lower cost for supported serverless workloads. Speech pricing is public for Orpheus, Kokoro, Cartesia Sonic, Whisper Large v3, and Parakeet TDT 0.6B v3.",
      "limits": "LLM context windows are public per model. Batch API limits are public: up to 30B enqueued tokens per model, 50,000 requests per batch, 100 MB batch file size. Hard speech limits such as max upload size, max duration, and session length were not clearly documented.",
      "region": "Public docs confirm Together AI Cloud plus VPC deployment on any cloud. SOC 2 and HIPAA are documented. No clear public region-by-region data residency matrix was found.",
      "sttLanguages": "Multilingual support is implied/documented, but exact supported-language counts by STT model are not fully enumerated in Together docs. The transcription API accepts ISO 639-1 language codes and 'auto' detection.",
      "ttsLanguages": "The /audio/speech reference enumerates en,de,fr,es,hi,it,ja,ko,nl,pl,pt,ru,sv,tr,zh for the request parameter, but support is still voice/model-dependent.",
      "freeTier": "Unknown. I found build-tier and spend-based limit docs, but no clear public always-on free-tier speech/LLM entitlement table for March 24, 2026.",
      "integrationNotes": "Use live model discovery for the broad LLM catalog. Use conservative static pickers for only a small set of officially recommended LLMs plus the most clearly documented speech models. Treat conflicting speech model docs carefully, especially Voxtral and Cartesia Sonic 2/3."
    },
    "sources": [
      {
        "url": "https://docs.together.ai/docs/openai-api-compatibility",
        "title": "OpenAI Compatibility",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "protocols"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/serverless-models",
        "title": "Serverless Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "limits",
          "tts",
          "stt"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/recommended-models",
        "title": "Recommended Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/speech-to-text",
        "title": "Speech-to-Text",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "languages",
          "realtime",
          "limits"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/text-to-speech",
        "title": "Text-to-Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "voices",
          "realtime"
        ]
      },
      {
        "url": "https://docs.together.ai/reference/audio-transcriptions",
        "title": "Create an Audio Transcription",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "auth",
          "languages",
          "limits"
        ]
      },
      {
        "url": "https://docs.together.ai/reference/audio-transcriptions-realtime",
        "title": "Create a realtime audio transcription",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "realtime",
          "protocols"
        ]
      },
      {
        "url": "https://docs.together.ai/reference/audio-speech",
        "title": "Create Audio Generation Request",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "limits",
          "auth"
        ]
      },
      {
        "url": "https://docs.together.ai/reference/audio-speech-websocket",
        "title": "Create realtime text-to-speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "realtime",
          "protocols",
          "limits"
        ]
      },
      {
        "url": "https://docs.together.ai/reference/models",
        "title": "List All Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "dynamic_catalog"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/batch-inference",
        "title": "Batch",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "batch",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/rate-limits",
        "title": "Inference Rate Limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/billing-usage-limits",
        "title": "Usage Limits & Analytics",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/deprecations",
        "title": "Deprecations",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "deprecations"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/changelog",
        "title": "Changelog",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "deprecations",
          "batch",
          "speech"
        ]
      },
      {
        "url": "https://docs.together.ai/docs/deployment-options",
        "title": "Deployment Options Overview",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://www.together.ai/pricing",
        "title": "Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing"
        ]
      },
      {
        "url": "https://www.together.ai/privacy",
        "title": "Privacy Policy",
        "type": "official",
        "lastUpdated": "2025-12-17",
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://www.together.ai/terms-of-service",
        "title": "Terms of Service",
        "type": "official",
        "lastUpdated": "2025-12-17",
        "usedFor": [
          "regions"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

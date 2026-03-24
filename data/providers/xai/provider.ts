import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "xai",
    "providerName": "xAI",
    "categoryName": "Foundation model API provider",
    "hq": "Palo Alto, California, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "partial",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.x.ai/developers/models",
      "https://docs.x.ai/developers/rest-api-reference",
      "https://docs.x.ai/developers/rest-api-reference/inference/models",
      "https://docs.x.ai/developers/model-capabilities/text/generate-text",
      "https://docs.x.ai/developers/model-capabilities/text/streaming",
      "https://docs.x.ai/developers/model-capabilities/audio/voice",
      "https://docs.x.ai/developers/model-capabilities/audio/voice-agent",
      "https://docs.x.ai/developers/model-capabilities/audio/text-to-speech",
      "https://docs.x.ai/developers/rest-api-reference/inference/voice",
      "https://docs.x.ai/developers/advanced-api-usage/batch-api",
      "https://docs.x.ai/developers/release-notes",
      "https://docs.x.ai/developers/regions",
      "https://docs.x.ai/developers/faq/security",
      "https://docs.x.ai/developers/grpc-api-reference",
      "https://x.ai/api",
      "https://x.ai/api/voice",
      "https://x.ai/careers"
    ],
    "integration": {
      "catalogType": "Team-available language-model catalog plus fixed voice API surfaces",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse",
        "websocket",
        "grpc"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "LLMs are token-priced; current public official pricing pages highlight grok-4.20-reasoning at $2.00/1M input and $6.00/1M output, grok-4-1-fast-reasoning at $0.20/1M input and $0.50/1M output, Voice Agent at $0.05/min, and TTS at $4.20/1M characters. Batch discounts are 50% for text/language models.",
      "limits": "Voice Agent: 100 concurrent sessions/team, 30-minute max session. TTS: 600 RPM, 10 concurrent requests/team on the dedicated page; text input max 15,000 chars/request. Text streaming uses SSE. Image input for image-capable LLMs is capped at 20 MiB per image and jpg/jpeg/png.",
      "region": "Global endpoint https://api.x.ai routes automatically; regional endpoints are available, with docs explicitly showing eu-west-1 and noting regional failures fail closed rather than falling back. Voice/TTS pricing pages currently list us-east-1 availability.",
      "sttLanguages": "Unknown for a public standalone STT API. Voice Agent is multilingual in marketing language, but developer docs do not publish a standalone STT language matrix.",
      "ttsLanguages": "Official TTS docs list 20 named languages/locale variants plus auto-detect.",
      "freeTier": "Unknown in developer docs. Quickstart says to create an account and load credits; the public API marketing pages say 'free to start' / 'no credit card required', but no durable developer free-tier quota is documented.",
      "integrationNotes": "Use /v1/language-models or the Management API model-list endpoint for live discovery. Prefer Responses API over deprecated Chat Completions. Treat STT as partial because public developer docs expose voice-agent audio input but not a standalone transcriptions API. Use /v1/tts/voices for live voice discovery."
    },
    "sources": [
      {
        "url": "https://docs.x.ai/developers/models",
        "title": "Models and Pricing | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/rest-api-reference",
        "title": "Inference REST API Overview | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "protocols",
          "auth"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/rest-api-reference/inference/models",
        "title": "Models | Inference API - REST API Reference | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "aliases",
          "live-discovery"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/model-capabilities/text/generate-text",
        "title": "Generate Text | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "openai-compat",
          "gRPC",
          "retention"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/model-capabilities/text/streaming",
        "title": "Streaming | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "streaming",
          "protocols"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/model-capabilities/audio/voice",
        "title": "Voice APIs | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "speech",
          "tts",
          "compliance",
          "voices"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/model-capabilities/audio/voice-agent",
        "title": "Voice Agent API | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "voice",
          "realtime",
          "limits",
          "formats"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/model-capabilities/audio/text-to-speech",
        "title": "Text to Speech | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "pricing",
          "languages",
          "voices",
          "limits"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/rest-api-reference/inference/voice",
        "title": "Voice | Inference API - REST API Reference | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "voices",
          "limits",
          "websocket-auth"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/advanced-api-usage/batch-api",
        "title": "Batch API | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "batch",
          "pricing"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/release-notes",
        "title": "Release Notes | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "release-dates",
          "status"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/regions",
        "title": "Regional Endpoints | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "data-residency"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/faq/security",
        "title": "FAQ - xAI API Security",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "privacy",
          "retention",
          "training",
          "zdr",
          "compliance"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/grpc-api-reference",
        "title": "gRPC API Reference | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "grpc",
          "protocols"
        ]
      },
      {
        "url": "https://x.ai/api",
        "title": "API: Frontier Models for Reasoning & Enterprise | xAI",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "public-availability"
        ]
      },
      {
        "url": "https://x.ai/api/voice",
        "title": "Voice API: Build Voice Agents That Speak, Think, and Act | xAI",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "speech",
          "stt",
          "voice-marketing",
          "pricing"
        ]
      },
      {
        "url": "https://x.ai/careers",
        "title": "Careers: Build AI That Advances Humanity | xAI",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "hq"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

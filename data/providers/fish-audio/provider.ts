import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "fish-audio",
    "providerName": "Fisch Audio",
    "categoryName": "Speech AI / Voice API",
    "hq": "Hanabi AI Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, United States",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.fish.audio/api-reference/introduction",
      "https://docs.fish.audio/developer-guide/models-pricing/models-overview",
      "https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits",
      "https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech",
      "https://docs.fish.audio/api-reference/endpoint/openapi-v1/speech-to-text",
      "https://docs.fish.audio/api-reference/endpoint/websocket/tts-live",
      "https://docs.fish.audio/api-reference/endpoint/model/list-models",
      "https://docs.fish.audio/api-reference/endpoint/model/create-model",
      "https://docs.fish.audio/developer-guide/models-pricing/deprecations",
      "https://docs.fish.audio/developer-guide/getting-started/changelog",
      "https://docs.fish.audio/developer-guide/core-features/speech-to-text",
      "https://fish.audio/terms/",
      "https://fish.audio/privacy/"
    ],
    "integration": {
      "catalogType": "Mixed fixed-plus-dynamic catalog: fixed TTS backends plus dynamic voice-model marketplace",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": false,
      "protocols": [
        "rest",
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Official API pricing is public for TTS only: s2-pro and s1 are each $15.00 per million UTF-8 bytes. No public official STT API price was found. API billing is pay-as-you-go with no subscription minimums.",
      "limits": "Officially documented limits include STT max 20 MB / 60 minutes / 1 second minimum, plus concurrency tiers of 5 requests (<$100 paid) and 15 requests (>= $100 paid). TTS request params document chunk_length 100-300 and min_chunk_length 0-100.",
      "region": "US company terms are published, and privacy terms include EEA/Switzerland/UK supplemental terms, but no API-region matrix or data residency control documentation was found.",
      "sttLanguages": "Automatic language detection is documented, but no official exhaustive STT language list or count was found.",
      "ttsLanguages": "s2-pro: 80+ languages with automatic language detection. s1: 13 listed languages (English, Chinese, Japanese, German, French, Spanish, Korean, Arabic, Russian, Dutch, Italian, Polish, Portuguese).",
      "freeTier": "Consumer plans include a free tier and the API credit endpoint exposes has_free_credit, but I did not find a clean official API free-credit amount for developers on the docs side.",
      "integrationNotes": "Expose fixed TTS backends s2-pro and s1 in stable pickers. Do not expose dynamic /model voice IDs as fixed picker entries; fetch them live. STT currently has no documented selectable model ID, so use a generic Fish Audio STT provider option rather than an STT model picker. Treat realtime TTS support for s2-pro as unresolved because docs conflict."
    },
    "sources": [
      {
        "url": "https://docs.fish.audio/api-reference/introduction",
        "title": "Introduction - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "auth",
          "tts",
          "stt",
          "websocket"
        ]
      },
      {
        "url": "https://docs.fish.audio/developer-guide/models-pricing/models-overview",
        "title": "Models Overview - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "tts",
          "languages",
          "limits"
        ]
      },
      {
        "url": "https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits",
        "title": "Pricing & Rate Limits - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech",
        "title": "Text to Speech - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "models",
          "limits",
          "realtime"
        ]
      },
      {
        "url": "https://docs.fish.audio/api-reference/endpoint/openapi-v1/speech-to-text",
        "title": "Speech to Text - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://docs.fish.audio/api-reference/endpoint/websocket/tts-live",
        "title": "WebSocket TTS Streaming - Fish Audio",
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
        "url": "https://docs.fish.audio/api-reference/sdk/javascript/api-reference",
        "title": "API Reference - Fish Audio JavaScript SDK",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "realtime",
          "sdk",
          "models",
          "voice-discovery"
        ]
      },
      {
        "url": "https://docs.fish.audio/api-reference/endpoint/model/list-models",
        "title": "List Models - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "voice-models",
          "dynamic-catalog"
        ]
      },
      {
        "url": "https://docs.fish.audio/api-reference/endpoint/model/create-model",
        "title": "Create Model - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "voice-models",
          "cloning",
          "dynamic-catalog",
          "limits"
        ]
      },
      {
        "url": "https://docs.fish.audio/developer-guide/models-pricing/deprecations",
        "title": "Model Deprecations - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "deprecations"
        ]
      },
      {
        "url": "https://docs.fish.audio/developer-guide/getting-started/changelog",
        "title": "Changelog - Fish Audio",
        "type": "official",
        "lastUpdated": "2026-03-01",
        "usedFor": [
          "models",
          "deprecations",
          "releases"
        ]
      },
      {
        "url": "https://docs.fish.audio/developer-guide/core-features/speech-to-text",
        "title": "Speech to Text Guide - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://fish.audio/terms/",
        "title": "Terms of Use - Fish Audio",
        "type": "official",
        "lastUpdated": "2024-08-18",
        "usedFor": [
          "regions",
          "company"
        ]
      },
      {
        "url": "https://fish.audio/privacy/",
        "title": "Privacy Policy - Fish Audio",
        "type": "official",
        "lastUpdated": "2024-08-28",
        "usedFor": [
          "regions",
          "privacy"
        ]
      },
      {
        "url": "https://fish.audio/plan/",
        "title": "Pricing & Plans - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "free-tier",
          "consumer-plans"
        ]
      },
      {
        "url": "https://docs.fish.audio/api-reference/endpoint/wallet/get-api-credit",
        "title": "Get API Credit - Fish Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "free-tier",
          "auth",
          "wallet"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

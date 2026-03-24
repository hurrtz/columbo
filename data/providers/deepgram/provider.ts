import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "categoryName": "Voice AI / Speech Infrastructure",
    "hq": "Unknown from official sources; official About page describes Deepgram as remote-first",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://developers.deepgram.com/reference/deepgram-api-overview",
      "https://developers.deepgram.com/docs/voice-agent-llm-models",
      "https://developers.deepgram.com/reference/voice-agent/think-models",
      "https://developers.deepgram.com/reference/manage/models/list",
      "https://developers.deepgram.com/docs/models-languages-overview",
      "https://developers.deepgram.com/docs/model",
      "https://developers.deepgram.com/docs/tts-models",
      "https://developers.deepgram.com/reference/api-rate-limits",
      "https://developers.deepgram.com/docs/pre-recorded-audio",
      "https://developers.deepgram.com/docs/text-to-speech-latency",
      "https://developers.deepgram.com/docs/streaming-text-to-speech",
      "https://developers.deepgram.com/reference/custom-endpoints",
      "https://deepgram.com/pricing",
      "https://developers.deepgram.com/guides/fundamentals/authenticating",
      "https://developers.deepgram.com/reference/auth/tokens/grant"
    ],
    "integration": {
      "catalogType": "Mixed fixed catalog + live discovery",
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
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "Public pricing exists for STT, TTS, and Voice Agent. No public token-in/token-out pricing is documented for Deepgram-managed Voice Agent LLMs; Voice Agent is priced per websocket minute by tier.",
      "limits": "Pre-recorded STT max file size 2 GB; processing-time timeout guidance 10 min for Nova/Base/Enhanced and 20 min for Whisper. TTS REST guidance indicates a 2000-character input limit per request for chunking. TTS streaming throughput is 2400 chars/min and active websocket timeout is 60 minutes. Flux recommends 80 ms audio chunks.",
      "region": "Hosted default endpoint plus EU endpoint, Dedicated endpoints, and Self-Hosted deployments. EU endpoint excludes Whisper models.",
      "sttLanguages": "Broad multilingual STT support. Flux is English-only. Nova-3 has the broadest current documented general catalog; pricing page markets 45+ languages.",
      "ttsLanguages": "Aura currently documents English, Spanish, German, French, Dutch, Italian, Japanese. Spanish Aura-2 is marked EA on the voices page.",
      "freeTier": "Signup includes $200 free credit.",
      "integrationNotes": "Treat STT/TTS as native Deepgram services. Treat LLM as Voice-Agent-only routed support, not a standalone Deepgram LLM API. Use /v1/models and /v1/agent/settings/think/models for discovery rather than assuming the docs are exhaustive forever."
    },
    "sources": [
      {
        "url": "https://developers.deepgram.com/reference/deepgram-api-overview",
        "title": "Deepgram API Overview",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://developers.deepgram.com/docs/voice-agent-llm-models",
        "title": "LLM Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://developers.deepgram.com/reference/voice-agent/think-models",
        "title": "Think Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://developers.deepgram.com/reference/manage/models/list",
        "title": "List All Available Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://developers.deepgram.com/docs/models-languages-overview",
        "title": "Models & Languages Overview",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://developers.deepgram.com/docs/model",
        "title": "Model Options",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://developers.deepgram.com/docs/tts-models",
        "title": "Voices and Languages",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://developers.deepgram.com/reference/api-rate-limits",
        "title": "API Rate Limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://developers.deepgram.com/docs/pre-recorded-audio",
        "title": "Pre-recorded Audio",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "stt"
        ]
      },
      {
        "url": "https://developers.deepgram.com/docs/text-to-speech-latency",
        "title": "Text to Speech Latency",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "tts"
        ]
      },
      {
        "url": "https://developers.deepgram.com/docs/streaming-text-to-speech",
        "title": "Streaming Text-to-Speech Getting Started",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "tts"
        ]
      },
      {
        "url": "https://developers.deepgram.com/reference/custom-endpoints",
        "title": "Configuring Custom Endpoints",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://deepgram.com/pricing",
        "title": "Deepgram Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "stt",
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://developers.deepgram.com/guides/fundamentals/authenticating",
        "title": "Authenticating",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://developers.deepgram.com/reference/auth/tokens/grant",
        "title": "Token-Based Authentication",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://deepgram.com/about",
        "title": "About Us | Voice AI | STT & TTS",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "minimax",
    "providerName": "Minimax",
    "categoryName": "Multimodal model platform",
    "hq": "Shanghai, China",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://platform.minimax.io/docs/api-reference/api-overview",
      "https://platform.minimax.io/docs/guides/models-intro",
      "https://platform.minimax.io/docs/guides/pricing-paygo",
      "https://platform.minimax.io/docs/guides/rate-limits",
      "https://platform.minimax.io/docs/api-reference/text-openai-api",
      "https://platform.minimax.io/docs/api-reference/text-anthropic-api",
      "https://platform.minimax.io/docs/api-reference/speech-t2a-intro",
      "https://platform.minimax.io/docs/api-reference/speech-t2a-http",
      "https://platform.minimax.io/docs/api-reference/speech-t2a-websocket",
      "https://platform.minimax.io/docs/api-reference/speech-t2a-async-intro",
      "https://platform.minimax.io/docs/release-notes/models"
    ],
    "integration": {
      "catalogType": "Docs-listed public catalog with no public list-models endpoint found",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse",
        "websocket"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "LLM pay-as-you-go starts at $0.30/M input and $1.20/M output for MiniMax-M2.7 / M2.5 / M2.1 / M2 / M2-her; highspeed variants are priced higher. TTS is $60/M characters for turbo speech models and $100/M characters for HD speech models. Voice cloning is $1.50/voice and voice design $3/voice.",
      "limits": "Text models: 204,800-token context, 500 RPM and 20,000,000 TPM. Synchronous TTS: 10,000 chars/request, 60 RPM and 20,000 TPM. WebSocket TTS session auto-closes after 120 seconds of inactivity. Async long-text TTS: up to 1,000,000 chars/request and query endpoint capped at 10 QPS.",
      "region": "Official docs instruct international users to use api.minimax.io and China users to use api.minimaxi.com for both OpenAI-compatible and Anthropic-compatible endpoints.",
      "sttLanguages": "No public STT API found, so no verified STT language coverage.",
      "ttsLanguages": "TTS docs state support for 40 languages; the WebSocket guide lists them explicitly.",
      "freeTier": "No general always-on free tier clearly documented. Token Plan and some launch promotions/free call promotions exist, but they are plan- or time-bound.",
      "integrationNotes": "Prefer OpenAI-compatible or Anthropic-compatible text integrations over the deprecated direct text endpoint. Use separate region-aware base URLs. TTS supports both HTTP and WebSocket; async long-form TTS is a separate task-based REST flow. No public STT/transcription endpoint was found."
    },
    "sources": [
      {
        "url": "https://platform.minimax.io/docs/api-reference/api-overview",
        "title": "API Overview - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "tts",
          "limits",
          "languages",
          "integration"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/guides/models-intro",
        "title": "Models - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "tts"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/guides/pricing-paygo",
        "title": "Pay as You Go - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models",
          "tts"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/guides/rate-limits",
        "title": "Rate Limits - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "models",
          "tts"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/text-openai-api",
        "title": "Compatible OpenAI API - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "models",
          "openai-compatible"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/text-anthropic-api",
        "title": "Compatible Anthropic API - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "models"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/text-post",
        "title": "Text Generation - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits",
          "deprecation"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/guides/text-chat",
        "title": "Text Chat - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/speech-t2a-intro",
        "title": "Text to Speech (T2A) - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "models",
          "voices",
          "limits"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/speech-t2a-http",
        "title": "Text to Speech (T2A) HTTP - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "models",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/speech-t2a-websocket",
        "title": "Text to Speech (T2A) WebSocket - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "realtime",
          "limits"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/guides/speech-t2a-websocket",
        "title": "Synchronous Text-to-Speech Guide (WebSocket) - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "models"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/speech-t2a-async-intro",
        "title": "Asynchronous Long-Text Speech Generation (T2A Async) - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "voices",
          "batch"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/speech-t2a-async-query",
        "title": "Query Speech Generation Task Status - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "batch"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/api-reference/voice-cloning-clone",
        "title": "Voice Clone - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "voice-cloning",
          "limits"
        ]
      },
      {
        "url": "https://platform.minimax.io/docs/release-notes/models",
        "title": "Models - Release Notes - MiniMax API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "status"
        ]
      },
      {
        "url": "https://www.minimax.io/about",
        "title": "About Us - MiniMax",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "company"
        ]
      },
      {
        "url": "https://www.bloomberg.com/profile/company/100:HK",
        "title": "Minimax Group Inc - Company Profile and News",
        "type": "secondary",
        "lastUpdated": null,
        "usedFor": [
          "hq"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

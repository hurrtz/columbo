import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "grok",
    "providerName": "Grok",
    "categoryName": "Audio API provider",
    "hq": "Palo Alto, California, USA",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.x.ai/developers/model-capabilities/audio/voice",
      "https://docs.x.ai/developers/rest-api-reference/inference/voice",
      "https://x.ai/api/voice"
    ],
    "integration": {
      "catalogType": "Dedicated standalone audio endpoints on x.ai infrastructure",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
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
      "pricing": "STT: $0.10/hr batch, $0.20/hr streaming. TTS: $4.20/1M characters.",
      "limits": "TTS: 600 RPM, 10 concurrent requests/team, max 15,000 chars/request; streaming WebSocket allows up to 50 concurrent sessions/team.",
      "region": "Hosted on api.x.ai; regional endpoints follow xAI's regional availability.",
      "sttLanguages": "25 languages with speaker diarization, word-level timestamps, and multichannel support.",
      "ttsLanguages": "20 languages/locale variants plus auto-detect; 5 voices (Ara, Eve, Leo, Rex, Sal).",
      "freeTier": "Unknown in developer docs. Uses xAI credits and the same xai-... API key as other xAI surfaces.",
      "integrationNotes": "Grok audio APIs are standalone endpoints separate from the xAI LLM/voice-agent surfaces. Same Bearer API key as xAI. Batch STT is POST /v1/stt with multipart; streaming STT is a WebSocket. TTS is POST /v1/tts returning MP3 binary."
    },
    "sources": [
      {
        "url": "https://docs.x.ai/developers/model-capabilities/audio/voice",
        "title": "Voice APIs | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "speech",
          "stt",
          "tts",
          "voices",
          "pricing"
        ]
      },
      {
        "url": "https://docs.x.ai/developers/rest-api-reference/inference/voice",
        "title": "Voice | Inference API - REST API Reference | xAI Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "endpoints",
          "request-schemas",
          "voices",
          "limits"
        ]
      },
      {
        "url": "https://x.ai/api/voice",
        "title": "Voice API: Build Voice Agents That Speak, Think, and Act | xAI",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "voice-marketing",
          "pricing"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

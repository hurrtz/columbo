import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "stepfun",
    "providerName": "Stepfun",
    "categoryName": "Foundation model API / multimodal AI platform",
    "hq": "Shanghai, China",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://platform.stepfun.com/docs/zh/overview/quickstart",
      "https://platform.stepfun.com/docs/zh/guide/openai",
      "https://platform.stepfun.com/docs/zh/api-reference/models/list",
      "https://platform.stepfun.com/docs/zh/llm/modeloverview",
      "https://platform.stepfun.com/docs/zh/llm/realtime",
      "https://platform.stepfun.com/docs/zh/llm/audio",
      "https://platform.stepfun.com/docs/zh/pricing/details",
      "https://platform.stepfun.com/docs/zh/api-reference/realtime/chat",
      "https://platform.stepfun.com/docs/zh/api-reference/audio/create_audio",
      "https://platform.stepfun.com/docs/zh/api-reference/audio/transcriptions",
      "https://platform.stepfun.com/docs/zh/api-reference/audio/asr-stream",
      "https://platform.stepfun.com/docs/zh/api-reference/files/create",
      "https://platform.stepfun.com/docs/zh/llm/model-lab",
      "https://platform.stepfun.com/docs/zh/step-plan/terms",
      "https://platform.stepfun.com/legal/privacy-policy.html"
    ],
    "integration": {
      "catalogType": "Provider-native API with live model listing endpoint",
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
      "pricing": "Official pricing is published in CNY, not USD. LLM and end-to-end audio models are priced per 1M tokens; STT is priced per hour; TTS is priced per 10k characters; voice cloning has a separate per-voice fee.",
      "limits": "TTS input max 1000 chars/request. Audio transcription upload files must be under 100 MB. Generic uploaded storage files can be up to 128 MB. Voice-clone reference audio for storage upload is documented as 5-10 seconds. Rate limits are account-tier based rather than model-specific.",
      "region": "Official docs identify the contracting entity as Shanghai \u9636\u8dc3\u661f\u8fb0\u667a\u80fd\u79d1\u6280\u6709\u9650\u516c\u53f8, but I found no public API-region selector or explicit data residency commitment.",
      "sttLanguages": "Model-dependent. step-asr is described as supporting Chinese, English, and multiple dialects; step-asr-1.1-stream is documented as Chinese and English only, excluding other languages and Chinese dialects.",
      "ttsLanguages": "Public docs describe controllable language labels for Cantonese, Sichuan dialect, and Japanese; no full voice-by-language inventory is published.",
      "freeTier": "No clear free tier or developer trial-credit page found in official docs. Some specific models/features are temporarily free or free-in-promo, e.g. step-audio-r1.1 pricing marked \u9650\u514d\u4e2d and Model Lab is free for testing.",
      "integrationNotes": "Use OpenAI-compatible base URL https://api.stepfun.com/v1 for standard API access. Realtime voice uses WebSocket at wss://api.stepfun.com/v1/realtime. Live model discovery via GET /v1/models is recommended because docs and examples include legacy and evolving model IDs."
    },
    "sources": [
      {
        "url": "https://platform.stepfun.com/docs/zh/overview/quickstart",
        "title": "\u5feb\u901f\u5f00\u59cb",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/guide/openai",
        "title": "\u4ece OpenAI \u8fc1\u79fb\u81f3\u9636\u8dc3\u661f\u8fb0",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "integration",
          "models"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/api-reference/models/list",
        "title": "\u67e5\u8be2Model\u5217\u8868",
        "type": "official",
        "lastUpdated": "2026-02-26",
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/llm/modeloverview",
        "title": "\u6a21\u578b\u80fd\u529b\u603b\u89c8",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/llm/realtime",
        "title": "\u5b9e\u65f6\u8bed\u97f3\u4e92\u52a8\u6a21\u578b",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "models",
          "limits",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/llm/audio",
        "title": "\u8bed\u97f3\u5927\u6a21\u578b",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "models",
          "stt",
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/pricing/details",
        "title": "\u5b9a\u4ef7\u4e0e\u9650\u901f",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "pricing",
          "limits",
          "models"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/api-reference/realtime/chat",
        "title": "\u53cc\u5411\u5b9e\u65f6\u8bed\u97f3",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "tts",
          "limits",
          "models"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/api-reference/audio/create_audio",
        "title": "\u8bed\u97f3\u5408\u6210",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/api-reference/audio/transcriptions",
        "title": "\u97f3\u9891\u8f6c\u5199",
        "type": "official",
        "lastUpdated": "2026-02-25",
        "usedFor": [
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/api-reference/audio/asr-stream",
        "title": "\u6d41\u5f0f\u8bed\u97f3\u8bc6\u522b\u670d\u52a1",
        "type": "official",
        "lastUpdated": "2026-02-25",
        "usedFor": [
          "stt",
          "limits",
          "models"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/api-reference/files/create",
        "title": "\u4e0a\u4f20\u6587\u4ef6",
        "type": "official",
        "lastUpdated": "2026-02-26",
        "usedFor": [
          "limits",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/llm/model-lab",
        "title": "Model Lab - Step-GUI",
        "type": "official",
        "lastUpdated": "2026-03-13",
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://platform.stepfun.com/docs/zh/step-plan/terms",
        "title": "StepPlan\u4ed8\u8d39\u670d\u52a1\u534f\u8bae",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "regions",
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://platform.stepfun.com/legal/privacy-policy.html",
        "title": "\u9690\u79c1\u653f\u7b56",
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

import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "categoryName": "Foundation model provider / AI API platform",
    "hq": "Paris, France",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.mistral.ai/",
      "https://docs.mistral.ai/getting-started/models",
      "https://docs.mistral.ai/api/endpoint/models",
      "https://docs.mistral.ai/api/endpoint/chat",
      "https://docs.mistral.ai/capabilities/audio_transcription",
      "https://docs.mistral.ai/capabilities/audio_transcription/offline_transcription",
      "https://docs.mistral.ai/capabilities/audio_transcription/realtime_transcription",
      "https://docs.mistral.ai/studio-api/audio/text_to_speech",
      "https://docs.mistral.ai/api/endpoint/audio/speech",
      "https://docs.mistral.ai/deployment/ai-studio/tier",
      "https://docs.mistral.ai/capabilities/batch",
      "https://docs.mistral.ai/api/endpoint/batch",
      "https://docs.mistral.ai/api/endpoint/files",
      "https://docs.mistral.ai/getting-started/changelog",
      "https://mistral.ai/legal",
      "https://help.mistral.ai/en/articles/347629-where-do-you-store-my-data-or-my-organization-s-data",
      "https://docs.mistral.ai/deployment/self-deployment"
    ],
    "integration": {
      "catalogType": "Official docs + live API model listing",
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
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "Public per-model pricing is documented on individual model pages. General LLM pricing ranges from $0.10/M in and $0.10/M out (Ministral 3 3B) up to $2/M in and $5/M out (Magistral Medium 1.2). Native STT pricing is public at $0.003/min for Voxtral Mini Transcribe 2 and $0.006/min for Voxtral Mini Transcribe Realtime. Voxtral TTS output is $16/M characters.",
      "limits": "Context windows are model-specific (32k, 128k, 256k documented across current models). Offline transcription supports up to 3 hours per request. File uploads are documented up to 512 MB per individual file. Batch jobs default to 24 hours timeout. Inline batching is supported for <10k requests and file batching up to 1M requests.",
      "region": "Public help-center guidance says data is hosted in the EU by default, with an explicit US API endpoint available for US hosting. Enterprise/self-host/private-cloud deployment options are also marketed.",
      "sttLanguages": "Officially documented as 13 languages for Voxtral transcription: English, Chinese, Hindi, Spanish, Arabic, French, Portuguese, Russian, German, Japanese, Korean, Italian, Dutch.",
      "ttsLanguages": "Voxtral TTS supports English, French, Spanish, Portuguese, Italian, Dutch, German, Hindi, and Arabic.",
      "freeTier": "There is a documented free API tier, but the docs characterize it as restrictive and instruct users to check workspace limits for current rate/usage details.",
      "integrationNotes": "Use canonical dated IDs for stable picker entries, but keep aliases separately. Alias behavior is endpoint-scoped in at least one case (`voxtral-mini-latest`). Use `/v1/models` for live discovery. Treat rate limits as dynamic. Speech generation uses POST `/v1/audio/speech` and returns base64 `audio_data`; a saved preset/custom `voice_id` or reference audio is required."
    },
    "sources": [
      {
        "url": "https://mistral.ai/legal",
        "title": "Legal notice",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://docs.mistral.ai/",
        "title": "Documentation home",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://docs.mistral.ai/getting-started/models",
        "title": "Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/api/endpoint/models",
        "title": "Models Endpoints",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/api/endpoint/chat",
        "title": "Chat Endpoints",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/capabilities/audio_transcription",
        "title": "Audio & Transcription",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "regions"
        ]
      },
      {
        "url": "https://docs.mistral.ai/capabilities/audio_transcription/offline_transcription",
        "title": "Offline Transcription",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/capabilities/audio_transcription/realtime_transcription",
        "title": "Realtime Transcription",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/deployment/ai-studio/tier",
        "title": "Rate Limits & Usage tiers",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://docs.mistral.ai/capabilities/batch",
        "title": "Batch Inference",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/api/endpoint/batch",
        "title": "Batch Endpoints",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/api/endpoint/files",
        "title": "Files Endpoints",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.mistral.ai/getting-started/changelog",
        "title": "Changelog",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://help.mistral.ai/en/articles/347629-where-do-you-store-my-data-or-my-organization-s-data",
        "title": "Where do you store my data or my Organization's data?",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://docs.mistral.ai/deployment/self-deployment",
        "title": "Self-Deployment",
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

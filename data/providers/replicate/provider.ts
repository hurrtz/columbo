import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "categoryName": "Hosted model marketplace / inference API",
    "hq": "Unknown in official sources; secondary sources commonly place it in San Francisco, CA, USA",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "routed",
      "tts": "routed"
    },
    "officialSources": [
      "https://replicate.com/docs/reference/how-does-replicate-work",
      "https://replicate.com/docs/topics/models/official-models",
      "https://replicate.com/docs/topics/models/community-models",
      "https://replicate.com/collections/language-models",
      "https://replicate.com/collections/speech-to-text",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/docs/reference/http",
      "https://replicate.com/docs/topics/predictions/streaming",
      "https://replicate.com/docs/topics/predictions/create-a-prediction",
      "https://replicate.com/docs/topics/predictions/rate-limits",
      "https://replicate.com/docs/topics/predictions/input-files",
      "https://replicate.com/docs/topics/predictions/data-retention",
      "https://replicate.com/docs/topics/security/api-tokens",
      "https://replicate.com/pricing",
      "https://replicate.com/enterprise",
      "https://replicate.com/docs/topics/site-policy/subprocessors"
    ],
    "integration": {
      "catalogType": "Hosted marketplace with official + community + custom-pushed models",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": false,
      "protocols": [
        "rest",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Replicate pricing is mixed: most public/community models are billed by runtime/hardware, while official models use predictable metrics such as input/output tokens or other task-specific units. Per-model pricing is shown on each model page. https://replicate.com/pricing ; https://replicate.com/docs/topics/models/official-models",
      "limits": "Public docs show 600 prediction-creation requests/minute, 3000 requests/minute for other endpoints, local file uploads up to 100 MB, data-URI input only recommended under 1 MB, and sync-mode wait default 60 seconds. https://replicate.com/docs/topics/predictions/rate-limits ; https://replicate.com/docs/topics/predictions/input-files ; https://replicate.com/docs/topics/predictions/create-a-prediction",
      "region": "Enterprise security/compliance is documented, but public docs do not expose customer-selectable regions or data residency controls. Published subprocessors are listed with US locations. https://replicate.com/enterprise ; https://replicate.com/docs/topics/site-policy/subprocessors",
      "sttLanguages": "Replicate exposes STT as hosted models. Public STT collection copy says models can transcribe/translate speech in 100+ languages, but model-specific language lists are not consistently surfaced on Replicate pages. Treat language coverage as model-specific and often under-documented on Replicate itself. https://replicate.com/collections/speech-to-text",
      "ttsLanguages": "Replicate exposes TTS as hosted models. Current official/public TTS pages explicitly document 15 languages for Inworld TTS 1.5 and 32-40+ languages for current MiniMax Speech 2.8 models. https://replicate.com/inworld/tts-1.5-max ; https://replicate.com/inworld/tts-1.5-mini ; https://replicate.com/minimax/speech-2.8-turbo ; https://replicate.com/minimax/speech-2.8-hd",
      "freeTier": "Replicate advertises 'Try for free' and a 'Try for Free' model collection, but free usage is model-specific rather than a simple universal permanent free tier. https://replicate.com/collections/try-for-free ; https://replicate.com/",
      "integrationNotes": "Use official models for stable app pickers. Community models should generally stay behind live discovery because Replicate requires explicit version hashes for them and warns that APIs/pricing/availability may vary by version and creator. Streaming is SSE only. Replicate is not a drop-in OpenAI-compatible provider API. https://replicate.com/docs/topics/models/official-models ; https://replicate.com/docs/topics/models/community-models ; https://replicate.com/docs/topics/predictions/streaming"
    },
    "sources": [
      {
        "url": "https://replicate.com/docs/reference/how-does-replicate-work",
        "title": "How does Replicate work?",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "provider",
          "integration"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/models/official-models",
        "title": "Official models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "integration"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/models/community-models",
        "title": "Community models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/models/versions",
        "title": "Model versions",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://replicate.com/collections/language-models",
        "title": "Large Language Models (LLMs)",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "llm"
        ]
      },
      {
        "url": "https://replicate.com/collections/speech-to-text",
        "title": "Speech-to-text collection",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "models",
          "languages"
        ]
      },
      {
        "url": "https://replicate.com/collections/text-to-speech",
        "title": "Text-to-speech collection",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "models",
          "languages"
        ]
      },
      {
        "url": "https://replicate.com/pricing",
        "title": "Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/predictions/rate-limits",
        "title": "Rate limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/predictions/input-files",
        "title": "Input files",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/predictions/create-a-prediction",
        "title": "Create a prediction",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "realtime",
          "batch"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/predictions/streaming",
        "title": "Streaming output",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "realtime",
          "protocols",
          "llm"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/predictions/data-retention",
        "title": "Data retention",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "region",
          "limits"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/security/api-tokens",
        "title": "API tokens",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration"
        ]
      },
      {
        "url": "https://replicate.com/enterprise",
        "title": "Enterprise",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "region",
          "compliance"
        ]
      },
      {
        "url": "https://replicate.com/docs/topics/site-policy/subprocessors",
        "title": "Subprocessors",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "region",
          "compliance"
        ]
      },
      {
        "url": "https://replicate.com/openai/gpt-4o-mini",
        "title": "openai/gpt-4o-mini",
        "type": "official",
        "lastUpdated": "2025-05-15",
        "usedFor": [
          "llm",
          "models",
          "pricing"
        ]
      },
      {
        "url": "https://replicate.com/openai/gpt-4o-transcribe",
        "title": "openai/gpt-4o-transcribe",
        "type": "official",
        "lastUpdated": "2025-05-20",
        "usedFor": [
          "stt",
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://replicate.com/openai/gpt-4o-mini-transcribe",
        "title": "openai/gpt-4o-mini-transcribe",
        "type": "official",
        "lastUpdated": "2025-05-20",
        "usedFor": [
          "stt",
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://replicate.com/inworld/tts-1.5-mini",
        "title": "inworld/tts-1.5-mini",
        "type": "official",
        "lastUpdated": "2026-03-10",
        "usedFor": [
          "tts",
          "models",
          "pricing",
          "languages"
        ]
      },
      {
        "url": "https://replicate.com/inworld/tts-1.5-max",
        "title": "inworld/tts-1.5-max",
        "type": "official",
        "lastUpdated": "2026-03-10",
        "usedFor": [
          "tts",
          "models",
          "pricing",
          "languages"
        ]
      },
      {
        "url": "https://replicate.com/minimax/speech-2.8-turbo",
        "title": "minimax/speech-2.8-turbo",
        "type": "official",
        "lastUpdated": "2026-02-05",
        "usedFor": [
          "tts",
          "models",
          "pricing",
          "languages"
        ]
      },
      {
        "url": "https://replicate.com/minimax/speech-2.8-hd",
        "title": "minimax/speech-2.8-hd",
        "type": "official",
        "lastUpdated": "2026-02-05",
        "usedFor": [
          "tts",
          "models",
          "languages",
          "limits"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "novita-ai",
    "providerName": "Novita AI",
    "categoryName": "Multi-model inference marketplace / API gateway",
    "hq": "156 2ND STREET, SAN FRANCISCO, CA 94105",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "routed",
      "tts": "routed"
    },
    "officialSources": [
      "https://novita.ai/",
      "https://novita.ai/models",
      "https://novita.ai/pricing",
      "https://novita.ai/docs/api-reference/api-reference-overview",
      "https://novita.ai/docs/api-reference/model-apis-introduction",
      "https://novita.ai/docs/api-reference/model-apis-llm-list-models",
      "https://novita.ai/docs/api-reference/model-apis-glm-asr",
      "https://novita.ai/docs/api-reference/model-apis-glm-tts",
      "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-hd",
      "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-turbo",
      "https://novita.ai/docs/api-reference/model-apis-minimax-speech-2.6-hd",
      "https://novita.ai/docs/api-reference/model-apis-minimax-speech-2.8-hd",
      "https://novita.ai/docs/api-reference/model-apis-minimax-voice-cloning",
      "https://novita.ai/docs/api-reference/model-apis-txt2speech",
      "https://novita.ai/docs/api-reference/basic-authentication",
      "https://novita.ai/docs/guides/llm-batch-api",
      "https://novita.ai/docs/guides/model-apis-rate-limits",
      "https://novita.ai/legal/privacy-policy",
      "https://novita.ai/legal/terms-of-service"
    ],
    "integration": {
      "catalogType": "Hosted multi-provider marketplace with OpenAI-compatible LLM layer plus separate REST audio endpoints",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "LLM pricing is live-discoverable per model via /openai/v1/models and model detail pages. Public audio pricing is partial: MiniMax speech-02-hd $80/1M chars, speech-02-turbo $48/1M chars, speech-2.5-hd-preview $80/1M chars, speech-2.5-turbo-preview $48/1M chars, speech-2.6-hd $100/1M chars, speech-2.6-turbo $60/1M chars. GLM ASR/TTS and MiniMax 2.8 public pricing was not verified on the official pricing page.",
      "limits": "LLM batch completion window fixed at 48h. Batch input must be .jsonl and single-model per file. GLM ASR is limited to wav/mp3, <=25 MB, <=30 seconds. MiniMax sync TTS endpoints are generally <10,000 chars. MiniMax async long-TTS docs say up to 1,000,000 chars at a high level, but one endpoint field description says 50,000 chars; this is a documented conflict. GLM TTS input limit is 1024 chars.",
      "region": "US company address is public. Homepage claims globally distributed GPUs, but public model-API region/data residency controls were not verified. HIPAA/FISMA/GLBA-tailored compliance is explicitly disclaimed in terms.",
      "sttLanguages": "Publicly documented as multi-language for GLM-ASR-2512, but no full official language list was found.",
      "ttsLanguages": "MiniMax Speech-02 changelog says 32 languages; MiniMax Speech-2.6 docs say 40 languages; MiniMax 2.8 docs expose a long language_boost list; old txt2speech page visibly lists English, Chinese, Japanese; GLM TTS language coverage is not clearly enumerated.",
      "freeTier": "Unknown from the official sources reviewed.",
      "integrationNotes": "Use live discovery for LLMs via /openai/v1/models. Treat speech as separate REST integrations, not OpenAI-compatible. Prefer model-specific audio endpoints over legacy txt2speech. Avoid hardcoding the full Novita LLM catalog."
    },
    "sources": [
      {
        "url": "https://novita.ai/",
        "title": "Novita AI - AI & Agent Cloud for Developers",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "provider",
          "catalog",
          "regions",
          "hq"
        ]
      },
      {
        "url": "https://novita.ai/models",
        "title": "Model Library With 200+ APIs for AI Applications",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "catalog",
          "pricing"
        ]
      },
      {
        "url": "https://novita.ai/pricing",
        "title": "Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "batch"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/api-reference-overview",
        "title": "API Reference Overview",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "protocols",
          "auth",
          "models",
          "stt",
          "tts",
          "batch"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-introduction",
        "title": "Introduction - Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "openai_compatibility"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-llm-list-models",
        "title": "List models - Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "pricing",
          "limits",
          "dynamic_catalog"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-glm-asr",
        "title": "GLM Audio to Text - Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-glm-tts",
        "title": "GLM Text to Speech - Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "voices"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-hd",
        "title": "MiniMax Speech-02-hd Text to Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "voices",
          "languages"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-turbo",
        "title": "MiniMax Speech-02-turbo Text to Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "voices",
          "streaming"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-turbo-async",
        "title": "MiniMax Speech-02-turbo Async Long TTS",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "voices"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-minimax-speech-2.6-hd",
        "title": "MiniMax Speech-2.6-hd Text to Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-minimax-speech-2.8-hd",
        "title": "MiniMax Speech 2.8 HD Sync Text-to-Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "languages",
          "streaming"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-minimax-voice-cloning",
        "title": "MiniMax Quick Voice Cloning",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/model-apis-txt2speech",
        "title": "Novita AI Text-To-Speech API",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages"
        ]
      },
      {
        "url": "https://novita.ai/docs/api-reference/basic-authentication",
        "title": "Authentication",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "auth"
        ]
      },
      {
        "url": "https://novita.ai/docs/guides/llm-batch-api",
        "title": "Batch Inference",
        "type": "official",
        "lastUpdated": "2025-08-11",
        "usedFor": [
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://novita.ai/docs/guides/model-apis-rate-limits",
        "title": "Rate limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://novita.ai/docs/changelog/28-04-25--30-04-25",
        "title": "April 30, 2025 Product Updates",
        "type": "official",
        "lastUpdated": "2025-04-30",
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://novita.ai/docs/changelog/07-07-25--11-07-25",
        "title": "July 11, 2025 Product Updates",
        "type": "official",
        "lastUpdated": "2025-07-10",
        "usedFor": [
          "tts",
          "languages"
        ]
      },
      {
        "url": "https://novita.ai/legal/privacy-policy",
        "title": "Privacy Policy",
        "type": "official",
        "lastUpdated": "2025-03-04",
        "usedFor": [
          "region",
          "compliance"
        ]
      },
      {
        "url": "https://novita.ai/legal/terms-of-service",
        "title": "Terms of Service",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "compliance",
          "marketplace"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

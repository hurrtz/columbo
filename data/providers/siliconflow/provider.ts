import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "siliconflow",
    "providerName": "Siliconflow",
    "categoryName": "Hosted multi-model AI inference and model marketplace",
    "hq": "Singapore (inference from 'SILICONFLOW TECHNOLOGY PTE. LTD.'; exact HQ city not verified on an official company page)",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.siliconflow.com/en/userguide/quickstart",
      "https://docs.siliconflow.com/en/api-reference/chat-completions/chat-completions",
      "https://docs.siliconflow.com/en/api-reference/chat-completions/messages",
      "https://docs.siliconflow.com/en/api-reference/audio/create-audio-transcriptions",
      "https://docs.siliconflow.com/en/api-reference/audio/create-speech",
      "https://docs.siliconflow.com/en/userguide/capabilities/text-to-speech",
      "https://docs.siliconflow.com/cn/api-reference/models/get-model-list",
      "https://www.siliconflow.com/pricing",
      "https://docs.siliconflow.com/en/release-notes/overview",
      "https://docs.siliconflow.com/en/legals/terms-of-service",
      "https://docs.siliconflow.com/en/userguide/introduction"
    ],
    "integration": {
      "catalogType": "Hosted marketplace / dynamic model catalog behind a unified API",
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
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "Public pricing exists for many LLMs and TTS models. LLM pricing is per 1M tokens on model pages and the pricing page. TTS pricing is shown as per 1M UTF-8 bytes on model pages, while the pricing page also says TTS prices are per 1,000 characters. STT pricing unit is publicly described as per minute of audio, but exact per-model STT prices were not cleanly attributable in accessible official docs.",
      "limits": "Model limits are per-model and dynamic. Quick Start says the authenticated Models page shows pricing and maximum usage limits. Publicly verified limits include TTS input length 1-128000 characters, reference audio under 30 seconds, recommended reference audio length 8-10 seconds, and model-specific LLM context windows on model pages. Public STT file-size and max-duration limits were not verified.",
      "region": "Terms of Use say the service is not available for users located in mainland China; those users should use https://siliconflow.cn. For global users, docs and integrations use https://api.siliconflow.com/v1.",
      "sttLanguages": "Unknown in SiliconFlow\u2019s public STT endpoint docs. STT model IDs are documented, but language coverage was not listed in accessible official STT docs.",
      "ttsLanguages": "Fish-Speech-1.5 explicitly lists 13 languages. CosyVoice2-0.5B explicitly supports cross-language synthesis for Chinese, English, Japanese, Korean, and listed Chinese dialects. IndexTTS-2 language coverage was not explicitly listed in accessible official SiliconFlow docs.",
      "freeTier": "$1 in free credits is publicly advertised on the pricing page and login flow.",
      "integrationNotes": "Use live model discovery via GET /v1/models where possible. Treat SiliconFlow as a dynamic hosted catalog, not a fixed vendor catalog. OpenAI compatibility is substantial but not universal. For voice, prefer dedicated STT/TTS APIs over trying to infer speech support from chat models."
    },
    "sources": [
      {
        "url": "https://docs.siliconflow.com/en/userguide/quickstart",
        "title": "Quick Start - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits",
          "integrationNotes",
          "freeTier"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/api-reference/chat-completions/chat-completions",
        "title": "Chat completions - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/api-reference/chat-completions/messages",
        "title": "messages - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits",
          "integrationNotes"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/api-reference/audio/create-audio-transcriptions",
        "title": "Create transcription - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/api-reference/audio/create-speech",
        "title": "Create speech - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/userguide/capabilities/text-to-speech",
        "title": "Text-to-speech - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "limits",
          "models"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/cn/api-reference/models/get-model-list",
        "title": "\u83b7\u53d6\u7528\u6237\u6a21\u578b\u5217\u8868 - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits",
          "integrationNotes"
        ]
      },
      {
        "url": "https://www.siliconflow.com/pricing",
        "title": "Pricing Plans - SiliconFlow | Transparent Pay-as-You-Go",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models",
          "freeTier"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/release-notes/overview",
        "title": "Release notes - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "deprecations"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/legals/terms-of-service",
        "title": "Terms of Use - SiliconFlow",
        "type": "official",
        "lastUpdated": "2025-03-31",
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://docs.siliconflow.com/en/userguide/introduction",
        "title": "Product introduction - SiliconFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "region",
          "integrationNotes"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "xiaomi-mimo",
    "providerName": "Xiaomi Mimo",
    "categoryName": "Foundation models / multimodal / speech",
    "hq": "Beijing, China",
    "verifiedSupport": {
      "llm": "native",
      "stt": "partial",
      "tts": "native"
    },
    "officialSources": [
      "https://mimo.xiaomi.com/",
      "https://platform.xiaomimimo.com/",
      "https://mimo.xiaomi.com/mimo-v2-pro",
      "https://mimo.xiaomi.com/mimo-v2-omni",
      "https://mimo.xiaomi.com/mimo-v2-tts",
      "https://mimo.xiaomi.com/blog/mimo-v2-flash",
      "https://github.com/XiaomiMiMo/MiMo-V2-Flash"
    ],
    "integration": {
      "catalogType": "First-party hosted API platform plus separate open-source/research repos",
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
      "pricing": "Officially verified: MiMo-V2-Pro is $1/M input and $3/M output up to 256K context, or $2/M input and $6/M output from 256K-1M, with cache read $0.20/$0.40 and cache write temporarily free. MiMo-V2-Flash pricing appears in secondary reporting as $0.1/M input, $0.01/M cached input, and $0.3/M output for overseas pricing. MiMo-V2-Omni pricing appears in secondary reporting as $0.40/M input and $2/M output. No first-party public TTS price page was found.",
      "limits": "Officially verified: MiMo-V2-Pro supports up to 1M-token context; MiMo-V2-Flash open weights support 256K context; MiMo-V2-Omni is described as supporting over 10 hours of continuous audio understanding. No public first-party file-size, chunk-size, upload-size, or session-duration documentation was found.",
      "region": "Xiaomi is headquartered in Beijing, China. I found no first-party API-region or data-residency matrix.",
      "sttLanguages": "Unknown for a standalone STT API. MiMo-V2-Omni can understand audio and long-form audio, but no dedicated transcription-language list was found.",
      "ttsLanguages": "First-party evidence supports Chinese and English today, with dialect handling examples and future language expansion planned.",
      "freeTier": "Promotional rather than durable: Xiaomi advertised one-week free API access for MiMo-V2-Pro through partner agent frameworks, and MiMo-V2-Flash was previously marketed as limited-time free.",
      "integrationNotes": "Treat Xiaomi MiMo as a live-discovery provider. Stable picker-safe today: mimo-v2-flash. Pro/Omni/TTS are real public API models, but public crawlable API docs are thinner than the marketing/model pages. OpenAI-compatible behavior is well-supported for chat completions; Anthropic-compatible support is also indicated at platform/integration level. TTS endpoint compatibility with OpenAI audio/speech remains under-documented."
    },
    "sources": [
      {
        "url": "https://mimo.xiaomi.com/",
        "title": "Xiaomi MiMo home",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://platform.xiaomimimo.com/",
        "title": "Xiaomi MiMo API Open Platform",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "integration"
        ]
      },
      {
        "url": "https://mimo.xiaomi.com/mimo-v2-pro",
        "title": "Xiaomi MiMo-V2-Pro",
        "type": "official",
        "lastUpdated": "2026-03-18",
        "usedFor": [
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://mimo.xiaomi.com/mimo-v2-omni",
        "title": "Xiaomi MiMo-V2-Omni",
        "type": "official",
        "lastUpdated": "2026-03-18",
        "usedFor": [
          "models",
          "limits",
          "stt"
        ]
      },
      {
        "url": "https://mimo.xiaomi.com/mimo-v2-tts",
        "title": "Xiaomi MiMo-V2-TTS",
        "type": "official",
        "lastUpdated": "2026-03-18",
        "usedFor": [
          "models",
          "tts",
          "languages"
        ]
      },
      {
        "url": "https://mimo.xiaomi.com/blog/mimo-v2-flash",
        "title": "Introducing MiMo-V2-Flash",
        "type": "official",
        "lastUpdated": "2025-12-16",
        "usedFor": [
          "models",
          "freeTier"
        ]
      },
      {
        "url": "https://github.com/XiaomiMiMo/MiMo-V2-Flash",
        "title": "MiMo-V2-Flash GitHub repository",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.litellm.ai/docs/providers/xiaomi_mimo",
        "title": "LiteLLM Xiaomi MiMo provider docs",
        "type": "secondary",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "models",
          "limits"
        ]
      },
      {
        "url": "https://github.com/coollabsio/openclaw/blob/main/README.md",
        "title": "OpenClaw README",
        "type": "secondary",
        "lastUpdated": null,
        "usedFor": [
          "integration"
        ]
      },
      {
        "url": "https://ir.mi.com/investor-resources/ir-contacts/",
        "title": "Xiaomi IR contacts",
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

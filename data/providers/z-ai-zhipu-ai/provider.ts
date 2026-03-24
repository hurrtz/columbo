import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "z-ai-zhipu-ai",
    "providerName": "Z.ai / Zhipu AI",
    "categoryName": "Foundation models and speech APIs",
    "hq": "Singapore (Z.ai operator: JINGSHENG HENGXING TECHNOLOGY PTE.LTD); Beijing, China (BigModel operator: Beijing Zhipu Huazhang Technology Co., Ltd.)",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "partial"
    },
    "officialSources": [
      "https://docs.z.ai/api-reference/introduction",
      "https://docs.z.ai/api-reference/llm/chat-completion",
      "https://docs.z.ai/guides/overview/pricing",
      "https://docs.z.ai/api-reference/audio/audio-transcriptions",
      "https://docs.bigmodel.cn/cn/guide/start/model-overview",
      "https://docs.bigmodel.cn/cn/guide/develop/openai/introduction",
      "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3",
      "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E9%9F%B3%E8%89%B2%E5%A4%8D%E5%88%BB",
      "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-realtime",
      "https://docs.bigmodel.cn/cn/asyncapi/realtime"
    ],
    "integration": {
      "catalogType": "Region-split first-party API catalogs",
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
      "pricing": "International Z.ai text-model pricing is public in USD per 1M tokens. BigModel speech pricing is partly public but often shown in RMB or only via pricing console links.",
      "limits": "Text model output limits are documented; STT has a strict 25 MB / 30 s upload cap. Realtime has documented 2-minute conversation memory and plan-tier concurrency.",
      "region": "Z.ai global uses api.z.ai and Singapore legal entity; BigModel mainland uses open.bigmodel.cn and Beijing legal entity.",
      "sttLanguages": "GLM-ASR-2512 is explicitly multilingual: Mandarin plus Sichuanese, Cantonese, Minnan, Wu; US/UK English; French, German, Japanese, Korean, Spanish, Arabic, and dozens more.",
      "ttsLanguages": "Global Z.ai docs do not document TTS. BigModel documents TTS/voice APIs, but explicit TTS language coverage is not fully enumerated; GLM-4-Voice is explicitly Chinese+English bilingual.",
      "freeTier": "BigModel homepage snippet advertises 20 million free tokens on signup; Z.ai global docs do not document a general free API tier in the same way.",
      "integrationNotes": "Use lowercase canonical model IDs from API enums. Treat uppercase marketing names as aliases only. Split catalog by region. Do not expose glm-4.7-flash internationally unless verified in-account. Do not promote glm-4.5-flash on mainland because it is marked as about to be taken offline."
    },
    "sources": [
      {
        "url": "https://docs.z.ai/api-reference/introduction",
        "title": "Introduction - Z.AI DEVELOPER DOCUMENT",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "regions",
          "limits"
        ]
      },
      {
        "url": "https://docs.z.ai/api-reference/llm/chat-completion",
        "title": "Chat Completion - Z.AI DEVELOPER DOCUMENT",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.z.ai/guides/overview/pricing",
        "title": "Pricing - Z.AI DEVELOPER DOCUMENT",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models"
        ]
      },
      {
        "url": "https://docs.z.ai/api-reference/audio/audio-transcriptions",
        "title": "Audio Transcriptions - Z.AI DEVELOPER DOCUMENT",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://docs.bigmodel.cn/cn/guide/start/model-overview",
        "title": "\u6a21\u578b\u6982\u89c8 - \u667a\u8c31AI\u5f00\u653e\u6587\u6863",
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
        "url": "https://docs.bigmodel.cn/cn/guide/develop/openai/introduction",
        "title": "OpenAI API \u517c\u5bb9 - \u667a\u8c31AI\u5f00\u653e\u6587\u6863",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3",
        "title": "\u6587\u672c\u8f6c\u8bed\u97f3 - \u667a\u8c31AI\u5f00\u653e\u6587\u6863",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E9%9F%B3%E8%89%B2%E5%A4%8D%E5%88%BB",
        "title": "\u97f3\u8272\u590d\u523b - \u667a\u8c31AI\u5f00\u653e\u6587\u6863",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-realtime",
        "title": "GLM-Realtime - \u667a\u8c31AI\u5f00\u653e\u6587\u6863",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://docs.bigmodel.cn/cn/asyncapi/realtime",
        "title": "\u97f3\u89c6\u9891\u901a\u8bdd - \u667a\u8c31AI\u5f00\u653e\u6587\u6863",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "integration"
        ]
      },
      {
        "url": "https://docs.z.ai/legal-agreement/privacy-policy",
        "title": "Privacy Policy - Z.AI DEVELOPER DOCUMENT",
        "type": "official",
        "lastUpdated": "2025-09-29",
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://docs.bigmodel.cn/cn/terms/privacy-policy",
        "title": "\u9690\u79c1\u653f\u7b56 - \u667a\u8c31AI\u5f00\u653e\u6587\u6863",
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

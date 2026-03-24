import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "categoryName": "Foundation models + speech APIs",
    "hq": "Beijing, China",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://www.volcengine.com/docs/82379",
      "https://www.volcengine.com/docs/82379/1099455",
      "https://www.volcengine.com/docs/82379/1330310",
      "https://www.volcengine.com/docs/82379/1330626",
      "https://www.volcengine.com/docs/82379/1298459",
      "https://www.volcengine.com/docs/82379/1494384",
      "https://www.volcengine.com/docs/82379/1569618",
      "https://www.volcengine.com/docs/82379/1262849",
      "https://www.volcengine.com/docs/82379/1262847",
      "https://www.volcengine.com/docs/82379/1350667",
      "https://www.volcengine.com/docs/82379/1104498",
      "https://www.volcengine.com/docs/6561/111521",
      "https://www.volcengine.com/docs/6561/1354871",
      "https://www.volcengine.com/docs/6561/1257543",
      "https://www.volcengine.com/docs/6561/1354869",
      "https://www.volcengine.com/docs/6561/1354868",
      "https://www.volcengine.com/docs/6561/1594356",
      "https://www.volcengine.com/docs/6561/1359370",
      "https://www.volcengine.com/docs/6561/1257544"
    ],
    "integration": {
      "catalogType": "Split catalog: Ark for LLMs, Doubao Speech for STT/TTS",
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
      "pricing": "LLM pricing is public on Ark but the accessible text is partially JS-rendered; exact per-model tier tables should be live-read from Ark pricing. Speech pricing is public and easier to verify: big-model streaming ASR starts at 4 yuan/hour, big-model file ASR standard at 2 yuan/hour, big-model TTS at 4.5 yuan per 10k characters on smallest pack.",
      "limits": "Ark exposes model-specific token limits and batch/caching surfaces, but exact limit tables are model-page specific. Verified speech limits include ASR file duration <= 5 hours and file size < 512 MB; TTS async long-text max 100,000 characters per job; streaming ASR recommends 100-200 ms chunks and TTS/ASR realtime uses WebSocket.",
      "region": "Public Ark examples use cn-beijing endpoints (ark.cn-beijing.volces.com). Doubao Speech uses openspeech.bytedance.com. No public evidence found for multi-region public developer endpoints in this audit.",
      "sttLanguages": "Big-model streaming ASR: Chinese and English in bidirectional streaming; second-pass / file recognition adds dialect support. Official speech product pages also describe broader multilingual coverage across Chinese, English, Japanese, Korean, French, Spanish, Portuguese and dialects for non-bigmodel speech families.",
      "ttsLanguages": "TTS is multilingual but voice- and mode-dependent. Official docs expose explicit_language options including zh-cn, en, ja, es-mx, id, pt-br, and for some cloned voices de and fr.",
      "freeTier": "Speech docs say trial quota is available after app creation. Ark historically exposed free inference quota, but current March 2026 docs inspected here do not provide a single stable provider-wide free-tier statement for all models.",
      "integrationNotes": "Use Ark for LLM picker entries and live discovery. Use Doubao Speech as a separate speech integration under the same provider. Do not assume STT/TTS have stable OpenAI-style model IDs; they are app/token/cluster/voice/service-family driven."
    },
    "sources": [
      {
        "url": "https://www.volcengine.com/docs/82379/1099455",
        "title": "\u706b\u5c71\u65b9\u821f \u4ea7\u54c1\u7b80\u4ecb",
        "type": "official",
        "lastUpdated": "2026-03-19",
        "usedFor": [
          "models",
          "integration",
          "openai_compat"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1330310",
        "title": "\u706b\u5c71\u65b9\u821f \u6a21\u578b\u5217\u8868",
        "type": "official",
        "lastUpdated": "2026-03-16",
        "usedFor": [
          "models",
          "limits",
          "picker_curation"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1330626",
        "title": "\u706b\u5c71\u65b9\u821f \u517c\u5bb9 OpenAI SDK",
        "type": "official",
        "lastUpdated": "2026-02-16",
        "usedFor": [
          "openai_compat",
          "integration"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1298459",
        "title": "\u706b\u5c71\u65b9\u821f Base URL\u53ca\u9274\u6743",
        "type": "official",
        "lastUpdated": "2026-03-13",
        "usedFor": [
          "integration",
          "auth",
          "protocols",
          "regions"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1494384",
        "title": "\u706b\u5c71\u65b9\u821f \u5bf9\u8bdd(Chat) API",
        "type": "official",
        "lastUpdated": "2026-02-14",
        "usedFor": [
          "protocols",
          "streaming"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1569618",
        "title": "\u706b\u5c71\u65b9\u821f \u521b\u5efa\u6a21\u578b\u54cd\u5e94",
        "type": "official",
        "lastUpdated": "2026-03-16",
        "usedFor": [
          "limits",
          "responses_api"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1262849",
        "title": "ListFoundationModels - \u83b7\u53d6\u57fa\u7840\u6a21\u578b\u5217\u8868",
        "type": "official",
        "lastUpdated": "2025-11-06",
        "usedFor": [
          "models",
          "live_discovery"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1262847",
        "title": "ListFoundationModelVersions - \u83b7\u53d6\u57fa\u7840\u6a21\u578b\u7248\u672c\u5217\u8868",
        "type": "official",
        "lastUpdated": "2025-06-20",
        "usedFor": [
          "models",
          "live_discovery"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1350667",
        "title": "\u706b\u5c71\u65b9\u821f \u6a21\u578b\u4e0b\u7ebf\u516c\u544a",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "deprecations",
          "picker_curation"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/82379/1104498",
        "title": "\u706b\u5c71\u65b9\u821f\u5927\u6a21\u578b\u670d\u52a1\u5e73\u53f0\u4e13\u7528\u6761\u6b3e",
        "type": "official",
        "lastUpdated": "2025-08-31",
        "usedFor": [
          "regions",
          "compliance",
          "data_handling",
          "dynamic_catalog"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/6561/1354871",
        "title": "\u8c46\u5305\u8bed\u97f3 \u8bed\u97f3\u8bc6\u522b\u5927\u6a21\u578b \u4ea7\u54c1\u7b80\u4ecb",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "languages",
          "limits"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/6561/1257543",
        "title": "\u8c46\u5305\u8bed\u97f3 \u8bed\u97f3\u5408\u6210\u5927\u6a21\u578b \u4ea7\u54c1\u7b80\u4ecb",
        "type": "official",
        "lastUpdated": "2025-12-26",
        "usedFor": [
          "tts",
          "languages",
          "voices"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/6561/1354869",
        "title": "\u8c46\u5305\u8bed\u97f3 \u5927\u6a21\u578b\u6d41\u5f0f\u8bed\u97f3\u8bc6\u522bAPI",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "realtime",
          "protocols",
          "limits"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/6561/1354868",
        "title": "\u8c46\u5305\u8bed\u97f3 \u5927\u6a21\u578b\u5f55\u97f3\u6587\u4ef6\u8bc6\u522b\u6807\u51c6\u7248API",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "model_ids"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/6561/1594356",
        "title": "\u8c46\u5305\u8bed\u97f3 \u7aef\u5230\u7aef\u5b9e\u65f6\u8bed\u97f3\u5927\u6a21\u578bAPI\u63a5\u5165\u6587\u6863",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "realtime",
          "tts",
          "stt",
          "protocols",
          "languages"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/6561/1359370",
        "title": "\u8c46\u5305\u8bed\u97f3 \u8ba1\u8d39\u8bf4\u660e",
        "type": "official",
        "lastUpdated": "2025-12-02",
        "usedFor": [
          "pricing",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://www.volcengine.com/docs/6561/1257544",
        "title": "\u8c46\u5305\u8bed\u97f3 \u97f3\u8272\u5217\u8868",
        "type": "official",
        "lastUpdated": "2026-03-17",
        "usedFor": [
          "tts",
          "voices",
          "languages"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

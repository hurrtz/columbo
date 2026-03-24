import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "baidu-ernie-qianfan",
    "providerName": "Baidu (ERNIE / Qianfan)",
    "categoryName": "Foundation model platform + speech APIs",
    "hq": "Beijing, China",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
      "https://cloud.baidu.com/doc/qianfan-api/s/Dmba8k71y",
      "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
      "https://cloud.baidu.com/product-s/qianfan_home",
      "https://cloud.baidu.com/doc/qianfan/s/vmh4sucm1",
      "https://cloud.baidu.com/doc/qianfan/s/tmh4suzoh",
      "https://cloud.baidu.com/doc/qianfan-api/s/mm7viqkmz",
      "https://cloud.baidu.com/doc/qianfan-api/s/mm7vo6ny7",
      "https://cloud.baidu.com/doc/qianfan-api/s/ym7wpcama",
      "https://cloud.baidu.com/doc/qianfan-api/s/tm84h4sot",
      "https://cloud.baidu.com/doc/qianfan-api/s/5m7stbv04",
      "https://cloud.baidu.com/doc/qianfan-docs/s/sm8pqtkt3",
      "https://cloud.baidu.com/doc/SPEECH/s/lm5xd63rn",
      "https://cloud.baidu.com/product-price/speech.html"
    ],
    "integration": {
      "catalogType": "Hosted platform with curated native models plus dynamic live model list and broader hosted marketplace",
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
      "pricing": "LLM pricing is public in CNY on Qianfan pricing pages; examples include ernie-4.5-turbo-128k at \u00a50.0008/1k input and \u00a50.0032/1k output, ernie-x1.1-preview at \u00a50.001/1k input and \u00a50.004/1k output, and ernie-5.0 / ernie-5.0-thinking-* at \u00a50.006-0.01/1k input and \u00a50.024-0.04/1k output depending on prompt length. STT short-speech is billed per call; async transcription is billed per hour; TTS is billed by request package and/or character package depending product surface.",
      "limits": "LLM limits are model-specific and publicly documented in the model list (context, max input/output, RPM, TPM). Short ASR is limited to 60 seconds. Async transcription accepts public audio URLs up to 500 MB. Short TTS allows up to 1024 GBK bytes per request. Streaming TTS recommends <=2000 GBK bytes per stream. Long-text TTS supports up to 100,000 Chinese characters per async job.",
      "region": "Public HQ is Beijing, China. Baidu Cloud publishes general security/compliance material, but no Qianfan-specific public data-residency commitment was verified in the reviewed docs. Treat exact residency as unknown.",
      "sttLanguages": "Publicly documented short-ASR language/model options include Mandarin, English, Cantonese, Sichuan dialect via dev_pid/pid values in docs and pricing tables; async transcription documents Chinese near-field, Chinese subtitle, and English pid values in the reviewed source.",
      "ttsLanguages": "Public short-text TTS is documented as fixed lan=zh (Chinese/English mixed mode). Baidu\u2019s TTS product page says Chinese, English, and mixed Chinese-English are supported. Separate voice-clone docs also document zh and ja plus several dialects, but that is a different product surface.",
      "freeTier": "Qianfan docs and speech pricing docs both document free test quotas for verified accounts. AI Studio also documents 1M free tokens for developers. Exact availability is product-surface-specific.",
      "integrationNotes": "Treat Baidu-native ERNIE model IDs as safe curated picker entries, but use live discovery for the broader Qianfan marketplace. Speech should be integrated as separate STT/TTS capability surfaces, not assumed to come from the LLM /v2 model list. Voice lists are dynamic and should not be hard-coded exhaustively."
    },
    "sources": [
      {
        "url": "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "title": "\u6a21\u578b\u5217\u8868 - \u5343\u5e06AI\u5e94\u7528\u5f00\u53d1\u8005\u4e2d\u5fc3",
        "type": "official",
        "lastUpdated": "2026-03-06",
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-api/s/Dmba8k71y",
        "title": "\u83b7\u53d6\u6a21\u578b\u5217\u8868 - \u5343\u5e06AI\u5e94\u7528\u5f00\u53d1\u8005\u4e2d\u5fc3 API\u53c2\u8003",
        "type": "official",
        "lastUpdated": "2025-12-08",
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "title": "\u6a21\u578b\u670d\u52a1\u8ba1\u8d39 - \u767e\u5ea6\u5343\u5e06",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "batch"
        ]
      },
      {
        "url": "https://cloud.baidu.com/product-s/qianfan_home",
        "title": "\u5343\u5e06\u5927\u6a21\u578b\u5e73\u53f0 - \u4ea7\u54c1\u9875",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan/s/vmh4sucm1",
        "title": "\u6279\u91cf\u63a8\u7406 - \u767e\u5ea6\u5343\u5e06",
        "type": "official",
        "lastUpdated": "2026-02-02",
        "usedFor": [
          "batch",
          "pricing"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan/s/tmh4suzoh",
        "title": "\u9274\u6743\u8ba4\u8bc1 - \u767e\u5ea6\u5343\u5e06",
        "type": "official",
        "lastUpdated": "2025-12-15",
        "usedFor": [
          "integration"
        ]
      },
      {
        "url": "https://ai.baidu.com/ai-doc/AISTUDIO/Mmhslv9lf",
        "title": "LLM_API - AI Studio",
        "type": "official",
        "lastUpdated": "2025-12-09",
        "usedFor": [
          "integration",
          "models",
          "freeTier"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-docs/s/4mi400l1m",
        "title": "Responses API \u4f7f\u7528\u6307\u5357",
        "type": "official",
        "lastUpdated": "2026-01-16",
        "usedFor": [
          "integration",
          "openaiCompatible",
          "realtime"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-api/s/vmhejnuy8",
        "title": "\u521b\u5efa\u6a21\u578b\u54cd\u5e94",
        "type": "official",
        "lastUpdated": "2026-03-06",
        "usedFor": [
          "integration"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-api/s/mm7viqkmz",
        "title": "\u77ed\u8bed\u97f3\u8bc6\u522b",
        "type": "official",
        "lastUpdated": "2025-04-18",
        "usedFor": [
          "stt",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-api/s/mm7vo6ny7",
        "title": "\u77ed\u8bed\u97f3\u8bc6\u522b\u6781\u901f\u7248",
        "type": "official",
        "lastUpdated": "2025-04-18",
        "usedFor": [
          "stt",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-api/s/ym7wpcama",
        "title": "\u97f3\u9891\u6587\u4ef6\u8f6c\u5199-\u63d0\u4ea4\u4efb\u52a1",
        "type": "official",
        "lastUpdated": "2025-04-18",
        "usedFor": [
          "stt",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-api/s/tm84h4sot",
        "title": "\u97f3\u9891\u6587\u4ef6\u8f6c\u5199-\u67e5\u8be2\u7ed3\u679c",
        "type": "official",
        "lastUpdated": "2025-04-17",
        "usedFor": [
          "stt",
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/SPEECH/s/jlbxejt2i",
        "title": "\u5b9e\u65f6\u8bed\u97f3\u8bc6\u522b-websocket API",
        "type": "official",
        "lastUpdated": "2025-11-26",
        "usedFor": [
          "stt",
          "realtime",
          "protocols"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-api/s/5m7stbv04",
        "title": "\u77ed\u6587\u672c\u8bed\u97f3\u5408\u6210",
        "type": "official",
        "lastUpdated": "2025-04-18",
        "usedFor": [
          "tts",
          "limits",
          "languages",
          "voices"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/qianfan-docs/s/sm8pqtkt3",
        "title": "\u8bed\u97f3\u5408\u6210 - \u5343\u5e06AI\u5e94\u7528\u5f00\u53d1\u8005\u4e2d\u5fc3",
        "type": "official",
        "lastUpdated": "2025-04-22",
        "usedFor": [
          "tts",
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/SPEECH/s/lm5xd63rn",
        "title": "\u6d41\u5f0f\u6587\u672c\u5728\u7ebf\u5408\u6210",
        "type": "official",
        "lastUpdated": "2026-03-23",
        "usedFor": [
          "tts",
          "realtime",
          "protocols",
          "limits"
        ]
      },
      {
        "url": "https://cloud.baidu.com/product-price/speech.html",
        "title": "\u8bed\u97f3\u6280\u672f_\u4ef7\u683c\u8be6\u60c5",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://cloud.baidu.com/doc/SPEECH/s/Ql9misjot",
        "title": "\u8bed\u97f3\u5408\u6210 - \u8bed\u97f3\u6280\u672f",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "tts",
          "voices"
        ]
      },
      {
        "url": "https://ir.baidu.com/shareholder-services/investor-faqs/",
        "title": "Baidu Investor FAQs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://cloud.baidu.com/safety/compliance.html",
        "title": "\u767e\u5ea6\u667a\u80fd\u4e91 \u5b89\u5168\u5408\u89c4",
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

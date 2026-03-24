import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "tts",
      "modelId": "\u77ed\u6587\u672c\u8bed\u97f3\u5408\u6210",
      "publicName": "Short Text Speech Synthesis",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Short-text TTS is billed by request and/or character packages depending voice bank. Base-bank postpaid is \u00a52 per 10k characters; premium is \u00a52.7 per 10k; large-model/premium bank starts at \u00a53 per 10k.",
      "limitsSummary": "Single request max 1024 GBK bytes. Billing counts 1 call per 120 GBK bytes. lan fixed to zh in reviewed short-text API doc. Voice IDs are required and dynamic.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Reviewed API doc says lan fixed to zh and describes current mode as Chinese-English mixed. Product page says Chinese, English, and Chinese-English mixed are supported.",
      "notes": "Do not hard-code all voices. Public doc explicitly says voice list is continuously updated.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-api/s/5m7stbv04",
        "https://cloud.baidu.com/doc/SPEECH/s/Ql9misjot",
        "https://cloud.baidu.com/product/speech/tts"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 29.02,
          "unit": "million_characters",
          "sourceText": "Inference from \u00a52 per 10k characters for base bank postpaid."
        },
        {
          "amountUsd": 39.18,
          "unit": "million_characters",
          "sourceText": "Inference from \u00a52.7 per 10k characters for premium bank postpaid."
        },
        {
          "amountUsd": 43.53,
          "unit": "million_characters",
          "sourceText": "Inference from \u00a53 per 10k characters for large-model/premium bank package pricing."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1024,
          "unit": "bytes",
          "scope": "streaming",
          "sourceText": "\u5355\u6b21\u8bf7\u6c42\u6700\u957f1024GBK\u5b57\u8282"
        }
      ],
      "languageSupport": {
        "rawText": "Short-text API: lan fixed to zh, currently only Chinese-English mixed mode. Product page: supports Chinese, English, mixed Chinese-English. Voice banks include many Mandarin and regional voices.",
        "isMultilingual": true,
        "languageCount": 3,
        "voiceCount": 34,
        "listedLanguages": [
          "Chinese",
          "English",
          "Chinese-English mixed"
        ],
        "notes": [
          "voice-dependent",
          "dynamic voice inventory",
          "API/product-page wording differs slightly"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "tts",
      "modelId": "\u957f\u6587\u672c\u5408\u6210",
      "publicName": "Long Text Speech Synthesis",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Uses Baidu speech TTS pricing surfaces; exact per-character mapping depends selected voice bank and package mode.",
      "limitsSummary": "Async synthesis of up to 100,000 Chinese characters in one job.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Voice/language depends on selected voice bank.",
      "notes": "Async batch-style TTS surface; better for long content than voice chat.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/sm8pqtkt3"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 100000,
          "unit": "other",
          "scope": "general",
          "sourceText": "10\u4e07\u5b57\u4ee5\u5185\u6587\u672c\u4e00\u6b21\u6027\u5408\u6210"
        }
      ],
      "languageSupport": {
        "rawText": "Depends on voice bank.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "async TTS",
          "voice-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "tts",
      "modelId": "\u6d41\u5f0f\u6587\u672c\u5728\u7ebf\u5408\u6210",
      "publicName": "Streaming Text-to-Speech",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Public pricing mapping to this specific websocket TTS surface is not fully explicit in the reviewed docs; treat exact price as unknown unless validated in console/billing docs.",
      "limitsSummary": "WebSocket endpoint. Recommended text <=2000 GBK bytes. UTF-8 input. Supports streaming playback.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Voice/language depends on selected voice/tts surface; reviewed voice-clone websocket doc separately lists zh and ja plus dialects, but that is not the same public short-text TTS doc.",
      "notes": "Native realtime TTS surface for a voice-first app.",
      "officialSources": [
        "https://cloud.baidu.com/doc/SPEECH/s/lm5xd63rn"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "stream_chunk_bytes",
          "comparator": "~",
          "value": 2000,
          "unit": "bytes",
          "scope": "streaming",
          "sourceText": "\u5efa\u8bae\u6587\u672c\u4e0d\u8d85\u8fc72000 GBK\u5b57\u8282"
        }
      ],
      "languageSupport": {
        "rawText": "No single authoritative streaming-TTS language list was verified for this exact surface in the reviewed docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "websocket",
          "voice-dependent",
          "language list not fully verified"
        ]
      }
    }
  ),
]);

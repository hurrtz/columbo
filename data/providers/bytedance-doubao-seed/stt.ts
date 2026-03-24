import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "stt",
      "modelId": "bigmodel",
      "publicName": "Doubao Big-Model Streaming ASR",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Priced at big-model streaming ASR service-family rates, starting at 4 yuan/hour on smallest official resource pack. Priced at big-model file-ASR service-family rates, starting at 2 yuan/hour on smallest official standard-pack tier.",
      "limitsSummary": "WebSocket only. Recommended chunk size 100-200 ms; 200 ms is recommended for bidirectional optimized mode. Official realtime return can be 300-400 ms on average 5-second audio in streaming-input mode. Audio duration <= 5 hours and file size < 512 MB.",
      "regionSummary": "Public endpoint uses openspeech.bytedance.com.",
      "languagesSummary": "Bidirectional big-model streaming supports Chinese and English; second-pass adds dialect handling. Chinese and English plus dialect handling documented on product page.",
      "notes": "This is a service-level public identifier rather than a rich versioned model catalog. Good stable STT picker entry if you need one STT line item. Stable non-realtime STT entry. Uses same documented request model_name=bigmodel. Merged research variants: Doubao Big-Model Streaming ASR; Doubao Big-Model File ASR (Standard).",
      "officialSources": [
        "https://www.volcengine.com/docs/6561/1354869",
        "https://www.volcengine.com/docs/6561/1354871",
        "https://www.volcengine.com/docs/6561/1359370",
        "https://www.volcengine.com/docs/6561/1354868"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.58,
          "unit": "hour",
          "sourceText": "\u5927\u6a21\u578b\u6d41\u5f0f\u8bed\u97f3\u8bc6\u522b 1000\u5c0f\u65f6 4000\u5143\uff0c\u6298\u7b974\u5143/\u5c0f\u65f6\uff1bUSD conversion is inference at ~0.145 USD/CNY."
        },
        {
          "amountUsd": 0.0097,
          "unit": "minute",
          "sourceText": "Converted from 4\u5143/\u5c0f\u65f6 using ~0.145 USD/CNY."
        },
        {
          "amountUsd": 0.29,
          "unit": "hour",
          "sourceText": "\u5927\u6a21\u578b\u5f55\u97f3\u6587\u4ef6\u8bc6\u522b\uff08\u6807\u51c6\u7248\uff091000\u5c0f\u65f6 2000\u5143\uff0c\u6298\u7b972\u5143/\u5c0f\u65f6\uff1bUSD conversion is inference at ~0.145 USD/CNY."
        },
        {
          "amountUsd": 0.0048,
          "unit": "minute",
          "sourceText": "Converted from 2\u5143/\u5c0f\u65f6 using ~0.145 USD/CNY."
        }
      ],
      "constraints": [
        {
          "metric": "stream_chunk_bytes",
          "comparator": "~",
          "value": 0,
          "unit": "other",
          "scope": "streaming",
          "sourceText": "Recommended packet duration is 100-200 ms; for bidirectional optimized mode, 200 ms is best."
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 18000,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "\u652f\u6301\u5c06\u97f3\u9891\u6587\u4ef6\uff08\u22645\u5c0f\u65f6\uff09\u8f6c\u5199\u6210\u6587\u672c\u6570\u636e."
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<",
          "value": 536870912,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "\u97f3\u9891\u65f6\u957f<5\u5c0f\u65f6\uff0c\u4e14\u6587\u4ef6\u5927\u5c0f<512M."
        }
      ],
      "languageSupport": {
        "rawText": "Supports Chinese and English; bidirectional streaming only supports Chinese and English, with second-pass support for dialects. Supports Chinese and English; dialect text output documented for Cantonese, Sichuan, Shaanxi, Jilu, Lanyin, Jianghuai and others.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "dialect support in second-pass",
          "voice count not applicable",
          "dialect support",
          "more language-family detail is product-dependent"
        ]
      }
    }
  ),
]);

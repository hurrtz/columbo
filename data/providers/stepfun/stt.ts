import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "stt",
      "modelId": "step-asr",
      "publicName": "Step ASR",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a50.9 / hour.",
      "limitsSummary": "Used by /v1/audio/transcriptions. Uploaded file must be under 100 MB. Supported formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm, aac, opus.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs say Chinese, English, and multiple dialects.",
      "notes": "This is the fixed model on the standard transcription endpoint. Prefer this for simple file transcription in a stable picker.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/audio",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/audio/transcriptions"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1306,
          "unit": "hour",
          "sourceText": "Official price is \u00a50.9 / hour."
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 104857600,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "\u6587\u4ef6\u5927\u5c0f\u9650\u5236\uff1a\u5c0f\u4e8e 100MB"
        }
      ],
      "languageSupport": {
        "rawText": "Supports Chinese, English, and multiple dialects.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "dialect support documented but not enumerated"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "stt",
      "modelId": "step-asr-1.1",
      "publicName": "Step ASR 1.1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a52.2 / hour.",
      "limitsSummary": "Model page positions it for audio-file recognition; no separate public endpoint doc found in the retrieved sources.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Language coverage not formally specified in the model page.",
      "notes": "Publicly named and priced, but the standard transcription endpoint docs retrieved here are still fixed to step-asr. Treat this as documented-but-integration-ambiguous unless verified live.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/audio",
        "https://platform.stepfun.com/docs/zh/pricing/details"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3192,
          "unit": "hour",
          "sourceText": "Official price is \u00a52.2 / hour."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No formal language list found in the retrieved endpoint docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "endpoint ambiguity"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "stt",
      "modelId": "step-asr-1.1-stream",
      "publicName": "Step ASR 1.1 Stream",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a52.6 / hour.",
      "limitsSummary": "Streaming ASR supports WebSocket and HTTP+SSE. Recommended audio input is pcm_s16le, 16 kHz, 16-bit, mono. WebSocket endpoint wss://api.stepfun.com/v1/realtime/asr/stream; HTTP/SSE endpoint https://api.stepfun.com/v1/audio/asr/sse.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs explicitly say Chinese and English only, not other languages or Chinese dialects.",
      "notes": "Strong stable choice for streaming STT in a voice app.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/audio",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/audio/asr-stream"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3773,
          "unit": "hour",
          "sourceText": "Official price is \u00a52.6 / hour."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 16000,
          "unit": "other",
          "scope": "audio",
          "sourceText": "\u91c7\u6837\u7387\uff0c\u9ed8\u8ba4\u63a8\u8350 16000"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "audio",
          "sourceText": "\u901a\u9053\u6570\uff0c\u63a8\u8350 1\uff08\u5355\u58f0\u9053\uff09"
        }
      ],
      "languageSupport": {
        "rawText": "Supports Chinese and English only; other languages and Chinese dialects are not supported.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "not dialect-capable per streaming doc"
        ]
      }
    }
  ),
]);

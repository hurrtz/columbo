import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "stt",
      "modelId": "qwen3-asr-flash",
      "publicName": "Qwen3-ASR-Flash",
      "aliases": [
        "qwen3-asr-flash-2026-02-10",
        "qwen3-asr-flash-2025-09-08",
        "qwen3-asr-flash-us",
        "qwen3-asr-flash-2025-09-08-us"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.000032 per second.",
      "limitsSummary": "Short-file ASR: audio file size <=10 MB and duration <=5 minutes.",
      "regionSummary": "International, US, and Chinese Mainland variants are documented.",
      "languagesSummary": "Short-file ASR; language list is not explicitly enumerated on the short-file page, but this family is presented as multilingual.",
      "notes": "Use for synchronous short-file STT. Keep US suffix hidden unless app has explicit region routing.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/qwen-speech-recognition",
        "https://www.alibabacloud.com/help/en/model-studio/models",
        "https://www.alibabacloud.com/help/en/model-studio/rate-limit"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.2e-05,
          "unit": "second",
          "sourceText": "$0.000032/second"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 10485760,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Audio file size cannot exceed 10 MB"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 300,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "duration cannot exceed 5 minutes"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 100,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "qwen3-asr-flash 100 RPM"
        }
      ],
      "languageSupport": {
        "rawText": "Short audio recognition, low latency; multilingual family.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "short-audio-only"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "stt",
      "modelId": "qwen3-asr-flash-filetrans",
      "publicName": "Qwen3-ASR-Flash-Filetrans",
      "aliases": [
        "qwen3-asr-flash-filetrans-2025-11-17"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.000032 per second.",
      "limitsSummary": "Long-file async ASR: requires public URL; audio file size <=2 GB and duration <=12 hours.",
      "regionSummary": "International and Chinese Mainland documented.",
      "languagesSummary": "Long-file asynchronous multilingual transcription.",
      "notes": "Best stable long-form STT picker. Requires async workflow and public URL input.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/qwen-speech-recognition",
        "https://www.alibabacloud.com/help/en/model-studio/models",
        "https://www.alibabacloud.com/help/en/model-studio/rate-limit"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.2e-05,
          "unit": "second",
          "sourceText": "$0.000032/second"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 2147483648,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Audio file size cannot exceed 2 GB"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 43200,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "duration cannot exceed 12 hours"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 100,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "qwen3-asr-flash-filetrans 100 RPM"
        }
      ],
      "languageSupport": {
        "rawText": "Long audio recognition; supports emotion recognition and timestamps.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "async",
          "public-url-required"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "stt",
      "modelId": "qwen3-asr-flash-realtime",
      "publicName": "Qwen3-ASR-Flash-Realtime",
      "aliases": [
        "qwen3-asr-flash-realtime-2026-02-10",
        "qwen3-asr-flash-realtime-2025-10-27"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "International: $0.00009/second with documented starter free quota; Chinese Mainland: $0.000047/second with no free quota.",
      "limitsSummary": "WebSocket realtime STT; docs state audio size/duration unlimited. Supported input formats PCM and Opus; sample rate 8 kHz or 16 kHz; mono channel.",
      "regionSummary": "International and Chinese Mainland documented with different pricing.",
      "languagesSummary": "29 listed languages / variants including Mandarin, Sichuanese, Minnan, Wu, Cantonese, English, Japanese, German, Korean, Russian, French, Portuguese, Arabic, Italian, Spanish, Hindi, Indonesian, Thai, Turkish, Ukrainian, Vietnamese, Czech, Danish, Filipino, Finnish, Icelandic, Malay, Norwegian, Polish, and Swedish.",
      "notes": "Best realtime STT picker candidate.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/qwen-real-time-speech-recognition",
        "https://www.alibabacloud.com/help/en/model-studio/models",
        "https://www.alibabacloud.com/help/en/model-studio/rate-limit"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 9e-05,
          "unit": "second",
          "sourceText": "International $0.00009/second"
        },
        {
          "amountUsd": 4.7e-05,
          "unit": "second",
          "sourceText": "Chinese Mainland $0.000047/second"
        }
      ],
      "constraints": [
        {
          "metric": "rate_limit_rps",
          "comparator": "=",
          "value": 20,
          "unit": "other",
          "scope": "account",
          "sourceText": "qwen3-asr-flash-realtime 20 RPS"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "audio",
          "sourceText": "Channel Mono"
        }
      ],
      "languageSupport": {
        "rawText": "Supported languages explicitly listed in realtime STT docs.",
        "isMultilingual": true,
        "languageCount": 29,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese (Mandarin)",
          "Sichuanese",
          "Minnan",
          "Wu",
          "Cantonese",
          "English",
          "Japanese",
          "German",
          "Korean",
          "Russian",
          "French",
          "Portuguese",
          "Arabic",
          "Italian",
          "Spanish",
          "Hindi",
          "Indonesian",
          "Thai",
          "Turkish",
          "Ukrainian",
          "Vietnamese",
          "Czech",
          "Danish",
          "Filipino",
          "Finnish",
          "Icelandic",
          "Malay",
          "Norwegian",
          "Polish",
          "Swedish"
        ],
        "notes": [
          "websocket",
          "emotion-detection",
          "vad"
        ]
      }
    }
  ),
]);

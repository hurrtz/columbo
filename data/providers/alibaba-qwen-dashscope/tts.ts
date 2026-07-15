import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "tts",
      "modelId": "qwen3-tts-flash",
      "publicName": "Qwen3-TTS-Flash",
      "aliases": [
        "qwen3-tts-flash-2025-11-27",
        "qwen3-tts-flash-2025-09-18"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "International pricing page shows $0.10 / 10K characters; Chinese Mainland pricing page shows $0.114682 / 10K characters. Output is not charged.",
      "limitsSummary": "Model list gives max input 600 characters.",
      "regionSummary": "Pricing differs between international and Chinese Mainland docs.",
      "languagesSummary": "Chinese (Mandarin plus Beijing, Shanghai, Sichuan, Nanjing, Shaanxi, Minnan, Tianjin, Cantonese), English, Spanish, Russian, Italian, French, Korean, Japanese, German, Portuguese.",
      "notes": "Best default non-realtime TTS picker candidate.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/model-pricing",
        "https://www.alibabacloud.com/help/en/model-studio/models",
        "https://www.alibabacloud.com/help/en/model-studio/qwen-tts",
        "https://www.alibabacloud.com/help/en/model-studio/rate-limit"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_characters",
          "sourceText": "$0.1 per 10K characters (international pricing page)"
        },
        {
          "amountUsd": 0.114682,
          "unit": "million_characters",
          "sourceText": "$0.114682 per 10K characters (Chinese Mainland pricing page)"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 600,
          "unit": "other",
          "scope": "model",
          "sourceText": "Max input characters 600"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 180,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "qwen3-tts-flash 180 RPM"
        }
      ],
      "languageSupport": {
        "rawText": "10 language family set plus multiple Chinese dialect variants.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese (Mandarin)",
          "English",
          "Spanish",
          "Russian",
          "Italian",
          "French",
          "Korean",
          "Japanese",
          "German",
          "Portuguese"
        ],
        "notes": [
          "multiple-chinese-dialects",
          "voice-count-not-fully-normalized-from-doc"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "tts",
      "modelId": "qwen3-tts-instruct-flash",
      "publicName": "Qwen3-TTS-Instruct-Flash",
      "aliases": [
        "qwen3-tts-instruct-flash-2026-01-26"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.115 / 10K characters. Output not charged.",
      "limitsSummary": "Main text input is limited to 600 characters. The instruction field supports max 1600 tokens and instruction text is limited to Chinese and English.",
      "regionSummary": "Documented in pricing, voice list, and rate-limit docs.",
      "languagesSummary": "Speech output supported for Chinese (Mandarin), English, Spanish, Russian, Italian, French, Korean, Japanese, German, Portuguese.",
      "notes": "Use as the controllable non-realtime TTS picker. Instruction text support is narrower than synthesis language coverage.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/model-pricing",
        "https://www.alibabacloud.com/help/en/model-studio/qwen-tts",
        "https://www.alibabacloud.com/help/en/model-studio/qwen-tts-api",
        "https://www.alibabacloud.com/help/en/model-studio/rate-limit"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.115,
          "unit": "million_characters",
          "sourceText": "$0.115 per 10K characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 600,
          "unit": "other",
          "scope": "model",
          "sourceText": "Max input characters 600"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 1600,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "instructions length limit: Max 1600 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 180,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "qwen3-tts-instruct-flash 180 RPM"
        }
      ],
      "languageSupport": {
        "rawText": "Synthesis supports 10 languages; instructions parameter text supports Chinese and English only.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese (Mandarin)",
          "English",
          "Spanish",
          "Russian",
          "Italian",
          "French",
          "Korean",
          "Japanese",
          "German",
          "Portuguese"
        ],
        "notes": [
          "instruction-text-only-chinese-and-english",
          "expressive-control"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "tts",
      "modelId": "qwen3-tts-flash-realtime",
      "publicName": "Qwen3-TTS-Flash-Realtime",
      "aliases": [
        "qwen3-tts-flash-realtime-2025-11-27",
        "qwen3-tts-flash-realtime-2025-09-18"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "International pricing page shows $0.13 / 10K characters; Chinese Mainland pricing page shows $0.143353 / 10K characters. Output not charged.",
      "limitsSummary": "WebSocket realtime TTS family. Default-voice only; cloned/designed voices are not supported on this model family.",
      "regionSummary": "International and Chinese Mainland rows documented.",
      "languagesSummary": "Default-voice realtime TTS; cited family language coverage aligns with the 10-language Qwen realtime TTS set.",
      "notes": "Best default realtime TTS picker. Do not use for custom voices.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/model-pricing",
        "https://www.alibabacloud.com/help/en/model-studio/models",
        "https://www.alibabacloud.com/help/en/model-studio/qwen-tts-realtime",
        "https://www.alibabacloud.com/help/en/model-studio/rate-limit"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.13,
          "unit": "million_characters",
          "sourceText": "$0.13 per 10K characters (international pricing page)"
        },
        {
          "amountUsd": 0.143353,
          "unit": "million_characters",
          "sourceText": "$0.143353 per 10K characters (Chinese Mainland pricing page)"
        }
      ],
      "constraints": [
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 180,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "qwen3-tts-flash-realtime 180 RPM"
        }
      ],
      "languageSupport": {
        "rawText": "Realtime multilingual TTS family; default voice only.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese (Mandarin)",
          "English",
          "Spanish",
          "Russian",
          "Italian",
          "French",
          "Korean",
          "Japanese",
          "German",
          "Portuguese"
        ],
        "notes": [
          "default-voice-only",
          "websocket"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "tts",
      "modelId": "qwen3-tts-instruct-flash-realtime",
      "publicName": "Qwen3-TTS-Instruct-Flash-Realtime",
      "aliases": [
        "qwen3-tts-instruct-flash-realtime-2026-01-22"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.143 / 10K characters. Output not charged.",
      "limitsSummary": "Realtime TTS with instruction control; default voice only; instructions max 1600 tokens and instruction text supports Chinese/English only.",
      "regionSummary": "International and Chinese Mainland rows documented.",
      "languagesSummary": "Speech output supports Chinese (Mandarin), English, Spanish, Russian, Italian, French, Korean, Japanese, German, Portuguese.",
      "notes": "Best advanced realtime TTS picker when expressive control matters.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/model-pricing",
        "https://www.alibabacloud.com/help/en/model-studio/models",
        "https://www.alibabacloud.com/help/en/model-studio/qwen-tts-api",
        "https://www.alibabacloud.com/help/en/model-studio/rate-limit"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.143,
          "unit": "million_characters",
          "sourceText": "$0.143 per 10K characters"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 1600,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "instructions length limit: Max 1600 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 180,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "qwen3-tts-instruct-flash-realtime 180 RPM"
        }
      ],
      "languageSupport": {
        "rawText": "Realtime controllable TTS supports 10 output languages; instruction text support is Chinese and English only.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese (Mandarin)",
          "English",
          "Spanish",
          "Russian",
          "Italian",
          "French",
          "Korean",
          "Japanese",
          "German",
          "Portuguese"
        ],
        "notes": [
          "instruction-text-only-chinese-and-english",
          "default-voice-only",
          "websocket"
        ]
      }
    }
  ),
]);

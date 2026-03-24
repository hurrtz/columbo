import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "tts",
      "modelId": "step-tts-2",
      "publicName": "Step TTS 2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a52.8 / 10k characters. Voice cloning is \u00a550 per voice, then standard generation pricing applies.",
      "limitsSummary": "Max 1000 input characters/request. Output formats: wav, mp3, flac, opus, pcm. SSE streaming available from the speech endpoint. Sample rates: 8000, 16000, 22050, 24000.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs say it supports all step-tts-mini voices, emotions, styles, and languages; controllable language labels include Cantonese, Sichuan dialect, and Japanese.",
      "notes": "Best high-quality TTS option for a stable picker.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/audio",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/audio/create_audio"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.4063,
          "unit": "million_characters",
          "sourceText": "Official price is \u00a52.8 / 10k characters; the USD figure shown here is for 10k characters converted to USD."
        },
        {
          "amountUsd": 7.255,
          "unit": "other",
          "sourceText": "Official cloning fee is \u00a550 per voice."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1000,
          "unit": "other",
          "scope": "general",
          "sourceText": "\u5355\u6b21\u8bf7\u6c42\u652f\u6301\u7684\u6700\u5927\u5b57\u7b26\u6570\uff1atts \u6a21\u578b\u5355\u6b21\u6700\u591a\u652f\u6301\u8f93\u5165 1000 \u4e2a\u5b57\u7b26"
        }
      ],
      "languageSupport": {
        "rawText": "Controllable language labels include Cantonese, Sichuan dialect, and Japanese; full voice/language inventory is not formally enumerated.",
        "isMultilingual": true,
        "languageCount": 3,
        "voiceCount": 0,
        "listedLanguages": [
          "Cantonese",
          "Sichuan dialect",
          "Japanese"
        ],
        "notes": [
          "voice-dependent",
          "emotion/style controls",
          "voice-cloning supported"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "tts",
      "modelId": "step-tts-mini",
      "publicName": "Step TTS Mini",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a50.9 / 10k characters. Voice cloning is \u00a550 per voice, then standard generation pricing applies.",
      "limitsSummary": "Max 1000 input characters/request. Output formats include wav, mp3, flac, opus, pcm. SSE streaming available.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs describe 11 emotions, 7 styles, and controllable labels for Cantonese, Sichuan dialect, and Japanese.",
      "notes": "Best low-cost TTS option for a stable picker.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/audio",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/audio/create_audio"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1306,
          "unit": "million_characters",
          "sourceText": "Official price is \u00a50.9 / 10k characters; the USD figure shown here is for 10k characters converted to USD."
        },
        {
          "amountUsd": 7.255,
          "unit": "other",
          "sourceText": "Official cloning fee is \u00a550 per voice."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1000,
          "unit": "other",
          "scope": "general",
          "sourceText": "\u5355\u6b21\u8bf7\u6c42\u652f\u6301\u7684\u6700\u5927\u5b57\u7b26\u6570\uff1atts \u6a21\u578b\u5355\u6b21\u6700\u591a\u652f\u6301\u8f93\u5165 1000 \u4e2a\u5b57\u7b26"
        }
      ],
      "languageSupport": {
        "rawText": "11 emotions, 7 styles, and controllable labels for Cantonese, Sichuan dialect, and Japanese are documented.",
        "isMultilingual": true,
        "languageCount": 3,
        "voiceCount": 0,
        "listedLanguages": [
          "Cantonese",
          "Sichuan dialect",
          "Japanese"
        ],
        "notes": [
          "low-cost",
          "voice-cloning supported",
          "emotion/style controls"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "tts",
      "modelId": "step-tts-vivid",
      "publicName": "Step TTS Vivid",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a51.9 / 10k characters. Voice cloning is \u00a550 per voice, then standard generation pricing applies.",
      "limitsSummary": "Max 1000 input characters/request. Output formats include wav, mp3, flac, opus, pcm. SSE streaming available.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs describe 6 emotions, 4 styles, and controllable labels for Cantonese, Sichuan dialect, and Japanese.",
      "notes": "Tuned for highly human-like speech, especially outbound-call style scenarios.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/audio",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/audio/create_audio"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.2757,
          "unit": "million_characters",
          "sourceText": "Official price is \u00a51.9 / 10k characters; the USD figure shown here is for 10k characters converted to USD."
        },
        {
          "amountUsd": 7.255,
          "unit": "other",
          "sourceText": "Official cloning fee is \u00a550 per voice."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1000,
          "unit": "other",
          "scope": "general",
          "sourceText": "\u5355\u6b21\u8bf7\u6c42\u652f\u6301\u7684\u6700\u5927\u5b57\u7b26\u6570\uff1atts \u6a21\u578b\u5355\u6b21\u6700\u591a\u652f\u6301\u8f93\u5165 1000 \u4e2a\u5b57\u7b26"
        }
      ],
      "languageSupport": {
        "rawText": "6 emotions, 4 styles, and controllable labels for Cantonese, Sichuan dialect, and Japanese are documented.",
        "isMultilingual": true,
        "languageCount": 3,
        "voiceCount": 0,
        "listedLanguages": [
          "Cantonese",
          "Sichuan dialect",
          "Japanese"
        ],
        "notes": [
          "human-like style",
          "voice-cloning supported",
          "pronunciation_map not supported per create_audio doc"
        ]
      }
    }
  ),
]);

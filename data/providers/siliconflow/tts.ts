import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "tts",
      "modelId": "fishaudio/fish-speech-1.5",
      "publicName": "Fish-Speech-1.5",
      "aliases": [
        "Fish-Speech-1.5"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$15 per 1M UTF-8 bytes on model and pricing pages. Provider pricing page also says TTS prices are per 1,000 characters, which conflicts with the model-page unit wording.",
      "limitsSummary": "Input length 1-128000 characters. TTS supports stream=true, mp3/opus/wav/pcm, sample rates up to 48k depending on format. Reference audio should be under 30 seconds; 8-10 seconds recommended.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "Official TTS capability page explicitly lists Chinese, English, Japanese, German, French, Spanish, Korean, Arabic, Russian, Dutch, Italian, Polish, and Portuguese.",
      "notes": "Best-documented TTS entry. Public API docs explicitly show canonical model ID and 8 preset voices under this model namespace.",
      "officialSources": [
        "https://docs.siliconflow.com/en/api-reference/audio/create-speech",
        "https://docs.siliconflow.com/en/userguide/capabilities/text-to-speech",
        "https://www.siliconflow.com/models/fish-speech-1-5",
        "https://www.siliconflow.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "other",
          "sourceText": "Per 1M UTF-8 bytes"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 128000,
          "unit": "other",
          "scope": "model",
          "sourceText": "The text to generate audio for: Required string length 1 - 128000"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<",
          "value": 30,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Reference audio should be less than 30 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "fish-speech-1.5 Supported languages: Chinese, English, Japanese, German, French, Spanish, Korean, Arabic, Russian, Dutch, Italian, Polish, Portuguese",
        "isMultilingual": true,
        "languageCount": 13,
        "voiceCount": 8,
        "listedLanguages": [
          "Chinese",
          "English",
          "Japanese",
          "German",
          "French",
          "Spanish",
          "Korean",
          "Arabic",
          "Russian",
          "Dutch",
          "Italian",
          "Polish",
          "Portuguese"
        ],
        "notes": [
          "voice-dependent",
          "8 system preset voices documented"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "tts",
      "modelId": "FunAudioLLM/CosyVoice2-0.5B",
      "publicName": "CosyVoice2-0.5B",
      "aliases": [
        "CosyVoice2-0.5B"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$7.15 per 1M UTF-8 bytes on model and pricing pages. Provider pricing page also says TTS prices are per 1,000 characters, which conflicts with the model-page unit wording.",
      "limitsSummary": "Used in TTS docs and custom voice upload docs. Reference audio is recommended at 8-10 seconds and under 30 seconds. Streaming output is supported at the TTS API layer.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "Official TTS capability page says cross-language synthesis supports Chinese, English, Japanese, Korean, and several Chinese dialects.",
      "notes": "Strong second stable TTS picker candidate. Canonical provider namespace is well-supported by the custom-voice upload docs.",
      "officialSources": [
        "https://docs.siliconflow.com/en/userguide/capabilities/text-to-speech",
        "https://docs.siliconflow.com/en/api-reference/audio/upload-voice",
        "https://www.siliconflow.com/models/funaudiollm-cosyvoice2-0-5b",
        "https://www.siliconflow.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 7.15,
          "unit": "other",
          "sourceText": "Per 1M UTF-8 bytes"
        }
      ],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "~",
          "value": 10,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Recommended voice sample length 8-10 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "Cross-language speech synthesis across Chinese, English, Japanese, Korean, and Chinese dialects including Cantonese, Sichuanese, Shanghainese, Zhengzhou dialect, Changsha dialect, Tianjin dialect.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 8,
        "listedLanguages": [
          "Chinese",
          "English",
          "Japanese",
          "Korean",
          "Cantonese",
          "Sichuanese",
          "Shanghainese",
          "Zhengzhou dialect",
          "Changsha dialect",
          "Tianjin dialect"
        ],
        "notes": [
          "voice-dependent",
          "dialect-capable",
          "8 system preset voices documented at the API layer"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "tts",
      "modelId": "IndexTeam/IndexTTS-2",
      "publicName": "IndexTTS-2",
      "aliases": [
        "IndexTTS-2"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$7.15 per 1M UTF-8 bytes on model and pricing pages.",
      "limitsSummary": "Public model page exists and pricing is public, but the TTS endpoint docs treat this model inconsistently, so API-level operational limits are not cleanly verified.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "No explicit language list was found in accessible official SiliconFlow docs.",
      "notes": "Keep behind live discovery or an advanced picker. Public model page exists, but create-speech docs do not cleanly enumerate the canonical namespaced ID in the parameter enum.",
      "officialSources": [
        "https://www.siliconflow.com/models/indextts-2",
        "https://docs.siliconflow.com/en/api-reference/audio/create-speech",
        "https://www.siliconflow.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 7.15,
          "unit": "other",
          "sourceText": "Per 1M UTF-8 bytes"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No explicit language list was found in accessible official SiliconFlow docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-by-provider-docs",
          "api-doc-id-conflict"
        ]
      }
    }
  ),
]);

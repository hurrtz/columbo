import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "tts",
      "modelId": "magpie-tts-multilingual",
      "publicName": "Magpie TTS Multilingual",
      "aliases": [
        "RivaTTS_MagpieTTS_Multilingual v4.0"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-character pricing found.",
      "limitsSummary": "Streaming and offline. Self-hosted support matrix shows batch_size profiles 1, 8, 32, 64. Release notes show concurrency expanded up to 64 in release 1.8.0.",
      "regionSummary": "Global.",
      "languagesSummary": "Official docs conflict: latest self-host support matrix lists 7 languages; newer build model card says 9 languages.",
      "notes": "Safest native TTS picker entry. Use live voice discovery rather than hardcoding full voice lists. Documentation drift is real here.",
      "officialSources": [
        "https://build.nvidia.com/nvidia/magpie-tts-multilingual",
        "https://build.nvidia.com/nvidia/magpie-tts-multilingual/modelcard",
        "https://build.nvidia.com/nvidia/magpie-tts-multilingual/api",
        "https://docs.nvidia.com/nim/riva/tts/latest/support-matrix.html",
        "https://docs.nvidia.com/nim/riva/tts/latest/release-notes.html",
        "https://docs.nvidia.com/nim/riva/tts/latest/getting-started.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "concurrency",
          "comparator": "<=",
          "value": 64,
          "unit": "sessions",
          "scope": "model",
          "sourceText": "Updated the Magpie TTS Multilingual model to support higher concurrent streams (up to 64)."
        }
      ],
      "languageSupport": {
        "rawText": "Support matrix: English, Spanish, French, German, Mandarin, Vietnamese, Italian. Build model card: nine languages including English-US, European-Spanish, German-German, French-France, Italian, Vietnamese, Mandarin-Chinese, Hindi, Japanese. Supports at least one male and one female speaker for all languages.",
        "isMultilingual": true,
        "languageCount": 7,
        "voiceCount": 0,
        "listedLanguages": [
          "en-US",
          "es-US",
          "fr-FR",
          "de-DE",
          "zh-CN",
          "vi-VN",
          "it-IT"
        ],
        "notes": [
          "voice-dependent",
          "docs conflict with build model card",
          "use live voice discovery"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "tts",
      "modelId": "magpie-tts-zeroshot",
      "publicName": "Magpie TTS Zeroshot",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-character pricing found.",
      "limitsSummary": "English only. Streaming and offline. Audio prompt must be 3-10 seconds. Access restricted.",
      "regionSummary": "Self-host docs only; current docs do not present it as a normal open stable entry.",
      "languagesSummary": "English (en-US).",
      "notes": "Do not expose in a default stable picker. Restricted-access model; suitable only behind feature flag / live discovery for approved accounts.",
      "officialSources": [
        "https://docs.nvidia.com/nim/riva/tts/latest/support-matrix.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 3,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "audio prompt of three to ten seconds"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 10,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "audio prompt of three to ten seconds"
        }
      ],
      "languageSupport": {
        "rawText": "English (en-US).",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 11,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "restricted access",
          "prompt-based voice adaptation"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "tts",
      "modelId": "magpie-tts-flow",
      "publicName": "Magpie TTS Flow",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-character pricing found.",
      "limitsSummary": "English only. Offline only. Audio prompt must be 3-10 seconds and requires prompt transcript. Access restricted.",
      "regionSummary": "Self-host docs only; restricted access.",
      "languagesSummary": "English (en-US).",
      "notes": "Do not expose in a default stable picker. Restricted-access and offline-only.",
      "officialSources": [
        "https://docs.nvidia.com/nim/riva/tts/latest/support-matrix.html",
        "https://docs.nvidia.com/nim/riva/tts/latest/getting-started.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 3,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "audio prompt of three to ten seconds"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 10,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "audio prompt of three to ten seconds"
        }
      ],
      "languageSupport": {
        "rawText": "English (en-US).",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 16,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "restricted access",
          "offline-only",
          "requires audio prompt transcript"
        ]
      }
    }
  ),
]);

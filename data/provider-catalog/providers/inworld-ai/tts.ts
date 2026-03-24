import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "inworld-ai",
      "providerName": "Inworld AI",
      "service": "tts",
      "modelId": "inworld-tts-1.5-max",
      "publicName": "Inworld TTS 1.5 Max",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
      "limitsSummary": null,
      "regionSummary": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
      "languagesSummary": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
      "notes": "Important nuance: Inworld is not just a TTS vendor. It is a realtime orchestration/runtime layer. Represent it differently from plain model providers in your app.",
      "officialSources": [
        "https://docs.inworld.ai/",
        "https://docs.inworld.ai/tts",
        "https://inworld.ai/pricing"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_characters",
          "sourceText": "$5/M chars"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_characters",
          "sourceText": "$10/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
        "isMultilingual": true,
        "languageCount": 15,
        "voiceCount": null,
        "listedLanguages": [
          "15 languages (en",
          "zh",
          "ja",
          "ko",
          "ru",
          "it",
          "es",
          "pt",
          "fr",
          "de",
          "pl",
          "nl",
          "hi",
          "he",
          "ar"
        ],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "inworld-ai",
      "providerName": "Inworld AI",
      "service": "tts",
      "modelId": "inworld-tts-1.5-mini",
      "publicName": "Inworld TTS 1.5 Mini",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
      "limitsSummary": null,
      "regionSummary": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
      "languagesSummary": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
      "notes": "Important nuance: Inworld is not just a TTS vendor. It is a realtime orchestration/runtime layer. Represent it differently from plain model providers in your app.",
      "officialSources": [
        "https://docs.inworld.ai/",
        "https://docs.inworld.ai/tts",
        "https://inworld.ai/pricing"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_characters",
          "sourceText": "$5/M chars"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_characters",
          "sourceText": "$10/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
        "isMultilingual": true,
        "languageCount": 15,
        "voiceCount": null,
        "listedLanguages": [
          "15 languages (en",
          "zh",
          "ja",
          "ko",
          "ru",
          "it",
          "es",
          "pt",
          "fr",
          "de",
          "pl",
          "nl",
          "hi",
          "he",
          "ar"
        ],
        "notes": []
      }
    }
  ),
]);

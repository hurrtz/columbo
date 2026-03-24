import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "fish-audio",
      "providerName": "Fish Audio",
      "service": "tts",
      "modelId": "s1",
      "publicName": "S1",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
      "limitsSummary": null,
      "regionSummary": "Fish Audio cloud; region detail limited.",
      "languagesSummary": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
      "notes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS.",
      "officialSources": [
        "https://docs.fish.audio/",
        "https://fish.audio/",
        "https://docs.fish.audio/api-reference"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "million_utf8_bytes",
          "sourceText": "$15/M UTF-8 bytes"
        },
        {
          "amountUsd": 0.36,
          "unit": "hour",
          "sourceText": "$0.36/hour"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
        "isMultilingual": true,
        "languageCount": 80,
        "voiceCount": null,
        "listedLanguages": [
          "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN",
          "ZH",
          "JA",
          "DE",
          "FR",
          "ES",
          "KO",
          "AR",
          "RU",
          "NL",
          "IT",
          "PL",
          "PT"
        ],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "fish-audio",
      "providerName": "Fish Audio",
      "service": "tts",
      "modelId": "s2-pro",
      "publicName": "S2 Pro",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
      "limitsSummary": null,
      "regionSummary": "Fish Audio cloud; region detail limited.",
      "languagesSummary": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
      "notes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS.",
      "officialSources": [
        "https://docs.fish.audio/",
        "https://fish.audio/",
        "https://docs.fish.audio/api-reference"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "million_utf8_bytes",
          "sourceText": "$15/M UTF-8 bytes"
        },
        {
          "amountUsd": 0.36,
          "unit": "hour",
          "sourceText": "$0.36/hour"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
        "isMultilingual": true,
        "languageCount": 80,
        "voiceCount": null,
        "listedLanguages": [
          "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN",
          "ZH",
          "JA",
          "DE",
          "FR",
          "ES",
          "KO",
          "AR",
          "RU",
          "NL",
          "IT",
          "PL",
          "PT"
        ],
        "notes": []
      }
    }
  ),
]);

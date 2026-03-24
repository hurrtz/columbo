import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "tts",
      "modelId": "canopylabs/orpheus-v1-english",
      "publicName": "Canopy Labs Orpheus V1 English",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$22 / 1M characters.",
      "limitsSummary": "TTS docs say max 200 input characters, wav output only, 6 English voices. Supported-models page also shows 4,000 context and 50,000 max completion, but the endpoint doc is the operational limit that should drive app behavior.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "English only; 6 listed voices.",
      "notes": "Preview-only. Suitable only behind a preview flag. Supports vocal directions in bracketed text such as [cheerful] and [whisper].",
      "officialSources": [
        "https://console.groq.com/docs/text-to-speech",
        "https://console.groq.com/docs/text-to-speech/orpheus",
        "https://console.groq.com/docs/models",
        "https://groq.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 22.0,
          "unit": "million_characters",
          "sourceText": "$22 / 1 million characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 200,
          "unit": "other",
          "scope": "general",
          "sourceText": "input: the text to generate audio from (max 200 characters)"
        }
      ],
      "languageSupport": {
        "rawText": "English; six professionally-trained voice personas.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 6,
        "listedLanguages": [
          "English"
        ],
        "notes": [
          "voice-dependent",
          "supports vocal directions"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "tts",
      "modelId": "canopylabs/orpheus-arabic-saudi",
      "publicName": "Canopy Labs Orpheus Arabic Saudi",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$40 / 1M characters.",
      "limitsSummary": "TTS docs say max 200 input characters, wav output only, 4 Arabic Saudi voices. Supported-models page also shows 4,000 context and 50,000 max completion, but the endpoint doc is the operational limit that should drive app behavior.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "Arabic (Saudi) only; 4 listed voices.",
      "notes": "Preview-only. Suitable only behind a preview flag. No vocal directions support documented.",
      "officialSources": [
        "https://console.groq.com/docs/text-to-speech",
        "https://console.groq.com/docs/text-to-speech/orpheus",
        "https://console.groq.com/docs/models",
        "https://groq.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 40.0,
          "unit": "million_characters",
          "sourceText": "$40 / 1 million characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 200,
          "unit": "other",
          "scope": "general",
          "sourceText": "input: the text to generate audio from (max 200 characters)"
        }
      ],
      "languageSupport": {
        "rawText": "Arabic (Saudi); four distinct Saudi dialect voices.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 4,
        "listedLanguages": [
          "Arabic (Saudi)"
        ],
        "notes": [
          "voice-dependent",
          "no vocal directions support"
        ]
      }
    }
  ),
]);

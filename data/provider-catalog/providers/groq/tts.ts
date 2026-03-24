import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "tts",
      "modelId": "canopylabs/orpheus-arabic-saudi",
      "publicName": "Orpheus Arabic Saudi",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
      "limitsSummary": null,
      "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
      "languagesSummary": "English; Arabic (Saudi) on currently documented Orpheus models.",
      "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/text-to-speech",
        "https://console.groq.com/docs/speech-to-text"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 22.0,
          "unit": "million_characters",
          "sourceText": "$22/M chars"
        },
        {
          "amountUsd": 40.0,
          "unit": "million_characters",
          "sourceText": "$40/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "English; Arabic (Saudi) on currently documented Orpheus models.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "tts",
      "modelId": "canopylabs/orpheus-v1-english",
      "publicName": "Orpheus v1 English",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
      "limitsSummary": null,
      "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
      "languagesSummary": "English; Arabic (Saudi) on currently documented Orpheus models.",
      "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/text-to-speech",
        "https://console.groq.com/docs/speech-to-text"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 22.0,
          "unit": "million_characters",
          "sourceText": "$22/M chars"
        },
        {
          "amountUsd": 40.0,
          "unit": "million_characters",
          "sourceText": "$40/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "English; Arabic (Saudi) on currently documented Orpheus models.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

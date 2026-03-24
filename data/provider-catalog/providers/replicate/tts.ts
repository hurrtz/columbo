import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "resemble-ai/chatterbox-turbo",
      "publicName": "Chatterbox Turbo",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
      "limitsSummary": null,
      "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
      "languagesSummary": "Depends on chosen model.",
      "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
      "officialSources": [
        "https://replicate.com/explore",
        "https://replicate.com/collections/text-to-speech",
        "https://replicate.com/collections/speech-to-text"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 30.0,
          "unit": "million_characters",
          "sourceText": "$30/M chars"
        },
        {
          "amountUsd": 50.0,
          "unit": "million_characters",
          "sourceText": "$50/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen model.",
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
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "minimax/speech-2.8-hd",
      "publicName": "MiniMax Speech 2.8 HD",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
      "limitsSummary": null,
      "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
      "languagesSummary": "Depends on chosen model.",
      "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
      "officialSources": [
        "https://replicate.com/explore",
        "https://replicate.com/collections/text-to-speech",
        "https://replicate.com/collections/speech-to-text"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 30.0,
          "unit": "million_characters",
          "sourceText": "$30/M chars"
        },
        {
          "amountUsd": 50.0,
          "unit": "million_characters",
          "sourceText": "$50/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen model.",
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
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "minimax/speech-2.8-turbo",
      "publicName": "MiniMax Speech 2.8 Turbo",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
      "limitsSummary": null,
      "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
      "languagesSummary": "Depends on chosen model.",
      "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
      "officialSources": [
        "https://replicate.com/explore",
        "https://replicate.com/collections/text-to-speech",
        "https://replicate.com/collections/speech-to-text"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 30.0,
          "unit": "million_characters",
          "sourceText": "$30/M chars"
        },
        {
          "amountUsd": 50.0,
          "unit": "million_characters",
          "sourceText": "$50/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen model.",
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
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "playht/play-dialog",
      "publicName": "Play Dialog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
      "limitsSummary": null,
      "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
      "languagesSummary": "Depends on chosen model.",
      "notes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together.",
      "officialSources": [
        "https://replicate.com/explore",
        "https://replicate.com/collections/text-to-speech",
        "https://replicate.com/collections/speech-to-text"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 30.0,
          "unit": "million_characters",
          "sourceText": "$30/M chars"
        },
        {
          "amountUsd": 50.0,
          "unit": "million_characters",
          "sourceText": "$50/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen model.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

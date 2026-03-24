import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "tts",
      "modelId": "Melo TTS",
      "publicName": "Melo TTS",
      "aliases": [
        "melotts"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$5.00 per 1M characters.",
      "limitsSummary": "No character limit per request is documented. Endpoint is POST /v1/audio/generation. Speed range 0.1-5.",
      "regionSummary": "No region-specific TTS deployment info published.",
      "languagesSummary": "6 languages, 9 documented speaker variants.",
      "notes": "The current TTS docs do not require a model parameter; the endpoint appears to be single-model.",
      "officialSources": [
        "https://docs.hyperbolic.ai/inference/audio-apis",
        "https://app.hyperbolic.ai/models/melotts",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_characters",
          "sourceText": "Rate: $5.00 per 1 million characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": ">=",
          "value": 0,
          "unit": "other",
          "scope": "general",
          "sourceText": "There are no character limits per request"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 5,
          "unit": "other",
          "scope": "model",
          "sourceText": "speed ... Speech speed multiplier (0.1-5)"
        }
      ],
      "languageSupport": {
        "rawText": "English, Spanish, French, Chinese, Japanese, Korean; English speakers EN-US, EN-BR, EN-INDIA, EN-AU.",
        "isMultilingual": true,
        "languageCount": 6,
        "voiceCount": 9,
        "listedLanguages": [
          "EN",
          "ES",
          "FR",
          "ZH",
          "JP",
          "KR"
        ],
        "notes": [
          "voice-dependent"
        ]
      }
    }
  ),
]);

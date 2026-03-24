import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "xiaomi-mimo",
      "providerName": "Xiaomi Mimo",
      "service": "tts",
      "modelId": "mimo-v2-tts",
      "publicName": "MiMo-V2-TTS",
      "aliases": [
        "MiMo-V2-TTS"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown. No first-party public TTS pricing page found.",
      "limitsSummary": "No public first-party character limit, duration limit, or voice inventory page found.",
      "regionSummary": "No API-region split documentation found.",
      "languagesSummary": "Officially supports Chinese and English today, with dialect and persona examples; broader language expansion is on the roadmap.",
      "notes": "Native TTS API model. Xiaomi markets real-time interaction, expressive style prompting, dialects, paralinguistic events, and singing. OpenAI-compatible TTS endpoint shape is not well-documented publicly.",
      "officialSources": [
        "https://mimo.xiaomi.com/mimo-v2-tts",
        "https://platform.xiaomimimo.com/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Expanded language coverage beyond Chinese and English is on the roadmap; current page demonstrates Chinese and English plus dialect variants.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "voice-dependent",
          "dialect support shown",
          "voice count unknown"
        ]
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "picovoice",
      "providerName": "Picovoice",
      "service": "tts",
      "modelId": "orca",
      "publicName": "Orca",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "On-device SDK pricing/plans vary by product and deployment.",
      "limitsSummary": null,
      "regionSummary": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
      "languagesSummary": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish.",
      "notes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters.",
      "officialSources": [
        "https://picovoice.ai/docs/",
        "https://picovoice.ai/platform/",
        "https://picovoice.ai/pricing/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "English",
          "French",
          "German",
          "Italian",
          "Japanese",
          "Korean",
          "Portuguese",
          "Spanish"
        ],
        "notes": []
      }
    }
  ),
]);

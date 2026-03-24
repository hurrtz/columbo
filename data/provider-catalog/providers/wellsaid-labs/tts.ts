import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "wellsaid-labs",
      "providerName": "WellSaid Labs",
      "service": "tts",
      "modelId": "voice-based",
      "publicName": "WellSaid API voice models",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Subscription/custom pricing; free trial account available.",
      "limitsSummary": null,
      "regionSummary": "WellSaid cloud; public region detail limited.",
      "languagesSummary": "English plus selected non-English languages/accents; coverage is materially narrower than ElevenLabs/Google/Azure.",
      "notes": "Docs emphasize speaker IDs/avatars more than a small global model list",
      "officialSources": [
        "https://docs.wellsaidlabs.com/docs/getting-started",
        "https://docs.wellsaidlabs.com/reference/model-selection-with-the-api",
        "https://wellsaidlabs.com/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "English plus selected non-English languages/accents; coverage is materially narrower than ElevenLabs/Google/Azure.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "playht",
      "providerName": "PlayHT",
      "service": "tts",
      "modelId": "PlayDialog-turbo",
      "publicName": "PlayDialog Turbo",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Plan-based/pricing-page driven. Official site markets a free version for limited testing.",
      "limitsSummary": null,
      "regionSummary": "PlayHT cloud; region details limited in public docs.",
      "languagesSummary": "30+ to 40+ languages depending on marketing page/version.",
      "notes": "Use voice IDs plus engine selection. Public docs clearly show Dialog Turbo, but broader engine naming is less standardized than some competitors.",
      "officialSources": [
        "https://docs.play.ht/reference/models",
        "https://docs.play.ht/reference/groq",
        "https://play.ht/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "30+ to 40+ languages depending on marketing page/version.",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "playht",
      "providerName": "PlayHT",
      "service": "tts",
      "modelId": "tts",
      "publicName": "PlayHT TTS API",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Plan-based/pricing-page driven. Official site markets a free version for limited testing.",
      "limitsSummary": null,
      "regionSummary": "PlayHT cloud; region details limited in public docs.",
      "languagesSummary": "30+ to 40+ languages depending on marketing page/version.",
      "notes": "Voice-based model/engine selection beyond Turbo",
      "officialSources": [
        "https://docs.play.ht/reference/models",
        "https://docs.play.ht/reference/groq",
        "https://play.ht/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "30+ to 40+ languages depending on marketing page/version.",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

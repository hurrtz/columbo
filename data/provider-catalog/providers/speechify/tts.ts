import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "speechify",
      "providerName": "Speechify",
      "service": "tts",
      "modelId": "simba-english",
      "publicName": "Simba English",
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Plan-based; public messaging emphasizes generous free testing. API pricing depends on contract/usage tier.",
      "limitsSummary": null,
      "regionSummary": "Speechify cloud.",
      "languagesSummary": "6 fully supported langs + ~17 beta langs in docs reviewed (examples: en, fr-FR, de-DE, es-ES, pt-BR, pt-PT plus many beta locales).",
      "notes": "Clear model IDs, but language support is tiered (fully supported vs beta). Store support quality, not just a flat boolean.",
      "officialSources": [
        "https://docs.sws.speechify.com/",
        "https://docs.sws.speechify.com/v1/docs/get-started/models",
        "https://docs.sws.speechify.com/docs/features/language-support"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "6 fully supported langs + ~17 beta langs in docs reviewed (examples: en, fr-FR, de-DE, es-ES, pt-BR, pt-PT plus many beta locales).",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "6 fully supported langs + ~17 beta langs in docs reviewed (examples: en",
          "fr-FR",
          "de-DE",
          "es-ES",
          "pt-BR",
          "pt-PT plus many beta locales"
        ],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "speechify",
      "providerName": "Speechify",
      "service": "tts",
      "modelId": "simba-multilingual",
      "publicName": "Simba Multilingual",
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Plan-based; public messaging emphasizes generous free testing. API pricing depends on contract/usage tier.",
      "limitsSummary": null,
      "regionSummary": "Speechify cloud.",
      "languagesSummary": "6 fully supported langs + ~17 beta langs in docs reviewed (examples: en, fr-FR, de-DE, es-ES, pt-BR, pt-PT plus many beta locales).",
      "notes": "Clear model IDs, but language support is tiered (fully supported vs beta). Store support quality, not just a flat boolean.",
      "officialSources": [
        "https://docs.sws.speechify.com/",
        "https://docs.sws.speechify.com/v1/docs/get-started/models",
        "https://docs.sws.speechify.com/docs/features/language-support"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "6 fully supported langs + ~17 beta langs in docs reviewed (examples: en, fr-FR, de-DE, es-ES, pt-BR, pt-PT plus many beta locales).",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "6 fully supported langs + ~17 beta langs in docs reviewed (examples: en",
          "fr-FR",
          "de-DE",
          "es-ES",
          "pt-BR",
          "pt-PT plus many beta locales"
        ],
        "notes": []
      }
    }
  ),
]);

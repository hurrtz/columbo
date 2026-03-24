import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "neets-ai",
      "providerName": "Neets.ai",
      "service": "tts",
      "modelId": "dynamic",
      "publicName": "Neets TTS catalog",
      "status": "Documented active/current",
      "catalogScope": "Low-confidence / sparse public docs",
      "pricingSummary": "Official public pricing/model detail was not richly retrievable from indexed docs reviewed.",
      "limitsSummary": null,
      "regionSummary": "Not clearly published.",
      "languagesSummary": "Public third-party descriptions claim broad multilingual support, but indexed official detail was sparse.",
      "notes": "Official docs exist but public indexing is sparse",
      "officialSources": [
        "https://neets.ai/",
        "https://docs.neets.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Public third-party descriptions claim broad multilingual support, but indexed official detail was sparse.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Public third-party descriptions claim broad multilingual support",
          "but indexed official detail was sparse"
        ],
        "notes": []
      }
    }
  ),
]);

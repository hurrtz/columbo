import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "lmnt",
      "providerName": "LMNT",
      "service": "tts",
      "modelId": "aurora",
      "publicName": "Aurora (alias to Blizzard)",
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Plan-based; account endpoint exposes character and voice limits.",
      "limitsSummary": null,
      "regionSummary": "LMNT cloud.",
      "languagesSummary": "Primarily English-focused in current docs/positioning.",
      "notes": "Alias",
      "officialSources": [
        "https://docs.lmnt.com/",
        "https://docs.lmnt.com/guides/models",
        "https://docs.lmnt.com/api-reference/account-info"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Primarily English-focused in current docs/positioning.",
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
      "providerId": "lmnt",
      "providerName": "LMNT",
      "service": "tts",
      "modelId": "blizzard",
      "publicName": "Blizzard",
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Plan-based; account endpoint exposes character and voice limits.",
      "limitsSummary": null,
      "regionSummary": "LMNT cloud.",
      "languagesSummary": "Primarily English-focused in current docs/positioning.",
      "notes": "Simple low-latency TTS integration. One of the cleanest model catalogs because it is effectively a single production model plus alias.",
      "officialSources": [
        "https://docs.lmnt.com/",
        "https://docs.lmnt.com/guides/models",
        "https://docs.lmnt.com/api-reference/account-info"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Primarily English-focused in current docs/positioning.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

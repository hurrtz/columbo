import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "murf-ai",
      "providerName": "Murf.ai",
      "service": "tts",
      "modelId": "falcon",
      "publicName": "Falcon",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Falcon is marketed at about $0.01/minute and also shown as ~$0.01 per 1,000 characters on pricing materials. Other studio/API plans vary.",
      "limitsSummary": null,
      "regionSummary": "Edge deployment across 10+ regions is marketed for Falcon.",
      "languagesSummary": "Around 35 languages / 10+ accents in current marketing; exact counts vary across pages.",
      "notes": "Good cost-focused conversational TTS candidate. Note that Murf’s published counts (voices/languages) differ slightly across pages.",
      "officialSources": [
        "https://murf.ai/api",
        "https://murf.ai/api/docs/text-to-speech-models/falcon",
        "https://murf.ai/falcon"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.01,
          "unit": "minute",
          "sourceText": "$0.01/minute"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Around 35 languages / 10+ accents in current marketing; exact counts vary across pages.",
        "isMultilingual": true,
        "languageCount": 35,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

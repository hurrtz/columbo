import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "speechmatics",
      "providerName": "Speechmatics",
      "service": "tts",
      "modelId": "preview",
      "publicName": "Speechmatics TTS Preview voices",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Flow voice agent API free up to ~50 hours/month. TTS preview has been free during preview. STT pricing varies by deployment/plan.",
      "limitsSummary": null,
      "regionSummary": "Cloud plus on-prem/air-gapped deployment options.",
      "languagesSummary": "English only in current preview reviewed.",
      "notes": "Voices: sarah, theo, megan, jack",
      "officialSources": [
        "https://docs.speechmatics.com/",
        "https://www.speechmatics.com/",
        "https://docs.speechmatics.com/api-ref/tts"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "English only in current preview reviewed.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": [
          "preview"
        ]
      }
    }
  ),
]);

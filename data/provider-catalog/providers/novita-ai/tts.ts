import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "dynamic",
      "publicName": "Novita TTS catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
      "limitsSummary": null,
      "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
      "languagesSummary": "Depends on chosen TTS model/voice library.",
      "notes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting.",
      "officialSources": [
        "https://novita.ai/docs/api-reference",
        "https://novita.ai/models",
        "https://novita.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen TTS model/voice library.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

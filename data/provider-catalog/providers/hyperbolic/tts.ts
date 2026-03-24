import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "tts",
      "modelId": "dynamic",
      "publicName": "Text-to-Speech catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Model-specific pricing; provider also offers $1 promotional credit after phone verification.",
      "limitsSummary": null,
      "regionSummary": "Hyperbolic cloud; zero-data-retention claim in platform materials.",
      "languagesSummary": "Depends on chosen TTS model.",
      "notes": "Treat Hyperbolic as LLM + TTS platform-level support. STT should be validated manually before you expose it as a user-selectable feature.",
      "officialSources": [
        "https://docs.hyperbolic.xyz/",
        "https://app.hyperbolic.xyz/pricing",
        "https://www.hyperbolic.xyz/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen TTS model.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

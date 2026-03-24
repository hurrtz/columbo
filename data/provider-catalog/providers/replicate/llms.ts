import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "LLM marketplace",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
      "limitsSummary": null,
      "regionSummary": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
      "languagesSummary": null,
      "notes": "Thousands of models; use collections/search APIs",
      "officialSources": [
        "https://replicate.com/explore",
        "https://replicate.com/collections/text-to-speech",
        "https://replicate.com/collections/speech-to-text"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 30.0,
          "unit": "million_characters",
          "sourceText": "$30/M chars"
        },
        {
          "amountUsd": 50.0,
          "unit": "million_characters",
          "sourceText": "$50/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

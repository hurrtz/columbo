import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "inworld-ai",
      "providerName": "Inworld AI",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "LLM router / 220+ external models",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
      "limitsSummary": null,
      "regionSummary": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
      "languagesSummary": null,
      "notes": "Inworld routes to many third-party LLMs rather than only first-party LLMs",
      "officialSources": [
        "https://docs.inworld.ai/",
        "https://docs.inworld.ai/tts",
        "https://inworld.ai/pricing"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_characters",
          "sourceText": "$5/M chars"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_characters",
          "sourceText": "$10/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

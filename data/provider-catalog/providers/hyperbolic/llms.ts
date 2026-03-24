import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Text/model catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Model-specific pricing; provider also offers $1 promotional credit after phone verification.",
      "limitsSummary": null,
      "regionSummary": "Hyperbolic cloud; zero-data-retention claim in platform materials.",
      "languagesSummary": null,
      "notes": "25+ open-source models/platform focus",
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
      "languageSupport": null
    }
  ),
]);

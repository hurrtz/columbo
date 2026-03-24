import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Hosted LLM catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
      "limitsSummary": null,
      "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
      "languagesSummary": null,
      "notes": "200+ APIs claimed",
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
      "languageSupport": null
    }
  ),
]);

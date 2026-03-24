import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "cerebras",
      "providerName": "Cerebras",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Fast hosted LLM catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Cerebras emphasizes ultra-fast LLM inference; pricing depends on model/plan.",
      "limitsSummary": null,
      "regionSummary": "Cerebras cloud; public region granularity limited.",
      "languagesSummary": null,
      "notes": "Examples change quickly; voice examples use external speech providers",
      "officialSources": [
        "https://inference-docs.cerebras.ai/",
        "https://www.cerebras.ai/",
        "https://inference-docs.cerebras.ai/capabilities/voice-ai"
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

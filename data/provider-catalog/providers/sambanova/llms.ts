import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "SambaNova",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "SambaCloud hosted model catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "LLM pricing varies by hosted model. Audio/STT support is exposed through OpenAI-compatible endpoints in docs.",
      "limitsSummary": null,
      "regionSummary": "SambaCloud / enterprise deployments; public per-model region detail limited.",
      "languagesSummary": null,
      "notes": "Includes Llama, DeepSeek and others",
      "officialSources": [
        "https://docs.sambanova.ai/",
        "https://cloud.sambanova.ai/",
        "https://docs.sambanova.ai/cloud/api-reference/audio"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

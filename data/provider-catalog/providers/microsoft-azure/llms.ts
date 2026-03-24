import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Azure OpenAI / Azure AI Foundry catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
      "limitsSummary": null,
      "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
      "languagesSummary": null,
      "notes": "Includes GPT, Phi, Llama, Mistral, Cohere and partner models; use live catalog",
      "officialSources": [
        "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
        "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
        "https://learn.microsoft.com/azure/ai-services/speech-service/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

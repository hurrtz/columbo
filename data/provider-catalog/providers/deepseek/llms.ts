import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "deepseek",
      "providerName": "DeepSeek",
      "service": "llm",
      "modelId": "deepseek-chat",
      "publicName": "DeepSeek Chat",
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "deepseek-chat: cache hit $0.07/M, cache miss $0.27/M, output $1.10/M; deepseek-reasoner: cache hit $0.14/M, miss $0.55/M, output $2.19/M.",
      "limitsSummary": null,
      "regionSummary": "DeepSeek-hosted; region specifics are not deeply public.",
      "languagesSummary": null,
      "notes": "V3.2 chat mode",
      "officialSources": [
        "https://api-docs.deepseek.com/",
        "https://api-docs.deepseek.com/quick_start/pricing",
        "https://api-docs.deepseek.com/quick_start/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "deepseek",
      "providerName": "DeepSeek",
      "service": "llm",
      "modelId": "deepseek-reasoner",
      "publicName": "DeepSeek Reasoner",
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "deepseek-chat: cache hit $0.07/M, cache miss $0.27/M, output $1.10/M; deepseek-reasoner: cache hit $0.14/M, miss $0.55/M, output $2.19/M.",
      "limitsSummary": null,
      "regionSummary": "DeepSeek-hosted; region specifics are not deeply public.",
      "languagesSummary": null,
      "notes": "V3.2 thinking mode",
      "officialSources": [
        "https://api-docs.deepseek.com/",
        "https://api-docs.deepseek.com/quick_start/pricing",
        "https://api-docs.deepseek.com/quick_start/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

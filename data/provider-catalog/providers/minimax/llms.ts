import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "MiniMax",
      "service": "llm",
      "modelId": "minimax-m2.5-highspeed",
      "publicName": "MiniMax M2.5 Highspeed",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
      "limitsSummary": null,
      "regionSummary": "MiniMax cloud; public regional granularity is limited.",
      "languagesSummary": null,
      "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
      "officialSources": [
        "https://www.minimax.io/",
        "https://platform.minimax.io/",
        "https://platform.minimax.io/document"
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
      "providerId": "minimax",
      "providerName": "MiniMax",
      "service": "llm",
      "modelId": "minimax-m2.7",
      "publicName": "MiniMax M2.7",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
      "limitsSummary": null,
      "regionSummary": "MiniMax cloud; public regional granularity is limited.",
      "languagesSummary": null,
      "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
      "officialSources": [
        "https://www.minimax.io/",
        "https://platform.minimax.io/",
        "https://platform.minimax.io/document"
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
      "providerId": "minimax",
      "providerName": "MiniMax",
      "service": "llm",
      "modelId": "minimax-m2.7-highspeed",
      "publicName": "MiniMax M2.7 Highspeed",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "LLM and TTS are priced separately; official plan FAQ highlights M2.x model pricing and speech-family pricing by character/plan.",
      "limitsSummary": null,
      "regionSummary": "MiniMax cloud; public regional granularity is limited.",
      "languagesSummary": null,
      "notes": "Treat MiniMax as strong LLM+TTS. If you need STT, pair it with another provider.",
      "officialSources": [
        "https://www.minimax.io/",
        "https://platform.minimax.io/",
        "https://platform.minimax.io/document"
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

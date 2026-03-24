import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "ai21-labs",
      "providerName": "AI21 Labs",
      "service": "llm",
      "modelId": "jamba-3b",
      "publicName": "Jamba 3B",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Jamba pricing varies by model; new accounts have received $10 credit for 3 months.",
      "limitsSummary": null,
      "regionSummary": "AI21-hosted; regional details are not deeply exposed publicly.",
      "languagesSummary": null,
      "notes": "Supported languages are broader than English (e.g., EN/ES/FR/PT/IT/NL/DE/AR/HE), but there is no native TTS/STT.",
      "officialSources": [
        "https://docs.ai21.com/docs/jamba-models",
        "https://docs.ai21.com/reference/get-started",
        "https://www.ai21.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "ai21-labs",
      "providerName": "AI21 Labs",
      "service": "llm",
      "modelId": "jamba-large",
      "publicName": "Jamba Large",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Jamba pricing varies by model; new accounts have received $10 credit for 3 months.",
      "limitsSummary": null,
      "regionSummary": "AI21-hosted; regional details are not deeply exposed publicly.",
      "languagesSummary": null,
      "notes": "Supported languages are broader than English (e.g., EN/ES/FR/PT/IT/NL/DE/AR/HE), but there is no native TTS/STT.",
      "officialSources": [
        "https://docs.ai21.com/docs/jamba-models",
        "https://docs.ai21.com/reference/get-started",
        "https://www.ai21.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "ai21-labs",
      "providerName": "AI21 Labs",
      "service": "llm",
      "modelId": "jamba-mini",
      "publicName": "Jamba Mini",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Jamba pricing varies by model; new accounts have received $10 credit for 3 months.",
      "limitsSummary": null,
      "regionSummary": "AI21-hosted; regional details are not deeply exposed publicly.",
      "languagesSummary": null,
      "notes": "Supported languages are broader than English (e.g., EN/ES/FR/PT/IT/NL/DE/AR/HE), but there is no native TTS/STT.",
      "officialSources": [
        "https://docs.ai21.com/docs/jamba-models",
        "https://docs.ai21.com/reference/get-started",
        "https://www.ai21.com/pricing"
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

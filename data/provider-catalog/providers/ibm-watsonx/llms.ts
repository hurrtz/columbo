import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "llm",
      "modelId": "granite-3.x",
      "publicName": "Granite 3.x family",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": null,
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": null,
      "notes": "Still available in many deployments",
      "officialSources": [
        "https://cloud.ibm.com/apidocs/watsonx-ai",
        "https://cloud.ibm.com/catalog/services/text-to-speech",
        "https://cloud.ibm.com/catalog/services/speech-to-text"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "llm",
      "modelId": "granite-4.0",
      "publicName": "Granite 4.0 family",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": null,
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": null,
      "notes": "watsonx.ai model family",
      "officialSources": [
        "https://cloud.ibm.com/apidocs/watsonx-ai",
        "https://cloud.ibm.com/catalog/services/text-to-speech",
        "https://cloud.ibm.com/catalog/services/speech-to-text"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

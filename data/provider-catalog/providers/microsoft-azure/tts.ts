import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "tts",
      "modelId": "voice-based",
      "publicName": "Azure Speech voices",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
      "limitsSummary": null,
      "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
      "languagesSummary": "400+ voices across 140+ languages/variants.",
      "notes": "Service uses voice names rather than a small fixed model catalog",
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
      "languageSupport": {
        "rawText": "400+ voices across 140+ languages/variants.",
        "isMultilingual": true,
        "languageCount": 140,
        "voiceCount": 400,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "tts",
      "modelId": "custom",
      "publicName": "Custom Neural Voice",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
      "limitsSummary": null,
      "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
      "languagesSummary": "400+ voices across 140+ languages/variants.",
      "notes": "Treat Azure OpenAI and Azure Speech as separate product surfaces under one billing umbrella. Add model retirement monitoring.",
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
      "languageSupport": {
        "rawText": "400+ voices across 140+ languages/variants.",
        "isMultilingual": true,
        "languageCount": 140,
        "voiceCount": 400,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "tts",
      "modelId": "enhanced-neural",
      "publicName": "Enhanced Neural voices",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": null,
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": "English AU/US expressive voices; enhanced neural voices in Dutch, English UK/US, French CA/FR, German, Italian, Japanese, Korean, Portuguese BR, Spanish variants.",
      "notes": "Enterprise-friendly, but speech product line is more service-oriented than single model-ID oriented.",
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
      "languageSupport": {
        "rawText": "English AU/US expressive voices; enhanced neural voices in Dutch, English UK/US, French CA/FR, German, Italian, Japanese, Korean, Portuguese BR, Spanish variants.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "English AU/US expressive voices; enhanced neural voices in Dutch",
          "English UK/US",
          "French CA/FR",
          "German",
          "Italian",
          "Japanese",
          "Korean",
          "Portuguese BR",
          "Spanish variants"
        ],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "tts",
      "modelId": "expressive-neural",
      "publicName": "Expressive Neural voices",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": null,
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": "English AU/US expressive voices; enhanced neural voices in Dutch, English UK/US, French CA/FR, German, Italian, Japanese, Korean, Portuguese BR, Spanish variants.",
      "notes": "Enterprise-friendly, but speech product line is more service-oriented than single model-ID oriented.",
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
      "languageSupport": {
        "rawText": "English AU/US expressive voices; enhanced neural voices in Dutch, English UK/US, French CA/FR, German, Italian, Japanese, Korean, Portuguese BR, Spanish variants.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "English AU/US expressive voices; enhanced neural voices in Dutch",
          "English UK/US",
          "French CA/FR",
          "German",
          "Italian",
          "Japanese",
          "Korean",
          "Portuguese BR",
          "Spanish variants"
        ],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "tts",
      "modelId": "watson-tts",
      "publicName": "Watson Text to Speech",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": null,
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": "English AU/US expressive voices; enhanced neural voices in Dutch, English UK/US, French CA/FR, German, Italian, Japanese, Korean, Portuguese BR, Spanish variants.",
      "notes": "Enterprise-friendly, but speech product line is more service-oriented than single model-ID oriented.",
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
      "languageSupport": {
        "rawText": "English AU/US expressive voices; enhanced neural voices in Dutch, English UK/US, French CA/FR, German, Italian, Japanese, Korean, Portuguese BR, Spanish variants.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "English AU/US expressive voices; enhanced neural voices in Dutch",
          "English UK/US",
          "French CA/FR",
          "German",
          "Italian",
          "Japanese",
          "Korean",
          "Portuguese BR",
          "Spanish variants"
        ],
        "notes": []
      }
    }
  ),
]);

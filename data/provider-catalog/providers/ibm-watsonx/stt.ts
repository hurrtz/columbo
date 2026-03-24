import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "stt",
      "modelId": "large-speech",
      "publicName": "Large Speech",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": "TTS language/voice availability differs by voice family. STT model choice varies by language. IBM has begun partnering with Deepgram but native services still exist.",
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": "Large speech models in English, Japanese, French; broader coverage via older and next-gen models.",
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
        "rawText": "Large speech models in English, Japanese, French; broader coverage via older and next-gen models.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Large speech models in English",
          "Japanese",
          "French; broader coverage via older",
          "next-gen models"
        ],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "stt",
      "modelId": "next-gen",
      "publicName": "Next-Gen speech models",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": "TTS language/voice availability differs by voice family. STT model choice varies by language. IBM has begun partnering with Deepgram but native services still exist.",
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": "Large speech models in English, Japanese, French; broader coverage via older and next-gen models.",
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
        "rawText": "Large speech models in English, Japanese, French; broader coverage via older and next-gen models.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Large speech models in English",
          "Japanese",
          "French; broader coverage via older",
          "next-gen models"
        ],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM (watsonx)",
      "service": "stt",
      "modelId": "watson-stt",
      "publicName": "Watson Speech to Text",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
      "limitsSummary": "TTS language/voice availability differs by voice family. STT model choice varies by language. IBM has begun partnering with Deepgram but native services still exist.",
      "regionSummary": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
      "languagesSummary": "Large speech models in English, Japanese, French; broader coverage via older and next-gen models.",
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
        "rawText": "Large speech models in English, Japanese, French; broader coverage via older and next-gen models.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Large speech models in English",
          "Japanese",
          "French; broader coverage via older",
          "next-gen models"
        ],
        "notes": []
      }
    }
  ),
]);

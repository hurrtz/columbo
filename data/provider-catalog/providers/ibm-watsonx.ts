import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "ibm-watsonx",
  "providerName": "IBM (watsonx)",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://cloud.ibm.com/apidocs/watsonx-ai",
    "https://cloud.ibm.com/catalog/services/text-to-speech",
    "https://cloud.ibm.com/catalog/services/speech-to-text"
  ],
  "integration": {
    "catalogType": "Multi-service enterprise platform",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": false,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Granite 4.0 family [granite-4.0] — watsonx.ai model family\nGranite 3.x family [granite-3.x] — Still available in many deployments",
      "tts": "Watson Text to Speech [watson-tts]\nExpressive Neural voices [expressive-neural]\nEnhanced Neural voices [enhanced-neural]",
      "stt": "Watson Speech to Text [watson-stt]\nLarge Speech [large-speech]\nNext-Gen speech models [next-gen]"
    },
    "pricing": "Lite tiers include ~500 STT minutes/month and ~10k TTS chars/month; paid pricing varies by plan/region/service generation.",
    "limits": "TTS language/voice availability differs by voice family. STT model choice varies by language. IBM has begun partnering with Deepgram but native services still exist.",
    "region": "IBM Cloud regions vary by service instance; exact model-level data center is not always public.",
    "sttLanguages": "Large speech models in English, Japanese, French; broader coverage via older and next-gen models.",
    "ttsLanguages": "English AU/US expressive voices; enhanced neural voices in Dutch, English UK/US, French CA/FR, German, Italian, Japanese, Korean, Portuguese BR, Spanish variants.",
    "freeTier": "Yes: Lite tiers for both STT and TTS.",
    "integrationNotes": "Enterprise-friendly, but speech product line is more service-oriented than single model-ID oriented."
  }
} satisfies CatalogProvider;

const llms = [
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
  },
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
] satisfies CatalogLlm[];

const stt = [
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
  },
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
  },
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
] satisfies CatalogStt[];

const tts = [
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
  },
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
  },
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
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

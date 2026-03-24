import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
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
  }
);

export const providerContext = createProviderContext(providerDefinition);

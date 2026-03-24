import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "categoryName": "Chinese Providers",
    "hq": "CN",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://platform.baichuan-ai.com/",
      "https://platform.baichuan-ai.com/pricing",
      "https://platform.baichuan-ai.com/docs"
    ],
    "integration": {
      "catalogType": "Fixed first-party LLM catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Baichuan M3 Plus [baichuan-m3-plus]\nBaichuan M3 [baichuan-m3]\nBaichuan M2 Plus [baichuan-m2-plus]\nBaichuan M2 [baichuan-m2]\nBaichuan4 Turbo [baichuan4-turbo]\nBaichuan4 Air [baichuan4-air]\nBaichuan4 [baichuan4]\nBaichuan3 Turbo [baichuan3-turbo]\nBaichuan3 Turbo 128k [baichuan3-turbo-128k]\nBaichuan2 Turbo [baichuan2-turbo]\nBaichuan2 53B [baichuan2-53b]",
        "tts": null,
        "stt": null
      },
      "pricing": "Examples in RMB/1K tokens: Baichuan-M3-Plus input ~0.005 RMB, output ~0.009 RMB; Baichuan4-Air ~0.00098 RMB/1K all-in.",
      "limits": "No public native TTS/STT found.",
      "region": "China-centric.",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "Trial quotas may exist but not clearly standardized.",
      "integrationNotes": "Strong China-focused LLM catalog, but no public speech stack verified."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

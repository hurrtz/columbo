import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "picovoice",
    "providerName": "Picovoice",
    "categoryName": "Speech-Focused Providers",
    "hq": "CA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://picovoice.ai/docs/",
      "https://picovoice.ai/platform/",
      "https://picovoice.ai/pricing/"
    ],
    "integration": {
      "catalogType": "On-device / edge catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "picoLLM [picollm]",
        "tts": "Orca [orca]",
        "stt": "Cheetah [cheetah]\nCheetah Fast [cheetah-fast]\nLeopard [leopard]"
      },
      "pricing": "On-device SDK pricing/plans vary by product and deployment.",
      "limits": "Offline/edge deployment; device constraints matter more than cloud file-size quotas. Language coverage is narrower than cloud hyperscalers.",
      "region": "Not applicable for on-device inference; processing stays on device unless you wrap it yourself.",
      "sttLanguages": "Cheetah/Cheetah Fast languages include English, French, German, Italian, Portuguese, Spanish.",
      "ttsLanguages": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish.",
      "freeTier": "Evaluation/free developer access exists for many SDKs.",
      "integrationNotes": "Your sheet is outdated: Picovoice is now LLM + TTS + STT on-device. This is strategically important if privacy/offline mode matters."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

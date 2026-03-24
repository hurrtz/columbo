import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "reka",
    "providerName": "Reka",
    "categoryName": "Major Western Providers",
    "hq": "US/UK",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://www.reka.ai/",
      "https://www.reka.ai/pricing",
      "https://docs.reka.ai/"
    ],
    "integration": {
      "catalogType": "Fixed first-party multimodal LLM catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Reka Core [reka-core]\nReka Flash [reka-flash]\nReka Edge [reka-edge]",
        "tts": null,
        "stt": null
      },
      "pricing": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
      "limits": "Multimodal/audio input exists, but no dedicated public TTS or STT output API was verified.",
      "region": "Reka-hosted cloud; public region details are limited.",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "Not clearly documented as permanent free tier.",
      "integrationNotes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

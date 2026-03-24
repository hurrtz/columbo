import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "playht",
    "providerName": "PlayHT",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.play.ht/reference/models",
      "https://docs.play.ht/reference/groq",
      "https://play.ht/"
    ],
    "integration": {
      "catalogType": "TTS-first platform",
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
        "llm": null,
        "tts": "PlayDialog Turbo [PlayDialog-turbo]\nPlayHT TTS API [tts] — Voice-based model/engine selection beyond Turbo",
        "stt": null
      },
      "pricing": "Plan-based/pricing-page driven. Official site markets a free version for limited testing.",
      "limits": "Rate limits depend on plan/API. Public docs are more voice-centric than model-centric; voice IDs matter more than engine IDs.",
      "region": "PlayHT cloud; region details limited in public docs.",
      "sttLanguages": null,
      "ttsLanguages": "30+ to 40+ languages depending on marketing page/version.",
      "freeTier": "Yes: limited testing/free version.",
      "integrationNotes": "Use voice IDs plus engine selection. Public docs clearly show Dialog Turbo, but broader engine naming is less standardized than some competitors."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

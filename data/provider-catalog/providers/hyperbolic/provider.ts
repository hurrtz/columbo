import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "hyperbolic",
    "providerName": "Hyperbolic",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.hyperbolic.xyz/",
      "https://app.hyperbolic.xyz/pricing",
      "https://www.hyperbolic.xyz/"
    ],
    "integration": {
      "catalogType": "Dynamic hosting platform",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Text/model catalog [dynamic] — 25+ open-source models/platform focus",
        "tts": "Text-to-Speech catalog [dynamic]",
        "stt": null
      },
      "pricing": "Model-specific pricing; provider also offers $1 promotional credit after phone verification.",
      "limits": "Official docs reviewed did not clearly verify STT. Platform claims text-to-speech, text-to-image, text-to-video, fine-tuning, and model access.",
      "region": "Hyperbolic cloud; zero-data-retention claim in platform materials.",
      "sttLanguages": null,
      "ttsLanguages": "Depends on chosen TTS model.",
      "freeTier": "Promotional starter credit exists; not equivalent to a broad permanent free tier.",
      "integrationNotes": "Treat Hyperbolic as LLM + TTS platform-level support. STT should be validated manually before you expose it as a user-selectable feature."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "sambanova",
    "providerName": "SambaNova",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.sambanova.ai/",
      "https://cloud.sambanova.ai/",
      "https://docs.sambanova.ai/cloud/api-reference/audio"
    ],
    "integration": {
      "catalogType": "Dynamic enterprise/cloud platform",
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
        "llm": "SambaCloud hosted model catalog [dynamic] — Includes Llama, DeepSeek and others",
        "tts": null,
        "stt": "Whisper Large v3 [whisper-large-v3]"
      },
      "pricing": "LLM pricing varies by hosted model. Audio/STT support is exposed through OpenAI-compatible endpoints in docs.",
      "limits": "Docs mention audio-input flows with ~25 MB upload ceiling for some endpoints. No public first-party TTS was verified.",
      "region": "SambaCloud / enterprise deployments; public per-model region detail limited.",
      "sttLanguages": "Multilingual via Whisper family.",
      "ttsLanguages": null,
      "freeTier": "Trial/free access may exist depending on program; verify current dashboard.",
      "integrationNotes": "Your sheet is outdated: SambaNova docs now show native audio/STT support, but still no first-party TTS verified."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

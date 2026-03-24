import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "deepinfra",
    "providerName": "DeepInfra",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://deepinfra.com/docs",
      "https://deepinfra.com/models",
      "https://deepinfra.com/"
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
        "llm": "Hosted open/partner model catalog [dynamic]",
        "tts": "Qwen3 TTS [Qwen/Qwen3-TTS]\nTTS catalog [dynamic]",
        "stt": "Whisper Large [openai/whisper-large]\nASR catalog [dynamic]"
      },
      "pricing": "Varies by model page. Example speech prices depend on chosen hosted model.",
      "limits": "Catalog is dynamic; speech model capabilities and quotas differ by hosted model.",
      "region": "Public model-level region/data center detail is limited.",
      "sttLanguages": "Depends on chosen hosted model (e.g., Whisper multilingual).",
      "ttsLanguages": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
      "freeTier": "Small trial/free usage may exist depending on account state; verify current policy.",
      "integrationNotes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

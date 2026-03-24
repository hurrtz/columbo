import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "novita-ai",
    "providerName": "Novita AI",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://novita.ai/docs/api-reference",
      "https://novita.ai/models",
      "https://novita.ai/pricing"
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
        "llm": "Hosted LLM catalog [dynamic] — 200+ APIs claimed",
        "tts": "Novita TTS catalog [dynamic]",
        "stt": "Audio Transcriptions API [/audio/transcriptions]\nGLM-ASR-2512 [glm-asr-2512]"
      },
      "pricing": "Varies by model/service. Pricing page is service-specific and changes frequently.",
      "limits": "TTS marketing highlights <300 ms latency; exact quotas depend on chosen model and plan.",
      "region": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
      "sttLanguages": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
      "ttsLanguages": "Depends on chosen TTS model/voice library.",
      "freeTier": "Trial/free usage may exist; verify current dashboard.",
      "integrationNotes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

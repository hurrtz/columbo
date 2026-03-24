import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "replicate",
    "providerName": "Replicate",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://replicate.com/explore",
      "https://replicate.com/collections/text-to-speech",
      "https://replicate.com/collections/speech-to-text"
    ],
    "integration": {
      "catalogType": "Dynamic model marketplace",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": false,
      "protocols": [
        "rest",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "LLM marketplace [dynamic] — Thousands of models; use collections/search APIs",
        "tts": "MiniMax Speech 2.8 Turbo [minimax/speech-2.8-turbo]\nMiniMax Speech 2.8 HD [minimax/speech-2.8-hd]\nPlay Dialog [playht/play-dialog]\nChatterbox Turbo [resemble-ai/chatterbox-turbo]",
        "stt": "Whisper collection [openai/whisper-*]\nSTT marketplace [dynamic]"
      },
      "pricing": "Pay-per-prediction and model-specific. Example TTS on Replicate: MiniMax Turbo ~$30/M chars, HD ~$50/M chars; cloning may be priced per voice creation.",
      "limits": "Marketplace is huge and changes continuously. Model-level constraints come from each model page, not a unified global contract.",
      "region": "Replicate-managed infrastructure; exact region varies and is not fixed per marketplace model.",
      "sttLanguages": "Depends on chosen model.",
      "ttsLanguages": "Depends on chosen model.",
      "freeTier": "No broad permanent free tier; sometimes limited credits for onboarding.",
      "integrationNotes": "For BYOK apps, Replicate is a broker/marketplace rather than a stable canonical model namespace. Store provider+model slug together."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

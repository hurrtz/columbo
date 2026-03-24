import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "siliconflow",
    "providerName": "SiliconFlow",
    "categoryName": "Inference Platforms",
    "hq": "CN",
    "verifiedSupport": {
      "llm": "native",
      "stt": "partial",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.siliconflow.com/",
      "https://cloud.siliconflow.com/",
      "https://www.siliconflow.com/"
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
      "regionSplitRecommended": true
    },
    "summaries": {
      "activeModels": {
        "llm": "Hosted model catalog [dynamic] — 500+ models claimed",
        "tts": "Fish Speech V1.5 [fish-speech-v1.5]\nCosyVoice2 0.5B [cosyvoice2-0.5b]\nIndexTTS-2 [indextts-2]",
        "stt": "Speech catalog [dynamic] — Speech support exists at platform level but official public STT detail was less explicit"
      },
      "pricing": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
      "limits": "International service and China service are split across domains; exact speech quotas depend on model.",
      "region": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
      "sttLanguages": "Platform-level speech support exists, but verify exact model/language live before launch.",
      "ttsLanguages": "Depends on selected speech model.",
      "freeTier": "Trial credits may exist; check current dashboard.",
      "integrationNotes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

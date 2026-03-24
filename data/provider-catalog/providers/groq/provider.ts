import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "groq",
    "providerName": "Groq",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/speech-to-text"
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
        "llm": "Compound [groq/compound]\nCompound Mini [groq/compound-mini]\nHosted open models [dynamic] — Catalog changes frequently; includes Qwen, Kimi, OSS, etc.",
        "tts": "Orpheus v1 English [canopylabs/orpheus-v1-english]\nOrpheus Arabic Saudi [canopylabs/orpheus-arabic-saudi]",
        "stt": "Whisper Large v3 [whisper-large-v3]\nWhisper Large v3 Turbo [whisper-large-v3-turbo]"
      },
      "pricing": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
      "limits": "TTS max ~200 chars/request. STT file limits: ~25 MB on free tier, ~100 MB on dev tier; larger audio via URL. Minimum STT billing ~10 sec.",
      "region": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
      "sttLanguages": "Multilingual via Whisper family.",
      "ttsLanguages": "English; Arabic (Saudi) on currently documented Orpheus models.",
      "freeTier": "Yes.",
      "integrationNotes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

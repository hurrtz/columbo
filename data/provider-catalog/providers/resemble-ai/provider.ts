import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "resemble-ai",
    "providerName": "Resemble AI",
    "categoryName": "Speech-Focused Providers",
    "hq": "CA",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://app.resemble.ai/docs",
      "https://www.resemble.ai/pricing",
      "https://www.resemble.ai/"
    ],
    "integration": {
      "catalogType": "Speech-first platform",
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
        "tts": "Chatterbox [tts-v4]\nChatterbox Turbo [tts-v4-turbo]\nChatterbox Multilingual [tts-v4] — Multilingual variant",
        "stt": "Resemble STT [stt]\nSpeech-to-Speech / Voice Changer [speech-to-speech] — Adjacency feature"
      },
      "pricing": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
      "limits": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed.",
      "region": "Cloud plus enterprise/on-prem options.",
      "sttLanguages": "Public STT exists; verify exact language matrix live.",
      "ttsLanguages": "23 languages for multilingual Chatterbox.",
      "freeTier": "Yes: start-free style onboarding.",
      "integrationNotes": "Your sheet is outdated: Resemble is not just TTS anymore; it also has STT and speech-to-speech tooling."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

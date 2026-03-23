import { createProviderContext, defineProviderDefinition } from "../../definitions";

export const providerDefinition = defineProviderDefinition(
{
  "providerId": "openai",
  "providerName": "OpenAI",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://platform.openai.com/docs/models",
    "https://openai.com/api/pricing/",
    "https://platform.openai.com/docs/guides/speech-to-text"
  ],
  "integration": {
    "catalogType": "Fixed first-party catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "sip",
      "sse",
      "webrtc",
      "websocket"
    ],
    "regionSplitRecommended": true
  },
  "summaries": {
    "pricing": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limits": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
    "region": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "sttLanguages": "Whisper supports 98 languages; 4o transcribe is multilingual.",
    "ttsLanguages": "Multilingual; docs note English-optimized voices.",
    "freeTier": "No standing public free tier; credits/promotions may vary by account.",
    "integrationNotes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection."
  }
},
);

export const providerContext = createProviderContext(providerDefinition);

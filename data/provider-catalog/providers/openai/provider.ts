import { defineProvider } from "../../definitions";
import type { CatalogProvider } from "../../../../src/catalog/types";

export const provider = defineProvider(
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
    "activeModels": {
      "llm": "GPT-5.4 [gpt-5.4]\nGPT-5.4 mini [gpt-5.4-mini]\nGPT-5.4 nano [gpt-5.4-nano]\nGPT-4.1 [gpt-4.1]\nGPT-4.1 mini [gpt-4.1-mini]\nGPT-4.1 nano [gpt-4.1-nano]\no3 [o3]\no4-mini [o4-mini]\nGPT Realtime 1.5 [gpt-realtime-1.5] — Realtime text+audio",
      "tts": "GPT-4o mini TTS [gpt-4o-mini-tts]\nTTS-1 [tts-1]\nTTS-1 HD [tts-1-hd]",
      "stt": "GPT-4o Transcribe [gpt-4o-transcribe]\nGPT-4o Mini Transcribe [gpt-4o-mini-transcribe]\nGPT-4o Transcribe Diarize [gpt-4o-transcribe-diarize]\nWhisper-1 [whisper-1]"
    },
    "pricing": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limits": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
    "region": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "sttLanguages": "Whisper supports 98 languages; 4o transcribe is multilingual.",
    "ttsLanguages": "Multilingual; docs note English-optimized voices.",
    "freeTier": "No standing public free tier; credits/promotions may vary by account.",
    "integrationNotes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection."
  }
} satisfies CatalogProvider,
);

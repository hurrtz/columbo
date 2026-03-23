import { defineProvider } from "../../definitions";
import type { CatalogProvider } from "../../../../src/catalog/types";

export const provider = defineProvider(
{
  "providerId": "google-vertex-ai-studio",
  "providerName": "Google (Vertex / AI Studio)",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
    "https://cloud.google.com/text-to-speech",
    "https://cloud.google.com/speech-to-text"
  ],
  "integration": {
    "catalogType": "Multi-service platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [
      "grpc",
      "rest",
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Gemini 2.5 Pro [gemini-2.5-pro]\nGemini 2.5 Flash [gemini-2.5-flash]\nGemini 2.5 Flash Image [gemini-2.5-flash-image]\nGemini Live API [gemini-live] — Realtime audio/text session family\nGemini 2.0 Flash [gemini-2.0-flash]\nGemini 2.0 Flash-Lite [gemini-2.0-flash-lite]\nGemini 3.1 Flash-Lite (preview) [gemini-3.1-flash-lite-preview]\nGemini 3.1 Flash Image (preview) [gemini-3.1-flash-image-preview]\nGemini 3.1 Pro (preview) [gemini-3.1-pro-preview]",
      "tts": "Chirp 3 HD [Chirp 3 HD]\nInstant Custom Voice [Instant Custom Voice]\nNeural2 [Neural2]\nWaveNet [WaveNet]\nStudio [Studio]\nStandard [Standard]\nPolyglot (preview) [Polyglot]",
      "stt": "Chirp 3 [chirp_3]"
    },
    "pricing": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limits": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited.",
    "region": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "sttLanguages": "125+ languages.",
    "ttsLanguages": "380+ voices across 75+ languages.",
    "freeTier": "Yes for several Cloud Speech/Text-to-Speech quotas and AI Studio experiments; limits vary by service and region.",
    "integrationNotes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately."
  }
} satisfies CatalogProvider,
);

import { createProviderContext, defineProviderDefinition } from "../../definitions";

export const providerDefinition = defineProviderDefinition(
{
  "providerId": "deepgram",
  "providerName": "Deepgram",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://developers.deepgram.com/docs/models-languages-overview",
    "https://developers.deepgram.com/docs/text-to-speech",
    "https://deepgram.com/pricing"
  ],
  "integration": {
    "catalogType": "Fixed speech-first catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "pricing": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limits": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "region": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "sttLanguages": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
    "ttsLanguages": "Aura/Aura-2 support English, Spanish, German, French, Dutch, Italian, Japanese.",
    "freeTier": "Yes: signup credit.",
    "integrationNotes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations."
  }
},
);

export const providerContext = createProviderContext(providerDefinition);

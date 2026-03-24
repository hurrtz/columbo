import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "elevenlabs",
    "providerName": "ElevenLabs",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://elevenlabs.io/docs/models",
      "https://elevenlabs.io/docs/speech-to-text",
      "https://elevenlabs.io/pricing"
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
        "rest",
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": null,
        "tts": "Eleven v3 [eleven_v3]\nEleven Flash v2.5 [eleven_flash_v2_5]\nEleven Multilingual v2 [eleven_multilingual_v2]\nEleven Turbo v2.5 [eleven_turbo_v2_5]",
        "stt": "Scribe v2 [scribe_v2]\nScribe v2 Realtime [scribe_v2_realtime]"
      },
      "pricing": "Credit-based pricing; TTS generally consumes credits per character and STT per second/minute of audio depending on plan.",
      "limits": "Voice Library API and some advanced features are unavailable on free. Voice IDs are separate from model IDs. Large voice catalog (5,000+ voices).",
      "region": "ElevenLabs cloud; EU/US enterprise controls may vary by plan.",
      "sttLanguages": "90+ languages (docs often cite 92+).",
      "ttsLanguages": "70+ languages (v3).",
      "freeTier": "Yes.",
      "integrationNotes": "Model ID and voice ID are distinct. For your app, store both because end users will often select a voice, not just a TTS engine."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

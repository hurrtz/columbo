import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
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
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "elevenlabs",
    "providerName": "ElevenLabs",
    "service": "stt",
    "modelId": "scribe_v2",
    "publicName": "Scribe v2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based pricing; TTS generally consumes credits per character and STT per second/minute of audio depending on plan.",
    "limitsSummary": "Voice Library API and some advanced features are unavailable on free. Voice IDs are separate from model IDs. Large voice catalog (5,000+ voices).",
    "regionSummary": "ElevenLabs cloud; EU/US enterprise controls may vary by plan.",
    "languagesSummary": "90+ languages (docs often cite 92+).",
    "notes": "Model ID and voice ID are distinct. For your app, store both because end users will often select a voice, not just a TTS engine.",
    "officialSources": [
      "https://elevenlabs.io/docs/models",
      "https://elevenlabs.io/docs/speech-to-text",
      "https://elevenlabs.io/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "90+ languages (docs often cite 92+).",
      "isMultilingual": true,
      "languageCount": 90,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "elevenlabs",
    "providerName": "ElevenLabs",
    "service": "stt",
    "modelId": "scribe_v2_realtime",
    "publicName": "Scribe v2 Realtime",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based pricing; TTS generally consumes credits per character and STT per second/minute of audio depending on plan.",
    "limitsSummary": "Voice Library API and some advanced features are unavailable on free. Voice IDs are separate from model IDs. Large voice catalog (5,000+ voices).",
    "regionSummary": "ElevenLabs cloud; EU/US enterprise controls may vary by plan.",
    "languagesSummary": "90+ languages (docs often cite 92+).",
    "notes": "Model ID and voice ID are distinct. For your app, store both because end users will often select a voice, not just a TTS engine.",
    "officialSources": [
      "https://elevenlabs.io/docs/models",
      "https://elevenlabs.io/docs/speech-to-text",
      "https://elevenlabs.io/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "90+ languages (docs often cite 92+).",
      "isMultilingual": true,
      "languageCount": 90,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "elevenlabs",
    "providerName": "ElevenLabs",
    "service": "tts",
    "modelId": "eleven_flash_v2_5",
    "publicName": "Eleven Flash v2.5",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based pricing; TTS generally consumes credits per character and STT per second/minute of audio depending on plan.",
    "limitsSummary": null,
    "regionSummary": "ElevenLabs cloud; EU/US enterprise controls may vary by plan.",
    "languagesSummary": "70+ languages (v3).",
    "notes": "Model ID and voice ID are distinct. For your app, store both because end users will often select a voice, not just a TTS engine.",
    "officialSources": [
      "https://elevenlabs.io/docs/models",
      "https://elevenlabs.io/docs/speech-to-text",
      "https://elevenlabs.io/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "70+ languages (v3).",
      "isMultilingual": true,
      "languageCount": 70,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "elevenlabs",
    "providerName": "ElevenLabs",
    "service": "tts",
    "modelId": "eleven_multilingual_v2",
    "publicName": "Eleven Multilingual v2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based pricing; TTS generally consumes credits per character and STT per second/minute of audio depending on plan.",
    "limitsSummary": null,
    "regionSummary": "ElevenLabs cloud; EU/US enterprise controls may vary by plan.",
    "languagesSummary": "70+ languages (v3).",
    "notes": "Model ID and voice ID are distinct. For your app, store both because end users will often select a voice, not just a TTS engine.",
    "officialSources": [
      "https://elevenlabs.io/docs/models",
      "https://elevenlabs.io/docs/speech-to-text",
      "https://elevenlabs.io/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "70+ languages (v3).",
      "isMultilingual": true,
      "languageCount": 70,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "elevenlabs",
    "providerName": "ElevenLabs",
    "service": "tts",
    "modelId": "eleven_turbo_v2_5",
    "publicName": "Eleven Turbo v2.5",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based pricing; TTS generally consumes credits per character and STT per second/minute of audio depending on plan.",
    "limitsSummary": null,
    "regionSummary": "ElevenLabs cloud; EU/US enterprise controls may vary by plan.",
    "languagesSummary": "70+ languages (v3).",
    "notes": "Model ID and voice ID are distinct. For your app, store both because end users will often select a voice, not just a TTS engine.",
    "officialSources": [
      "https://elevenlabs.io/docs/models",
      "https://elevenlabs.io/docs/speech-to-text",
      "https://elevenlabs.io/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "70+ languages (v3).",
      "isMultilingual": true,
      "languageCount": 70,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "elevenlabs",
    "providerName": "ElevenLabs",
    "service": "tts",
    "modelId": "eleven_v3",
    "publicName": "Eleven v3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Credit-based pricing; TTS generally consumes credits per character and STT per second/minute of audio depending on plan.",
    "limitsSummary": null,
    "regionSummary": "ElevenLabs cloud; EU/US enterprise controls may vary by plan.",
    "languagesSummary": "70+ languages (v3).",
    "notes": "Model ID and voice ID are distinct. For your app, store both because end users will often select a voice, not just a TTS engine.",
    "officialSources": [
      "https://elevenlabs.io/docs/models",
      "https://elevenlabs.io/docs/speech-to-text",
      "https://elevenlabs.io/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "70+ languages (v3).",
      "isMultilingual": true,
      "languageCount": 70,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

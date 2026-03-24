import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
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
    }
  ),
  providerContext.stt(
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
  ),
]);

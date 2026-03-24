import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "elevenlabs",
    "providerName": "Elevenlabs",
    "categoryName": "AI audio / voice platform",
    "hq": "London, UK (European HQ and worldwide operations center); company also states it is incorporated in the United States",
    "verifiedSupport": {
      "llm": "partial",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://elevenlabs.io/docs/overview/models",
      "https://elevenlabs.io/pricing/api",
      "https://elevenlabs.io/docs/overview/capabilities/text-to-speech",
      "https://elevenlabs.io/docs/overview/capabilities/speech-to-text",
      "https://elevenlabs.io/docs/api-reference/text-to-speech/convert",
      "https://elevenlabs.io/docs/api-reference/text-to-speech/v-1-text-to-speech-voice-id-stream-input",
      "https://elevenlabs.io/docs/api-reference/speech-to-text/convert",
      "https://elevenlabs.io/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime",
      "https://elevenlabs.io/docs/eleven-agents/customization/llm",
      "https://elevenlabs.io/docs/eleven-agents/customization/llm/custom-llm",
      "https://elevenlabs.io/docs/api-reference/llm/list",
      "https://elevenlabs.io/docs/overview/administration/data-residency",
      "https://elevenlabs.io/docs/eleven-api/resources/zero-retention-mode",
      "https://elevenlabs.io/docs/api-reference/authentication",
      "https://elevenlabs.io/docs/api-reference/voices/search"
    ],
    "integration": {
      "catalogType": "Mixed: fixed public audio-model catalog plus dynamic voice catalog and dynamic ElevenAgents LLM catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": false,
      "protocols": [
        "rest",
        "websocket",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "TTS and STT pricing is public and tiered by plan. Business-tier starting prices are $0.06/1K chars for Flash/Turbo TTS, $0.12/1K chars for Multilingual v2/v3 TTS, $0.22/hour for Scribe v1/v2 STT, and $0.39/hour for Scribe v2 Realtime STT. ElevenAgents burst pricing can exceed normal concurrency at 2x standard rate.",
      "limits": "Key documented limits: eleven_v3 5,000 chars/request; eleven_multilingual_v2 10,000; eleven_flash_v2_5 40,000. STT remote files must be <2GB. STT diarization supports up to 32 speakers; keyterm prompting up to 100 terms. TTS WebSocket inactivity_timeout defaults to 20s and can be set up to 180s. Concurrency varies by plan.",
      "region": "Default hosting/storage is in the U.S.; ElevenLabs documents additional isolated data-residency environments in the EU and India. Zero Retention Mode is available to select enterprise API customers.",
      "sttLanguages": "Scribe v1/v2 and Scribe v2 Realtime are documented for 90+ languages.",
      "ttsLanguages": "eleven_multilingual_v2 supports 29 languages; eleven_flash_v2_5 supports 32; eleven_v3 supports 70+.",
      "freeTier": "Free plan exists with 10k credits/month, but the Voice Library is not available via the API to free-tier users.",
      "integrationNotes": "Use stable static pickers for core audio models. Keep voices live-discovered. Treat ElevenAgents LLMs as dynamic/live-discovery only unless you build directly on Agents. ElevenLabs supports Custom LLM backends that implement OpenAI Chat Completions or Responses-compatible APIs, but ElevenLabs itself is not a general OpenAI-compatible provider."
    },
    "sources": [
      {
        "url": "https://elevenlabs.io/docs/overview/models",
        "title": "Models | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "tts",
          "stt",
          "languages",
          "limits",
          "deprecations",
          "concurrency"
        ]
      },
      {
        "url": "https://elevenlabs.io/pricing/api",
        "title": "ElevenLabs API Pricing \u2014 Build AI Audio Into Your Product",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "tts",
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/overview/capabilities/text-to-speech",
        "title": "Text to Speech | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "voice_count",
          "formats",
          "limits"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/overview/capabilities/speech-to-text",
        "title": "Transcription | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "languages"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/api-reference/text-to-speech/convert",
        "title": "Create speech | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "rest",
          "auth",
          "formats",
          "zero_retention"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/api-reference/text-to-speech/v-1-text-to-speech-voice-id-stream-input",
        "title": "WebSocket | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "realtime",
          "websocket",
          "limits"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/api-reference/speech-to-text/convert",
        "title": "Create transcript | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime",
        "title": "Realtime | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "realtime",
          "websocket"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/eleven-agents/customization/llm",
        "title": "Models | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "agents",
          "limits",
          "regions"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/eleven-agents/customization/llm/custom-llm",
        "title": "Integrate your own model | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "openai_compatible",
          "sse",
          "integration"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/api-reference/llm/list",
        "title": "List LLMs | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "dynamic_catalog"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/overview/administration/data-residency",
        "title": "Data residency | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/eleven-api/resources/zero-retention-mode",
        "title": "Zero Retention Mode (Enterprise) | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "privacy",
          "compliance",
          "regions"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/api-reference/authentication",
        "title": "API Authentication | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "auth"
        ]
      },
      {
        "url": "https://elevenlabs.io/docs/api-reference/voices/search",
        "title": "List voices | ElevenLabs Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "voices",
          "dynamic_catalog"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

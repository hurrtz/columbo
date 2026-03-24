import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "tts",
      "modelId": "eleven_v3",
      "publicName": "Eleven v3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Grouped with Multilingual v2/v3 pricing. Business-tier starting price is $0.12 per 1K characters.",
      "limitsSummary": "5,000 characters per request (~5 minutes). HTTP streaming supported; WebSocket TTS is not available for this model.",
      "regionSummary": "No model-specific regional split documented. General ElevenLabs hosting is U.S. by default with EU/India data residency options at provider level.",
      "languagesSummary": "70+ languages documented.",
      "notes": "Best fit for expressive, emotional TTS and multi-speaker dialogue. Also used by Text to Dialogue API. Do not assume WebSocket support.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models",
        "https://elevenlabs.io/docs/overview/capabilities/text-to-speech",
        "https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert-with-timestamps",
        "https://elevenlabs.io/pricing/api",
        "https://elevenlabs.io/docs/eleven-api/guides/how-to/websockets/realtime-tts"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 120.0,
          "unit": "million_characters",
          "sourceText": "Business-tier starting price: $0.12 per 1K characters for Multilingual v2 / v3."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 5000,
          "unit": "other",
          "scope": "model",
          "sourceText": "Character limit: eleven_v3 5,000."
        }
      ],
      "languageSupport": {
        "rawText": "Eleven v3 supports 70+ languages.",
        "isMultilingual": true,
        "languageCount": 70,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "dynamic-voice-catalog"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "tts",
      "modelId": "eleven_multilingual_v2",
      "publicName": "Eleven Multilingual v2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Grouped with v3 pricing. Business-tier starting price is $0.12 per 1K characters.",
      "limitsSummary": "10,000 characters per request (~10 minutes). Supports REST and streaming; documented as most stable on long-form generations.",
      "regionSummary": "No model-specific region split documented.",
      "languagesSummary": "29 languages documented.",
      "notes": "Recommended by ElevenLabs when quality or number normalization matters more than minimum latency.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models",
        "https://elevenlabs.io/docs/overview/capabilities/text-to-speech",
        "https://elevenlabs.io/docs/api-reference/text-to-speech/convert",
        "https://elevenlabs.io/docs/api-reference/streaming",
        "https://elevenlabs.io/pricing/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 120.0,
          "unit": "million_characters",
          "sourceText": "Business-tier starting price: $0.12 per 1K characters for Multilingual v2 / v3."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10000,
          "unit": "other",
          "scope": "model",
          "sourceText": "Character limit: eleven_multilingual_v2 10,000."
        }
      ],
      "languageSupport": {
        "rawText": "29 languages: English, Japanese, Chinese, German, Hindi, French, Korean, Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian, Russian.",
        "isMultilingual": true,
        "languageCount": 29,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Japanese",
          "Chinese",
          "German",
          "Hindi",
          "French",
          "Korean",
          "Portuguese",
          "Italian",
          "Spanish",
          "Indonesian",
          "Dutch",
          "Turkish",
          "Filipino",
          "Polish",
          "Swedish",
          "Bulgarian",
          "Romanian",
          "Arabic",
          "Czech",
          "Greek",
          "Finnish",
          "Croatian",
          "Malay",
          "Slovak",
          "Danish",
          "Tamil",
          "Ukrainian",
          "Russian"
        ],
        "notes": [
          "voice-dependent",
          "dynamic-voice-catalog"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "tts",
      "modelId": "eleven_flash_v2_5",
      "publicName": "Eleven Flash v2.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Grouped with Turbo pricing. Business-tier starting price is $0.06 per 1K characters.",
      "limitsSummary": "40,000 characters per request (~40 minutes). WebSocket and HTTP streaming supported. WebSocket inactivity_timeout defaults to 20 seconds and can be set up to 180 seconds.",
      "regionSummary": "No model-specific region split documented.",
      "languagesSummary": "32 languages documented.",
      "notes": "Best current low-latency TTS picker choice. Number normalization is disabled by default for latency; Enterprise can force apply_text_normalization=on.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models",
        "https://elevenlabs.io/docs/overview/capabilities/text-to-speech",
        "https://elevenlabs.io/docs/api-reference/text-to-speech/v-1-text-to-speech-voice-id-stream-input",
        "https://elevenlabs.io/pricing/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 60.0,
          "unit": "million_characters",
          "sourceText": "Business-tier starting price: $0.06 per 1K characters for Flash / Turbo."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 40000,
          "unit": "other",
          "scope": "model",
          "sourceText": "Character limit: eleven_flash_v2_5 40,000."
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 180,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "WebSocket inactivity_timeout can be up to 180 seconds."
        }
      ],
      "languageSupport": {
        "rawText": "32 languages: all eleven_multilingual_v2 languages plus Hungarian, Norwegian, and Vietnamese.",
        "isMultilingual": true,
        "languageCount": 32,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Japanese",
          "Chinese",
          "German",
          "Hindi",
          "French",
          "Korean",
          "Portuguese",
          "Italian",
          "Spanish",
          "Indonesian",
          "Dutch",
          "Turkish",
          "Filipino",
          "Polish",
          "Swedish",
          "Bulgarian",
          "Romanian",
          "Arabic",
          "Czech",
          "Greek",
          "Finnish",
          "Croatian",
          "Malay",
          "Slovak",
          "Danish",
          "Tamil",
          "Ukrainian",
          "Russian",
          "Hungarian",
          "Norwegian",
          "Vietnamese"
        ],
        "notes": [
          "voice-dependent",
          "dynamic-voice-catalog",
          "english-not-required"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "tts",
      "modelId": "eleven_turbo_v2_5",
      "publicName": "Eleven Turbo v2.5",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Grouped with Flash/Turbo pricing on the public pricing page; no separate Turbo-vs-Flash price is published.",
      "limitsSummary": "Deprecated in favor of eleven_flash_v2_5.",
      "regionSummary": "Unknown",
      "languagesSummary": "Same documented language set as eleven_flash_v2_5.",
      "notes": "ElevenLabs says this model is functionally equivalent to eleven_flash_v2_5 except Flash latency is lower on average; do not expose.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models",
        "https://elevenlabs.io/pricing/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Deprecated low-latency TTS model; replacement is eleven_flash_v2_5.",
        "isMultilingual": true,
        "languageCount": 32,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated",
          "replacement-eleven_flash_v2_5"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "tts",
      "modelId": "eleven_turbo_v2",
      "publicName": "Eleven Turbo v2",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Exhaustive",
      "pricingSummary": "No separate current public price published; grouped historically with Flash/Turbo pricing.",
      "limitsSummary": "Deprecated in favor of eleven_flash_v2.",
      "regionSummary": "Unknown",
      "languagesSummary": "English-only legacy low-latency model.",
      "notes": "Do not expose unless you need legacy English-only compatibility.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Deprecated English-only low-latency model; replacement is eleven_flash_v2.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "English"
        ],
        "notes": [
          "deprecated",
          "replacement-eleven_flash_v2"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "tts",
      "modelId": "eleven_monolingual_v1",
      "publicName": "Eleven Monolingual v1",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Exhaustive",
      "pricingSummary": "No current standalone public price located.",
      "limitsSummary": "Deprecated first-generation model; replacement suggestion is eleven_multilingual_v2.",
      "regionSummary": "Unknown",
      "languagesSummary": "English only.",
      "notes": "Do not expose.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "First-generation English-only TTS model; deprecated.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "English"
        ],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "tts",
      "modelId": "eleven_multilingual_v1",
      "publicName": "Eleven Multilingual v1",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Exhaustive",
      "pricingSummary": "No current standalone public price located.",
      "limitsSummary": "Deprecated first-generation multilingual model; replacement suggestion is eleven_multilingual_v2.",
      "regionSummary": "Unknown",
      "languagesSummary": "English, French, German, Hindi, Italian, Polish, Portuguese, Spanish.",
      "notes": "Do not expose.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Deprecated first multilingual model.",
        "isMultilingual": true,
        "languageCount": 8,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "French",
          "German",
          "Hindi",
          "Italian",
          "Polish",
          "Portuguese",
          "Spanish"
        ],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-2.8-hd",
      "publicName": "MiniMax Speech 2.8 HD",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$100/M characters.",
      "limitsSummary": "Sync TTS up to 10,000 chars/request; async TTS up to 1,000,000 chars/request; 60 RPM / 20,000 TPM for T2A; supports HTTP and WebSocket.",
      "regionSummary": "Use standard region-aware API hosts.",
      "languagesSummary": "40 languages; supports 7 emotions; some features like interjections are only documented for 2.8 models.",
      "notes": "Best premium stable TTS picker entry. Supports interjection tags and streaming.",
      "officialSources": [
        "https://platform.minimax.io/docs/api-reference/speech-t2a-intro",
        "https://platform.minimax.io/docs/api-reference/speech-t2a-http",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/speech-t2a-websocket",
        "https://platform.minimax.io/docs/guides/rate-limits"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 100,
          "unit": "million_characters",
          "sourceText": "speech-2.8-hd $100/M characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10000,
          "unit": "other",
          "scope": "audio",
          "sourceText": "Synchronous TTS supports up to 10,000 characters per request"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1000000,
          "unit": "other",
          "scope": "audio",
          "sourceText": "Async TTS supports up to 1 million characters per request"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "T2A ... 60 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 20000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "T2A ... 20,000 TPM"
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 120,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "WebSocket closes if no new event is sent within 120 seconds after the last result"
        }
      ],
      "languageSupport": {
        "rawText": "40 languages supported; WebSocket guide enumerates them explicitly.",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": 300,
        "listedLanguages": [
          "Chinese",
          "Cantonese",
          "English",
          "Spanish",
          "French",
          "Russian",
          "German",
          "Portuguese",
          "Arabic",
          "Italian",
          "Japanese",
          "Korean",
          "Indonesian",
          "Vietnamese",
          "Turkish",
          "Dutch",
          "Ukrainian",
          "Thai",
          "Polish",
          "Romanian",
          "Greek",
          "Czech",
          "Finnish",
          "Hindi",
          "Bulgarian",
          "Danish",
          "Hebrew",
          "Malay",
          "Persian",
          "Slovak",
          "Swedish",
          "Croatian",
          "Filipino",
          "Hungarian",
          "Norwegian",
          "Slovenian",
          "Catalan",
          "Nynorsk",
          "Tamil",
          "Afrikaans"
        ],
        "notes": [
          "voice-count-conflict-in-docs",
          "7-emotions-supported",
          "interjection-support-2.8-only"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-2.8-turbo",
      "publicName": "MiniMax Speech 2.8 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$60/M characters.",
      "limitsSummary": "Same T2A limits as other current speech models; supports WebSocket realtime.",
      "regionSummary": "Use standard region-aware API hosts.",
      "languagesSummary": "40 languages; 7 emotions; interjection tags supported.",
      "notes": "Best latency/cost TTS picker entry.",
      "officialSources": [
        "https://platform.minimax.io/docs/api-reference/speech-t2a-intro",
        "https://platform.minimax.io/docs/api-reference/speech-t2a-http",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/speech-t2a-websocket"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 60,
          "unit": "million_characters",
          "sourceText": "speech-2.8-turbo $60/M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "40 languages supported.",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": 300,
        "listedLanguages": [],
        "notes": [
          "voice-count-conflict-in-docs",
          "7-emotions-supported",
          "interjection-support-2.8-only"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-2.6-hd",
      "publicName": "MiniMax Speech 2.6 HD",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$100/M characters.",
      "limitsSummary": "Current T2A limits; realtime WebSocket supported.",
      "regionSummary": "Standard region split.",
      "languagesSummary": "40 languages; 7 emotions.",
      "notes": "Good stable HD fallback under 2.8.",
      "officialSources": [
        "https://platform.minimax.io/docs/api-reference/speech-t2a-intro",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 100,
          "unit": "million_characters",
          "sourceText": "speech-2.6-hd $100/M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "40 languages supported.",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": 300,
        "listedLanguages": [],
        "notes": [
          "voice-count-conflict-in-docs",
          "7-emotions-supported"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-2.6-turbo",
      "publicName": "MiniMax Speech 2.6 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$60/M characters.",
      "limitsSummary": "Current T2A limits; realtime WebSocket supported.",
      "regionSummary": "Standard region split.",
      "languagesSummary": "40 languages; 7 emotions.",
      "notes": "Good stable low-latency fallback under 2.8-turbo.",
      "officialSources": [
        "https://platform.minimax.io/docs/api-reference/speech-t2a-intro",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 60,
          "unit": "million_characters",
          "sourceText": "speech-2.6-turbo $60/M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "40 languages supported.",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": 300,
        "listedLanguages": [],
        "notes": [
          "voice-count-conflict-in-docs",
          "7-emotions-supported"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-02-hd",
      "publicName": "MiniMax Speech 02 HD",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$100/M characters.",
      "limitsSummary": "Current T2A limits; realtime supported.",
      "regionSummary": "Standard region split.",
      "languagesSummary": "Older generation; current models page summarizes 24 languages, but broader TTS docs also state 40 languages for current TTS capability overall.",
      "notes": "Still public and priced. Keep in advanced picker or as compatibility fallback.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/models-intro",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 100,
          "unit": "million_characters",
          "sourceText": "speech-02-hd $100/M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Models page indicates 24 languages for speech-02 generation; HTTP docs note speech-02 lacks Persian, Filipino, Tamil support.",
        "isMultilingual": true,
        "languageCount": 24,
        "voiceCount": 300,
        "listedLanguages": [],
        "notes": [
          "older-generation",
          "voice-count-conflict-in-docs"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-02-turbo",
      "publicName": "MiniMax Speech 02 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$60/M characters.",
      "limitsSummary": "Current T2A limits; realtime supported.",
      "regionSummary": "Standard region split.",
      "languagesSummary": "Older generation; current models page summarizes 24 languages.",
      "notes": "Still public and priced; advanced picker / compatibility fallback.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/models-intro",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 60,
          "unit": "million_characters",
          "sourceText": "speech-02-turbo $60/M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Models page indicates 24 languages for speech-02 generation.",
        "isMultilingual": true,
        "languageCount": 24,
        "voiceCount": 300,
        "listedLanguages": [],
        "notes": [
          "older-generation",
          "voice-count-conflict-in-docs"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-01-hd",
      "publicName": "MiniMax Speech 01 HD",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Unknown",
      "pricingSummary": "No current public pricing found.",
      "limitsSummary": "Only appears in the HTTP API enum; no current models-page, pricing-page, or rate-limit table entry found.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Do not expose in stable picker. Treat as legacy/ghost enum entry unless MiniMax clarifies.",
      "officialSources": [
        "https://platform.minimax.io/docs/api-reference/speech-t2a-http"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "underdocumented",
          "do-not-default-expose"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "tts",
      "modelId": "speech-01-turbo",
      "publicName": "MiniMax Speech 01 Turbo",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Unknown",
      "pricingSummary": "No current public pricing found.",
      "limitsSummary": "Only appears in the HTTP API enum; no current models-page, pricing-page, or rate-limit table entry found.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Do not expose in stable picker. Treat as legacy/ghost enum entry unless MiniMax clarifies.",
      "officialSources": [
        "https://platform.minimax.io/docs/api-reference/speech-t2a-http"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "underdocumented",
          "do-not-default-expose"
        ]
      }
    }
  ),
]);

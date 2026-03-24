import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "fish-audio",
      "providerName": "Fisch Audio",
      "service": "tts",
      "modelId": "s2-pro",
      "publicName": "Fish Audio S2-Pro",
      "aliases": [
        "Fish Audio S2",
        "S2-Pro"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$15.00 per million UTF-8 bytes.",
      "limitsSummary": "REST TTS model header supports s2-pro; request supports chunk_length 100-300, min_chunk_length 0-100, default max_new_tokens 1024; audio formats wav/pcm/mp3/opus with documented sample-rate/bitrate options. Realtime support is disputed by docs.",
      "regionSummary": "No region-specific API endpoint or residency documentation found.",
      "languagesSummary": "80+ languages; automatic language detection for text input.",
      "notes": "Recommended by Fish Audio for all new projects. Supports natural-language [bracket] control and multi-speaker dialogue. Important conflict: JavaScript SDK Backends includes s2-pro for realtime, but low-level WebSocket endpoint page lists only s1. Treat s2-pro realtime as unresolved.",
      "officialSources": [
        "https://docs.fish.audio/developer-guide/models-pricing/models-overview",
        "https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech",
        "https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits",
        "https://docs.fish.audio/developer-guide/getting-started/changelog",
        "https://docs.fish.audio/api-reference/sdk/javascript/api-reference",
        "https://docs.fish.audio/api-reference/endpoint/websocket/tts-live"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "other",
          "sourceText": "$15.00 / M UTF-8 bytes"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 300,
          "unit": "other",
          "scope": "model",
          "sourceText": "chunk_length required range: 100 <= x <= 300"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 100,
          "unit": "other",
          "scope": "model",
          "sourceText": "min_chunk_length required range: 0 <= x <= 100"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 1024,
          "unit": "other",
          "scope": "model",
          "sourceText": "max_new_tokens default: 1024"
        }
      ],
      "languageSupport": {
        "rawText": "S2-Pro supports 80+ languages with automatic language detection and inline emotion and paralinguistic cue support.",
        "isMultilingual": true,
        "languageCount": 80,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "automatic-language-detection",
          "voice-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "fish-audio",
      "providerName": "Fisch Audio",
      "service": "tts",
      "modelId": "s1",
      "publicName": "Fish Audio S1",
      "aliases": [
        "S1"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$15.00 per million UTF-8 bytes.",
      "limitsSummary": "REST and WebSocket docs both support s1. TTS request supports chunk_length 100-300, min_chunk_length 0-100, default max_new_tokens 1024; WebSocket session docs explicitly allow s1.",
      "regionSummary": "No region-specific API endpoint or residency documentation found.",
      "languagesSummary": "13 listed languages: English, Chinese, Japanese, German, French, Spanish, Korean, Arabic, Russian, Dutch, Italian, Polish, Portuguese.",
      "notes": "Still supported for existing integrations. Realtime TTS support is clearly documented for s1. Uses (parenthesis) emotion syntax rather than s2-pro's natural-language [bracket] style.",
      "officialSources": [
        "https://docs.fish.audio/developer-guide/models-pricing/models-overview",
        "https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech",
        "https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits",
        "https://docs.fish.audio/api-reference/endpoint/websocket/tts-live",
        "https://docs.fish.audio/api-reference/emotion-reference"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "other",
          "sourceText": "$15.00 / M UTF-8 bytes"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 300,
          "unit": "other",
          "scope": "model",
          "sourceText": "chunk_length required range: 100 <= x <= 300"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 100,
          "unit": "other",
          "scope": "model",
          "sourceText": "min_chunk_length required range: 0 <= x <= 100"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 1024,
          "unit": "other",
          "scope": "model",
          "sourceText": "max_new_tokens default: 1024"
        }
      ],
      "languageSupport": {
        "rawText": "S1 supports text-to-speech generation in 13 languages with full emotional expression capabilities.",
        "isMultilingual": true,
        "languageCount": 13,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese",
          "Japanese",
          "German",
          "French",
          "Spanish",
          "Korean",
          "Arabic",
          "Russian",
          "Dutch",
          "Italian",
          "Polish",
          "Portuguese"
        ],
        "notes": [
          "english-optimized",
          "voice-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "fish-audio",
      "providerName": "Fisch Audio",
      "service": "tts",
      "modelId": "speech-1.6",
      "publicName": "Fish Speech v1.6",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Deprecated on 2026-02-28.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Documented as deprecated; do not expose in app pickers.",
      "officialSources": [
        "https://docs.fish.audio/developer-guide/models-pricing/deprecations"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "fish-audio",
      "providerName": "Fisch Audio",
      "service": "tts",
      "modelId": "speech-1.5",
      "publicName": "Fish Speech v1.5",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Deprecated on 2026-02-28.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Documented as deprecated; do not expose in app pickers.",
      "officialSources": [
        "https://docs.fish.audio/developer-guide/models-pricing/deprecations"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
]);

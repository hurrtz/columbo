import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "stt",
      "modelId": "whisper-v3",
      "publicName": "Whisper V3 Large",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.0015 per audio minute, billed per second.",
      "limitsSummary": "Max audio file size 1 GB. No audio duration limit for transcription/translation endpoint.",
      "regionSummary": "Serverless audio endpoint documented; dedicated deployment also available.",
      "languagesSummary": "95+ languages in STT guide; Whisper model page says 99-language coverage.",
      "notes": "Best default high-accuracy offline STT picker entry. Also supports speech-to-English translation.",
      "officialSources": [
        "https://docs.fireworks.ai/api-reference/audio-transcriptions",
        "https://docs.fireworks.ai/api-reference/audio-translations",
        "https://docs.fireworks.ai/guides/querying-asr-models",
        "https://fireworks.ai/models/fireworks/whisper-v3",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0015,
          "unit": "minute",
          "sourceText": "Whisper-v3-large $0.0015 per audio minute"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 1073741824,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Max audio file size is 1 GB"
        }
      ],
      "languageSupport": {
        "rawText": "Guide says 95+ languages and provides a long list; model page says zero-shot speech-to-English translation across 99 languages.",
        "isMultilingual": true,
        "languageCount": 95,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "es",
          "fr",
          "de",
          "zh",
          "ja",
          "ru",
          "pt",
          "ar",
          "hi"
        ],
        "notes": [
          "multilingual",
          "translation-to-english supported",
          "count conflict 95+ vs 99"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "stt",
      "modelId": "whisper-v3-turbo",
      "publicName": "Whisper V3 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.0009 per audio minute, billed per second.",
      "limitsSummary": "Max audio file size 1 GB. No audio duration limit for transcription/translation endpoint.",
      "regionSummary": "Serverless audio-turbo endpoint documented; dedicated deployment also available.",
      "languagesSummary": "Model page describes ASR across 99 languages; provider guide says 95+.",
      "notes": "Best default speed/cost offline STT picker entry. Also supports speech-to-English translation.",
      "officialSources": [
        "https://docs.fireworks.ai/api-reference/audio-transcriptions",
        "https://docs.fireworks.ai/api-reference/audio-translations",
        "https://docs.fireworks.ai/guides/querying-asr-models",
        "https://fireworks.ai/models/fireworks/whisper-v3-turbo",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0009,
          "unit": "minute",
          "sourceText": "Whisper-v3-large-turbo $0.0009 per audio minute"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 1073741824,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Max audio file size is 1 GB"
        }
      ],
      "languageSupport": {
        "rawText": "Model page says ASR across 99 languages; provider guide says 95+ supported languages.",
        "isMultilingual": true,
        "languageCount": 95,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "es",
          "fr",
          "de",
          "zh",
          "ja",
          "ru",
          "pt",
          "ar",
          "hi"
        ],
        "notes": [
          "multilingual",
          "translation-to-english supported",
          "count conflict 95+ vs 99"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "stt",
      "modelId": "fireworks-asr-large",
      "publicName": "Streaming ASR v1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.0032 per audio minute, billed per second.",
      "limitsSummary": "Streaming over WebSocket. Audio should be PCM 16-bit little-endian, 16 kHz mono, in 50-400 ms chunks.",
      "regionSummary": "Serverless WebSocket endpoint documented; dedicated endpoint available by request.",
      "languagesSummary": "Streaming guide publishes the same long multilingual transcription list used for STT.",
      "notes": "Best default realtime STT picker entry. Fireworks calls it production-ready and generally recommended.",
      "officialSources": [
        "https://docs.fireworks.ai/api-reference/audio-streaming-transcriptions",
        "https://docs.fireworks.ai/guides/querying-asr-models",
        "https://fireworks.ai/models/fireworks/fireworks-asr-large"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0032,
          "unit": "minute",
          "sourceText": "$0.0032 per audio minute"
        }
      ],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 0.05,
          "unit": "seconds",
          "scope": "streaming",
          "sourceText": "Stream short audio chunks (50-400ms)"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 0.4,
          "unit": "seconds",
          "scope": "streaming",
          "sourceText": "Stream short audio chunks (50-400ms)"
        },
        {
          "metric": "concurrency",
          "comparator": "<=",
          "value": 10,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "Concurrent connections, streaming speech 10"
        }
      ],
      "languageSupport": {
        "rawText": "Streaming STT guide publishes a long multilingual language list.",
        "isMultilingual": true,
        "languageCount": 95,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "es",
          "fr",
          "de",
          "zh",
          "ja",
          "ru",
          "pt",
          "ar",
          "hi"
        ],
        "notes": [
          "multilingual",
          "realtime"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "stt",
      "modelId": "fireworks-asr-v2",
      "publicName": "Streaming ASR v2",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.0035 per audio minute, billed per second.",
      "limitsSummary": "Streaming over WebSocket. Audio should be PCM 16-bit little-endian, 16 kHz mono, in 50-400 ms chunks.",
      "regionSummary": "Preview streaming model with separate WebSocket endpoint.",
      "languagesSummary": "Same multilingual streaming STT language surface appears to apply; exact separate language matrix not published.",
      "notes": "Do not expose in a stable default picker. Official docs call v2 an early-access preview.",
      "officialSources": [
        "https://docs.fireworks.ai/api-reference/audio-streaming-transcriptions",
        "https://docs.fireworks.ai/guides/querying-asr-models",
        "https://fireworks.ai/models/fireworks/fireworks-asr-v2"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0035,
          "unit": "minute",
          "sourceText": "$0.0035 per audio minute"
        }
      ],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 0.05,
          "unit": "seconds",
          "scope": "streaming",
          "sourceText": "Stream short audio chunks (50-400ms)"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 0.4,
          "unit": "seconds",
          "scope": "streaming",
          "sourceText": "Stream short audio chunks (50-400ms)"
        }
      ],
      "languageSupport": {
        "rawText": "Streaming STT guide publishes a long multilingual language list; v2-specific list is not separately documented.",
        "isMultilingual": true,
        "languageCount": 95,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "es",
          "fr",
          "de",
          "zh",
          "ja",
          "ru",
          "pt",
          "ar",
          "hi"
        ],
        "notes": [
          "multilingual",
          "realtime",
          "preview"
        ]
      }
    }
  ),
]);

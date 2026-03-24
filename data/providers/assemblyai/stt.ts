import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "universal-3-pro",
      "publicName": "Universal-3 Pro",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.21/hr for pre-recorded transcription; prompting add-on $0.05/hr; keyterms prompting add-on $0.05/hr.",
      "limitsSummary": "Used via pre-recorded REST API; /v2/transcript file limit 5GB and 10 hours; no default model for async requests, so speech_models is required.",
      "regionSummary": "US default and EU endpoint supported for pre-recorded STT.",
      "languagesSummary": "Supports English, Spanish, Portuguese, French, German, and Italian.",
      "notes": "Best native pre-recorded STT model for premium accuracy. Can be combined with universal-2 in speech_models for automatic fallback by language.",
      "officialSources": [
        "https://www.assemblyai.com/docs/pre-recorded-audio/universal-3-pro",
        "https://www.assemblyai.com/docs/pre-recorded-audio/select-the-speech-model",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/faq/what-languages-do-you-support-",
        "https://www.assemblyai.com/docs/pre-recorded-audio/select-the-region",
        "https://www.assemblyai.com/docs/faq/are-there-any-limits-on-file-size-or-file-duration-for-files-submitted-to-the-api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0035,
          "unit": "minute",
          "sourceText": "$0.21/hr"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "=",
          "value": 5000000000,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "maximum file size ... /v2/transcript ... 5GB"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 36000,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "maximum duration is 10 hours"
        }
      ],
      "languageSupport": {
        "rawText": "English, Spanish, Portuguese, French, German, and Italian.",
        "isMultilingual": true,
        "languageCount": 6,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Spanish",
          "Portuguese",
          "French",
          "German",
          "Italian"
        ],
        "notes": [
          "high-accuracy",
          "promptable",
          "fallback-with-universal-2-recommended"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "universal-2",
      "publicName": "Universal-2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.15/hr for pre-recorded transcription; speaker diarization add-on $0.02/hr.",
      "limitsSummary": "Used via pre-recorded REST API; /v2/transcript file limit 5GB and 10 hours; no default async model, so speech_models is required.",
      "regionSummary": "US default and EU endpoint supported for pre-recorded STT.",
      "languagesSummary": "Supports 99 languages.",
      "notes": "Broad-coverage async STT model. Good stable fallback for all languages not supported by universal-3-pro.",
      "officialSources": [
        "https://www.assemblyai.com/docs/pre-recorded-audio/universal-2",
        "https://www.assemblyai.com/docs/pre-recorded-audio/select-the-speech-model",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/faq/what-languages-do-you-support-",
        "https://www.assemblyai.com/docs/pre-recorded-audio/select-the-region",
        "https://www.assemblyai.com/docs/faq/are-there-any-limits-on-file-size-or-file-duration-for-files-submitted-to-the-api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0025,
          "unit": "minute",
          "sourceText": "$0.15/hr"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "=",
          "value": 5000000000,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "maximum file size ... /v2/transcript ... 5GB"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 36000,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "maximum duration is 10 hours"
        }
      ],
      "languageSupport": {
        "rawText": "Universal-2 supports 99 languages.",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "broadest-language-coverage",
          "good-default-fallback"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "u3-rt-pro",
      "publicName": "Universal-3 Pro Streaming",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.45/hr for streaming transcription; keyterms included; prompting add-on $0.05/hr.",
      "limitsSummary": "Streaming WebSocket model; max session duration 3 hours by default; chunk size 50\u20131000 ms; free accounts start at 5 new sessions/min and paid at 100+.",
      "regionSummary": "US default and EU streaming endpoint available.",
      "languagesSummary": "Supports EN, ES, DE, FR, PT, IT.",
      "notes": "Best AssemblyAI streaming STT model for voice agents. Supports prompting and strong entity accuracy.",
      "officialSources": [
        "https://www.assemblyai.com/docs/streaming/universal-3-pro",
        "https://www.assemblyai.com/docs/streaming/select-the-speech-model",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/streaming/common-session-errors-and-closures",
        "https://www.assemblyai.com/docs/streaming/authenticate-with-a-temporary-token",
        "https://www.assemblyai.com/docs/account-management"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0075,
          "unit": "minute",
          "sourceText": "$0.45/hr"
        }
      ],
      "constraints": [
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 10800,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Session exceeded 3 hour limit"
        },
        {
          "metric": "other",
          "comparator": ">=",
          "value": 50,
          "unit": "other",
          "scope": "streaming",
          "sourceText": "Expected between 50 and 1000 ms"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1000,
          "unit": "other",
          "scope": "streaming",
          "sourceText": "Expected between 50 and 1000 ms"
        }
      ],
      "languageSupport": {
        "rawText": "Supports EN, ES, DE, FR, PT, IT.",
        "isMultilingual": true,
        "languageCount": 6,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Spanish",
          "German",
          "French",
          "Portuguese",
          "Italian"
        ],
        "notes": [
          "voice-agent-optimized",
          "prompting-supported",
          "native-code-switching"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "universal-streaming-english",
      "publicName": "Universal-Streaming English",
      "aliases": [
        "Universal-Streaming"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.15/hr for streaming transcription.",
      "limitsSummary": "Streaming WebSocket model; max session duration 3 hours by default; chunk size 50\u20131000 ms; free accounts start at 5 new sessions/min and paid at 100+.",
      "regionSummary": "US default and EU streaming endpoint available.",
      "languagesSummary": "English-only.",
      "notes": "Fastest/cost-effective English-only streaming option.",
      "officialSources": [
        "https://www.assemblyai.com/docs/api-reference/streaming-api/universal-streaming/universal-streaming",
        "https://www.assemblyai.com/docs/streaming/select-the-speech-model",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/streaming/common-session-errors-and-closures",
        "https://www.assemblyai.com/docs/account-management"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0025,
          "unit": "minute",
          "sourceText": "$0.15/hr"
        }
      ],
      "constraints": [
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 10800,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Session exceeded 3 hour limit"
        }
      ],
      "languageSupport": {
        "rawText": "English-only real-time transcription.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "English"
        ],
        "notes": [
          "english-only",
          "fastest-streaming-tier"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "universal-streaming-multilingual",
      "publicName": "Universal-Streaming Multilingual",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.15/hr for streaming transcription.",
      "limitsSummary": "Streaming WebSocket model; max session duration 3 hours by default; chunk size 50\u20131000 ms.",
      "regionSummary": "US default and EU streaming endpoint available.",
      "languagesSummary": "Supports English, Spanish, French, German, Italian, and Portuguese.",
      "notes": "Good low-cost multilingual streaming option; supports language_detection=true.",
      "officialSources": [
        "https://www.assemblyai.com/docs/streaming/universal-streaming/multilingual-transcription",
        "https://www.assemblyai.com/docs/api-reference/streaming-api/universal-streaming/universal-streaming",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/streaming/common-session-errors-and-closures"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0025,
          "unit": "minute",
          "sourceText": "$0.15/hr"
        }
      ],
      "constraints": [
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 10800,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Session exceeded 3 hour limit"
        }
      ],
      "languageSupport": {
        "rawText": "English, Spanish, French, German, Italian, and Portuguese.",
        "isMultilingual": true,
        "languageCount": 6,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Spanish",
          "French",
          "German",
          "Italian",
          "Portuguese"
        ],
        "notes": [
          "language-detection-supported",
          "streaming"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "whisper-rt",
      "publicName": "Whisper Streaming",
      "aliases": [
        "Whisper-Streaming"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.30/hr for streaming transcription; keyterms prompting add-on $0.04/hr.",
      "limitsSummary": "Streaming WebSocket model; max session duration 3 hours by default; chunk size 50\u20131000 ms; format_turns optional.",
      "regionSummary": "US default and EU streaming endpoint available.",
      "languagesSummary": "Supports 99+ languages with automatic language detection.",
      "notes": "Open-source Whisper-based streaming option. Good for broad multilingual coverage; lower voice-agent specialization than u3-rt-pro.",
      "officialSources": [
        "https://www.assemblyai.com/docs/streaming/whisper-streaming",
        "https://www.assemblyai.com/docs/api-reference/streaming-api/universal-streaming/universal-streaming",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/streaming/common-session-errors-and-closures"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.005,
          "unit": "minute",
          "sourceText": "$0.30/hr"
        }
      ],
      "constraints": [
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 10800,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Session exceeded 3 hour limit"
        }
      ],
      "languageSupport": {
        "rawText": "Supports 99+ languages.",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "automatic-language-detection",
          "open-source-whisper",
          "non-speech-tags"
        ]
      }
    }
  ),
]);

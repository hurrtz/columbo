import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "xai",
      "providerName": "xAI",
      "service": "stt",
      "modelId": "voice-agent-api",
      "publicName": "Voice Agent API (speech input inside realtime agent)",
      "aliases": [
        "realtime-api"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.05 / minute ($3.00 / hour), plus tool invocation charges when tools are used.",
      "limitsSummary": "100 concurrent sessions/team, max session duration 30 minutes. Supports bidirectional audio and text over WebSocket. Audio chunks are base64-encoded.",
      "regionSummary": "Dedicated page lists cluster us-east-1.",
      "languagesSummary": "No official standalone STT language matrix in developer docs. Marketing page calls it multilingual.",
      "notes": "This is not a standalone transcription model. Treat as partial STT support only: good for live conversational speech input, not a documented public /transcriptions-style API.",
      "officialSources": [
        "https://docs.x.ai/developers/models/voice-agent-api",
        "https://docs.x.ai/developers/model-capabilities/audio/voice-agent",
        "https://docs.x.ai/developers/rest-api-reference/inference/voice",
        "https://x.ai/api/voice"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.05,
          "unit": "minute",
          "sourceText": "Per minute $0.05 / min ($3.00 / hr)"
        }
      ],
      "constraints": [
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 100,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "Concurrent sessions 100 per team"
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 1800,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Max session duration 30 minutes"
        }
      ],
      "languageSupport": {
        "rawText": "Marketing page says multilingual; developer docs do not publish a standalone STT language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 5,
        "listedLanguages": [],
        "notes": [
          "partial STT only",
          "voice-agent mode",
          "not a standalone transcriptions API"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "xai",
      "providerName": "xAI",
      "service": "stt",
      "modelId": "grok-stt",
      "publicName": "Grok Speech-to-Text",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.10/hr batch transcription, $0.20/hr streaming transcription.",
      "limitsSummary": "Multipart batch endpoint POST /v1/stt. Streaming variant exposed over WebSocket. Exact per-request file size limit not published in the April 2026 release notes.",
      "regionSummary": "Hosted at https://api.x.ai.",
      "languagesSummary": "25 languages with speaker diarization, word-level timestamps, and multichannel input support.",
      "notes": "Standalone STT endpoint introduced April 2026. Request is multipart/form-data with a 'file' field; response is JSON with a 'text' field. Docs do not name a specific model ID, so 'grok-stt' is used internally.",
      "officialSources": [
        "https://docs.x.ai/developers/model-capabilities/audio/voice",
        "https://docs.x.ai/developers/rest-api-reference/inference/voice"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.10,
          "unit": "hour",
          "sourceText": "Batch transcription $0.10 / hour"
        },
        {
          "amountUsd": 0.20,
          "unit": "hour",
          "sourceText": "Streaming transcription $0.20 / hour"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "25 languages with speaker diarization, word-level timestamps, and multichannel input.",
        "isMultilingual": true,
        "languageCount": 25,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": [
          "speaker diarization",
          "word-level timestamps",
          "multichannel input",
          "batch and streaming modes"
        ]
      }
    }
  ),
]);

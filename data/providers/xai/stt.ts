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
]);

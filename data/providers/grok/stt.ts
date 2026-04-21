import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "grok",
      "providerName": "Grok",
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

import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "stt",
      "modelId": "Whisper-Large-v3",
      "publicName": "Whisper Large v3",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.10 per input audio hour.",
      "limitsSummary": "25 MB max file size. Audio formats: FLAC, MP3, MP4, MPEG, MPGA, M4A, Ogg, WAV, WebM. Preview-tier rate limits: developer 450 RPM / 90,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "Official docs say multilingual; no provider-side enumerated language list.",
      "notes": "Native STT only. Official docs cover transcription and translation endpoints. Public native realtime WebSocket docs were not found; real-time voice examples use partner frameworks and third-party TTS.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/features/audio",
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/api-reference/audio/transcribes-audio-into-the-input-language",
        "https://docs.sambanova.ai/docs/en/integrations/livekit",
        "https://docs.sambanova.ai/docs/en/integrations/pipecat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "hour",
          "sourceText": "Whisper-Large-v3. Audio. $0.10 input audio duration per hour."
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "File size limit: 25MB."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 450,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Whisper-Large-v3 450 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "Supported languages: Multilingual",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "transcription",
          "translation",
          "provider-docs-do-not-list-languages"
        ]
      }
    }
  ),
]);

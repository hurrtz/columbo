import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "stt",
      "modelId": "whisper-large-v3",
      "publicName": "Whisper Large V3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.111 per hour transcribed; 10-second minimum billed length.",
      "limitsSummary": "Supports transcription and translation; 25 MB free / 100 MB dev max file size, 25 MB max attachment file size, 0.01 s minimum file length, 10 s minimum billed length.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "Documented as multilingual; exact provider-owned language list/count not published on Groq STT page.",
      "notes": "Production STT model. Stable picker candidate. Batch supports transcription and translation.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/speech-to-text",
        "https://groq.com/pricing",
        "https://console.groq.com/docs/batch"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.111,
          "unit": "hour",
          "sourceText": "$0.111 per hour"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 104857600,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "100MB (dev tier)"
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "25 MB (free tier)"
        },
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 0.01,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Minimum File Length 0.01 seconds"
        },
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 10,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Minimum Billed Length 10 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "Multilingual",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "translation-to-English supported",
          "provider does not enumerate full list"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "stt",
      "modelId": "whisper-large-v3-turbo",
      "publicName": "Whisper Large V3 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.04 per hour transcribed; 10-second minimum billed length.",
      "limitsSummary": "Supports transcription, not translation; same STT file constraints as Groq speech docs.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "Documented as multilingual; exact provider-owned language list/count not published on Groq STT page.",
      "notes": "Production STT model. Stable picker candidate when speed/cost matter more than highest accuracy. Batch supports transcription, not documented for translation.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/speech-to-text",
        "https://groq.com/pricing",
        "https://console.groq.com/docs/batch"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.04,
          "unit": "hour",
          "sourceText": "$0.04 per hour"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 104857600,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "100MB (dev tier)"
        },
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 10,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Minimum Billed Length 10 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "Multilingual",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "translation not supported",
          "provider does not enumerate full list"
        ]
      }
    }
  ),
]);

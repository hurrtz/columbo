import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "stt",
      "modelId": "openai/whisper-large-v3",
      "publicName": "Whisper Large v3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.0015 per audio minute.",
      "limitsSummary": "Realtime WebSocket documented. Input formats: wav, mp3, m4a, webm, flac. No formal max file size or duration found.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Transcription API accepts ISO 639-1 language codes and 'auto'. Exact supported-language count not enumerated by Together.",
      "notes": "Guide documents realtime, translation, and diarization.",
      "officialSources": [
        "https://docs.together.ai/docs/speech-to-text",
        "https://docs.together.ai/reference/audio-transcriptions",
        "https://docs.together.ai/reference/audio-transcriptions-realtime",
        "https://docs.together.ai/docs/serverless-models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0015,
          "unit": "minute",
          "sourceText": "Serverless models page lists $0.0015 per audio min."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Language parameter accepts ISO 639-1 codes; 'auto' enables auto-detection.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "auto-detect supported",
          "exact supported-language count unknown"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "stt",
      "modelId": "nvidia/parakeet-tdt-0.6b-v3",
      "publicName": "Parakeet TDT 0.6B v3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.0015 per audio minute.",
      "limitsSummary": "Guide documents realtime and diarization. No formal max file size or duration found.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Secondary model page says multilingual across EU official languages, but Together\u2019s own core docs do not provide a full language list.",
      "notes": "This model appears in the speech guide and serverless pricing table, but not in the current audio-transcriptions reference enum.",
      "officialSources": [
        "https://docs.together.ai/docs/speech-to-text",
        "https://docs.together.ai/docs/serverless-models",
        "https://www.together.ai/models/parakeet-tdt-0-6b-v3"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0015,
          "unit": "minute",
          "sourceText": "Serverless models page lists $0.0015 per audio min."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Multilingual STT; exact Together-hosted language list not clearly enumerated in core docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "stt",
      "modelId": "mistralai/Voxtral-Mini-3B-2507",
      "publicName": "Voxtral Mini 3B",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public serverless pricing.",
      "limitsSummary": "Guide/changelog mention transcription support, but API reference and pricing table do not confirm it clearly.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Unknown.",
      "notes": "Documented in speech guide and changelog, but missing from serverless audio pricing table and from the current transcription reference enum. Keep behind live discovery or hide.",
      "officialSources": [
        "https://docs.together.ai/docs/speech-to-text",
        "https://docs.together.ai/docs/changelog",
        "https://docs.together.ai/reference/audio-transcriptions"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "availability conflict in docs"
        ]
      }
    }
  ),
]);

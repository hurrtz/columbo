import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "stt",
      "modelId": "whisper-v3-large",
      "publicName": "Whisper v3 Large",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
      "limitsSummary": "Transcriptions API max file size ~1 GB and no duration limit. Public native TTS was not verified from official docs reviewed.",
      "regionSummary": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
      "languagesSummary": "Multilingual via Whisper family.",
      "notes": "The input sheet overstates TTS support based on official docs reviewed. Treat Fireworks as LLM + STT unless you verify a newer TTS endpoint live.",
      "officialSources": [
        "https://docs.fireworks.ai/models/",
        "https://docs.fireworks.ai/api-reference/audio-transcriptions",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0015,
          "unit": "minute",
          "sourceText": "$0.0015/audio min"
        },
        {
          "amountUsd": 0.0009,
          "unit": "minute",
          "sourceText": "$0.0009/audio min"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Multilingual via Whisper family.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "stt",
      "modelId": "whisper-v3-large-turbo",
      "publicName": "Whisper v3 Large Turbo",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
      "limitsSummary": "Transcriptions API max file size ~1 GB and no duration limit. Public native TTS was not verified from official docs reviewed.",
      "regionSummary": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
      "languagesSummary": "Multilingual via Whisper family.",
      "notes": "The input sheet overstates TTS support based on official docs reviewed. Treat Fireworks as LLM + STT unless you verify a newer TTS endpoint live.",
      "officialSources": [
        "https://docs.fireworks.ai/models/",
        "https://docs.fireworks.ai/api-reference/audio-transcriptions",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0015,
          "unit": "minute",
          "sourceText": "$0.0015/audio min"
        },
        {
          "amountUsd": 0.0009,
          "unit": "minute",
          "sourceText": "$0.0009/audio min"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Multilingual via Whisper family.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

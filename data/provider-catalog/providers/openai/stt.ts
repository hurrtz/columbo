import { defineSttModels } from "../../definitions";
import type { CatalogStt } from "../../../../src/catalog/types";

export const stt = defineSttModels(
[
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "stt",
    "modelId": "gpt-4o-mini-transcribe",
    "publicName": "GPT-4o Mini Transcribe",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Whisper supports 98 languages; 4o transcribe is multilingual.",
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 25000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      },
      {
        "metric": "duration_seconds",
        "comparator": ">=",
        "value": 30.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      }
    ],
    "languageSupport": {
      "rawText": "Whisper supports 98 languages; 4o transcribe is multilingual.",
      "isMultilingual": true,
      "languageCount": 98,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "stt",
    "modelId": "gpt-4o-transcribe",
    "publicName": "GPT-4o Transcribe",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Whisper supports 98 languages; 4o transcribe is multilingual.",
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 25000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      },
      {
        "metric": "duration_seconds",
        "comparator": ">=",
        "value": 30.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      }
    ],
    "languageSupport": {
      "rawText": "Whisper supports 98 languages; 4o transcribe is multilingual.",
      "isMultilingual": true,
      "languageCount": 98,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "stt",
    "modelId": "gpt-4o-transcribe-diarize",
    "publicName": "GPT-4o Transcribe Diarize",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Whisper supports 98 languages; 4o transcribe is multilingual.",
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 25000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      },
      {
        "metric": "duration_seconds",
        "comparator": ">=",
        "value": 30.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      }
    ],
    "languageSupport": {
      "rawText": "Whisper supports 98 languages; 4o transcribe is multilingual.",
      "isMultilingual": true,
      "languageCount": 98,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "stt",
    "modelId": "whisper-1",
    "publicName": "Whisper-1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Whisper supports 98 languages; 4o transcribe is multilingual.",
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 25000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      },
      {
        "metric": "duration_seconds",
        "comparator": ">=",
        "value": 30.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions."
      }
    ],
    "languageSupport": {
      "rawText": "Whisper supports 98 languages; 4o transcribe is multilingual.",
      "isMultilingual": true,
      "languageCount": 98,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[],
);

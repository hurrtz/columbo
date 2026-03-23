import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
{
  "modelId": "gpt-4o-mini-transcribe",
  "publicName": "GPT-4o Mini Transcribe",
  "status": "Documented active/current",
  "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
  "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
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
  ),
  providerContext.stt(
{
  "modelId": "gpt-4o-transcribe",
  "publicName": "GPT-4o Transcribe",
  "status": "Documented active/current",
  "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
  "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
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
  ),
  providerContext.stt(
{
  "modelId": "gpt-4o-transcribe-diarize",
  "publicName": "GPT-4o Transcribe Diarize",
  "status": "Documented active/current",
  "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
  "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
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
  ),
  providerContext.stt(
{
  "modelId": "whisper-1",
  "publicName": "Whisper-1",
  "status": "Documented active/current",
  "limitsSummary": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
  "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
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
  ),
]);

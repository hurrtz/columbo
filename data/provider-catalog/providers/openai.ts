import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "openai",
  "providerName": "OpenAI",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://platform.openai.com/docs/models",
    "https://openai.com/api/pricing/",
    "https://platform.openai.com/docs/guides/speech-to-text"
  ],
  "integration": {
    "catalogType": "Fixed first-party catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "sip",
      "sse",
      "webrtc",
      "websocket"
    ],
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": "GPT-5.4 [gpt-5.4]\nGPT-5.4 mini [gpt-5.4-mini]\nGPT-5.4 nano [gpt-5.4-nano]\nGPT-4.1 [gpt-4.1]\nGPT-4.1 mini [gpt-4.1-mini]\nGPT-4.1 nano [gpt-4.1-nano]\no3 [o3]\no4-mini [o4-mini]\nGPT Realtime 1.5 [gpt-realtime-1.5] — Realtime text+audio",
      "tts": "GPT-4o mini TTS [gpt-4o-mini-tts]\nTTS-1 [tts-1]\nTTS-1 HD [tts-1-hd]",
      "stt": "GPT-4o Transcribe [gpt-4o-transcribe]\nGPT-4o Mini Transcribe [gpt-4o-mini-transcribe]\nGPT-4o Transcribe Diarize [gpt-4o-transcribe-diarize]\nWhisper-1 [whisper-1]"
    },
    "pricing": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limits": "STT upload limit 25 MB/file; common audio formats only. Some diarization workflows need >30s audio. Realtime uses WebSocket sessions.",
    "region": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "sttLanguages": "Whisper supports 98 languages; 4o transcribe is multilingual.",
    "ttsLanguages": "Multilingual; docs note English-optimized voices.",
    "freeTier": "No standing public free tier; credits/promotions may vary by account.",
    "integrationNotes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-realtime-1.5",
    "publicName": "GPT Realtime 1.5",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Realtime text+audio",
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-4.1",
    "publicName": "GPT-4.1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-4.1-mini",
    "publicName": "GPT-4.1 mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-4.1-nano",
    "publicName": "GPT-4.1 nano",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-5.4",
    "publicName": "GPT-5.4",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-5.4-mini",
    "publicName": "GPT-5.4 mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-5.4-nano",
    "publicName": "GPT-5.4 nano",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "o3",
    "publicName": "o3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "o4-mini",
    "publicName": "o4-mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
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
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
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
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "tts",
    "modelId": "gpt-4o-mini-tts",
    "publicName": "GPT-4o mini TTS",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Multilingual; docs note English-optimized voices.",
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
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual; docs note English-optimized voices.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": [
        "english-optimized"
      ]
    }
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "tts",
    "modelId": "tts-1",
    "publicName": "TTS-1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Multilingual; docs note English-optimized voices.",
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
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual; docs note English-optimized voices.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": [
        "english-optimized"
      ]
    }
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "tts",
    "modelId": "tts-1-hd",
    "publicName": "TTS-1 HD",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Multilingual; docs note English-optimized voices.",
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
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual; docs note English-optimized voices.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": [
        "english-optimized"
      ]
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

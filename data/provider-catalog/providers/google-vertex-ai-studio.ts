import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "google-vertex-ai-studio",
  "providerName": "Google (Vertex / AI Studio)",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
    "https://cloud.google.com/text-to-speech",
    "https://cloud.google.com/speech-to-text"
  ],
  "integration": {
    "catalogType": "Multi-service platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [
      "grpc",
      "rest",
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Gemini 2.5 Pro [gemini-2.5-pro]\nGemini 2.5 Flash [gemini-2.5-flash]\nGemini 2.5 Flash Image [gemini-2.5-flash-image]\nGemini Live API [gemini-live] — Realtime audio/text session family\nGemini 2.0 Flash [gemini-2.0-flash]\nGemini 2.0 Flash-Lite [gemini-2.0-flash-lite]\nGemini 3.1 Flash-Lite (preview) [gemini-3.1-flash-lite-preview]\nGemini 3.1 Flash Image (preview) [gemini-3.1-flash-image-preview]\nGemini 3.1 Pro (preview) [gemini-3.1-pro-preview]",
      "tts": "Chirp 3 HD [Chirp 3 HD]\nInstant Custom Voice [Instant Custom Voice]\nNeural2 [Neural2]\nWaveNet [WaveNet]\nStudio [Studio]\nStandard [Standard]\nPolyglot (preview) [Polyglot]",
      "stt": "Chirp 3 [chirp_3]"
    },
    "pricing": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limits": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited.",
    "region": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "sttLanguages": "125+ languages.",
    "ttsLanguages": "380+ voices across 75+ languages.",
    "freeTier": "Yes for several Cloud Speech/Text-to-Speech quotas and AI Studio experiments; limits vary by service and region.",
    "integrationNotes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-2.0-flash",
    "publicName": "Gemini 2.0 Flash",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-2.0-flash-lite",
    "publicName": "Gemini 2.0 Flash-Lite",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-2.5-flash",
    "publicName": "Gemini 2.5 Flash",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-2.5-flash-image",
    "publicName": "Gemini 2.5 Flash Image",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-2.5-pro",
    "publicName": "Gemini 2.5 Pro",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-3.1-flash-image-preview",
    "publicName": "Gemini 3.1 Flash Image (preview)",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-3.1-flash-lite-preview",
    "publicName": "Gemini 3.1 Flash-Lite (preview)",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-3.1-pro-preview",
    "publicName": "Gemini 3.1 Pro (preview)",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "llm",
    "modelId": "gemini-live",
    "publicName": "Gemini Live API",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": null,
    "notes": "Realtime audio/text session family",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "stt",
    "modelId": "chirp_3",
    "publicName": "Chirp 3",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited.",
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "125+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 10000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited."
      },
      {
        "metric": "stream_chunk_bytes",
        "comparator": "<=",
        "value": 25000.0,
        "unit": "bytes",
        "scope": "streaming",
        "sourceText": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited."
      },
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 3600.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited."
      },
      {
        "metric": "session_duration_seconds",
        "comparator": "~",
        "value": 60.0,
        "unit": "seconds",
        "scope": "session",
        "sourceText": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited."
      },
      {
        "metric": "session_duration_seconds",
        "comparator": "~",
        "value": 300.0,
        "unit": "seconds",
        "scope": "session",
        "sourceText": "STT sync: up to 10 MB or ~1 minute; streaming chunks 25 KB and streams up to ~5 minutes; Chirp 3 supports longer audio (up to ~1 hour) but timestamp features are more limited."
      }
    ],
    "languageSupport": {
      "rawText": "125+ languages.",
      "isMultilingual": true,
      "languageCount": 125,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "tts",
    "modelId": "Chirp 3 HD",
    "publicName": "Chirp 3 HD",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "380+ voices across 75+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "380+ voices across 75+ languages.",
      "isMultilingual": true,
      "languageCount": 75,
      "voiceCount": 380,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "tts",
    "modelId": "Instant Custom Voice",
    "publicName": "Instant Custom Voice",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "380+ voices across 75+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "380+ voices across 75+ languages.",
      "isMultilingual": true,
      "languageCount": 75,
      "voiceCount": 380,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "tts",
    "modelId": "Neural2",
    "publicName": "Neural2",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "380+ voices across 75+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "380+ voices across 75+ languages.",
      "isMultilingual": true,
      "languageCount": 75,
      "voiceCount": 380,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "tts",
    "modelId": "Polyglot",
    "publicName": "Polyglot (preview)",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "380+ voices across 75+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "380+ voices across 75+ languages.",
      "isMultilingual": true,
      "languageCount": 75,
      "voiceCount": 380,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "tts",
    "modelId": "Standard",
    "publicName": "Standard",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "380+ voices across 75+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "380+ voices across 75+ languages.",
      "isMultilingual": true,
      "languageCount": 75,
      "voiceCount": 380,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "tts",
    "modelId": "Studio",
    "publicName": "Studio",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "380+ voices across 75+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "380+ voices across 75+ languages.",
      "isMultilingual": true,
      "languageCount": 75,
      "voiceCount": 380,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "google-vertex-ai-studio",
    "providerName": "Google (Vertex / AI Studio)",
    "service": "tts",
    "modelId": "WaveNet",
    "publicName": "WaveNet",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "TTS examples: Standard/WaveNet $4/M chars, Neural2 $16/M, Studio $160/M, Chirp 3 HD $30/M, Instant Custom Voice $60/M, Polyglot preview $16/M. Gemini pricing varies by model/context.",
    "limitsSummary": null,
    "regionSummary": "Global and regional endpoints. Speech services document regions including us, eu, asia-southeast1, europe-west2, asia-northeast1 depending on feature.",
    "languagesSummary": "380+ voices across 75+ languages.",
    "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
    "officialSources": [
      "https://cloud.google.com/vertex-ai/generative-ai/docs/models",
      "https://cloud.google.com/text-to-speech",
      "https://cloud.google.com/speech-to-text"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "380+ voices across 75+ languages.",
      "isMultilingual": true,
      "languageCount": 75,
      "voiceCount": 380,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

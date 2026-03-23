import { defineSttModels } from "../../definitions";
import type { CatalogStt } from "../../../../src/catalog/types";

export const stt = defineSttModels(
[
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
] satisfies CatalogStt[],
);

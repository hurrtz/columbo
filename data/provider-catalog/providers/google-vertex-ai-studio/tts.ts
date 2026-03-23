import { defineTtsModels } from "../../definitions";
import type { CatalogTts } from "../../../../src/catalog/types";

export const tts = defineTtsModels(
[
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
] satisfies CatalogTts[],
);

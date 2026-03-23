import { defineLlms } from "../../definitions";
import type { CatalogLlm } from "../../../../src/catalog/types";

export const llms = defineLlms(
[
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
] satisfies CatalogLlm[],
);

import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
{
  "modelId": "gemini-2.0-flash",
  "publicName": "Gemini 2.0 Flash",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-2.0-flash-lite",
  "publicName": "Gemini 2.0 Flash-Lite",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-2.5-flash",
  "publicName": "Gemini 2.5 Flash",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-2.5-flash-image",
  "publicName": "Gemini 2.5 Flash Image",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-2.5-pro",
  "publicName": "Gemini 2.5 Pro",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-3.1-flash-image-preview",
  "publicName": "Gemini 3.1 Flash Image (preview)",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-3.1-flash-lite-preview",
  "publicName": "Gemini 3.1 Flash-Lite (preview)",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-3.1-pro-preview",
  "publicName": "Gemini 3.1 Pro (preview)",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Google splits LLM vs speech across AI Studio/Vertex and Cloud Speech/TTS. Normalize provider/service credentials separately.",
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
  ),
  providerContext.llm(
{
  "modelId": "gemini-live",
  "publicName": "Gemini Live API",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Realtime audio/text session family",
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
  ),
]);

import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Hosted open/partner model catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
      "limitsSummary": null,
      "regionSummary": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
      "languagesSummary": null,
      "notes": "LLM catalog changes frequently",
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
      "languageSupport": null
    }
  ),
]);

import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "siliconflow",
      "providerName": "SiliconFlow",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Hosted model catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
      "limitsSummary": null,
      "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
      "languagesSummary": null,
      "notes": "500+ models claimed",
      "officialSources": [
        "https://docs.siliconflow.com/",
        "https://cloud.siliconflow.com/",
        "https://www.siliconflow.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "million_utf8_bytes",
          "sourceText": "$15/M UTF-8 bytes"
        },
        {
          "amountUsd": 7.15,
          "unit": "million_utf8_bytes",
          "sourceText": "$7.15/M UTF-8 bytes"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

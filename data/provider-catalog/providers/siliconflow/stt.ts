import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "siliconflow",
      "providerName": "SiliconFlow",
      "service": "stt",
      "modelId": "dynamic",
      "publicName": "Speech catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
      "limitsSummary": "International service and China service are split across domains; exact speech quotas depend on model.",
      "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
      "languagesSummary": "Platform-level speech support exists, but verify exact model/language live before launch.",
      "notes": "Speech support exists at platform level but official public STT detail was less explicit",
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
      "languageSupport": {
        "rawText": "Platform-level speech support exists, but verify exact model/language live before launch.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Platform-level speech support exists",
          "but verify exact model/language live before launch"
        ],
        "notes": []
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "siliconflow",
      "providerName": "SiliconFlow",
      "service": "tts",
      "modelId": "cosyvoice2-0.5b",
      "publicName": "CosyVoice2 0.5B",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
      "limitsSummary": null,
      "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
      "languagesSummary": "Depends on selected speech model.",
      "notes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed.",
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
        "rawText": "Depends on selected speech model.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "siliconflow",
      "providerName": "SiliconFlow",
      "service": "tts",
      "modelId": "fish-speech-v1.5",
      "publicName": "Fish Speech V1.5",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
      "limitsSummary": null,
      "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
      "languagesSummary": "Depends on selected speech model.",
      "notes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed.",
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
        "rawText": "Depends on selected speech model.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "siliconflow",
      "providerName": "SiliconFlow",
      "service": "tts",
      "modelId": "indextts-2",
      "publicName": "IndexTTS-2",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
      "limitsSummary": null,
      "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
      "languagesSummary": "Depends on selected speech model.",
      "notes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed.",
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
        "rawText": "Depends on selected speech model.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

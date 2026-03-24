import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "tts",
      "modelId": "magpie-tts-flow",
      "publicName": "Magpie TTS Flow",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
      "limitsSummary": null,
      "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
      "languagesSummary": "Magpie family includes multilingual options.",
      "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
      "officialSources": [
        "https://build.nvidia.com/",
        "https://docs.api.nvidia.com/",
        "https://build.nvidia.com/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Magpie family includes multilingual options.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "tts",
      "modelId": "magpie-tts-multilingual",
      "publicName": "Magpie TTS Multilingual",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
      "limitsSummary": null,
      "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
      "languagesSummary": "Magpie family includes multilingual options.",
      "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
      "officialSources": [
        "https://build.nvidia.com/",
        "https://docs.api.nvidia.com/",
        "https://build.nvidia.com/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Magpie family includes multilingual options.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "tts",
      "modelId": "magpie-tts-zeroshot",
      "publicName": "Magpie TTS Zeroshot",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
      "limitsSummary": null,
      "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
      "languagesSummary": "Magpie family includes multilingual options.",
      "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
      "officialSources": [
        "https://build.nvidia.com/",
        "https://docs.api.nvidia.com/",
        "https://build.nvidia.com/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Magpie family includes multilingual options.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

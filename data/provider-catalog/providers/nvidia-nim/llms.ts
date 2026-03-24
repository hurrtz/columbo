import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Build/NIM hosted LLM catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
      "limitsSummary": null,
      "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
      "languagesSummary": null,
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
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "llm",
      "modelId": "nemotron-voicechat",
      "publicName": "Nemotron VoiceChat",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
      "limitsSummary": null,
      "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
      "languagesSummary": null,
      "notes": "Speech-to-speech / duplex family",
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
      "languageSupport": null
    }
  ),
]);

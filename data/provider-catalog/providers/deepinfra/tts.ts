import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "tts",
      "modelId": "Qwen/Qwen3-TTS",
      "publicName": "Qwen3 TTS",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
      "limitsSummary": null,
      "regionSummary": "Public model-level region/data center detail is limited.",
      "languagesSummary": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
      "notes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level.",
      "officialSources": [
        "https://deepinfra.com/docs",
        "https://deepinfra.com/models",
        "https://deepinfra.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": null,
        "listedLanguages": [
          "Depends on chosen hosted model (e.g",
          "Qwen3-TTS supports ~10 languages"
        ],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "tts",
      "modelId": "dynamic",
      "publicName": "TTS catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
      "limitsSummary": null,
      "regionSummary": "Public model-level region/data center detail is limited.",
      "languagesSummary": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
      "notes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level.",
      "officialSources": [
        "https://deepinfra.com/docs",
        "https://deepinfra.com/models",
        "https://deepinfra.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": null,
        "listedLanguages": [
          "Depends on chosen hosted model (e.g",
          "Qwen3-TTS supports ~10 languages"
        ],
        "notes": []
      }
    }
  ),
]);

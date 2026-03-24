import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face (Inference API)",
      "service": "tts",
      "modelId": "dynamic",
      "publicName": "Text-to-Speech task catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by provider, dedicated endpoint, or routed inference plan.",
      "limitsSummary": null,
      "regionSummary": "Depends on selected provider/endpoint/region; not a single fixed data center answer.",
      "languagesSummary": "Depends on chosen task model.",
      "notes": "Do not treat Hugging Face as a fixed catalog. Query Hub/provider task metadata live and keep provider/backend separate from model repo ID.",
      "officialSources": [
        "https://huggingface.co/inference-api",
        "https://huggingface.co/tasks/text-to-speech",
        "https://huggingface.co/tasks/automatic-speech-recognition"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen task model.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

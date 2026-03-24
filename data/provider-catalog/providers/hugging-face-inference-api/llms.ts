import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face (Inference API)",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Inference Providers LLM catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by provider, dedicated endpoint, or routed inference plan.",
      "limitsSummary": null,
      "regionSummary": "Depends on selected provider/endpoint/region; not a single fixed data center answer.",
      "languagesSummary": null,
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
      "languageSupport": null
    }
  ),
]);

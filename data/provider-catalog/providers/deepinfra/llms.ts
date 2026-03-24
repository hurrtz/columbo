import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Hosted open/partner model catalog",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
      "limitsSummary": null,
      "regionSummary": "Public model-level region/data center detail is limited.",
      "languagesSummary": null,
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
      "languageSupport": null
    }
  ),
]);

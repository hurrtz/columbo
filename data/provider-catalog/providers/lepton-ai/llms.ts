import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "lepton-ai",
      "providerName": "Lepton AI",
      "service": "llm",
      "modelId": "custom",
      "publicName": "Deploy your own models/endpoints",
      "status": "Documented active/current",
      "catalogScope": "Low-confidence / infra-first",
      "pricingSummary": "Infrastructure-style pricing, not a simple fixed model catalog. Current public positioning is more compute/platform than turnkey model brokerage.",
      "limitsSummary": null,
      "regionSummary": "Runs where your data lives / multi-cloud GPU network. Region is customer-selected subject to provider availability.",
      "languagesSummary": null,
      "notes": "Now positioned as NVIDIA DGX Cloud Lepton",
      "officialSources": [
        "https://www.nvidia.com/en-us/data-center/dgx-cloud-lepton/",
        "https://developer.nvidia.com/blog/introducing-nvidia-dgx-cloud-lepton-a-unified-ai-platform-built-for-developers/",
        "https://docs.lepton.ai/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

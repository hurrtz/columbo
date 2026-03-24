import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "doubao-*",
      "publicName": "Doubao model family",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
      "limitsSummary": null,
      "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
      "languagesSummary": null,
      "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
      "officialSources": [
        "https://www.volcengine.com/",
        "https://www.volcengine.com/product/doubao",
        "https://www.volcengine.com/product/voice-tech"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "e2e-realtime",
      "publicName": "End-to-end realtime speech model",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
      "limitsSummary": null,
      "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
      "languagesSummary": null,
      "notes": "Integrated voice stack",
      "officialSources": [
        "https://www.volcengine.com/",
        "https://www.volcengine.com/product/doubao",
        "https://www.volcengine.com/product/voice-tech"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "seed-*",
      "publicName": "Seed model family",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
      "limitsSummary": null,
      "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
      "languagesSummary": null,
      "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
      "officialSources": [
        "https://www.volcengine.com/",
        "https://www.volcengine.com/product/doubao",
        "https://www.volcengine.com/product/voice-tech"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

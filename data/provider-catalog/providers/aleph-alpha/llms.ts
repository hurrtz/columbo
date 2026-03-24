import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "aleph-alpha",
      "providerName": "Aleph Alpha",
      "service": "llm",
      "modelId": "llama-3.1-8b",
      "publicName": "Llama 3.1 8B",
      "status": "Documented active/current",
      "catalogScope": "Low-confidence / enterprise-only",
      "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
      "limitsSummary": null,
      "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
      "languagesSummary": null,
      "notes": "Available in manager examples",
      "officialSources": [
        "https://aleph-alpha.com/",
        "https://docs.aleph-alpha.com/",
        "https://docs.aleph-alpha.com/docs/phariaai/overview"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "aleph-alpha",
      "providerName": "Aleph Alpha",
      "service": "llm",
      "modelId": "llama-3.3-70b",
      "publicName": "Llama 3.3 70B",
      "status": "Documented active/current",
      "catalogScope": "Low-confidence / enterprise-only",
      "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
      "limitsSummary": null,
      "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
      "languagesSummary": null,
      "notes": "Available in manager examples",
      "officialSources": [
        "https://aleph-alpha.com/",
        "https://docs.aleph-alpha.com/",
        "https://docs.aleph-alpha.com/docs/phariaai/overview"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "aleph-alpha",
      "providerName": "Aleph Alpha",
      "service": "llm",
      "modelId": "llama-guard-3-8b",
      "publicName": "Llama Guard 3 8B",
      "status": "Documented active/current",
      "catalogScope": "Low-confidence / enterprise-only",
      "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
      "limitsSummary": null,
      "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
      "languagesSummary": null,
      "notes": "Safety model in manager examples",
      "officialSources": [
        "https://aleph-alpha.com/",
        "https://docs.aleph-alpha.com/",
        "https://docs.aleph-alpha.com/docs/phariaai/overview"
      ],
      "openAiCompatible": null,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "aleph-alpha",
      "providerName": "Aleph Alpha",
      "service": "llm",
      "modelId": "pharia-1-llm-7b-control",
      "publicName": "Pharia-1 LLM 7B Control",
      "status": "Documented active/current",
      "catalogScope": "Low-confidence / enterprise-only",
      "pricingSummary": "Custom/enterprise pricing; no broad public self-serve price card located.",
      "limitsSummary": null,
      "regionSummary": "Customer-controlled / sovereign / on-prem / private cloud options.",
      "languagesSummary": null,
      "notes": "Exists, but the public self-serve SaaS story is much weaker than older Luminous-era expectations. Best treated as enterprise/private infrastructure.",
      "officialSources": [
        "https://aleph-alpha.com/",
        "https://docs.aleph-alpha.com/",
        "https://docs.aleph-alpha.com/docs/phariaai/overview"
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

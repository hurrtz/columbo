import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "gladia",
      "providerName": "Gladia",
      "service": "stt",
      "modelId": "solaria-1",
      "publicName": "Solaria-1",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Free plan includes ~10 hours/month. Paid plans add higher concurrency and features.",
      "limitsSummary": "Free plan: ~3 concurrent prerecorded jobs and ~1 live stream. Paid concurrency around 25 async / 30 live. Rich features like translation, PII detection, summarization, code-switching.",
      "regionSummary": "EU-based company; GDPR-friendly positioning.",
      "languagesSummary": "100+ languages with native code-switching support.",
      "notes": "Good fit when multilingual STT and compliance matter, especially in EU contexts.",
      "officialSources": [
        "https://docs.gladia.io/",
        "https://www.gladia.io/pricing",
        "https://www.gladia.io/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 3.0,
          "unit": "count",
          "scope": "general",
          "sourceText": "Free plan: ~3 concurrent prerecorded jobs and ~1 live stream. Paid concurrency around 25 async / 30 live. Rich features like translation, PII detection, summarization, code-switching."
        }
      ],
      "languageSupport": {
        "rawText": "100+ languages with native code-switching support.",
        "isMultilingual": true,
        "languageCount": 100,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

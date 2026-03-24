import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "stt",
      "modelId": "baidu-stt",
      "publicName": "Baidu AI Cloud STT",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
      "limitsSummary": "Primarily China-focused documentation and operations; model IDs and quotas may differ between Qianfan and AI Cloud product surfaces.",
      "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
      "languagesSummary": "Broad speech recognition offering; exact language matrix depends on product tier.",
      "notes": "Good full-stack Chinese provider, but expect localization friction for non-China deployments.",
      "officialSources": [
        "https://qianfan.cloud.baidu.com/",
        "https://cloud.baidu.com/product/wenxinworkshop",
        "https://cloud.baidu.com/product/speech"
      ],
      "openAiCompatible": false,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Broad speech recognition offering; exact language matrix depends on product tier.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "tts",
      "modelId": "baidu-tts",
      "publicName": "Baidu AI Cloud TTS",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
      "limitsSummary": null,
      "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
      "languagesSummary": "Broad but China-centric speech offering.",
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
        "rawText": "Broad but China-centric speech offering.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "llm",
      "modelId": "qwen-omni-turbo",
      "publicName": "Qwen Omni Turbo",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": null,
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": null,
      "notes": "For your app, treat DashScope as two logical products: mainland-China vs international. Credential, compliance, and region handling differ.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/",
        "https://dashscope.console.aliyun.com/",
        "https://www.alibabacloud.com/help/en/model-studio/developer-reference/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "llm",
      "modelId": "qwen-omni-turbo-latest",
      "publicName": "Qwen Omni Turbo Latest",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": null,
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": null,
      "notes": "For your app, treat DashScope as two logical products: mainland-China vs international. Credential, compliance, and region handling differ.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/",
        "https://dashscope.console.aliyun.com/",
        "https://www.alibabacloud.com/help/en/model-studio/developer-reference/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "llm",
      "modelId": "qwen-vl-max",
      "publicName": "Qwen VL Max",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": null,
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": null,
      "notes": "For your app, treat DashScope as two logical products: mainland-China vs international. Credential, compliance, and region handling differ.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/",
        "https://dashscope.console.aliyun.com/",
        "https://www.alibabacloud.com/help/en/model-studio/developer-reference/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "llm",
      "modelId": "qwen3-max",
      "publicName": "Qwen3 Max",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": null,
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": null,
      "notes": "For your app, treat DashScope as two logical products: mainland-China vs international. Credential, compliance, and region handling differ.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/",
        "https://dashscope.console.aliyun.com/",
        "https://www.alibabacloud.com/help/en/model-studio/developer-reference/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "llm",
      "modelId": "qwen3-vl-*",
      "publicName": "Qwen3 VL family",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": null,
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": null,
      "notes": "For your app, treat DashScope as two logical products: mainland-China vs international. Credential, compliance, and region handling differ.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/",
        "https://dashscope.console.aliyun.com/",
        "https://www.alibabacloud.com/help/en/model-studio/developer-reference/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "llm",
      "modelId": "qwen3.5-plus",
      "publicName": "Qwen3.5 Plus",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": null,
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": null,
      "notes": "For your app, treat DashScope as two logical products: mainland-China vs international. Credential, compliance, and region handling differ.",
      "officialSources": [
        "https://www.alibabacloud.com/help/en/model-studio/",
        "https://dashscope.console.aliyun.com/",
        "https://www.alibabacloud.com/help/en/model-studio/developer-reference/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);

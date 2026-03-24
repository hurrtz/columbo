import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "stt",
      "modelId": "qwen-audio-*",
      "publicName": "Qwen speech recognition family",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": "Separate international vs mainland modes. Model availability, quotas, and data region behavior differ by mode.",
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": "Multilingual; realtime ASR docs mention multilingual recognition and speech features such as emotion/VAD.",
      "notes": "Naming varies by doc surface",
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
      "languageSupport": {
        "rawText": "Multilingual; realtime ASR docs mention multilingual recognition and speech features such as emotion/VAD.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "alibaba-qwen-dashscope",
      "providerName": "Alibaba / Qwen (DashScope)",
      "service": "stt",
      "modelId": "fun-asr-realtime",
      "publicName": "Realtime Speech Recognition",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
      "limitsSummary": "Separate international vs mainland modes. Model availability, quotas, and data region behavior differ by mode.",
      "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
      "languagesSummary": "Multilingual; realtime ASR docs mention multilingual recognition and speech features such as emotion/VAD.",
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
      "languageSupport": {
        "rawText": "Multilingual; realtime ASR docs mention multilingual recognition and speech features such as emotion/VAD.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "alibaba-qwen-dashscope",
  "providerName": "Alibaba / Qwen (DashScope)",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://www.alibabacloud.com/help/en/model-studio/",
    "https://dashscope.console.aliyun.com/",
    "https://www.alibabacloud.com/help/en/model-studio/developer-reference/"
  ],
  "integration": {
    "catalogType": "Multi-service platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": "Qwen3 Max [qwen3-max]\nQwen3.5 Plus [qwen3.5-plus]\nQwen Omni Turbo [qwen-omni-turbo]\nQwen Omni Turbo Latest [qwen-omni-turbo-latest]\nQwen VL Max [qwen-vl-max]\nQwen3 VL family [qwen3-vl-*]",
      "tts": "Qwen3 TTS Flash Realtime [qwen3-tts-flash-realtime]\nQwen TTS Realtime [qwen-tts-realtime]\nQwen Voice Enrollment [qwen-voice-enrollment]",
      "stt": "Realtime Speech Recognition [fun-asr-realtime]\nQwen speech recognition family [qwen-audio-*] — Naming varies by doc surface"
    },
    "pricing": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
    "limits": "Separate international vs mainland modes. Model availability, quotas, and data region behavior differ by mode.",
    "region": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
    "sttLanguages": "Multilingual; realtime ASR docs mention multilingual recognition and speech features such as emotion/VAD.",
    "ttsLanguages": "Multilingual with cross-language same-voice support and dialect options.",
    "freeTier": "Yes: temporary/model-specific quotas are often available.",
    "integrationNotes": "For your app, treat DashScope as two logical products: mainland-China vs international. Credential, compliance, and region handling differ."
  }
} satisfies CatalogProvider;

const llms = [
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
  },
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
  },
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
  },
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
  },
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
  },
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
] satisfies CatalogLlm[];

const stt = [
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
  },
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
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "alibaba-qwen-dashscope",
    "providerName": "Alibaba / Qwen (DashScope)",
    "service": "tts",
    "modelId": "qwen-tts-realtime",
    "publicName": "Qwen TTS Realtime",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
    "limitsSummary": null,
    "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
    "languagesSummary": "Multilingual with cross-language same-voice support and dialect options.",
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
      "rawText": "Multilingual with cross-language same-voice support and dialect options.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "alibaba-qwen-dashscope",
    "providerName": "Alibaba / Qwen (DashScope)",
    "service": "tts",
    "modelId": "qwen-voice-enrollment",
    "publicName": "Qwen Voice Enrollment",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
    "limitsSummary": null,
    "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
    "languagesSummary": "Multilingual with cross-language same-voice support and dialect options.",
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
      "rawText": "Multilingual with cross-language same-voice support and dialect options.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "alibaba-qwen-dashscope",
    "providerName": "Alibaba / Qwen (DashScope)",
    "service": "tts",
    "modelId": "qwen3-tts-flash-realtime",
    "publicName": "Qwen3 TTS Flash Realtime",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Broad pricing spread by model. DashScope commonly offers temporary free quotas for Model Studio activation; omni and realtime speech pricing varies separately from token models.",
    "limitsSummary": null,
    "regionSummary": "International mode may use Singapore, US Virginia, Frankfurt, or Hong Kong depending on service/mode. Mainland China has separate routing/compliance.",
    "languagesSummary": "Multilingual with cross-language same-voice support and dialect options.",
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
      "rawText": "Multilingual with cross-language same-voice support and dialect options.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

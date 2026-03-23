import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "baidu-ernie-qianfan",
  "providerName": "Baidu (ERNIE / Qianfan)",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://qianfan.cloud.baidu.com/",
    "https://cloud.baidu.com/product/wenxinworkshop",
    "https://cloud.baidu.com/product/speech"
  ],
  "integration": {
    "catalogType": "Multi-service platform",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": false,
    "protocols": [],
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": "ERNIE 5.0 [ernie-5.0]\nERNIE X1.1 Preview [ernie-x1.1-preview]\nERNIE 4.5 Turbo VL [ernie-4.5-turbo-vl]\nERNIE 4.5 Turbo [ernie-4.5-turbo]\nERNIE 5.0 Thinking Preview [ernie-5.0-thinking-preview]\nERNIE 4.5 VL 28B A3B [ernie-4.5-vl-28b-a3b]",
      "tts": "Baidu AI Cloud TTS [baidu-tts]",
      "stt": "Baidu AI Cloud STT [baidu-stt]"
    },
    "pricing": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
    "limits": "Primarily China-focused documentation and operations; model IDs and quotas may differ between Qianfan and AI Cloud product surfaces.",
    "region": "China-centric; public international region detail is more limited than western hyperscalers.",
    "sttLanguages": "Broad speech recognition offering; exact language matrix depends on product tier.",
    "ttsLanguages": "Broad but China-centric speech offering.",
    "freeTier": "Often yes for trial quotas in Qianfan/AI Cloud, but account type matters.",
    "integrationNotes": "Good full-stack Chinese provider, but expect localization friction for non-China deployments."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "baidu-ernie-qianfan",
    "providerName": "Baidu (ERNIE / Qianfan)",
    "service": "llm",
    "modelId": "ernie-4.5-turbo",
    "publicName": "ERNIE 4.5 Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
    "limitsSummary": null,
    "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "baidu-ernie-qianfan",
    "providerName": "Baidu (ERNIE / Qianfan)",
    "service": "llm",
    "modelId": "ernie-4.5-turbo-vl",
    "publicName": "ERNIE 4.5 Turbo VL",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
    "limitsSummary": null,
    "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "baidu-ernie-qianfan",
    "providerName": "Baidu (ERNIE / Qianfan)",
    "service": "llm",
    "modelId": "ernie-4.5-vl-28b-a3b",
    "publicName": "ERNIE 4.5 VL 28B A3B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
    "limitsSummary": null,
    "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "baidu-ernie-qianfan",
    "providerName": "Baidu (ERNIE / Qianfan)",
    "service": "llm",
    "modelId": "ernie-5.0",
    "publicName": "ERNIE 5.0",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
    "limitsSummary": null,
    "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "baidu-ernie-qianfan",
    "providerName": "Baidu (ERNIE / Qianfan)",
    "service": "llm",
    "modelId": "ernie-5.0-thinking-preview",
    "publicName": "ERNIE 5.0 Thinking Preview",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
    "limitsSummary": null,
    "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "baidu-ernie-qianfan",
    "providerName": "Baidu (ERNIE / Qianfan)",
    "service": "llm",
    "modelId": "ernie-x1.1-preview",
    "publicName": "ERNIE X1.1 Preview",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Qianfan model pricing varies by ERNIE tier/context. Speech pricing follows separate AI Cloud product rates.",
    "limitsSummary": null,
    "regionSummary": "China-centric; public international region detail is more limited than western hyperscalers.",
    "languagesSummary": null,
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
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
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
] satisfies CatalogStt[];

const tts = [
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
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

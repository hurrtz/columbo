import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
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
  }
);

export const providerContext = createProviderContext(providerDefinition);

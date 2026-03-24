import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
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
  }
);

export const providerContext = createProviderContext(providerDefinition);

import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "deepseek",
    "providerName": "DeepSeek",
    "categoryName": "Chinese Providers",
    "hq": "CN",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://api-docs.deepseek.com/",
      "https://api-docs.deepseek.com/quick_start/pricing",
      "https://api-docs.deepseek.com/quick_start/models"
    ],
    "integration": {
      "catalogType": "Fixed first-party LLM catalog",
      "coverage": "Exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "DeepSeek Chat [deepseek-chat] — V3.2 chat mode\nDeepSeek Reasoner [deepseek-reasoner] — V3.2 thinking mode",
        "tts": null,
        "stt": null
      },
      "pricing": "deepseek-chat: cache hit $0.07/M, cache miss $0.27/M, output $1.10/M; deepseek-reasoner: cache hit $0.14/M, miss $0.55/M, output $2.19/M.",
      "limits": "No native public TTS/STT.",
      "region": "DeepSeek-hosted; region specifics are not deeply public.",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "No standing free tier documented.",
      "integrationNotes": "Very cost-effective LLM option, but no native speech stack."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

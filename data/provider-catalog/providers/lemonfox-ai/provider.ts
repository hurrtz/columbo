import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "lemonfox-ai",
    "providerName": "Lemonfox.ai",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.lemonfox.ai/",
      "https://lemonfox.ai/",
      "https://lemonfox.ai/pricing"
    ],
    "integration": {
      "catalogType": "Budget speech platform",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": null,
        "tts": "Lemonfox TTS [tts] — Public docs are less granular on named TTS models",
        "stt": "Whisper Large v3 [whisper-large-v3]"
      },
      "pricing": "Examples: $5/month includes ~30h STT or ~2M TTS chars; extra ~$0.50 per 1M credits = ~3h STT or ~200k TTS chars. STT also promoted at ~$0.50 per 3 hours.",
      "limits": "Language support is broad for STT, but public model granularity is lighter than larger vendors.",
      "region": "Cloud provider; public region detail sparse.",
      "sttLanguages": "100+ languages.",
      "ttsLanguages": "Public marketing suggests multilingual TTS, but exact official language matrix needs live validation.",
      "freeTier": "Yes: first month free.",
      "integrationNotes": "Useful budget option, but metadata is relatively coarse. You may need more manual validation before exposing advanced controls."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

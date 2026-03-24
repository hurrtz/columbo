import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "bytedance-doubao-seed",
    "providerName": "ByteDance (Doubao/Seed)",
    "categoryName": "Chinese Providers",
    "hq": "CN",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://www.volcengine.com/",
      "https://www.volcengine.com/product/doubao",
      "https://www.volcengine.com/product/voice-tech"
    ],
    "integration": {
      "catalogType": "Multi-service platform",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Doubao model family [doubao-*]\nSeed model family [seed-*]\nEnd-to-end realtime speech model [e2e-realtime] — Integrated voice stack",
        "tts": "Volcano Engine Voice Tech TTS [voice-tech-tts]\nSeed TTS family [seed-tts]",
        "stt": "Streaming Speech Recognition API [streaming-stt]\nRecording File Recognition [file-stt]"
      },
      "pricing": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
      "limits": "Volcano Engine splits capability across LLM, voice-tech, and realtime speech APIs. Exact model IDs are less uniform than western API catalogs.",
      "region": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
      "sttLanguages": "ASR available via Volcano Engine, including streaming and integrated end-to-end voice modes.",
      "ttsLanguages": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
      "freeTier": "Trial quotas sometimes available; depends on account/program.",
      "integrationNotes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "inworld-ai",
    "providerName": "Inworld AI",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "routed",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.inworld.ai/",
      "https://docs.inworld.ai/tts",
      "https://inworld.ai/pricing"
    ],
    "integration": {
      "catalogType": "Realtime agent/router platform",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [
        "rest",
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "LLM router / 220+ external models [dynamic] — Inworld routes to many third-party LLMs rather than only first-party LLMs",
        "tts": "Inworld TTS 1.5 Max [inworld-tts-1.5-max]\nInworld TTS 1.5 Mini [inworld-tts-1.5-mini]",
        "stt": "STT routing layer [dynamic] — Can route to Inworld experimental, Groq, AssemblyAI and others"
      },
      "pricing": "TTS pricing examples: Mini $5/M chars, Max $10/M chars.",
      "limits": "100 RPS for TTS in docs. STT and LLM are exposed more as routed/runtime features than as simple fixed model catalogs.",
      "region": "Enterprise options include EU and India residency, on-prem, and zero-retention modes.",
      "sttLanguages": "Depends on routed provider and experimental backend.",
      "ttsLanguages": "15 languages (en, zh, ja, ko, ru, it, es, pt, fr, de, pl, nl, hi, he, ar).",
      "freeTier": "Enterprise/trial access varies; not a broad simple free tier.",
      "integrationNotes": "Important nuance: Inworld is not just a TTS vendor. It is a realtime orchestration/runtime layer. Represent it differently from plain model providers in your app."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "fish-audio",
    "providerName": "Fish Audio",
    "categoryName": "Speech-Focused Providers",
    "hq": "CN/US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.fish.audio/",
      "https://fish.audio/",
      "https://docs.fish.audio/api-reference"
    ],
    "integration": {
      "catalogType": "Speech-first platform",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": null,
        "tts": "S2 Pro [s2-pro]\nS1 [s1]",
        "stt": "Fish Audio ASR [/v1/asr]"
      },
      "pricing": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
      "limits": "Voice/model creation and cloning supported. Community voice ecosystem is large.",
      "region": "Fish Audio cloud; region detail limited.",
      "sttLanguages": "Public ASR exists; exact official language matrix should be validated live.",
      "ttsLanguages": "S2 Pro: 80+ languages with auto language detection. S1: 13 languages (EN, ZH, JA, DE, FR, ES, KO, AR, RU, NL, IT, PL, PT).",
      "freeTier": "Trial/free usage may exist by account state.",
      "integrationNotes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

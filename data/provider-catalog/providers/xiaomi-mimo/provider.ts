import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "xiaomi-mimo",
    "providerName": "Xiaomi (MiMo)",
    "categoryName": "Chinese Providers",
    "hq": "CN",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://mimo.xiaomi.com/",
      "https://mimo.xiaomi.com/mimo-v2-pro",
      "https://platform.xiaomimimo.com/"
    ],
    "integration": {
      "catalogType": "Fixed first-party multimodal catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": true
    },
    "summaries": {
      "activeModels": {
        "llm": "MiMo-V2-Pro [mimo-v2-pro]\nMiMo-V2-Omni [mimo-v2-omni]\nMiMo-V2-Flash [mimo-v2-flash] — Open-weight / separate distribution also exists",
        "tts": "MiMo-V2-TTS [mimo-v2-tts]",
        "stt": null
      },
      "pricing": "MiMo-V2-Pro: up to 256K context $1/M input and $3/M output; 256K-1M context $2/M input and $6/M output. Flash family is much cheaper where offered.",
      "limits": "MiMo-V2-Pro supports up to 1M context. Public datacenter detail is not yet clear. No separate public STT API verified; Omni handles audio understanding inside multimodal flow.",
      "region": "Public platform launched in March 2026; exact region/data residency details not yet well documented.",
      "sttLanguages": null,
      "ttsLanguages": "Public marketing emphasizes speech + singing and expressive control; full language matrix should be validated live before launch.",
      "freeTier": "Launch promotions/free access were advertised for limited periods; not necessarily permanent.",
      "integrationNotes": "Your source sheet is outdated: Xiaomi now has public API models for LLM, omni multimodal, and TTS. STT is folded into Omni rather than a separate public STT product."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

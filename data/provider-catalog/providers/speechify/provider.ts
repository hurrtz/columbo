import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "speechify",
    "providerName": "Speechify",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.sws.speechify.com/",
      "https://docs.sws.speechify.com/v1/docs/get-started/models",
      "https://docs.sws.speechify.com/docs/features/language-support"
    ],
    "integration": {
      "catalogType": "TTS-first platform",
      "coverage": "Exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": null,
        "tts": "Simba English [simba-english]\nSimba Multilingual [simba-multilingual]",
        "stt": null
      },
      "pricing": "Plan-based; public messaging emphasizes generous free testing. API pricing depends on contract/usage tier.",
      "limits": "Speech endpoint ~2,000 chars/request; stream endpoint ~20,000 chars. Voice cloning uses 10-30 sec sample under ~5 MB. simba-base and simba-turbo are deprecated.",
      "region": "Speechify cloud.",
      "sttLanguages": null,
      "ttsLanguages": "6 fully supported langs + ~17 beta langs in docs reviewed (examples: en, fr-FR, de-DE, es-ES, pt-BR, pt-PT plus many beta locales).",
      "freeTier": "Yes.",
      "integrationNotes": "Clear model IDs, but language support is tiered (fully supported vs beta). Store support quality, not just a flat boolean."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

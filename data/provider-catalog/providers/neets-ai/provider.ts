import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "neets-ai",
    "providerName": "Neets.ai",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://neets.ai/",
      "https://docs.neets.ai/"
    ],
    "integration": {
      "catalogType": "TTS-first platform",
      "coverage": "Low-confidence / sparse public docs",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": true,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": null,
        "tts": "Neets TTS catalog [dynamic] — Official docs exist but public indexing is sparse",
        "stt": null
      },
      "pricing": "Official public pricing/model detail was not richly retrievable from indexed docs reviewed.",
      "limits": "Sparse public technical detail from searchable official pages. Manual validation recommended before production support.",
      "region": "Not clearly published.",
      "sttLanguages": null,
      "ttsLanguages": "Public third-party descriptions claim broad multilingual support, but indexed official detail was sparse.",
      "freeTier": "Unclear from indexed official docs.",
      "integrationNotes": "Exists, but compared with other vendors it currently lacks the public operational metadata you would want for a robust model picker."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

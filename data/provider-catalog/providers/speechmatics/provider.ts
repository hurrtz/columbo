import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "speechmatics",
    "providerName": "Speechmatics",
    "categoryName": "Speech-Focused Providers",
    "hq": "UK",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.speechmatics.com/",
      "https://www.speechmatics.com/",
      "https://docs.speechmatics.com/api-ref/tts"
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
        "tts": "Speechmatics TTS Preview voices [preview] — Voices: sarah, theo, megan, jack",
        "stt": "Standard [standard]\nEnhanced [enhanced]"
      },
      "pricing": "Flow voice agent API free up to ~50 hours/month. TTS preview has been free during preview. STT pricing varies by deployment/plan.",
      "limits": "TTS currently preview/English-only in official material reviewed. STT available cloud/on-prem/air-gapped. Strong accent/dialect handling.",
      "region": "Cloud plus on-prem/air-gapped deployment options.",
      "sttLanguages": "55+ languages.",
      "ttsLanguages": "English only in current preview reviewed.",
      "freeTier": "Yes: preview/free usage for some flows.",
      "integrationNotes": "Your sheet is partly outdated: Speechmatics now has a TTS preview, but STT remains the main product."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

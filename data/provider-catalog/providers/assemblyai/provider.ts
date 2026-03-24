import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "assemblyai",
    "providerName": "AssemblyAI",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://www.assemblyai.com/docs",
      "https://www.assemblyai.com/pricing",
      "https://www.assemblyai.com/"
    ],
    "integration": {
      "catalogType": "Fixed speech-first STT catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": null,
        "tts": null,
        "stt": "Universal-3 [universal-3]\nUniversal-3 Nano [universal-3-nano]\nStreaming Transcriber [streaming] — Streaming model family\nSlam-1 [slam-1] — Speech-language model / transcript intelligence"
      },
      "pricing": "Pricing varies by speech model and add-on intelligence features. New accounts have commonly received ~$50 credits.",
      "limits": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS.",
      "region": "AssemblyAI cloud; region controls more limited than hyperscalers.",
      "sttLanguages": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
      "ttsLanguages": null,
      "freeTier": "Yes: starter credits.",
      "integrationNotes": "Excellent STT + audio intelligence provider, but not a TTS provider. Keep summarization/analysis add-ons separate from core transcription in your schema."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

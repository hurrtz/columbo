import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "fireworks-ai",
    "providerName": "Fireworks AI",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.fireworks.ai/models/",
      "https://docs.fireworks.ai/api-reference/audio-transcriptions",
      "https://fireworks.ai/pricing"
    ],
    "integration": {
      "catalogType": "Dynamic hosting platform",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
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
        "llm": "Hosted open/partner model catalog [dynamic] — LLM catalog changes frequently",
        "tts": null,
        "stt": "Whisper v3 Large [whisper-v3-large]\nWhisper v3 Large Turbo [whisper-v3-large-turbo]"
      },
      "pricing": "STT examples: Whisper-v3-large ~$0.0015/audio min; turbo ~$0.0009/audio min; diarization +40%; batch discount ~40%. LLM prices vary by model.",
      "limits": "Transcriptions API max file size ~1 GB and no duration limit. Public native TTS was not verified from official docs reviewed.",
      "region": "Fireworks cloud; region specifics are not heavily surfaced publicly.",
      "sttLanguages": "Multilingual via Whisper family.",
      "ttsLanguages": null,
      "freeTier": "Free/test usage may exist by account plan; verify current dashboard policy.",
      "integrationNotes": "The input sheet overstates TTS support based on official docs reviewed. Treat Fireworks as LLM + STT unless you verify a newer TTS endpoint live."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

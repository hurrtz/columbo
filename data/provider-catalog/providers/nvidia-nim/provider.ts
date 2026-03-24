import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "integration": {
      "catalogType": "Dynamic model + downloadable NIM platform",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "grpc",
        "rest",
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Build/NIM hosted LLM catalog [dynamic]\nNemotron VoiceChat [nemotron-voicechat] — Speech-to-speech / duplex family",
        "tts": "Magpie TTS Multilingual [magpie-tts-multilingual]\nMagpie TTS Zeroshot [magpie-tts-zeroshot]\nMagpie TTS Flow [magpie-tts-flow]",
        "stt": "Canary 1B ASR [canary-1b-asr]\nParakeet TDT 0.6B v2 [parakeet-tdt-0.6b-v2]\nParakeet TDT 0.6B v3 [parakeet-tdt-0.6b-v3]\nParakeet 1.1B RNNT Multilingual ASR [parakeet-1.1b-rnnt-multilingual-asr]"
      },
      "pricing": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
      "limits": "Hosted/free endpoints differ from self-hosted/downloaded NIMs. Operational constraints depend on deployment target.",
      "region": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
      "sttLanguages": "Canary/Parakeet families include multilingual ASR variants.",
      "ttsLanguages": "Magpie family includes multilingual options.",
      "freeTier": "Yes: many hosted evaluation endpoints are free; production deployment costs depend on path.",
      "integrationNotes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

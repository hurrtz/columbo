import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
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
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Build/NIM hosted LLM catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": null,
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": null,
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "llm",
    "modelId": "nemotron-voicechat",
    "publicName": "Nemotron VoiceChat",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": null,
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": null,
    "notes": "Speech-to-speech / duplex family",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "stt",
    "modelId": "canary-1b-asr",
    "publicName": "Canary 1B ASR",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": "Hosted/free endpoints differ from self-hosted/downloaded NIMs. Operational constraints depend on deployment target.",
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": "Canary/Parakeet families include multilingual ASR variants.",
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Canary/Parakeet families include multilingual ASR variants.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "stt",
    "modelId": "parakeet-1.1b-rnnt-multilingual-asr",
    "publicName": "Parakeet 1.1B RNNT Multilingual ASR",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": "Hosted/free endpoints differ from self-hosted/downloaded NIMs. Operational constraints depend on deployment target.",
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": "Canary/Parakeet families include multilingual ASR variants.",
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Canary/Parakeet families include multilingual ASR variants.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "stt",
    "modelId": "parakeet-tdt-0.6b-v2",
    "publicName": "Parakeet TDT 0.6B v2",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": "Hosted/free endpoints differ from self-hosted/downloaded NIMs. Operational constraints depend on deployment target.",
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": "Canary/Parakeet families include multilingual ASR variants.",
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Canary/Parakeet families include multilingual ASR variants.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "stt",
    "modelId": "parakeet-tdt-0.6b-v3",
    "publicName": "Parakeet TDT 0.6B v3",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": "Hosted/free endpoints differ from self-hosted/downloaded NIMs. Operational constraints depend on deployment target.",
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": "Canary/Parakeet families include multilingual ASR variants.",
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Canary/Parakeet families include multilingual ASR variants.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "tts",
    "modelId": "magpie-tts-flow",
    "publicName": "Magpie TTS Flow",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": null,
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": "Magpie family includes multilingual options.",
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Magpie family includes multilingual options.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "tts",
    "modelId": "magpie-tts-multilingual",
    "publicName": "Magpie TTS Multilingual",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": null,
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": "Magpie family includes multilingual options.",
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Magpie family includes multilingual options.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "service": "tts",
    "modelId": "magpie-tts-zeroshot",
    "publicName": "Magpie TTS Zeroshot",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Many build.nvidia.com endpoints are marked free; enterprise/downloadable NIM deployment pricing differs from hosted evaluation endpoints.",
    "limitsSummary": null,
    "regionSummary": "Often shown as Global on model cards; self-hosted/on-prem options also exist.",
    "languagesSummary": "Magpie family includes multilingual options.",
    "notes": "Useful if you want both hosted testing and customer-controlled/self-hosted deployment later. Treat downloadable NIMs separately from hosted APIs.",
    "officialSources": [
      "https://build.nvidia.com/",
      "https://docs.api.nvidia.com/",
      "https://build.nvidia.com/models"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Magpie family includes multilingual options.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

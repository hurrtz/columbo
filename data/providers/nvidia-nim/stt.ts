import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "stt",
      "modelId": "parakeet-ctc-1_1b-asr",
      "publicName": "Parakeet CTC 1.1B ASR",
      "aliases": [
        "parakeet-1-1b-ctc-en-us",
        "Parakeet 1.1b CTC English (en-US)"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-minute pricing found.",
      "limitsSummary": "English-only. Streaming and batch on build page. Self-hosted Riva docs include offline/streaming/true-offline modes; true-offline profile segments long audio into chunks of up to 30s.",
      "regionSummary": "Hosted build page is free dev API; self-hosted support matrix is model/container-based.",
      "languagesSummary": "American English / en-US only.",
      "notes": "Best default native NVIDIA STT picker entry for English realtime or near-realtime use. Hosted access is documented via gRPC to grpc.nvcf.nvidia.com with function-id metadata.",
      "officialSources": [
        "https://build.nvidia.com/nvidia/parakeet-ctc-1_1b-asr",
        "https://build.nvidia.com/nvidia/parakeet-ctc-1_1b-asr/api",
        "https://docs.nvidia.com/nim/riva/asr/latest/support-matrix.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 30,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "true-ofl uses Silero VAD to segment long audio files into chunks of up-to 30s."
        }
      ],
      "languageSupport": {
        "rawText": "American English.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "english-only",
          "best native NVIDIA STT default"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "stt",
      "modelId": "canary-1b-asr",
      "publicName": "Canary 1B ASR",
      "aliases": [
        "canary-1b",
        "Canary 1b Multilingual"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-minute pricing found.",
      "limitsSummary": "Offline-only in current Riva docs. Mono WAV input per build model card.",
      "regionSummary": "Global.",
      "languagesSummary": "Official current self-host docs list 26 ASR languages and 34 AST languages.",
      "notes": "Expose as multilingual transcription/translation picker entry, but not as primary realtime STT. Requires explicit input language for transcription in current docs.",
      "officialSources": [
        "https://build.nvidia.com/nvidia/canary-1b-asr/modelcard",
        "https://docs.nvidia.com/nim/riva/asr/latest/getting-started.html",
        "https://docs.nvidia.com/nim/riva/asr/1.7.0/release-notes.html",
        "https://docs.nvidia.com/nim/riva/asr/latest/support-matrix.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "audio",
          "sourceText": "Mono channel is required."
        }
      ],
      "languageSupport": {
        "rawText": "Canary supports transcription in ar-AR, cs-CZ, da-DK, de-DE, en-GB, en-US, es-ES, es-US, fr-CA, fr-FR, he-IL, hi-IN, it-IT, ja-JP, ko-KR, nb-NO, nl-NL, nn-NO, pl-PL, pt-BR, pt-PT, ru-RU, sv-SE, th-TH, tr-TR, zh-CN. Release notes state 26 ASR languages and 34 AST languages.",
        "isMultilingual": true,
        "languageCount": 26,
        "voiceCount": 0,
        "listedLanguages": [
          "ar-AR",
          "cs-CZ",
          "da-DK",
          "de-DE",
          "en-GB",
          "en-US",
          "es-ES",
          "es-US",
          "fr-CA",
          "fr-FR",
          "he-IL",
          "hi-IN",
          "it-IT",
          "ja-JP",
          "ko-KR",
          "nb-NO",
          "nl-NL",
          "nn-NO",
          "pl-PL",
          "pt-BR",
          "pt-PT",
          "ru-RU",
          "sv-SE",
          "th-TH",
          "tr-TR",
          "zh-CN"
        ],
        "notes": [
          "offline-only",
          "AST coverage is larger than ASR coverage"
        ]
      }
    }
  ),
]);

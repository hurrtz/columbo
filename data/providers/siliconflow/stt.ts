import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "stt",
      "modelId": "FunAudioLLM/SenseVoiceSmall",
      "publicName": "SenseVoiceSmall",
      "aliases": [
        "SenseVoiceSmall"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Exact per-model public price not verified. Pricing page says transcription is billed per minute of audio, but accessible official pages did not tie a public minute price to this exact model.",
      "limitsSummary": "Public STT endpoint requires multipart upload with a file object. No public max file size or max audio duration was verified.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "No language list was found in public SiliconFlow STT docs for this model.",
      "notes": "Best-documented STT model for a stable picker because it is used in the official STT endpoint example and third-party integration examples.",
      "officialSources": [
        "https://docs.siliconflow.com/en/api-reference/audio/create-audio-transcriptions",
        "https://docs.siliconflow.com/en/usercases/use-siliconcloud-in-fastgpt",
        "https://www.siliconflow.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No public language list found in SiliconFlow STT docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-by-provider-docs"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "stt",
      "modelId": "TeleAI/TeleSpeechASR",
      "publicName": "TeleSpeechASR",
      "aliases": [
        "TeleSpeechASR"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown. Exact public per-model price not verified in accessible official docs.",
      "limitsSummary": "Public STT endpoint lists the model as available. No public max file size or max duration was verified.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "No language list was found in public SiliconFlow STT docs for this model.",
      "notes": "Publicly listed in the STT endpoint, but much thinner public documentation than SenseVoiceSmall. Better left to live discovery or an advanced picker.",
      "officialSources": [
        "https://docs.siliconflow.com/en/api-reference/audio/create-audio-transcriptions"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No public language list found in SiliconFlow STT docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-by-provider-docs"
        ]
      }
    }
  ),
]);

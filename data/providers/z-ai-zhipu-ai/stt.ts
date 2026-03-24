import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "stt",
      "modelId": "glm-asr-2512",
      "publicName": "GLM-ASR-2512",
      "aliases": [
        "GLM-ASR-2512"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $0.03 / MTok, documented as approximately $0.0024 per minute.",
      "limitsSummary": "wav/mp3 only; file size <= 25 MB; audio duration <= 30 s; hotwords <= 100; optional SSE Event Stream output.",
      "regionSummary": "Documented on both stacks.",
      "languagesSummary": "Mandarin; Sichuanese, Cantonese, Minnan, Wu; US/UK English; French, German, Japanese, Korean, Spanish, Arabic; dozens more.",
      "notes": "Safe stable-picker STT entry.",
      "officialSources": [
        "https://docs.z.ai/api-reference/audio/audio-transcriptions",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-asr-2512",
        "https://docs.bigmodel.cn/cn/update/new-releases"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0024,
          "unit": "minute",
          "sourceText": "equivalent to approximately $0.0024/minute"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "file size \u2264 25 MB"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 30,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "audio duration \u2264 30 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "Supports multiple mainstream languages and dialects including Mandarin, Sichuanese, Cantonese, Minnan, Wu, US/UK English, French, German, Japanese, Korean, Spanish, Arabic, and dozens of commonly used languages.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 0,
        "listedLanguages": [
          "Mandarin",
          "Sichuanese",
          "Cantonese",
          "Minnan",
          "Wu",
          "English",
          "French",
          "German",
          "Japanese",
          "Korean",
          "Spanish",
          "Arabic"
        ],
        "notes": [
          "dialect support",
          "dozens more not fully enumerated"
        ]
      }
    }
  ),
]);

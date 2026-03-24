import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "inworld/tts-1.5-mini",
      "publicName": "Inworld TTS 1.5 Mini",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$5 / 1M input characters.",
      "limitsSummary": "No input length hard cap surfaced on Replicate page snippets.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "15 languages documented on Replicate page.",
      "notes": "Official/public TTS model. Strong stable-picker option for low-latency conversational TTS. Replicate page says ~120ms median latency, supports preset voices plus custom cloned voice IDs, and outputs MP3/WAV/OGG Opus/FLAC.",
      "officialSources": [
        "https://replicate.com/inworld/tts-1.5-mini"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_characters",
          "sourceText": "$5 per million input characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "15 languages: English, Chinese, Japanese, Korean, Russian, Italian, Spanish, Portuguese, French, German, Polish, Dutch, Hindi, Hebrew, Arabic.",
        "isMultilingual": true,
        "languageCount": 15,
        "voiceCount": 4,
        "listedLanguages": [
          "English",
          "Chinese",
          "Japanese",
          "Korean",
          "Russian",
          "Italian",
          "Spanish",
          "Portuguese",
          "French",
          "German",
          "Polish",
          "Dutch",
          "Hindi",
          "Hebrew",
          "Arabic"
        ],
        "notes": [
          "voice-dependent",
          "custom cloned voice IDs supported",
          "preset voices listed on page are Ashley, Dennis, Alex, Darlene"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "inworld/tts-1.5-max",
      "publicName": "Inworld TTS 1.5 Max",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$10 / 1M input characters.",
      "limitsSummary": "No input length hard cap surfaced on Replicate page snippets.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "15 languages documented on Replicate page.",
      "notes": "Official/public TTS model. Best quality/speed Inworld option on Replicate. Replicate page says <200ms median latency, custom cloned voice IDs, and multiple output formats.",
      "officialSources": [
        "https://replicate.com/inworld/tts-1.5-max"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 10.0,
          "unit": "million_characters",
          "sourceText": "$0.01 per thousand input characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "15 languages: English, Chinese, Japanese, Korean, Russian, Italian, Spanish, Portuguese, French, German, Polish, Dutch, Hindi, Hebrew, Arabic.",
        "isMultilingual": true,
        "languageCount": 15,
        "voiceCount": 4,
        "listedLanguages": [
          "English",
          "Chinese",
          "Japanese",
          "Korean",
          "Russian",
          "Italian",
          "Spanish",
          "Portuguese",
          "French",
          "German",
          "Polish",
          "Dutch",
          "Hindi",
          "Hebrew",
          "Arabic"
        ],
        "notes": [
          "voice-dependent",
          "custom cloned voice IDs supported",
          "preset voices listed on page are Ashley, Dennis, Alex, Darlene"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "minimax/speech-2.8-turbo",
      "publicName": "MiniMax Speech 2.8 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.06 / 1K input tokens (= $60 / 1M input tokens).",
      "limitsSummary": "No hard text-length cap surfaced in the snippets I found. Replicate page documents under-250ms latency.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "Replicate page says 40+ languages and 17 built-in voices.",
      "notes": "Official/public TTS model. Better fit than HD for interactive voice if latency matters. Supports voice cloning, emotion control, speed/volume/pitch, and pronunciation dictionary features.",
      "officialSources": [
        "https://replicate.com/minimax/speech-2.8-turbo"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.06,
          "unit": "other",
          "sourceText": "$0.06 per thousand input tokens"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Supports over 40 languages; 17 built-in voices.",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": 17,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "custom voice models supported",
          "language count is '40+' not an exact enumerated list"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "tts",
      "modelId": "minimax/speech-2.8-hd",
      "publicName": "MiniMax Speech 2.8 HD",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Public price snippet not reliably surfaced in the snippets I found.",
      "limitsSummary": "Replicate page says text inputs up to 10,000 characters; sample rates 8,000-44,100 Hz; bitrate 32,000-256,000 bps; speed 0.5x-2x; pitch -12 to +12 semitones; pause markers 0.01-99.99 seconds.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "Replicate page says 32 languages and 17+ preset voices.",
      "notes": "Official/public TTS model. Better quality-oriented stable-picker choice than Turbo for polished output, but not the first choice for low-latency turn-taking.",
      "officialSources": [
        "https://replicate.com/minimax/speech-2.8-hd"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10000,
          "unit": "other",
          "scope": "model",
          "sourceText": "The model processes text inputs up to 10,000 characters"
        }
      ],
      "languageSupport": {
        "rawText": "32 languages; 17+ preset voices.",
        "isMultilingual": true,
        "languageCount": 32,
        "voiceCount": 17,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "custom voice cloning supported",
          "language list partially exemplified, not fully enumerated in snippet"
        ]
      }
    }
  ),
]);

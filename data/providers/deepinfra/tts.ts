import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "tts",
      "modelId": "Qwen/Qwen3-TTS",
      "publicName": "Qwen3-TTS",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$20.00 / 1M characters.",
      "limitsSummary": "No public character-per-request cap found. Supports custom voices via /v1/voices/add. Streaming PCM documented with ~97 ms first-byte latency.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific residency promise found.",
      "languagesSummary": "10 languages: English, Chinese, Japanese, Korean, German, French, Russian, Spanish, Italian, Portuguese. 9 preset voices. Voice cloning from ~3 second audio sample.",
      "notes": "Best-documented premium TTS picker entry. Supports presets, cloning, natural-language style control, and multiple output formats.",
      "officialSources": [
        "https://deepinfra.com/Qwen/Qwen3-TTS",
        "https://deepinfra.com/Qwen/Qwen3-TTS/api",
        "https://deepinfra.com/Qwen/Qwen3-TTS/versions"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 20.0,
          "unit": "million_characters",
          "sourceText": "$20.00 / 1M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "10 languages and 9 preset voices; voice cloning from short (~3s) sample; WAV/MP3/FLAC/PCM output.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 9,
        "listedLanguages": [
          "English",
          "Chinese",
          "Japanese",
          "Korean",
          "German",
          "French",
          "Russian",
          "Spanish",
          "Italian",
          "Portuguese"
        ],
        "notes": [
          "voice-dependent",
          "supports custom cloned voices",
          "supports instruction-controlled style"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "tts",
      "modelId": "Qwen/Qwen3-TTS-VoiceDesign",
      "publicName": "Qwen3-TTS-VoiceDesign",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pricing was visible on the category page but the snippet I reviewed did not include the exact amount in the opened excerpt. Treat exact current price as live-discovery unless rechecked at runtime.",
      "limitsSummary": "Streaming PCM supported per category page. No public per-request cap verified.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific regional promise found.",
      "languagesSummary": "10 languages, matching Qwen3-TTS family.",
      "notes": "Useful differentiated picker entry if the app wants descriptive voice design instead of fixed presets. Exact price should be revalidated live.",
      "officialSources": [
        "https://deepinfra.com/models/text-to-speech/",
        "https://deepinfra.com/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "10 languages \u2014 English, Chinese, Japanese, Korean, German, French, Russian, Spanish, Italian, Portuguese.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese",
          "Japanese",
          "Korean",
          "German",
          "French",
          "Russian",
          "Spanish",
          "Italian",
          "Portuguese"
        ],
        "notes": [
          "voice-generated from natural-language description",
          "voice-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "tts",
      "modelId": "ResembleAI/chatterbox-turbo",
      "publicName": "chatterbox-turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.00 / 1M characters.",
      "limitsSummary": "No public per-request character/session cap found.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific regional promise found.",
      "languagesSummary": "The dedicated page excerpt I reviewed did not enumerate languages. The category page describes it as low-latency and oriented toward voice agents. Chatterbox Multilingual is a separate 23-language model.",
      "notes": "Strong low-cost TTS choice. Better stable picker candidate than some thinner-documented TTS entries because pricing is explicit and positioning is clear.",
      "officialSources": [
        "https://deepinfra.com/ResembleAI/chatterbox-turbo",
        "https://deepinfra.com/models",
        "https://deepinfra.com/models/text-to-speech/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_characters",
          "sourceText": "$1.00 / 1M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Dedicated page excerpt did not list languages.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage unclear on reviewed official page",
          "optimized for low-latency voice agents"
        ]
      }
    }
  ),
]);

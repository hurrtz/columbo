import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "stt",
      "modelId": "openai/whisper-large-v3-turbo",
      "publicName": "whisper-large-v3-turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.00020 / minute on the dedicated model page.",
      "limitsSummary": "No universal DeepInfra STT file-size or duration cap found. Provider-wide 200 concurrent requests per model documented. Upstream Whisper architecture commonly operates on 30-second windows internally, but that is not a DeepInfra API upload limit.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific residency promise found.",
      "languagesSummary": "Multilingual. Upstream Hugging Face page marks 99 languages.",
      "notes": "Best-documented stable STT picker choice on DeepInfra. Available through native API, not through the documented OpenAI-compatible layer.",
      "officialSources": [
        "https://deepinfra.com/openai/whisper-large-v3-turbo",
        "https://deepinfra.com/models/automatic-speech-recognition/",
        "https://huggingface.co/openai/whisper-large-v3-turbo",
        "https://deepinfra.com/docs/advanced/rate-limits"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0002,
          "unit": "minute",
          "sourceText": "$0.00020 / minute"
        }
      ],
      "constraints": [
        {
          "metric": "concurrency",
          "comparator": "<=",
          "value": 200,
          "unit": "sessions",
          "scope": "model",
          "sourceText": "200 concurrent requests limit per model"
        }
      ],
      "languageSupport": {
        "rawText": "Hugging Face model page indicates 99 languages; Whisper paper describes multilingual ASR and translation, with 96 non-English languages in training data.",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "translation to English supported by upstream Whisper family",
          "DeepInfra page itself does not enumerate all languages"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "stt",
      "modelId": "mistralai/Voxtral-Small-24B-2507",
      "publicName": "Voxtral-Small-24B-2507",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.00300 / minute from the ASR category page.",
      "limitsSummary": "ASR category page shows 32k context. No DeepInfra universal STT upload cap verified.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific regional promise found.",
      "languagesSummary": "Speech transcription, translation and audio understanding are mentioned, but language list is not enumerated on the category snippet I reviewed.",
      "notes": "Interesting alternative STT/audio-understanding entry, but documentation is thinner than Whisper for app-safe exposure.",
      "officialSources": [
        "https://deepinfra.com/models/automatic-speech-recognition/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.003,
          "unit": "minute",
          "sourceText": "$0.00300 / minute"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "32k"
        }
      ],
      "languageSupport": {
        "rawText": "Category page says it excels at speech transcription, translation and audio understanding.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "languages not enumerated on reviewed official page"
        ]
      }
    }
  ),
]);

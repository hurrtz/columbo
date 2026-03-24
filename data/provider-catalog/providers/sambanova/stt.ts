import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "sambanova",
      "providerName": "SambaNova",
      "service": "stt",
      "modelId": "whisper-large-v3",
      "publicName": "Whisper Large v3",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "LLM pricing varies by hosted model. Audio/STT support is exposed through OpenAI-compatible endpoints in docs.",
      "limitsSummary": "Docs mention audio-input flows with ~25 MB upload ceiling for some endpoints. No public first-party TTS was verified.",
      "regionSummary": "SambaCloud / enterprise deployments; public per-model region detail limited.",
      "languagesSummary": "Multilingual via Whisper family.",
      "notes": "Your sheet is outdated: SambaNova docs now show native audio/STT support, but still no first-party TTS verified.",
      "officialSources": [
        "https://docs.sambanova.ai/",
        "https://cloud.sambanova.ai/",
        "https://docs.sambanova.ai/cloud/api-reference/audio"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "~",
          "value": 25000000.0,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Docs mention audio-input flows with ~25 MB upload ceiling for some endpoints. No public first-party TTS was verified."
        }
      ],
      "languageSupport": {
        "rawText": "Multilingual via Whisper family.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "stt",
      "modelId": "glm-asr",
      "publicName": "GLM Audio to Text",
      "aliases": [
        "GLM-ASR-2512"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official public pricing not verified.",
      "limitsSummary": "wav/mp3 only; file size <=25 MB; audio duration <=30 seconds; prompt context recommended <8000 chars.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Documented as multi-language transcription; no full language list verified.",
      "notes": "This is the clearest public STT endpoint on Novita. It is a REST file/url-base64 transcription API, not realtime streaming.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-glm-asr",
        "https://novita.ai/docs/api-reference/api-reference-overview"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "file size \u2264 25 MB"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 30,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "audio duration \u2264 30 seconds"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 8000,
          "unit": "other",
          "scope": "audio",
          "sourceText": "Recommended to be less than 8000 characters"
        }
      ],
      "languageSupport": {
        "rawText": "supporting multi-language transcription",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "full language list unknown"
        ]
      }
    }
  ),
]);

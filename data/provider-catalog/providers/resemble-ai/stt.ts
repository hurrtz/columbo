import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "resemble-ai",
      "providerName": "Resemble AI",
      "service": "stt",
      "modelId": "stt",
      "publicName": "Resemble STT",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
      "limitsSummary": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed.",
      "regionSummary": "Cloud plus enterprise/on-prem options.",
      "languagesSummary": "Public STT exists; verify exact language matrix live.",
      "notes": "Your sheet is outdated: Resemble is not just TTS anymore; it also has STT and speech-to-speech tooling.",
      "officialSources": [
        "https://app.resemble.ai/docs",
        "https://www.resemble.ai/pricing",
        "https://www.resemble.ai/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "~",
          "value": 500000000.0,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "~",
          "value": 1200.0,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
        }
      ],
      "languageSupport": {
        "rawText": "Public STT exists; verify exact language matrix live.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "resemble-ai",
      "providerName": "Resemble AI",
      "service": "stt",
      "modelId": "speech-to-speech",
      "publicName": "Speech-to-Speech / Voice Changer",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
      "limitsSummary": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed.",
      "regionSummary": "Cloud plus enterprise/on-prem options.",
      "languagesSummary": "Public STT exists; verify exact language matrix live.",
      "notes": "Adjacency feature",
      "officialSources": [
        "https://app.resemble.ai/docs",
        "https://www.resemble.ai/pricing",
        "https://www.resemble.ai/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "~",
          "value": 500000000.0,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "~",
          "value": 1200.0,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
        }
      ],
      "languageSupport": {
        "rawText": "Public STT exists; verify exact language matrix live.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

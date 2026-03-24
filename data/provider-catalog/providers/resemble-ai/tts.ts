import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "resemble-ai",
      "providerName": "Resemble AI",
      "service": "tts",
      "modelId": "tts-v4",
      "publicName": "Chatterbox",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
      "limitsSummary": null,
      "regionSummary": "Cloud plus enterprise/on-prem options.",
      "languagesSummary": "23 languages for multilingual Chatterbox.",
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
      "constraints": [],
      "languageSupport": {
        "rawText": "23 languages for multilingual Chatterbox.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "resemble-ai",
      "providerName": "Resemble AI",
      "service": "tts",
      "modelId": "tts-v4-turbo",
      "publicName": "Chatterbox Turbo",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
      "limitsSummary": null,
      "regionSummary": "Cloud plus enterprise/on-prem options.",
      "languagesSummary": "23 languages for multilingual Chatterbox.",
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
      "constraints": [],
      "languageSupport": {
        "rawText": "23 languages for multilingual Chatterbox.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

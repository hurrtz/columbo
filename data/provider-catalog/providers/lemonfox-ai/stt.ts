import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "lemonfox-ai",
      "providerName": "Lemonfox.ai",
      "service": "stt",
      "modelId": "whisper-large-v3",
      "publicName": "Whisper Large v3",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: $5/month includes ~30h STT or ~2M TTS chars; extra ~$0.50 per 1M credits = ~3h STT or ~200k TTS chars. STT also promoted at ~$0.50 per 3 hours.",
      "limitsSummary": "Language support is broad for STT, but public model granularity is lighter than larger vendors.",
      "regionSummary": "Cloud provider; public region detail sparse.",
      "languagesSummary": "100+ languages.",
      "notes": "Useful budget option, but metadata is relatively coarse. You may need more manual validation before exposing advanced controls.",
      "officialSources": [
        "https://docs.lemonfox.ai/",
        "https://lemonfox.ai/",
        "https://lemonfox.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "100+ languages.",
        "isMultilingual": true,
        "languageCount": 100,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "tts",
      "modelId": "seed-tts",
      "publicName": "Seed TTS family",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
      "limitsSummary": null,
      "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
      "languagesSummary": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
      "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
      "officialSources": [
        "https://www.volcengine.com/",
        "https://www.volcengine.com/product/doubao",
        "https://www.volcengine.com/product/voice-tech"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Broad speech/TTS offering",
          "especially for Chinese; multilingual availability exists but is product-specific"
        ],
        "notes": []
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "tts",
      "modelId": "voice-tech-tts",
      "publicName": "Volcano Engine Voice Tech TTS",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Pricing varies across Doubao/Voice Tech product lines; official calculators are service-specific.",
      "limitsSummary": null,
      "regionSummary": "Primarily China/Asia infrastructure; exact region availability varies by Volcano Engine product.",
      "languagesSummary": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
      "notes": "Technically a full stack provider, but integration is fragmented across product surfaces. Plan for extra onboarding effort.",
      "officialSources": [
        "https://www.volcengine.com/",
        "https://www.volcengine.com/product/doubao",
        "https://www.volcengine.com/product/voice-tech"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Broad speech/TTS offering, especially for Chinese; multilingual availability exists but is product-specific.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Broad speech/TTS offering",
          "especially for Chinese; multilingual availability exists but is product-specific"
        ],
        "notes": []
      }
    }
  ),
]);

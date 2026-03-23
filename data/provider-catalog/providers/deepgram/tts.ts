import { defineTtsModels } from "../../definitions";
import type { CatalogTts } from "../../../../src/catalog/types";

export const tts = defineTtsModels(
[
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "tts",
    "modelId": "aura",
    "publicName": "Aura",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": null,
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Aura/Aura-2 support English, Spanish, German, French, Dutch, Italian, Japanese.",
    "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
    "officialSources": [
      "https://developers.deepgram.com/docs/models-languages-overview",
      "https://developers.deepgram.com/docs/text-to-speech",
      "https://deepgram.com/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Aura/Aura-2 support English, Spanish, German, French, Dutch, Italian, Japanese.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Aura/Aura-2 support English",
        "Spanish",
        "German",
        "French",
        "Dutch",
        "Italian",
        "Japanese"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "tts",
    "modelId": "aura-2",
    "publicName": "Aura-2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": null,
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Aura/Aura-2 support English, Spanish, German, French, Dutch, Italian, Japanese.",
    "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
    "officialSources": [
      "https://developers.deepgram.com/docs/models-languages-overview",
      "https://developers.deepgram.com/docs/text-to-speech",
      "https://deepgram.com/pricing"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Aura/Aura-2 support English, Spanish, German, French, Dutch, Italian, Japanese.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Aura/Aura-2 support English",
        "Spanish",
        "German",
        "French",
        "Dutch",
        "Italian",
        "Japanese"
      ],
      "notes": []
    }
  }
] satisfies CatalogTts[],
);

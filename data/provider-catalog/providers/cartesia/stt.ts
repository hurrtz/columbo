import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "cartesia",
      "providerName": "Cartesia",
      "service": "stt",
      "modelId": "ink-whisper",
      "publicName": "Ink Whisper",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Credit-based. Batch STT has been documented at 1 credit per 2 seconds. Voice cloning uses separate credit schedules by clone type.",
      "limitsSummary": "Plan concurrency examples: Free ~2 TTS / 8 STT; Pro ~3/12; Startup ~5/20; Scale ~15/60. Older Sonic snapshots can have EOL dates.",
      "regionSummary": "Cartesia cloud; low-latency realtime focus.",
      "languagesSummary": "Whisper-based multilingual STT.",
      "notes": "Your source sheet is outdated: Cartesia now has both TTS and STT. It is a strong developer-first realtime voice provider.",
      "officialSources": [
        "https://docs.cartesia.ai/",
        "https://cartesia.ai/pricing",
        "https://docs.cartesia.ai/api-reference"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Whisper-based multilingual STT.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);

import { defineSttModels } from "../../definitions";
import type { CatalogStt } from "../../../../src/catalog/types";

export const stt = defineSttModels(
[
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "stt",
    "modelId": "base",
    "publicName": "Base",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
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
    "constraints": [
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 225.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 50.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 15.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      }
    ],
    "languageSupport": {
      "rawText": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Varies by model; Nova/Flux broad multilingual coverage",
        "Whisper Cloud model-size dependent"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "stt",
    "modelId": "enhanced",
    "publicName": "Enhanced",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
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
    "constraints": [
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 225.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 50.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 15.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      }
    ],
    "languageSupport": {
      "rawText": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Varies by model; Nova/Flux broad multilingual coverage",
        "Whisper Cloud model-size dependent"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "stt",
    "modelId": "flux",
    "publicName": "Flux",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
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
    "constraints": [
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 225.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 50.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 15.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      }
    ],
    "languageSupport": {
      "rawText": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Varies by model; Nova/Flux broad multilingual coverage",
        "Whisper Cloud model-size dependent"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "stt",
    "modelId": "nova",
    "publicName": "Nova",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
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
    "constraints": [
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 225.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 50.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 15.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      }
    ],
    "languageSupport": {
      "rawText": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Varies by model; Nova/Flux broad multilingual coverage",
        "Whisper Cloud model-size dependent"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "stt",
    "modelId": "nova-2",
    "publicName": "Nova-2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
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
    "constraints": [
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 225.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 50.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 15.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      }
    ],
    "languageSupport": {
      "rawText": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Varies by model; Nova/Flux broad multilingual coverage",
        "Whisper Cloud model-size dependent"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "stt",
    "modelId": "nova-3",
    "publicName": "Nova-3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
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
    "constraints": [
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 225.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 50.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 15.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      }
    ],
    "languageSupport": {
      "rawText": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Varies by model; Nova/Flux broad multilingual coverage",
        "Whisper Cloud model-size dependent"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepgram",
    "providerName": "Deepgram",
    "service": "stt",
    "modelId": "whisper-cloud",
    "publicName": "Whisper Cloud",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "regionSummary": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "languagesSummary": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
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
    "constraints": [
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 225.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 50.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      },
      {
        "metric": "concurrency",
        "comparator": "=",
        "value": 15.0,
        "unit": "count",
        "scope": "general",
        "sourceText": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency."
      }
    ],
    "languageSupport": {
      "rawText": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Varies by model; Nova/Flux broad multilingual coverage",
        "Whisper Cloud model-size dependent"
      ],
      "notes": []
    }
  }
] satisfies CatalogStt[],
);

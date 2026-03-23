import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
{
  "modelId": "base",
  "publicName": "Base",
  "status": "Documented active/current",
  "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
  "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
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
  ),
  providerContext.stt(
{
  "modelId": "enhanced",
  "publicName": "Enhanced",
  "status": "Documented active/current",
  "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
  "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
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
  ),
  providerContext.stt(
{
  "modelId": "flux",
  "publicName": "Flux",
  "status": "Documented active/current",
  "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
  "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
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
  ),
  providerContext.stt(
{
  "modelId": "nova",
  "publicName": "Nova",
  "status": "Documented active/current",
  "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
  "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
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
  ),
  providerContext.stt(
{
  "modelId": "nova-2",
  "publicName": "Nova-2",
  "status": "Documented active/current",
  "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
  "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
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
  ),
  providerContext.stt(
{
  "modelId": "nova-3",
  "publicName": "Nova-3",
  "status": "Documented active/current",
  "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
  "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
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
  ),
  providerContext.stt(
{
  "modelId": "whisper-cloud",
  "publicName": "Whisper Cloud",
  "status": "Documented active/current",
  "limitsSummary": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
  "notes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations.",
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
  ),
]);

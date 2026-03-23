import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "deepgram",
  "providerName": "Deepgram",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://developers.deepgram.com/docs/models-languages-overview",
    "https://developers.deepgram.com/docs/text-to-speech",
    "https://deepgram.com/pricing"
  ],
  "integration": {
    "catalogType": "Fixed speech-first catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": null,
      "tts": "Aura [aura]\nAura-2 [aura-2]",
      "stt": "Flux [flux]\nNova-3 [nova-3]\nNova-2 [nova-2]\nNova [nova]\nEnhanced [enhanced]\nBase [base]\nWhisper Cloud [whisper-cloud]"
    },
    "pricing": "Deepgram pricing varies by model and mode. Signup commonly includes $200 credit.",
    "limits": "Typical rate limits: Flux/Nova streaming up to ~225 concurrent; prerecorded ~50 concurrent; TTS REST ~15 concurrent and streaming ~60. Whisper Cloud has lower concurrency.",
    "region": "Deepgram-managed cloud; self-hosted/private options also exist.",
    "sttLanguages": "Varies by model; Nova/Flux broad multilingual coverage, Whisper Cloud model-size dependent.",
    "ttsLanguages": "Aura/Aura-2 support English, Spanish, German, French, Dutch, Italian, Japanese.",
    "freeTier": "Yes: signup credit.",
    "integrationNotes": "Strong realtime speech stack. If you need a single speech specialist with both STT and TTS, Deepgram is one of the easier integrations."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
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
] satisfies CatalogStt[];

const tts = [
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
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;

import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "groq",
    "providerName": "Groq",
    "categoryName": "AI inference platform / hosted model API",
    "hq": "San Jose, California, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://console.groq.com/docs/models",
      "https://groq.com/pricing",
      "https://console.groq.com/docs/openai",
      "https://console.groq.com/docs/api-reference",
      "https://console.groq.com/docs/speech-to-text",
      "https://console.groq.com/docs/text-to-speech",
      "https://console.groq.com/docs/text-to-speech/orpheus",
      "https://console.groq.com/docs/rate-limits",
      "https://console.groq.com/docs/batch",
      "https://console.groq.com/docs/flex-processing",
      "https://console.groq.com/docs/deprecations",
      "https://console.groq.com/docs/your-data",
      "https://console.groq.com/docs/legal/services-agreement",
      "https://groq.com/groqcloud",
      "https://groq.com/contact",
      "https://trust.groq.com/faq",
      "https://groq.com/newsroom/groq-launches-european-data-center-footprint-in-helsinki-finland"
    ],
    "integration": {
      "catalogType": "Hosted multi-model catalog plus Groq systems",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "LLM pricing is per 1M input/output tokens; STT is per hour transcribed with a 10-second minimum billed length; TTS is per 1M characters. Batch is documented at 50% below synchronous pricing for supported chat/audio endpoints.",
      "limits": "Key public limits: STT 25 MB free / 100 MB developer upload, 10-second minimum billed length, specific supported file types; TTS documents max 200 input characters per request and wav output only; batch input files support up to 200 MB and 50,000 JSONL lines; batch completion window is 24h to 7d.",
      "region": "Groq documents global deployments and four regions on GroqCloud marketing pages; official region naming is not presented as a stable API-region matrix in developer docs. Use coarse region metadata only.",
      "sttLanguages": "Groq documents both Whisper models as multilingual, but does not publish a provider-owned exhaustive language list on the STT docs page.",
      "ttsLanguages": "Groq currently documents English and Arabic (Saudi) TTS only.",
      "freeTier": "Free access exists ('Start Building For Free' / 'Get started for free'), but public docs do not give a clean provider-wide free-tier credit amount on the pages reviewed.",
      "integrationNotes": "Use curated model pickers plus live discovery. Prefer production models for stable pickers, keep preview models opt-in, store alias mappings separately, and do not assume the docs page is a permanent exhaustive catalog."
    },
    "sources": [
      {
        "url": "https://console.groq.com/docs/models",
        "title": "Supported Models - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "limits",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://groq.com/pricing",
        "title": "Groq On-Demand Pricing for Tokens-as-a-Service",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models"
        ]
      },
      {
        "url": "https://console.groq.com/docs/openai",
        "title": "OpenAI Compatibility - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "protocols"
        ]
      },
      {
        "url": "https://console.groq.com/docs/api-reference",
        "title": "API Reference - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "protocols",
          "limits",
          "integration"
        ]
      },
      {
        "url": "https://console.groq.com/docs/speech-to-text",
        "title": "Speech to Text - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "languages",
          "limits"
        ]
      },
      {
        "url": "https://console.groq.com/docs/text-to-speech",
        "title": "Text to Speech - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "models"
        ]
      },
      {
        "url": "https://console.groq.com/docs/text-to-speech/orpheus",
        "title": "Orpheus Text to Speech - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://console.groq.com/docs/rate-limits",
        "title": "Rate Limits - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://console.groq.com/docs/batch",
        "title": "Groq Batch API - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "batch",
          "limits",
          "pricing",
          "stt"
        ]
      },
      {
        "url": "https://console.groq.com/docs/flex-processing",
        "title": "Flex Processing - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://console.groq.com/docs/deprecations",
        "title": "Model Deprecation - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "deprecations"
        ]
      },
      {
        "url": "https://console.groq.com/docs/your-data",
        "title": "Your Data in GroqCloud - GroqDocs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "limits"
        ]
      },
      {
        "url": "https://console.groq.com/docs/legal/services-agreement",
        "title": "Groq Services Agreement - GroqDocs",
        "type": "official",
        "lastUpdated": "2025-10-15",
        "usedFor": [
          "regions",
          "deprecations"
        ]
      },
      {
        "url": "https://groq.com/groqcloud",
        "title": "GroqCloud | Groq is fast, low cost inference.",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://groq.com/newsroom/groq-launches-european-data-center-footprint-in-helsinki-finland",
        "title": "Groq Launches European Data Center Footprint in Helsinki, Finland",
        "type": "official",
        "lastUpdated": "2025-07-06",
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://trust.groq.com/faq",
        "title": "Groq Trust Center FAQ",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://groq.com/contact",
        "title": "Contact | Groq",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

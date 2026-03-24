import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "assemblyai",
    "providerName": "AssemblyAI",
    "categoryName": "Voice AI infrastructure / Speech-to-Text + routed LLM gateway",
    "hq": "Unknown as HQ; official mailing address in TOS is New York, NY, USA",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://www.assemblyai.com/docs/getting-started/models",
      "https://www.assemblyai.com/docs/pre-recorded-audio/select-the-speech-model",
      "https://www.assemblyai.com/docs/streaming/select-the-speech-model",
      "https://www.assemblyai.com/docs/api-reference/streaming-api/universal-streaming/universal-streaming",
      "https://www.assemblyai.com/docs/streaming/universal-3-pro",
      "https://www.assemblyai.com/docs/streaming/whisper-streaming",
      "https://www.assemblyai.com/docs/llm-gateway/overview",
      "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
      "https://www.assemblyai.com/docs/llm-gateway/migration-from-lemur",
      "https://www.assemblyai.com/docs/faq/do-you-offer-voice-to-voice-or-text-to-speech-tts",
      "https://www.assemblyai.com/pricing",
      "https://www.assemblyai.com/docs/faq/are-there-any-limits-on-file-size-or-file-duration-for-files-submitted-to-the-api",
      "https://www.assemblyai.com/docs/streaming/common-session-errors-and-closures",
      "https://www.assemblyai.com/docs/streaming/authenticate-with-a-temporary-token",
      "https://www.assemblyai.com/docs/data-retention-and-model-training"
    ],
    "integration": {
      "catalogType": "Hybrid: fixed native STT catalog + routed third-party LLM catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse",
        "websocket"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "Native STT pricing is public and stable on the pricing page: pre-recorded Universal-3 Pro $0.21/hr, Universal-2 $0.15/hr; streaming u3-rt-pro $0.45/hr, Universal-Streaming English $0.15/hr, Universal-Streaming Multilingual $0.15/hr, Whisper-Streaming $0.30/hr. LLM Gateway pricing is public per 1M input/output tokens and varies by routed model.",
      "limits": "Pre-recorded transcription: max 5GB and 10 hours per file; local upload endpoint max 2.2GB. Streaming: max session duration 3 hours by default; audio chunk duration must be between 50 ms and 1000 ms. Paid pre-recorded concurrency starts at 200 files; streaming starts at 100+ new sessions/minute; LLM Gateway paid accounts start at 30+ RPM per model.",
      "region": "US default and EU endpoints exist for pre-recorded STT, streaming STT, and LLM Gateway. LLM Gateway EU supports Claude and Gemini only; OpenAI models are US-only in AssemblyAI\u2019s gateway.",
      "sttLanguages": "Pre-recorded: Universal-2 supports 99 languages; Universal-3 Pro supports 6 languages. Streaming: u3-rt-pro supports EN/ES/DE/FR/PT/IT, Universal-Streaming Multilingual supports EN/ES/DE/FR/PT/IT, Universal-Streaming English is English-only, and whisper-rt supports 99+ languages.",
      "ttsLanguages": "Unsupported: AssemblyAI\u2019s public developer docs/FAQ say they do not offer TTS or voice-to-voice services.",
      "freeTier": "AssemblyAI advertises $50 in credits and free usage allowances; free streaming starts at 5 new streams/minute. LLM Gateway is not available on the free tier.",
      "integrationNotes": "Treat STT as native and stable. Treat LLM as routed/dynamic, with live discovery or at least frequent catalog refresh. Prefer canonical model IDs from the LLM Gateway Overview page over marketing names on the pricing page. Do not surface LeMUR as a picker target; it is deprecated on 2026-03-31. Do not surface TTS until API reference/docs exist."
    },
    "sources": [
      {
        "url": "https://www.assemblyai.com/docs/getting-started/models",
        "title": "Models | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/pre-recorded-audio/select-the-speech-model",
        "title": "Model selection (pre-recorded STT) | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/streaming/select-the-speech-model",
        "title": "Model selection (streaming STT) | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "languages"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/api-reference/streaming-api/universal-streaming/universal-streaming",
        "title": "Universal-Streaming API Reference | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "streaming",
          "limits",
          "regions",
          "auth",
          "protocols"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/streaming/universal-3-pro",
        "title": "Universal-3 Pro Streaming | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "streaming",
          "stt",
          "languages"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/streaming/whisper-streaming",
        "title": "Whisper streaming | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "streaming",
          "stt",
          "languages"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/llm-gateway/overview",
        "title": "LLM Gateway Overview | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "models",
          "regions",
          "limits"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "title": "Cloud Endpoints and Data Residency | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "regions"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/llm-gateway/migration-from-lemur",
        "title": "Migration Guide: From LeMUR to LLM Gateway | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "deprecations",
          "openai_compatibility"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/faq/do-you-offer-voice-to-voice-or-text-to-speech-tts",
        "title": "Do you offer voice-to-voice or text-to-speech (TTS)? | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts"
        ]
      },
      {
        "url": "https://www.assemblyai.com/pricing",
        "title": "AssemblyAI Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models",
          "free_tier",
          "regions"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/faq/are-there-any-limits-on-file-size-or-file-duration-for-files-submitted-to-the-api",
        "title": "Are there any limits on file size or file duration for files submitted to the API? | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "stt"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/streaming/common-session-errors-and-closures",
        "title": "Common session errors and closures | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "streaming"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/streaming/authenticate-with-a-temporary-token",
        "title": "Authenticate with a temporary token | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "auth",
          "limits",
          "streaming"
        ]
      },
      {
        "url": "https://www.assemblyai.com/docs/data-retention-and-model-training",
        "title": "Data retention and model training | AssemblyAI Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "retention",
          "compliance"
        ]
      },
      {
        "url": "https://www.assemblyai.com/legal/terms-of-service",
        "title": "Terms of Service | AssemblyAI",
        "type": "official",
        "lastUpdated": "2026-01-22",
        "usedFor": [
          "company"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

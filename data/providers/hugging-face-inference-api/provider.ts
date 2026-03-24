import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "hugging-face-inference-api",
    "providerName": "Hugging Face Inference API",
    "categoryName": "AI inference platform / routed model marketplace",
    "hq": "Brooklyn, New York, USA",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "routed",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://huggingface.co/docs/inference-providers/index",
      "https://huggingface.co/docs/inference-providers/pricing",
      "https://huggingface.co/docs/inference-providers/providers/hf-inference",
      "https://huggingface.co/docs/inference-providers/tasks/chat-completion",
      "https://huggingface.co/docs/inference-providers/tasks/automatic-speech-recognition",
      "https://huggingface.co/docs/inference-providers/guides/responses-api",
      "https://huggingface.co/inference/models",
      "https://huggingface.co/models?inference_provider=hf-inference",
      "https://huggingface.co/docs/hub/rate-limits",
      "https://huggingface.co/docs/hub/storage-regions",
      "https://huggingface.co/docs/hub/security",
      "https://huggingface.co/datasets/huggingface/policy-docs/resolve/dd3ba4522499d7bc7bdd10f0f8a527c97829ffda/2024_NIST%20RFI%20on%20EO.pdf?download=true"
    ],
    "integration": {
      "catalogType": "Routed multi-provider catalog plus narrower native hf-inference serverless catalog",
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
      "pricing": "Routed LLM pricing is dynamic and visible per provider/model route on https://huggingface.co/inference/models. Hugging Face says routed requests are pass-through priced with no markup. Native hf-inference pricing is compute-time based rather than published token/minute pricing; public STT minute pricing is unknown.",
      "limits": "Public docs provide request schemas and auth requirements, but I could not verify public hard limits for STT file size, STT duration, streaming chunk size, or session length. Hub-wide request rate limits are documented separately over 5-minute windows.",
      "region": "Hub storage regions are documented for Team/Enterprise repositories (US, EU; APAC coming soon), but I found no public routed-inference residency guarantee specific to Inference Providers. Treat routed API residency as unknown unless contractually clarified.",
      "sttLanguages": "Whisper large-v3 and large-v3-turbo are both tagged as 99-language models on Hugging Face model pages.",
      "ttsLanguages": "Unknown because public developer-facing TTS support is not documented for Inference Providers or hf-inference as of 2026-03-24.",
      "freeTier": "Monthly credits: Free users $0.10, PRO users $2.00, Team/Enterprise $2.00 per seat, subject to change.",
      "integrationNotes": "Use canonical Hub repo IDs as base model IDs. Provider suffixes like :groq or policy suffixes like :fastest/:cheapest/:preferred are routing selectors, not separate base models. For app catalogs, keep a curated stable picker and use live discovery for the long tail."
    },
    "sources": [
      {
        "url": "https://huggingface.co/docs/inference-providers/index",
        "title": "Inference Providers",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "tts",
          "integration"
        ]
      },
      {
        "url": "https://huggingface.co/docs/inference-providers/pricing",
        "title": "Pricing and Billing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "freeTier",
          "integration"
        ]
      },
      {
        "url": "https://huggingface.co/docs/inference-providers/providers/hf-inference",
        "title": "HF Inference",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "llm",
          "tts",
          "pricing"
        ]
      },
      {
        "url": "https://huggingface.co/docs/inference-providers/tasks/chat-completion",
        "title": "Chat Completion",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "realtime",
          "openaiCompatible",
          "models"
        ]
      },
      {
        "url": "https://huggingface.co/docs/inference-providers/tasks/automatic-speech-recognition",
        "title": "Automatic Speech Recognition",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "auth"
        ]
      },
      {
        "url": "https://huggingface.co/docs/inference-providers/guides/responses-api",
        "title": "Responses API (beta)",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "realtime",
          "openaiCompatible",
          "aliases",
          "integration"
        ]
      },
      {
        "url": "https://huggingface.co/inference/models",
        "title": "Inference Providers Supported Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://huggingface.co/models?inference_provider=hf-inference",
        "title": "Models available on HF Inference API",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt"
        ]
      },
      {
        "url": "https://huggingface.co/docs/hub/rate-limits",
        "title": "Hub Rate limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://huggingface.co/docs/hub/storage-regions",
        "title": "Storage Regions on the Hub",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://huggingface.co/docs/hub/security",
        "title": "Security",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://huggingface.co/datasets/huggingface/policy-docs/resolve/dd3ba4522499d7bc7bdd10f0f8a527c97829ffda/2024_NIST%20RFI%20on%20EO.pdf?download=true",
        "title": "Hugging Face Information for NIST (official PDF with company address)",
        "type": "official",
        "lastUpdated": "2024-02-02",
        "usedFor": [
          "hq"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

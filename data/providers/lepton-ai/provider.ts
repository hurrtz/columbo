import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "lepton-ai",
    "providerName": "Lepton AI",
    "categoryName": "AI infrastructure / endpoint hosting / GPU compute marketplace",
    "hq": "Unknown in current official product docs; current public product is branded under NVIDIA as DGX Cloud Lepton",
    "verifiedSupport": {
      "llm": "native",
      "stt": "partial",
      "tts": "partial"
    },
    "officialSources": [
      "https://www.nvidia.com/en-us/data-center/dgx-cloud-lepton/",
      "https://docs.nvidia.com/dgx-cloud/lepton/guides/",
      "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/create-llm/",
      "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/create-from-nim/",
      "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/configurations/",
      "https://docs.nvidia.com/dgx-cloud/lepton/reference/api/",
      "https://docs.nvidia.com/dgx-cloud/lepton/reference/limits/workload/",
      "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/deploy-gpt-oss/",
      "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/multi-llm-nim/",
      "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/dia-tts/"
    ],
    "integration": {
      "catalogType": "Deploy-your-own endpoints with dynamic model/image selection (Hugging Face, storage, built-in NIM images, or custom container images)",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": true,
      "openAiCompatible": true,
      "protocols": [
        "rest"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "No public self-serve token/minute/character pricing located for DGX Cloud Lepton inference as of 2026-03-24. Public pages emphasize marketplace compute access, trials/contacts, and deployment flows rather than publish API-unit pricing.",
      "limits": "Documented platform limits include endpoints defaulting to 1 replica, scale-to-zero after 1 hour of inactivity, no automatic scale-up from zero, readiness/liveness defaults, and workload PID limit 32,768 per replica. Model/file/audio-size limits are generally deployment-specific or undocumented.",
      "region": "Strong region/sovereignty positioning. NVIDIA markets DGX Cloud Lepton as allowing compute selection in specific regions and keeping data local for governance/sovereign AI needs.",
      "sttLanguages": "Unknown. No native DGX Cloud Lepton STT catalog or official ASR model docs found.",
      "ttsLanguages": "No native DGX Cloud Lepton TTS catalog found. A documented custom Dia TTS deployment exists; upstream Dia docs state English-only at present.",
      "freeTier": "No general free tier found. Marketplace credits are mentioned for some startup/partner programs, but not as a general public self-serve free tier.",
      "integrationNotes": "Treat Lepton as a deployment platform, not a fixed hosted-model API catalog. Prefer custom endpoint registration or live discovery. Do not assume stable provider-wide model IDs. Expect operational auth dependencies such as workspace tokens, endpoint tokens, NGC API key, registry auth, and sometimes Hugging Face token."
    },
    "sources": [
      {
        "url": "https://www.nvidia.com/en-us/data-center/dgx-cloud-lepton/",
        "title": "NVIDIA DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "overview",
          "regions",
          "catalog-shape"
        ]
      },
      {
        "url": "https://nvidianews.nvidia.com/news/nvidia-announces-dgx-cloud-lepton-to-connect-developers-to-nvidias-global-compute-ecosystem",
        "title": "NVIDIA Announces DGX Cloud Lepton to Connect Developers to NVIDIA\u2019s Global Compute Ecosystem",
        "type": "official",
        "lastUpdated": "2025-05-18",
        "usedFor": [
          "overview",
          "regions",
          "marketplace"
        ]
      },
      {
        "url": "https://nvidianews.nvidia.com/news/nvidia-dgx-cloud-lepton-connects-europes-developers-to-global-nvidia-compute-ecosystem",
        "title": "NVIDIA DGX Cloud Lepton Connects Europe's Developers to Global NVIDIA Compute Ecosystem",
        "type": "official",
        "lastUpdated": "2025-06-11",
        "usedFor": [
          "regions",
          "sovereignty",
          "credits"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/create-llm/",
        "title": "Create LLM Endpoints - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "models",
          "api",
          "auth"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/create-from-nim/",
        "title": "Create Endpoints from NVIDIA NIM - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "catalog",
          "auth"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/configurations/",
        "title": "Endpoint Configurations - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "auth",
          "autoscaling"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/reference/api/",
        "title": "Python SDK Reference - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "protocols",
          "sdk"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/reference/limits/workload/",
        "title": "Workload Limits - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/deploy-gpt-oss/",
        "title": "Deploy GPT-OSS-120B - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "llm",
          "auth",
          "limits"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/multi-llm-nim/",
        "title": "Multi-LLM NIM Deployment - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "llm",
          "limits",
          "auth"
        ]
      },
      {
        "url": "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/dia-tts/",
        "title": "Dia Text-to-Speech Example - DGX Cloud Lepton",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "speech",
          "custom-container"
        ]
      },
      {
        "url": "https://github.com/nari-labs/dia",
        "title": "nari-labs/dia",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "model-id"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

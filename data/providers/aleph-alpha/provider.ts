import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "aleph-alpha",
    "providerName": "Aleph Alpha",
    "categoryName": "Sovereign enterprise AI platform",
    "hq": "Heidelberg, Germany",
    "verifiedSupport": {
      "llm": "native",
      "stt": "partial",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://aleph-alpha.com/en/",
      "https://aleph-alpha.com/en/contact/",
      "https://aleph-alpha.com/en/privacy/",
      "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/model-variants.html",
      "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-inference/api/index.html",
      "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-os/api/index.html",
      "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-os/model-management/dmm.html",
      "https://docs.aleph-alpha.com/phariaai-install-config-guide/latest/installation/before-you-start/deployment-options.html",
      "https://docs.aleph-alpha.com/phariaai-user-guide/latest/pharia-assistant/transcribe.html",
      "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-inference/concepts/multimodality.html",
      "https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/pharia-ai/1.250600.0.html",
      "https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/pharia-ai/1.250900.0.html",
      "https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/pharia-ai/1.251200.0.html"
    ],
    "integration": {
      "catalogType": "Customer-managed PhariaAI stack with dynamic installed-model registry",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Unknown: I did not find a current official public/self-serve price card with per-token, per-minute, or per-character rates. Current official docs emphasize customer-managed deployments and managed-instance/contact-sales motions.",
      "limits": "Verified hard limits in current official docs: transcription files up to 200 MB; accepted transcription formats .mp3, .mp4, .m4a, .wav, .mpga, .mpeg, .webm; multimodal image inputs must be base64, <=4000x4000, and combined request size <=128 MiB. Real-time/streaming transcription is explicitly not supported. Public context-window, RPM, TPM, and session-length limits were not found.",
      "region": "Aleph Alpha markets European infrastructure and sovereign/EU-law positioning, while PhariaAI deployment options are on-premise, any Kubernetes cloud, or hybrid. The same Pharia-1 model offering is described as geographically uniform subject to sanctions/export controls.",
      "sttLanguages": "57 languages are listed in the current Transcription docs. The user-facing docs say the app uses Whisper; infrastructure docs configure WhisperX-based workers.",
      "ttsLanguages": "Unsupported: current official multimodality docs explicitly say generating audio as output is not supported.",
      "freeTier": "Unknown. I did not find a current official free-tier or trial-credit page in the official site/docs set audited here.",
      "integrationNotes": "Do not hardcode Aleph Alpha as a fixed model catalog. Use live discovery: client-visible models via /model-settings, and prefer the OpenAI-compatible /v2/models surface over deprecated /v1/models where available. Treat chat and embeddings as OpenAI-compatible surfaces, but legacy Luminous endpoints remain non-OpenAI-style. Filter out embeddings, translation, safety, and non-chat worker types in a voice-first picker."
    },
    "sources": [
      {
        "url": "https://aleph-alpha.com/en/",
        "title": "Aleph Alpha",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://aleph-alpha.com/en/contact/",
        "title": "Contact | Aleph Alpha",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://aleph-alpha.com/en/privacy/",
        "title": "Privacy Notice | ALEPH ALPHA",
        "type": "official",
        "lastUpdated": "2024-09-04",
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-inference/api/index.html",
        "title": "The PhariaInference API :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-os/api/index.html",
        "title": "The PhariaOS API :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-os/model-management/dmm.html",
        "title": "Dynamic model management :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-install-config-guide/latest/installation/before-you-start/deployment-options.html",
        "title": "Deployment options :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/model-variants.html",
        "title": "Model variants :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-user-guide/latest/pharia-assistant/transcribe.html",
        "title": "Transcription (beta) :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-inference/concepts/multimodality.html",
        "title": "Multimodality :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/pharia-ai/1.250600.0.html",
        "title": "PhariaAI v1.250600.0 :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": "2025-06-04",
        "usedFor": [
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/pharia-ai/1.250900.0.html",
        "title": "PhariaAI v1.250900.0 :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": "2025-09-10",
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/pharia-ai/1.251200.0.html",
        "title": "PhariaAI v1.251200.0 :: Aleph Alpha Documentation",
        "type": "official",
        "lastUpdated": "2025-12-08",
        "usedFor": [
          "models"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

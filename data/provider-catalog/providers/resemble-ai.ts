import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "resemble-ai",
  "providerName": "Resemble AI",
  "categoryName": "Speech-Focused Providers",
  "hq": "CA",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://app.resemble.ai/docs",
    "https://www.resemble.ai/pricing",
    "https://www.resemble.ai/"
  ],
  "integration": {
    "catalogType": "Speech-first platform",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": null,
      "tts": "Chatterbox [tts-v4]\nChatterbox Turbo [tts-v4-turbo]\nChatterbox Multilingual [tts-v4] — Multilingual variant",
      "stt": "Resemble STT [stt]\nSpeech-to-Speech / Voice Changer [speech-to-speech] — Adjacency feature"
    },
    "pricing": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
    "limits": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed.",
    "region": "Cloud plus enterprise/on-prem options.",
    "sttLanguages": "Public STT exists; verify exact language matrix live.",
    "ttsLanguages": "23 languages for multilingual Chatterbox.",
    "freeTier": "Yes: start-free style onboarding.",
    "integrationNotes": "Your sheet is outdated: Resemble is not just TTS anymore; it also has STT and speech-to-speech tooling."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "resemble-ai",
    "providerName": "Resemble AI",
    "service": "stt",
    "modelId": "stt",
    "publicName": "Resemble STT",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
    "limitsSummary": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed.",
    "regionSummary": "Cloud plus enterprise/on-prem options.",
    "languagesSummary": "Public STT exists; verify exact language matrix live.",
    "notes": "Your sheet is outdated: Resemble is not just TTS anymore; it also has STT and speech-to-speech tooling.",
    "officialSources": [
      "https://app.resemble.ai/docs",
      "https://www.resemble.ai/pricing",
      "https://www.resemble.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "~",
        "value": 500000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
      },
      {
        "metric": "session_duration_seconds",
        "comparator": "~",
        "value": 1200.0,
        "unit": "seconds",
        "scope": "session",
        "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
      }
    ],
    "languageSupport": {
      "rawText": "Public STT exists; verify exact language matrix live.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "resemble-ai",
    "providerName": "Resemble AI",
    "service": "stt",
    "modelId": "speech-to-speech",
    "publicName": "Speech-to-Speech / Voice Changer",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
    "limitsSummary": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed.",
    "regionSummary": "Cloud plus enterprise/on-prem options.",
    "languagesSummary": "Public STT exists; verify exact language matrix live.",
    "notes": "Adjacency feature",
    "officialSources": [
      "https://app.resemble.ai/docs",
      "https://www.resemble.ai/pricing",
      "https://www.resemble.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "~",
        "value": 500000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
      },
      {
        "metric": "session_duration_seconds",
        "comparator": "~",
        "value": 1200.0,
        "unit": "seconds",
        "scope": "session",
        "sourceText": "STT files up to ~500 MB and ~20 min. WebSocket streaming on Business+; ~20 simultaneous sessions and ~20 parallel connections/API key in docs reviewed."
      }
    ],
    "languageSupport": {
      "rawText": "Public STT exists; verify exact language matrix live.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "resemble-ai",
    "providerName": "Resemble AI",
    "service": "tts",
    "modelId": "tts-v4",
    "publicName": "Chatterbox",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
    "limitsSummary": null,
    "regionSummary": "Cloud plus enterprise/on-prem options.",
    "languagesSummary": "23 languages for multilingual Chatterbox.",
    "notes": "Your sheet is outdated: Resemble is not just TTS anymore; it also has STT and speech-to-speech tooling.",
    "officialSources": [
      "https://app.resemble.ai/docs",
      "https://www.resemble.ai/pricing",
      "https://www.resemble.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "23 languages for multilingual Chatterbox.",
      "isMultilingual": true,
      "languageCount": 23,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "resemble-ai",
    "providerName": "Resemble AI",
    "service": "tts",
    "modelId": "tts-v4-turbo",
    "publicName": "Chatterbox Turbo",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: TTS ~$0.0005/sec, voice agents ~$0.001/sec, voice changer ~$0.0005/sec. Start-free/onboarding access exists.",
    "limitsSummary": null,
    "regionSummary": "Cloud plus enterprise/on-prem options.",
    "languagesSummary": "23 languages for multilingual Chatterbox.",
    "notes": "Your sheet is outdated: Resemble is not just TTS anymore; it also has STT and speech-to-speech tooling.",
    "officialSources": [
      "https://app.resemble.ai/docs",
      "https://www.resemble.ai/pricing",
      "https://www.resemble.ai/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "23 languages for multilingual Chatterbox.",
      "isMultilingual": true,
      "languageCount": 23,
      "voiceCount": null,
      "listedLanguages": [],
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

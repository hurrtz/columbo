import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "stepfun",
  "providerName": "StepFun",
  "categoryName": "Chinese Providers",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://platform.stepfun.com/",
    "https://platform.stepfun.com/docs",
    "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
  ],
  "integration": {
    "catalogType": "Fixed first-party multimodal/audio catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Step 3.5 Flash [step-3.5-flash]\nStep R1 V Mini [step-r1-v-mini]\nStep 3 [step-3]\nStep 2 Mini [step-2-mini]",
      "tts": "Step TTS 2 [step-tts-2]\nStep TTS Mini [step-tts-mini]\nStep TTS Vivid [step-tts-vivid]\nStep Audio TTS 3B [step-audio-tts-3b] — Open-weight family reference",
      "stt": "Step 1o Audio [step-1o-audio]\nStep Audio 2 [step-audio-2]\nStep Audio R1.1 [step-audio-r1.1]"
    },
    "pricing": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limits": "Public English-facing documentation is thinner than for western providers. Expect CN-centric onboarding.",
    "region": "Likely China-centric; precise regional data center detail not prominently published.",
    "sttLanguages": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
    "ttsLanguages": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
    "freeTier": "Paid plans plus promotional offers; not a simple always-on free tier.",
    "integrationNotes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "llm",
    "modelId": "step-2-mini",
    "publicName": "Step 2 Mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "llm",
    "modelId": "step-3",
    "publicName": "Step 3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "llm",
    "modelId": "step-3.5-flash",
    "publicName": "Step 3.5 Flash",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "llm",
    "modelId": "step-r1-v-mini",
    "publicName": "Step R1 V Mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "stt",
    "modelId": "step-1o-audio",
    "publicName": "Step 1o Audio",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": "Public English-facing documentation is thinner than for western providers. Expect CN-centric onboarding.",
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "stt",
    "modelId": "step-audio-2",
    "publicName": "Step Audio 2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": "Public English-facing documentation is thinner than for western providers. Expect CN-centric onboarding.",
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "stt",
    "modelId": "step-audio-r1.1",
    "publicName": "Step Audio R1.1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": "Public English-facing documentation is thinner than for western providers. Expect CN-centric onboarding.",
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
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
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "tts",
    "modelId": "step-audio-tts-3b",
    "publicName": "Step Audio TTS 3B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
    "notes": "Open-weight family reference",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Multilingual/emotional TTS per model literature",
        "but official API language matrix is not as clearly centralized"
      ],
      "notes": []
    }
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "tts",
    "modelId": "step-tts-2",
    "publicName": "Step TTS 2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Multilingual/emotional TTS per model literature",
        "but official API language matrix is not as clearly centralized"
      ],
      "notes": []
    }
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "tts",
    "modelId": "step-tts-mini",
    "publicName": "Step TTS Mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Multilingual/emotional TTS per model literature",
        "but official API language matrix is not as clearly centralized"
      ],
      "notes": []
    }
  },
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "service": "tts",
    "modelId": "step-tts-vivid",
    "publicName": "Step TTS Vivid",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
    "limitsSummary": null,
    "regionSummary": "Likely China-centric; precise regional data center detail not prominently published.",
    "languagesSummary": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
    "notes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines.",
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Multilingual/emotional TTS per model literature",
        "but official API language matrix is not as clearly centralized"
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

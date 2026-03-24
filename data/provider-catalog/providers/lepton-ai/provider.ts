import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "lepton-ai",
    "providerName": "Lepton AI",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "routed",
      "tts": "routed"
    },
    "officialSources": [
      "https://www.nvidia.com/en-us/data-center/dgx-cloud-lepton/",
      "https://developer.nvidia.com/blog/introducing-nvidia-dgx-cloud-lepton-a-unified-ai-platform-built-for-developers/",
      "https://docs.lepton.ai/"
    ],
    "integration": {
      "catalogType": "Infrastructure / deploy-your-own platform",
      "coverage": "Low-confidence / infra-first",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": true,
      "openAiCompatible": null,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Deploy your own models/endpoints [custom] — Now positioned as NVIDIA DGX Cloud Lepton",
        "tts": null,
        "stt": null
      },
      "pricing": "Infrastructure-style pricing, not a simple fixed model catalog. Current public positioning is more compute/platform than turnkey model brokerage.",
      "limits": "No stable public hosted model catalog similar to Together/Replicate was clearly visible from current official material.",
      "region": "Runs where your data lives / multi-cloud GPU network. Region is customer-selected subject to provider availability.",
      "sttLanguages": "Not clearly published",
      "ttsLanguages": "Not clearly published",
      "freeTier": "No simple permanent free tier found.",
      "integrationNotes": "This is better treated as infrastructure than as a drop-in 'provider + model list' option in a speech app chooser."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

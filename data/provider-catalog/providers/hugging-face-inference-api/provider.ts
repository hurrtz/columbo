import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "hugging-face-inference-api",
    "providerName": "Hugging Face (Inference API)",
    "categoryName": "Inference Platforms",
    "hq": "US/FR",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://huggingface.co/inference-api",
      "https://huggingface.co/tasks/text-to-speech",
      "https://huggingface.co/tasks/automatic-speech-recognition"
    ],
    "integration": {
      "catalogType": "Dynamic broker/platform",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Inference Providers LLM catalog [dynamic]",
        "tts": "Text-to-Speech task catalog [dynamic]",
        "stt": "Automatic Speech Recognition task catalog [dynamic]"
      },
      "pricing": "Varies by provider, dedicated endpoint, or routed inference plan.",
      "limits": "Hundreds of models and multiple backend providers. Capabilities, quotas, and SLAs are not uniform.",
      "region": "Depends on selected provider/endpoint/region; not a single fixed data center answer.",
      "sttLanguages": "Depends on chosen task model.",
      "ttsLanguages": "Depends on chosen task model.",
      "freeTier": "Yes for some Hub/inference usage; paid plans required for stronger production SLAs.",
      "integrationNotes": "Do not treat Hugging Face as a fixed catalog. Query Hub/provider task metadata live and keep provider/backend separate from model repo ID."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "perplexity",
    "providerName": "Perplexity",
    "categoryName": "Major Western Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.perplexity.ai/getting-started/models",
      "https://docs.perplexity.ai/guides/pricing",
      "https://docs.perplexity.ai/"
    ],
    "integration": {
      "catalogType": "Fixed first-party search-LLM catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Sonar [sonar]\nSonar Pro [sonar-pro]\nSonar Reasoning Pro [sonar-reasoning-pro]\nSonar Deep Research [sonar-deep-research]",
        "tts": null,
        "stt": null
      },
      "pricing": "Examples: Sonar $1/M input and $1/M output plus search-request fees; Sonar Pro $3/$15; Reasoning Pro $2/$8; Deep Research adds citation/search fees.",
      "limits": "Context window ranges by model (~128K to 200K). Model lineup changes quickly (e.g., some reasoning variants retired in late 2025).",
      "region": "Perplexity-managed cloud; region specifics not prominently documented.",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "No public permanent API free tier documented.",
      "integrationNotes": "Good retrieval/search LLM option, but no native TTS/STT. Budget for search query fees separately from tokens."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

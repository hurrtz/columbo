import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "anthropic",
    "providerName": "Anthropic",
    "categoryName": "Major Western Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.anthropic.com/en/docs/about-claude/models/all-models",
      "https://www.anthropic.com/pricing#api",
      "https://docs.anthropic.com/"
    ],
    "integration": {
      "catalogType": "Fixed first-party LLM catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": false,
      "protocols": [
        "sse"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "activeModels": {
        "llm": "Claude Opus 4.6 [claude-opus-4-6] — Alias; dated release IDs may also appear in Models API\nClaude Sonnet 4.6 [claude-sonnet-4-6] — Alias; dated release IDs may also appear in Models API\nClaude Haiku 4.5 [claude-haiku-4-5] — Alias; dated release IDs may also appear in Models API",
        "tts": null,
        "stt": null
      },
      "pricing": "Examples: Sonnet 4.6 $3/M input, $15/M output; see pricing page for prompt caching and batch rates.",
      "limits": "No native public TTS/STT API documented. Use Messages/Responses APIs only for LLM tasks. Speech features in consumer Claude app are not exposed as native API products.",
      "region": "Direct API is Anthropic-hosted; regional/sovereign options usually come via cloud partners (Bedrock, Vertex, Azure).",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "No permanent free API tier. Trial/promotional access may vary.",
      "integrationNotes": "Treat Anthropic as LLM-only in a provider chooser unless you proxy speech through other providers yourself."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);

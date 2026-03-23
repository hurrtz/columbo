import { createProviderContext, defineProviderDefinition } from "../../definitions";

export const providerDefinition = defineProviderDefinition(
{
  "providerId": "amazon-aws",
  "providerName": "Amazon AWS",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "https://aws.amazon.com/polly/pricing/",
    "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"
  ],
  "integration": {
    "catalogType": "Multi-service platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "pricing": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limits": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits.",
    "region": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "sttLanguages": "Transcribe supports 100+ languages/variants depending on mode.",
    "ttsLanguages": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "freeTier": "Yes: 12-month Polly free tier; other services may include free usage depending on account/program.",
    "integrationNotes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding."
  }
},
);

export const providerContext = createProviderContext(providerDefinition);

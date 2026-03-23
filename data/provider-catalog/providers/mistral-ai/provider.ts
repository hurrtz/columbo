import { createProviderContext, defineProviderDefinition } from "../../definitions";

export const providerDefinition = defineProviderDefinition(
{
  "providerId": "mistral-ai",
  "providerName": "Mistral AI",
  "categoryName": "Major Western Providers",
  "hq": "FR",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.mistral.ai/getting-started/models/models_overview/",
    "https://mistral.ai/pricing",
    "https://docs.mistral.ai/capabilities/audio/"
  ],
  "integration": {
    "catalogType": "Fixed first-party catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [
      "sse"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "pricing": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limits": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "region": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "sttLanguages": "13 languages for Voxtral family.",
    "ttsLanguages": null,
    "freeTier": "Yes: small free/test quotas have been offered in Le Platform; check account plan.",
    "integrationNotes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS."
  }
},
);

export const providerContext = createProviderContext(providerDefinition);

import { defineProvider } from "../../definitions";
import type { CatalogProvider } from "../../../../src/catalog/types";

export const provider = defineProvider(
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
    "activeModels": {
      "llm": "Mistral Small 4 [mistral-small-2603]\nMistral Large 3 [mistral-large-2512]\nMistral Medium 3.1 [mistral-medium-2508]\nMistral Small 3.2 [mistral-small-3.2]\nMinistral 3 14B [ministral-3-14b]\nMinistral 3 8B [ministral-3-8b]\nMinistral 3 3B [ministral-3-3b]\nMagistral Medium 1.2 [magistral-medium-1.2]\nMagistral Small 1.2 [magistral-small-1.2]\nCodestral [codestral]\nDevstral 2 [devstral-2]\nOCR 3 [ocr-3]",
      "tts": null,
      "stt": "Voxtral Mini Transcribe [voxtral-mini-2507]\nVoxtral Mini Transcribe 2 [voxtral-mini-transcribe-2]\nVoxtral Mini Transcribe Realtime [voxtral-mini-transcribe-realtime-2602]\nVoxtral Mini [voxtral-mini] — Audio understanding\nVoxtral Small [voxtral-small] — Audio understanding"
    },
    "pricing": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limits": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "region": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "sttLanguages": "13 languages for Voxtral family.",
    "ttsLanguages": null,
    "freeTier": "Yes: small free/test quotas have been offered in Le Platform; check account plan.",
    "integrationNotes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS."
  }
} satisfies CatalogProvider,
);

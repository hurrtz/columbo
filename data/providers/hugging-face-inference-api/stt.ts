import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face Inference API",
      "service": "stt",
      "modelId": "openai/whisper-large-v3",
      "publicName": "Whisper large-v3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "No public per-minute STT price verified. Native hf-inference pricing is documented generically as compute-time \u00d7 hardware price.",
      "limitsSummary": "No public API hard limit for file size or duration verified. The model card says the Transformers pipeline can transcribe audios of arbitrary length.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Tagged as a 99-language model on the Hugging Face model page.",
      "notes": "Stable, public, native hf-inference STT entry. Model card also states improved performance over large-v2 and support for speech translation.",
      "officialSources": [
        "https://huggingface.co/openai/whisper-large-v3",
        "https://huggingface.co/models?inference_provider=hf-inference",
        "https://huggingface.co/docs/inference-providers/providers/hf-inference",
        "https://huggingface.co/docs/inference-providers/tasks/automatic-speech-recognition",
        "https://huggingface.co/docs/inference-providers/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "99 languages",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "speech-to-text",
          "speech translation to English is part of Whisper capabilities",
          "exact per-language list not extracted from sources used"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face Inference API",
      "service": "stt",
      "modelId": "openai/whisper-large-v3-turbo",
      "publicName": "Whisper large-v3-turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "No public per-minute STT price verified. Native hf-inference pricing is documented generically as compute-time \u00d7 hardware price.",
      "limitsSummary": "No public API hard limit for file size or duration verified.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Tagged as a 99-language model on the Hugging Face model page.",
      "notes": "Stable, public, native hf-inference STT entry. Model card says this is a pruned/finetuned large-v3 variant that is much faster with minor quality degradation.",
      "officialSources": [
        "https://huggingface.co/openai/whisper-large-v3-turbo",
        "https://huggingface.co/models?inference_provider=hf-inference",
        "https://huggingface.co/docs/inference-providers/providers/hf-inference",
        "https://huggingface.co/docs/inference-providers/tasks/automatic-speech-recognition",
        "https://huggingface.co/docs/inference-providers/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "99 languages",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "speech-to-text",
          "optimized for speed over full large-v3 quality"
        ]
      }
    }
  ),
]);

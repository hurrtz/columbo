import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "lepton-ai",
      "providerName": "Lepton AI",
      "service": "tts",
      "modelId": "nari-labs/Dia-1.6B-0626",
      "publicName": "Dia 1.6B (upstream TTS model used in Lepton deployment example)",
      "aliases": [
        "Dia",
        "dia-app"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public TTS per-character pricing found on Lepton.",
      "limitsSummary": "Lepton documents deployment of a custom Gradio app/container for Dia on a single GPU; upstream Dia docs say best cloning prompt duration is 5-10 seconds and generation is English-only.",
      "regionSummary": "Runs wherever the user deploys the custom container.",
      "languagesSummary": "English-only according to the upstream official Dia repository.",
      "notes": "Lepton does not document this as a native managed TTS API. The Lepton documentation is a custom-container deployment example. The exact model checkpoint ID comes from the upstream official Dia repository, not from Lepton\u2019s docs.",
      "officialSources": [
        "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/dia-tts/",
        "https://github.com/nari-labs/dia"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "~",
          "value": 10,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Duration of the to-be cloned audio should be 5~10 seconds for the best results."
        }
      ],
      "languageSupport": {
        "rawText": "The model only supports English generation at the moment.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "English"
        ],
        "notes": [
          "english-only",
          "voice consistency requires audio prompt or fixed seed",
          "not a Lepton-native API model"
        ]
      }
    }
  ),
]);

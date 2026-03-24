import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "lepton-ai",
      "providerName": "Lepton AI",
      "service": "llm",
      "modelId": "nim/openai/gpt-oss-120b:latest",
      "publicName": "GPT-OSS-120B NIM image on DGX Cloud Lepton",
      "aliases": [
        "gpt-oss-120b"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public token pricing found. This is a deployable NIM image on Lepton, not a publicly priced shared hosted-model endpoint.",
      "limitsSummary": "Requires at least one GPU with 80 GB GPU memory; docs recommend custom healthcheck initial delay 99999 seconds or higher due to long model download times.",
      "regionSummary": "Runs wherever the user deploys it within DGX Cloud Lepton-supported node groups/providers/regions.",
      "languagesSummary": "Unknown from Lepton docs.",
      "notes": "This is the clearest exact deployable built-in model image documented by Lepton. However, it is an endpoint deployment image, not a global shared provider model ID for a stable end-user picker. The :latest tag is mutable and should be treated as an alias-like moving target, not a pinned canonical version.",
      "officialSources": [
        "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/deploy-gpt-oss/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": ">=",
          "value": 80,
          "unit": "other",
          "scope": "model",
          "sourceText": "GPT-OSS-120B requires at least one GPU with a minimum of 80 GB of GPU memory."
        },
        {
          "metric": "other",
          "comparator": ">=",
          "value": 99999,
          "unit": "seconds",
          "scope": "model",
          "sourceText": "set Healthcheck Initial Delay Seconds to Custom with a value of 99999 seconds or higher as necessary"
        }
      ],
      "languageSupport": {
        "rawText": "Unknown from Lepton docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "lepton-ai",
      "providerName": "Lepton AI",
      "service": "llm",
      "modelId": "meta-llama/Llama-3.1-8B-Instruct",
      "publicName": "Meta Llama 3.1 8B Instruct (deployment example via Hugging Face)",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public token pricing found on Lepton; cost depends on deployed compute and provider arrangement.",
      "limitsSummary": "Docs present this as an example Hugging Face model selectable in vLLM/SGLang or Multi-LLM NIM flows. Rule of thumb given for BF16 deployment is about 2 GB GPU memory per 1B parameters.",
      "regionSummary": "Runs wherever the user deploys it.",
      "languagesSummary": "Not specified by Lepton docs.",
      "notes": "This is explicitly documented only as an example upstream Hugging Face model ID. It is not evidence of a fixed Lepton-curated provider catalog entry and should not be treated as a stable provider-native picker item.",
      "officialSources": [
        "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/create-llm/",
        "https://docs.nvidia.com/dgx-cloud/lepton/examples/endpoint/multi-llm-nim/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "~",
          "value": 2,
          "unit": "other",
          "scope": "model",
          "sourceText": "a general rule of thumb is to have at least 2 GB of GPU memory for every billion parameters for a model in BF16 precision"
        }
      ],
      "languageSupport": {
        "rawText": "Not specified by Lepton docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown",
          "example-only"
        ]
      }
    }
  ),
]);

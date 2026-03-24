import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "llm",
      "modelId": "nvidia-nemotron-nano-9b-v2",
      "publicName": "NVIDIA Nemotron Nano 9B v2",
      "aliases": [
        "NVIDIA-Nemotron-Nano-9B-v2",
        "nvidia/NVIDIA-Nemotron-Nano-9B-v2"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-token pricing found. Covered by free prototyping access / GPU-based NVIDIA AI Enterprise production licensing.",
      "limitsSummary": "Context up to 128K. Text-in/text-out only.",
      "regionSummary": "Global.",
      "languagesSummary": "English + supported multilingual use; official text names German, Spanish, French, Italian, Korean, Portuguese, Russian, Japanese, Chinese, English.",
      "notes": "Good small general-purpose picker entry. Supports runtime thinking-budget control. Build slug and model-family/Hugging Face names differ; app should store aliases separately.",
      "officialSources": [
        "https://build.nvidia.com/nvidia/nvidia-nemotron-nano-9b-v2/modelcard"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context length up to 128K."
        }
      ],
      "languageSupport": {
        "rawText": "Other non-English languages (German, French, Italian, Spanish and Japanese) are also supported. Input properties also name German, Spanish, French, Italian, Korean, Portuguese, Russian, Japanese, Chinese and English.",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "German",
          "Spanish",
          "French",
          "Italian",
          "Korean",
          "Portuguese",
          "Russian",
          "Japanese",
          "Chinese"
        ],
        "notes": [
          "english-first chat model",
          "multilingual support text differs slightly across sections"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "llm",
      "modelId": "nemotron-3-nano-30b-a3b",
      "publicName": "NVIDIA Nemotron 3 Nano 30B A3B",
      "aliases": [
        "NVIDIA-Nemotron-3-Nano-30B-A3B",
        "NVIDIA-Nemotron-3-Nano-30B-A3B-BF16",
        "nvidia/nemotron-3-nano-30b-a3b"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-token pricing found.",
      "limitsSummary": "Build docs describe it as a general reasoning/chat model. Example self-host config shows max-model-len 262144, but that is an example serving setting, not an official hosted limit; keep official hard-limit as unknown.",
      "regionSummary": "Global.",
      "languagesSummary": "English plus supported non-English languages including Spanish, French, German, Japanese, Italian.",
      "notes": "Strong mid-tier reasoning/tool-use candidate. Good stable picker entry where latency/cost should sit between Nano 9B v2 and Super 120B.",
      "officialSources": [
        "https://build.nvidia.com/nvidia/nemotron-3-nano-30b-a3b/modelcard",
        "https://docs.api.nvidia.com/nim/reference/nvidia-nemotron-3-nano-30b-a3b"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Use-case section names English plus Spanish, French, German, Japanese, Italian; training section says English plus 19 other languages and 43 programming languages.",
        "isMultilingual": true,
        "languageCount": 6,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Spanish",
          "French",
          "German",
          "Japanese",
          "Italian"
        ],
        "notes": [
          "official supported-use list is narrower than training-language list"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "llm",
      "modelId": "nemotron-3-super-120b-a12b",
      "publicName": "NVIDIA Nemotron 3 Super 120B A12B",
      "aliases": [
        "NVIDIA-Nemotron-3-Super-120B-A12B",
        "NVIDIA-Nemotron-3-Super-120B-A12B-BF16",
        "nvidia/nemotron-3-super-120b-a12b"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-token pricing found.",
      "limitsSummary": "Official docs say context length up to 1M tokens; docs also note default Hugging Face config is 256K due to VRAM requirements.",
      "regionSummary": "Global.",
      "languagesSummary": "English, French, German, Italian, Japanese, Spanish, Chinese.",
      "notes": "Best NVIDIA-owned flagship picker entry for long-context and agentic use. Official docs show reasoning on/off control and OpenAI-compatible use patterns.",
      "officialSources": [
        "https://docs.api.nvidia.com/nim/reference/nvidia-nemotron-3-super-120b-a12b",
        "https://build.nvidia.com/nvidia/nemotron-3-super-120b-a12b/modelcard"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 1000000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length Up to 1M tokens."
        }
      ],
      "languageSupport": {
        "rawText": "Supported Languages English, French, German, Italian, Japanese, Spanish, Chinese.",
        "isMultilingual": true,
        "languageCount": 7,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "French",
          "German",
          "Italian",
          "Japanese",
          "Spanish",
          "Chinese"
        ],
        "notes": [
          "long-context flagship",
          "agentic and tool-use oriented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "llm",
      "modelId": "llama-3.3-nemotron-super-49b-v1",
      "publicName": "Llama 3.3 Nemotron Super 49B v1",
      "aliases": [
        "Llama-3.3-Nemotron-Super-49B-v1",
        "nvidia/llama-3.3-nemotron-super-49b-v1"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-token pricing found.",
      "limitsSummary": "Context up to 128K / 131,072 tokens.",
      "regionSummary": "Unknown on build page summary; commercial-ready and downloadable.",
      "languagesSummary": "English, German, French, Italian, Portuguese, Hindi, Spanish, Thai.",
      "notes": "Usable stable picker entry, but older than the Nemotron 3 family. Reasonable optional fourth LLM entry if you want more choice.",
      "officialSources": [
        "https://build.nvidia.com/nvidia/llama-3_3-nemotron-super-49b-v1/modelcard"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context length up to 131,072 tokens."
        }
      ],
      "languageSupport": {
        "rawText": "Other non-English languages (German, French, Italian, Portuguese, Hindi, Spanish, and Thai) are also supported.",
        "isMultilingual": true,
        "languageCount": 8,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "German",
          "French",
          "Italian",
          "Portuguese",
          "Hindi",
          "Spanish",
          "Thai"
        ],
        "notes": [
          "older than Nemotron 3 family",
          "tool-calling capable"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "nvidia-nim",
      "providerName": "NVIDIA (NIM)",
      "service": "llm",
      "modelId": "llama-3.1-nemotron-70b-instruct",
      "publicName": "Llama 3.1 Nemotron 70B Instruct",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No public per-token pricing found.",
      "limitsSummary": "Deprecated model page only.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown from current deprecated page snippet.",
      "notes": "Do not expose in picker. Build page explicitly says this NIM has been deprecated.",
      "officialSources": [
        "https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
]);

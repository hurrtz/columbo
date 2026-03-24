import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "doubao-seed-2-0-pro-260215",
      "publicName": "Doubao Seed 2.0 Pro",
      "aliases": [
        "doubao-seed-2.0-pro",
        "doubao-seed-2-0-pro"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official Ark pricing page exists, but the accessible rendered text in this audit only partially exposes tier rows; do not hard-code without live verification from the pricing page.",
      "limitsSummary": "Model-specific token limits are documented on Ark model pages/model list, but the full table is JS-rendered in the fetched text. Supports text generation, multimodal understanding, and deep thinking.",
      "regionSummary": "Public examples use ark.cn-beijing.volces.com.",
      "languagesSummary": "Multilingual capability likely, but no official language-count table found in the inspected Ark text.",
      "notes": "Safe stable picker candidate. Best default premium picker entry.",
      "officialSources": [
        "https://www.volcengine.com/docs/82379/1330310",
        "https://www.volcengine.com/docs/82379/1099455",
        "https://www.volcengine.com/docs/82379/1494384"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No official per-model language list verified in the inspected Ark docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference: multimodal general model",
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "doubao-seed-2-0-lite-260215",
      "publicName": "Doubao Seed 2.0 Lite",
      "aliases": [
        "doubao-seed-2.0-lite",
        "doubao-seed-2-0-lite"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official Ark pricing page exists; exact tier table should be live-verified. This is the model used in current Ark quickstart examples.",
      "limitsSummary": "Model-specific token limits are documented but not fully extractable from the accessible rendered text in this audit.",
      "regionSummary": "Public examples use ark.cn-beijing.volces.com.",
      "languagesSummary": "No official per-model language list verified in inspected Ark docs.",
      "notes": "Best default mainstream mobile picker entry. Used in official quickstart snippets.",
      "officialSources": [
        "https://www.volcengine.com/docs/82379/1330310",
        "https://www.volcengine.com/docs/82379/1099455",
        "https://www.volcengine.com/docs/82379/1399008"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No official per-model language list verified in the inspected Ark docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference: multimodal general model",
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "doubao-seed-2-0-mini-260215",
      "publicName": "Doubao Seed 2.0 Mini",
      "aliases": [
        "doubao-seed-2.0-mini",
        "doubao-seed-2-0-mini"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official pricing page snippet shows a lower-cost 2.0 Mini bucket, but the full tiered table is not fully accessible in extracted text. Treat exact prices as live-verified only.",
      "limitsSummary": "Model-specific token limits are documented but not fully extractable here.",
      "regionSummary": "Public examples use ark.cn-beijing.volces.com.",
      "languagesSummary": "No official per-model language list verified in inspected Ark docs.",
      "notes": "Safe stable picker candidate as low-cost option.",
      "officialSources": [
        "https://www.volcengine.com/docs/82379/1330310",
        "https://www.volcengine.com/docs/82379/1544106"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No official per-model language list verified in the inspected Ark docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference: multimodal general model",
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "doubao-seed-2-0-code-preview-260215",
      "publicName": "Doubao Seed 2.0 Code Preview",
      "aliases": [
        "doubao-seed-2.0-code",
        "doubao-seed-2-0-code-preview",
        "doubao-seed-2.0-code-preview"
      ],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official pricing page snippet suggests pricing exists, but preview status makes it unsuitable for a default consumer picker.",
      "limitsSummary": "Model-specific limits documented but not fully extractable here.",
      "regionSummary": "Public examples use ark.cn-beijing.volces.com.",
      "languagesSummary": "No official per-model language list verified in inspected Ark docs.",
      "notes": "Do not expose in a stable general-user picker unless app has explicit coding/developer mode.",
      "officialSources": [
        "https://www.volcengine.com/docs/82379/1330310",
        "https://www.volcengine.com/docs/82379/1544106"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No official per-model language list verified in the inspected Ark docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "code-specialized",
          "preview"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "llm",
      "modelId": "doubao-seed-1-8-251228",
      "publicName": "Doubao Seed 1.8",
      "aliases": [
        "doubao-seed-1.8"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Model page snippet exposes public pricing starting at input >= 0.8 and output >= 2.0, but the unit is not fully extractable in the rendered snippet captured here; treat exact token price as not fully verified.",
      "limitsSummary": "Model page documents token limits, but the full numeric table was not extractable in accessible rendered text in this audit.",
      "regionSummary": "Public examples use ark.cn-beijing.volces.com.",
      "languagesSummary": "Official page describes upgraded multimodal understanding; no structured language-count table verified.",
      "notes": "Reasonable legacy fallback; not the default if 2.0 is available.",
      "officialSources": [
        "https://www.volcengine.com/docs/82379/2123228",
        "https://www.volcengine.com/docs/82379/1330310"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No official per-model language list verified in the inspected Ark docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal",
          "legacy-current"
        ]
      }
    }
  ),
]);

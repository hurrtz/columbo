import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-lightning",
      "publicName": "Yi-Lightning",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Officially verified public price: RMB 0.99 per 1M tokens. No official public input/output split found.",
      "limitsSummary": "Official source says Yi-Lightning is optimized for fast inference; no official public context window, RPM, TPM, or session limit page was verified.",
      "regionSummary": "Served via 01.AI API platform; platform privacy policy is mainland-China centered.",
      "languagesSummary": "Chinese/English capability is strongly implied by the Yi family; an API-specific language matrix was not found.",
      "notes": "Best-supported first-party picker candidate. Official launch post confirms API availability and price. Treat as stable.",
      "officialSources": [
        "https://www.lingyiwanwu.com/blog/yi-lightning-gpt-4o-2024-05-13",
        "https://www.lingyiwanwu.com/blog/2024-ai-first",
        "https://platform.lingyiwanwu.com/docs",
        "https://platform.lingyiwanwu.com/privacypolicy"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.14366187,
          "unit": "million_input_tokens",
          "sourceText": "Official page says RMB 0.99 per 1M tokens; no input/output split published, so this USD conversion is an approximation using the 2026-03-24 CNY/USD rate."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "API-specific language matrix not found. Yi family is publicly described as at least Chinese/English capable; broader multilingual behavior is not cleanly documented for this API model.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "inference-from-Yi-family",
          "api-language-matrix-missing"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-lightning-lite",
      "publicName": "Yi-Lightning-Lite",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Unknown.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Model existence/API availability comes from an official X post snippet, not from indexed reference docs. Do not place in a stable picker without runtime confirmation.",
      "officialSources": [
        "https://x.com/01AI_Yi/status/1845776529185476613"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No verified public language matrix found.",
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
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-large",
      "publicName": "Yi-Large",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from official public docs I could verify.",
      "limitsSummary": "Unknown from official public docs I could verify.",
      "regionSummary": "Served through the 01.AI API platform; privacy policy is mainland-China centered.",
      "languagesSummary": "Likely multilingual, but API-specific language coverage is not cleanly documented.",
      "notes": "Official site and company blog mention Yi-Large as a flagship proprietary model; exact current API picker suitability is less certain than yi-lightning.",
      "officialSources": [
        "https://www.lingyiwanwu.com/blog/2024-ai-first",
        "https://www.lingyiwanwu.com/en"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No current public API language matrix found.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "inference-from-Yi-family"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-medium",
      "publicName": "Yi-Medium",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from official public docs I could verify.",
      "limitsSummary": "Unknown from official public docs I could verify.",
      "regionSummary": "Served through the 01.AI API platform; privacy policy is mainland-China centered.",
      "languagesSummary": "Likely Chinese/English minimum; broader coverage unknown.",
      "notes": "Seen in secondary integration catalogs and older launch coverage. Keep behind live discovery unless your runtime confirms the ID.",
      "officialSources": [
        "https://docs.camel-ai.org/key_modules/models",
        "https://docs.portkey.ai/docs/integrations/llms/lingyi-01.ai"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No verified public language matrix found.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "inference-from-Yi-family"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-large-turbo",
      "publicName": "Yi-Large-Turbo",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Unknown.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Appears consistently in third-party integration catalogs, but I did not verify it in indexed official reference docs.",
      "officialSources": [
        "https://docs.camel-ai.org/key_modules/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No verified public language matrix found.",
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
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-vision",
      "publicName": "Yi-Vision",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from official public docs I could verify.",
      "limitsSummary": "Unknown from official public docs I could verify.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Official social snippet and open-source family pages indicate at least Chinese/English multimodal capability.",
      "notes": "This is a multimodal LLM, not STT/TTS. Keep out of a voice-only stable picker unless the app also supports image input.",
      "officialSources": [
        "https://docs.camel-ai.org/key_modules/models",
        "https://www.01.ai/",
        "https://x.com/01AI_Yi/status/1818050479018111321"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No verified API language matrix found; public material indicates bilingual multimodal use.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "vision-model",
          "inference-from-public-model-pages"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-medium-200k",
      "publicName": "Yi-Medium-200K",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from official public docs I could verify.",
      "limitsSummary": "Secondary sources describe a 200K-class long-context model; official indexed API docs were not found.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Useful as live-discovery-only. Do not hard-code unless your runtime confirms the model and its context limit.",
      "officialSources": [
        "https://docs.camel-ai.org/key_modules/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Secondary integration catalogs describe this as a 200K model; official indexed reference docs were not found."
        }
      ],
      "languageSupport": {
        "rawText": "No verified public language matrix found.",
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
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-spark",
      "publicName": "Yi-Spark",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from official public docs I could verify.",
      "limitsSummary": "Secondary sources position it as the low-latency lightweight option; official indexed API docs were not found.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Potential latency/fallback model, but not strong enough for a stable picker without runtime confirmation.",
      "officialSources": [
        "https://docs.camel-ai.org/key_modules/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No verified public language matrix found.",
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
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-large-rag",
      "publicName": "Yi-Large-RAG",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Unknown.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Appears in third-party integration catalogs. Treat as routed/specialized and live-discovery-only.",
      "officialSources": [
        "https://docs.camel-ai.org/key_modules/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No verified public language matrix found.",
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
      "providerId": "01-ai-yi",
      "providerName": "01.AI (Yi)",
      "service": "llm",
      "modelId": "yi-large-fc",
      "publicName": "Yi-Large-FC",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Unknown.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Likely a function-calling specialization from secondary integration catalogs only. Keep behind discovery.",
      "officialSources": [
        "https://docs.camel-ai.org/key_modules/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No verified public language matrix found.",
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
]);

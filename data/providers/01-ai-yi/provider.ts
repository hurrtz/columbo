import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "01-ai-yi",
    "providerName": "01.AI (Yi)",
    "categoryName": "LLM API provider / multi-model aggregation platform",
    "hq": "Beijing, China",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://platform.lingyiwanwu.com/docs",
      "https://platform.lingyiwanwu.com/privacypolicy",
      "https://www.lingyiwanwu.com/en",
      "https://www.lingyiwanwu.com/blog/yi-lightning-gpt-4o-2024-05-13",
      "https://www.lingyiwanwu.com/blog/2024-ai-first",
      "https://www.01.ai/"
    ],
    "integration": {
      "catalogType": "Provider API platform with sparse public docs and dynamic smart-routing",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": false,
      "lowConfidence": true,
      "openAiCompatible": true,
      "protocols": [
        "rest"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Officially verified public price found only for yi-lightning: RMB 0.99 per 1M tokens. No official public input/output split found. Other model prices were not verifiable from official public docs.",
      "limits": "Public hard limits are poorly documented in indexed official docs. No official public rate-limit page, session-limit page, upload-size page, or speech limits page were verifiable.",
      "region": "Mainland-China-centered platform. Privacy policy says personal information generated or collected in PRC operations is stored in mainland China by default unless a specific service requires cross-border transfer with separate consent.",
      "sttLanguages": "Unsupported: no public developer STT offering was verified.",
      "ttsLanguages": "Unsupported: no public developer TTS offering was verified.",
      "freeTier": "Unknown. Older launch coverage mentioned signup credits/promotions, but I did not verify a current official public free-tier page.",
      "integrationNotes": "Treat the provider as a dynamic aggregator. The privacy policy explicitly says routing may choose self-developed or third-party models automatically. Use live model discovery if possible; otherwise keep only highly verified first-party IDs in stable pickers."
    },
    "sources": [
      {
        "url": "https://platform.lingyiwanwu.com/docs",
        "title": "\u96f6\u4e00\u4e07\u7269-\u5927\u6a21\u578b\u5f00\u653e\u5e73\u53f0 docs center",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://platform.lingyiwanwu.com/privacypolicy",
        "title": "\u96f6\u4e00\u4e07\u7269\u5927\u6a21\u578b\u5f00\u653e\u5e73\u53f0\u9690\u79c1\u653f\u7b56",
        "type": "official",
        "lastUpdated": "2025-08-07",
        "usedFor": [
          "regions",
          "models"
        ]
      },
      {
        "url": "https://www.lingyiwanwu.com/en",
        "title": "01.AI English site",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://www.lingyiwanwu.com/blog/yi-lightning-gpt-4o-2024-05-13",
        "title": "Yi-Lightning launch announcement",
        "type": "official",
        "lastUpdated": "2024-10-16",
        "usedFor": [
          "pricing",
          "models",
          "limits"
        ]
      },
      {
        "url": "https://www.lingyiwanwu.com/blog/2024-ai-first",
        "title": "01.AI 2024 year-end review",
        "type": "official",
        "lastUpdated": "2025-01-23",
        "usedFor": [
          "pricing",
          "models"
        ]
      },
      {
        "url": "https://www.01.ai/",
        "title": "01.AI corporate site",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://www.pingwest.com/a/293619",
        "title": "PingWest coverage of the API platform launch",
        "type": "secondary",
        "lastUpdated": "2024-03-28",
        "usedFor": [
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://docs.camel-ai.org/key_modules/models",
        "title": "CAMEL supported model list",
        "type": "secondary",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.portkey.ai/docs/integrations/llms/lingyi-01.ai",
        "title": "Portkey 01.AI integration page",
        "type": "secondary",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://x.com/01AI_Yi/status/1845776529185476613",
        "title": "01.AI official X post announcing Yi-Lightning and Yi-Lightning-Lite API availability",
        "type": "secondary",
        "lastUpdated": "2024-10-15",
        "usedFor": [
          "models"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);

import {
  defineProviderDocument,
  defineProviderDocuments,
} from "../../data/provider-catalog/definitions";
import type { CatalogProviderDocument } from "../../src/catalog";

function createDocument(
  overrides: Partial<CatalogProviderDocument> = {},
): CatalogProviderDocument {
  const provider = {
    providerId: "provider-a",
    providerName: "Provider A",
    categoryName: "Test",
    hq: "US",
    verifiedSupport: {
      llm: "native",
      stt: "unsupported",
      tts: "unsupported",
    },
    officialSources: ["https://example.com"],
    integration: {
      catalogType: "Fixed",
      coverage: "Mostly exhaustive",
      hasDynamicCatalog: false,
      needsLiveDiscovery: false,
      supportsSpeech: false,
      lowConfidence: false,
      openAiCompatible: null,
      protocols: [],
      regionSplitRecommended: false,
    },
    summaries: {
      activeModels: {
        llm: "Model A [model-a]",
        stt: null,
        tts: null,
      },
      pricing: null,
      limits: null,
      region: null,
      sttLanguages: null,
      ttsLanguages: null,
      freeTier: null,
      integrationNotes: null,
    },
  };
  const llms = [
    {
      providerId: "provider-a",
      providerName: "Provider A",
      service: "llm" as const,
      modelId: "model-a",
      aliases: ["model-a-latest"],
      publicName: "Model A",
      status: "active",
      catalogScope: "fixed",
      pricingSummary: null,
      limitsSummary: null,
      regionSummary: null,
      languagesSummary: null,
      notes: null,
      officialSources: ["https://example.com"],
      openAiCompatible: null,
      supportsRealtime: true,
      supportsBatch: true,
      priceMeasurements: [],
      constraints: [],
      languageSupport: null,
    },
  ];

  return {
    provider,
    llms,
    stt: [],
    tts: [],
    ...overrides,
  };
}

describe("catalog definitions", () => {
  it("rejects provider documents with mismatched model services", () => {
    expect(() =>
      defineProviderDocument({
        ...createDocument(),
        llms: [
          {
            ...createDocument().llms[0],
            service: "stt",
          },
        ],
      }),
    ).toThrow("Catalog service mismatch");
  });

  it("rejects duplicate provider IDs across documents", () => {
    expect(() =>
      defineProviderDocuments([createDocument(), createDocument()]),
    ).toThrow("Duplicate catalog provider ID");
  });

  it("rejects alias collisions with canonical model IDs", () => {
    expect(() =>
      defineProviderDocument({
        ...createDocument(),
        llms: [
          createDocument().llms[0],
          {
            ...createDocument().llms[0],
            modelId: "model-b",
            publicName: "Model B",
            aliases: ["model-a"],
          },
        ],
      }),
    ).toThrow("Catalog alias collides with canonical model ID");
  });
});

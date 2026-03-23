import fs from "fs";
import path from "path";

import {
  getCatalogAppIntegrationNotes,
  getCatalogModel,
  getCatalogProvider,
  getCatalogRecordingConstraints,
  getCatalogStats,
  isCatalogProviderOpenAiCompatible,
  PROVIDER_CATALOG,
} from "../../src/catalog";

describe("provider catalog", () => {
  it("matches the expected provider and model counts from the audit workbook", () => {
    expect(getCatalogStats()).toEqual({
      providerCount: 56,
      modelCount: 322,
      serviceCounts: {
        llm: 156,
        stt: 76,
        tts: 90,
      },
    });
  });

  it("writes one provider document and one model document per catalog entry", () => {
    const providerDir = path.join(
      process.cwd(),
      "data",
      "provider-catalog",
      "providers",
    );

    const providerDirectories = fs
      .readdirSync(providerDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory());

    expect(providerDirectories).toHaveLength(56);

    const providerFiles = providerDirectories.flatMap((entry) =>
      fs
        .readdirSync(path.join(providerDir, entry.name, "models"))
        .map((file) => path.join(providerDir, entry.name, "models", file)),
    );

    expect(providerFiles).toHaveLength(322);

    for (const provider of PROVIDER_CATALOG.providers) {
      expect(
        fs.existsSync(path.join(process.cwd(), provider.documents.providerPath)),
      ).toBe(true);
      for (const documentPath of provider.documents.modelDocumentPaths) {
        expect(fs.existsSync(path.join(process.cwd(), documentPath))).toBe(true);
      }
    }
  });

  it("preserves workbook support states even when the supplemental report is older", () => {
    const mistral = getCatalogProvider("mistral-ai");
    expect(mistral?.verifiedSupport.stt.state).toBe("native");
    expect(mistral?.verifiedSupport.tts.state).toBe("unsupported");
    expect(mistral?.supplementalResearch).not.toBeNull();
  });

  it("captures derived recording safeguards for OpenAI transcription models", () => {
    const constraints = getCatalogRecordingConstraints(
      "openai",
      "gpt-4o-mini-transcribe",
      "stt",
    );

    expect(constraints).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          metric: "file_size_bytes",
          comparator: "<=",
          value: 25_000_000,
        }),
        expect.objectContaining({
          metric: "duration_seconds",
          comparator: ">=",
          value: 30,
        }),
      ]),
    );
  });

  it("stores compatibility and dynamic-catalog hints from the supplemental report", () => {
    const groq = getCatalogProvider("groq");

    expect(groq?.derived.hasDynamicCatalog).toBe(true);
    expect(groq?.derived.needsLiveDiscovery).toBe(true);
    expect(isCatalogProviderOpenAiCompatible("groq")).toBe(true);
  });

  it("normalizes price and language metadata on representative models", () => {
    const groqTts = getCatalogModel(
      "groq",
      "canopylabs/orpheus-v1-english",
      "tts",
    );
    const openaiStt = getCatalogModel(
      "openai",
      "gpt-4o-mini-transcribe",
      "stt",
    );

    expect(groqTts?.derived.priceMeasurements).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          amountUsd: 22,
          unit: "million_characters",
        }),
      ]),
    );
    expect(openaiStt?.derived.languageSupport.languageCount).toBe(98);
  });

  it("imports the workbook integration guidance into structured notes", () => {
    const notes = getCatalogAppIntegrationNotes();

    expect(notes).toHaveLength(14);
    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          topic: "Separate provider, model, and voice IDs",
        }),
        expect.objectContaining({
          topic: "Fallback strategy",
        }),
      ]),
    );
  });
});

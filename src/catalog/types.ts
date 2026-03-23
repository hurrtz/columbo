export const PROVIDER_CATALOG_SCHEMA_VERSION = 1;

export type CatalogService = "llm" | "stt" | "tts";
export type CatalogSupportState =
  | "native"
  | "routed"
  | "partial"
  | "unsupported";
export type CatalogPricingUnit =
  | "million_input_tokens"
  | "million_output_tokens"
  | "million_tokens"
  | "million_characters"
  | "million_utf8_bytes"
  | "minute"
  | "hour"
  | "unknown";
export type CatalogConstraintMetric =
  | "file_size_bytes"
  | "stream_chunk_bytes"
  | "duration_seconds"
  | "session_duration_seconds"
  | "throughput_tps"
  | "concurrency"
  | "other";
export type CatalogConstraintComparator = "<=" | ">=" | "~" | "=";

export interface CatalogSupportRecord {
  raw: string;
  state: CatalogSupportState;
}

export interface CatalogPriceMeasurement {
  amountUsd: number;
  unit: CatalogPricingUnit;
  sourceText: string;
}

export interface CatalogConstraint {
  metric: CatalogConstraintMetric;
  comparator: CatalogConstraintComparator;
  value: number;
  unit: "bytes" | "seconds" | "count" | "tps" | "unknown";
  scope: string;
  sourceText: string;
}

export interface CatalogLanguageSupport {
  rawText: string | null;
  isMultilingual: boolean;
  languageCount: number | null;
  voiceCount: number | null;
  listedLanguages: string[];
  notes: string[];
}

export interface CatalogProviderModelRef {
  service: CatalogService;
  modelId: string;
  publicName: string;
  documentPath: string;
}

export interface CatalogSupplementalResearch {
  title: string;
  sourcePath: string;
  markdown: string;
  extractedBlocks: Partial<
    Record<
      | "freeTier"
      | "rateLimits"
      | "paidTiers"
      | "integrationNotes"
      | "pricing"
      | "datacenters",
      string
    >
  >;
  openAiCompatible: boolean | null;
  protocols: string[];
}

export interface CatalogProviderDocument {
  schemaVersion: number;
  documentType: "provider";
  providerId: string;
  providerName: string;
  categoryId: string;
  categoryName: string;
  hq: string | null;
  existsStatus: {
    raw: string | null;
    normalized: string | null;
  };
  sourceOverview: {
    llm: string | null;
    tts: string | null;
    stt: string | null;
    notes: string | null;
  } | null;
  originalSupport: Record<Exclude<CatalogService, never>, CatalogSupportRecord>;
  verifiedSupport: Record<Exclude<CatalogService, never>, CatalogSupportRecord>;
  audit: {
    inputVsCurrent: string | null;
    catalogType: string | null;
    catalogTypeId: string | null;
    coverage: string | null;
    coverageId: string | null;
    activeModelsSummary: Partial<Record<CatalogService, string>>;
    priceRangeSummary: string | null;
    limitsSummary: string | null;
    regionSummary: string | null;
    ttsLanguagesSummary: string | null;
    sttLanguagesSummary: string | null;
    freeTierSummary: string | null;
    appIntegrationNotes: string | null;
    officialSources: string[];
  };
  derived: {
    verifiedServiceCount: number;
    hasDynamicCatalog: boolean;
    needsLiveDiscovery: boolean;
    supportsSpeech: boolean;
    lowConfidence: boolean;
    openAiCompatible: boolean | null;
    protocols: string[];
    regionSplitRecommended: boolean;
  };
  documents: {
    providerPath: string;
    modelDocumentPaths: string[];
  };
  models: CatalogProviderModelRef[];
  supplementalResearch: CatalogSupplementalResearch | null;
}

export interface CatalogModelDocument {
  schemaVersion: number;
  documentType: "model";
  providerId: string;
  providerName: string;
  categoryId: string;
  categoryName: string;
  service: CatalogService;
  publicName: string;
  modelId: string;
  status: string | null;
  statusId: string | null;
  catalogScope: string | null;
  catalogScopeId: string | null;
  pricingSummary: string | null;
  limitsSummary: string | null;
  regionSummary: string | null;
  languagesSummary: string | null;
  notes: string | null;
  officialSources: string[];
  derived: {
    openAiCompatible: boolean | null;
    supportsRealtime: boolean | null;
    supportsBatch: boolean | null;
    priceMeasurements: CatalogPriceMeasurement[];
    constraints: CatalogConstraint[];
    languageSupport: CatalogLanguageSupport;
  };
}

export interface CatalogAppIntegrationNote {
  topic: string;
  recommendation: string;
  whyItMatters: string;
  exampleProviders: string[];
}

export interface CatalogReportSection {
  title: string;
  markdown: string;
  bullets: string[];
}

export interface CatalogSupplementalReport {
  title: string;
  sourcePath: string;
  sections: CatalogReportSection[];
}

export interface ProviderCatalogSnapshot {
  schemaVersion: number;
  generatedAt: string;
  sourceWorkbookPath: string;
  sourceWorkbookName: string;
  reportSourcePath: string | null;
  stats: {
    providerCount: number;
    modelCount: number;
    serviceCounts: Record<CatalogService, number>;
  };
  providers: CatalogProviderDocument[];
  models: CatalogModelDocument[];
  appIntegrationNotes: CatalogAppIntegrationNote[];
  supplementalReport: CatalogSupplementalReport | null;
}

export interface CatalogProviderEntry {
  provider: CatalogProviderDocument;
  models: CatalogModelDocument[];
}

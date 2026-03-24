export const PROVIDER_CATALOG_SCHEMA_VERSION = 3;

export type CatalogProviderId = string;
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
  | "request"
  | "second"
  | "other"
  | "unknown";
export type CatalogConstraintMetric =
  | "file_size_bytes"
  | "stream_chunk_bytes"
  | "duration_seconds"
  | "session_duration_seconds"
  | "throughput_tps"
  | "concurrency"
  | "context_tokens"
  | "rate_limit_rpm"
  | "rate_limit_rps"
  | "rate_limit_tpm"
  | "other";
export type CatalogConstraintComparator = "<" | "<=" | "=" | ">" | ">=" | "~";
export type CatalogConstraintUnit =
  | "bytes"
  | "seconds"
  | "count"
  | "tps"
  | "tokens"
  | "requests_per_minute"
  | "tokens_per_minute"
  | "sessions"
  | "other"
  | "unknown";
export type CatalogSourceType = "official" | "secondary";

export interface CatalogPriceMeasurement {
  amountUsd: number;
  unit: CatalogPricingUnit;
  sourceText: string;
}

export interface CatalogConstraint {
  metric: CatalogConstraintMetric;
  comparator: CatalogConstraintComparator;
  value: number;
  unit: CatalogConstraintUnit;
  scope: string;
  sourceText: string;
}

export interface CatalogSource {
  url: string;
  title: string | null;
  type: CatalogSourceType;
  lastUpdated: string | null;
  usedFor: string[];
}

export interface CatalogLanguageSupport {
  rawText: string | null;
  isMultilingual: boolean;
  languageCount: number | null;
  voiceCount: number | null;
  listedLanguages: string[];
  notes: string[];
}

export interface CatalogProvider {
  providerId: CatalogProviderId;
  providerName: string;
  categoryName: string;
  hq: string | null;
  verifiedSupport: Record<CatalogService, CatalogSupportState>;
  officialSources: string[];
  sources?: CatalogSource[];
  integration: {
    catalogType: string | null;
    coverage: string | null;
    hasDynamicCatalog: boolean;
    needsLiveDiscovery: boolean;
    supportsSpeech: boolean;
    lowConfidence: boolean;
    openAiCompatible: boolean | null;
    protocols: string[];
    regionSplitRecommended: boolean;
  };
  summaries: {
    activeModels: Record<CatalogService, string | null>;
    pricing: string | null;
    limits: string | null;
    region: string | null;
    sttLanguages: string | null;
    ttsLanguages: string | null;
    freeTier: string | null;
    integrationNotes: string | null;
  };
}

export interface CatalogModelBase {
  providerId: CatalogProviderId;
  providerName: string;
  modelId: string;
  publicName: string;
  aliases?: string[];
  status: string | null;
  catalogScope: string | null;
  pricingSummary: string | null;
  limitsSummary: string | null;
  regionSummary: string | null;
  languagesSummary: string | null;
  notes: string | null;
  officialSources: string[];
  openAiCompatible: boolean | null;
  supportsRealtime: boolean | null;
  supportsBatch: boolean | null;
  priceMeasurements: CatalogPriceMeasurement[];
  constraints: CatalogConstraint[];
  languageSupport: CatalogLanguageSupport | null;
}

export interface CatalogLlm extends CatalogModelBase {
  service: "llm";
}

export interface CatalogStt extends CatalogModelBase {
  service: "stt";
}

export interface CatalogTts extends CatalogModelBase {
  service: "tts";
}

export type CatalogModelDocument = CatalogLlm | CatalogStt | CatalogTts;

export interface CatalogProviderDocument {
  provider: CatalogProvider;
  llms: CatalogLlm[];
  stt: CatalogStt[];
  tts: CatalogTts[];
}

export interface CatalogProviderEntry {
  provider: CatalogProvider;
  llms: CatalogLlm[];
  stt: CatalogStt[];
  tts: CatalogTts[];
  models: CatalogModelDocument[];
}

export interface ProviderCatalogStats {
  providerCount: number;
  modelCount: number;
  serviceCounts: Record<CatalogService, number>;
}

export interface ProviderCatalogIndex {
  schemaVersion: number;
  updatedAt: string;
  providerDocuments: CatalogProviderDocument[];
  providers: CatalogProvider[];
  models: CatalogModelDocument[];
  stats: ProviderCatalogStats;
}

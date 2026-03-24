import {
  PROVIDER_CATALOG_UPDATED_AT,
  PROVIDER_DOCUMENTS,
} from "../../data/provider-catalog";
import { PROVIDER_CATALOG_SCHEMA_VERSION } from "./types";
import type {
  CatalogConstraint,
  CatalogModelDocument,
  CatalogProvider,
  CatalogProviderId,
  CatalogProviderDocument,
  CatalogProviderEntry,
  CatalogService,
  CatalogSupportState,
  ProviderCatalogIndex,
} from "./types";

export * from "./types";
export * from "./appProviders";

const providersById = new Map<CatalogProviderId, CatalogProvider>();
const providerDocumentsById = new Map<CatalogProviderId, CatalogProviderDocument>();
const modelsByProviderId = new Map<CatalogProviderId, CatalogModelDocument[]>();
const modelsByCompositeKey = new Map<string, CatalogModelDocument>();

for (const document of PROVIDER_DOCUMENTS) {
  const providerId = document.provider.providerId;
  const models = [...document.llms, ...document.stt, ...document.tts];

  providersById.set(providerId, document.provider);
  providerDocumentsById.set(providerId, document);
  modelsByProviderId.set(providerId, models);

  for (const model of models) {
    modelsByCompositeKey.set(`${providerId}::${model.service}::${model.modelId}`, model);

    for (const alias of ("aliases" in model ? model.aliases : undefined) ?? []) {
      modelsByCompositeKey.set(`${providerId}::${model.service}::${alias}`, model);
    }
  }
}

for (const models of modelsByProviderId.values()) {
  models.sort((left, right) => {
    if (left.service !== right.service) {
      return left.service.localeCompare(right.service);
    }

    return left.publicName.localeCompare(right.publicName);
  });
}

const providers = PROVIDER_DOCUMENTS.map((document) => document.provider);
const models = [...modelsByCompositeKey.values()].filter(
  (model, index, allModels) =>
    allModels.findIndex(
      (candidate) =>
        candidate.providerId === model.providerId &&
        candidate.service === model.service &&
        candidate.modelId === model.modelId,
    ) === index,
);

models.sort((left, right) => {
  if (left.providerId !== right.providerId) {
    return left.providerId.localeCompare(right.providerId);
  }

  if (left.service !== right.service) {
    return left.service.localeCompare(right.service);
  }

  return left.publicName.localeCompare(right.publicName);
});

const stats = {
  providerCount: providers.length,
  modelCount: models.length,
  serviceCounts: {
    llm: models.filter((model) => model.service === "llm").length,
    stt: models.filter((model) => model.service === "stt").length,
    tts: models.filter((model) => model.service === "tts").length,
  },
};

export const PROVIDER_CATALOG: ProviderCatalogIndex = {
  schemaVersion: PROVIDER_CATALOG_SCHEMA_VERSION,
  updatedAt: PROVIDER_CATALOG_UPDATED_AT,
  providerDocuments: PROVIDER_DOCUMENTS,
  providers,
  models,
  stats,
};

export function getCatalogStats() {
  return PROVIDER_CATALOG.stats;
}

export function listCatalogProviders() {
  return [...PROVIDER_CATALOG.providers];
}

export function listCatalogProviderIds(): CatalogProviderId[] {
  return listCatalogProviders().map((provider) => provider.providerId);
}

export function listCatalogProviderEntries(): CatalogProviderEntry[] {
  return PROVIDER_DOCUMENTS.map((document) => ({
    provider: document.provider,
    llms: [...document.llms],
    stt: [...document.stt],
    tts: [...document.tts],
    models: [...document.llms, ...document.stt, ...document.tts],
  }));
}

export function isCatalogProviderId(value: unknown): value is CatalogProviderId {
  return (
    typeof value === "string" &&
    providersById.has(value as CatalogProviderId)
  );
}

export function getCatalogProvider(providerId: CatalogProviderId) {
  return providersById.get(providerId) ?? null;
}

export function getCatalogProviderEntry(providerId: CatalogProviderId) {
  const document = providerDocumentsById.get(providerId);

  if (!document) {
    return null;
  }

  return {
    provider: document.provider,
    llms: [...document.llms],
    stt: [...document.stt],
    tts: [...document.tts],
    models: [...document.llms, ...document.stt, ...document.tts],
  };
}

export function getCatalogProviderModels(
  providerId: CatalogProviderId,
  service?: CatalogService,
) {
  const providerModels = modelsByProviderId.get(providerId) ?? [];

  if (!service) {
    return [...providerModels];
  }

  return providerModels.filter((model) => model.service === service);
}

export function getCatalogModel(
  providerId: CatalogProviderId,
  modelId: string,
  service?: CatalogService,
) {
  if (service) {
    return modelsByCompositeKey.get(`${providerId}::${service}::${modelId}`) ?? null;
  }

  for (const candidateService of ["llm", "stt", "tts"] as const) {
    const match = modelsByCompositeKey.get(
      `${providerId}::${candidateService}::${modelId}`,
    );

    if (match) {
      return match;
    }
  }

  return null;
}

export function providerSupportsService(
  providerId: CatalogProviderId,
  service: CatalogService,
  allowedStates: CatalogSupportState[] = ["native", "partial", "routed"],
) {
  const provider = getCatalogProvider(providerId);

  if (!provider) {
    return false;
  }

  return allowedStates.includes(provider.verifiedSupport[service]);
}

export function isCatalogProviderOpenAiCompatible(providerId: CatalogProviderId) {
  return getCatalogProvider(providerId)?.integration.openAiCompatible ?? null;
}

export function getCatalogModelConstraints(
  providerId: CatalogProviderId,
  modelId: string,
  service?: CatalogService,
) {
  return getCatalogModel(providerId, modelId, service)?.constraints ?? [];
}

export function getCatalogRecordingConstraints(
  providerId: CatalogProviderId,
  modelId: string,
  service: CatalogService = "stt",
) {
  return getCatalogModelConstraints(providerId, modelId, service).filter(
    (constraint) =>
      constraint.metric === "file_size_bytes" ||
      constraint.metric === "stream_chunk_bytes" ||
      constraint.metric === "duration_seconds" ||
      constraint.metric === "session_duration_seconds",
  );
}

export function getStrictestCatalogMaxConstraint(
  constraints: CatalogConstraint[],
  metric: CatalogConstraint["metric"],
) {
  return constraints
    .filter(
      (constraint) =>
        constraint.metric === metric &&
        (constraint.comparator === "<=" || constraint.comparator === "="),
    )
    .sort((left, right) => left.value - right.value)[0] ?? null;
}

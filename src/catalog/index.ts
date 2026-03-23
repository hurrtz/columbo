import type {
  CatalogConstraint,
  CatalogModelDocument,
  CatalogProviderDocument,
  CatalogProviderEntry,
  CatalogService,
  CatalogSupportState,
  ProviderCatalogSnapshot,
} from "./types";

export * from "./types";
export * from "./appProviders";

const PROVIDER_CATALOG_SNAPSHOT = require("../../data/provider-catalog/catalog.snapshot.json") as ProviderCatalogSnapshot;

const providersById = new Map<string, CatalogProviderDocument>(
  PROVIDER_CATALOG_SNAPSHOT.providers.map((provider) => [
    provider.providerId,
    provider,
  ]),
);

const modelsByProviderId = new Map<string, CatalogModelDocument[]>();
const modelsByCompositeKey = new Map<string, CatalogModelDocument>();

for (const model of PROVIDER_CATALOG_SNAPSHOT.models) {
  const existing = modelsByProviderId.get(model.providerId) ?? [];
  existing.push(model);
  modelsByProviderId.set(model.providerId, existing);
  modelsByCompositeKey.set(
    `${model.providerId}::${model.service}::${model.modelId}`,
    model,
  );
}

for (const models of modelsByProviderId.values()) {
  models.sort((left, right) => {
    if (left.service !== right.service) {
      return left.service.localeCompare(right.service);
    }

    return left.publicName.localeCompare(right.publicName);
  });
}

export const PROVIDER_CATALOG = PROVIDER_CATALOG_SNAPSHOT;

export function getCatalogStats() {
  return PROVIDER_CATALOG_SNAPSHOT.stats;
}

export function listCatalogProviders() {
  return [...PROVIDER_CATALOG_SNAPSHOT.providers];
}

export function listCatalogProviderEntries(): CatalogProviderEntry[] {
  return PROVIDER_CATALOG_SNAPSHOT.providers.map((provider) => ({
    provider,
    models: getCatalogProviderModels(provider.providerId),
  }));
}

export function getCatalogProvider(providerId: string) {
  return providersById.get(providerId) ?? null;
}

export function getCatalogProviderEntry(providerId: string) {
  const provider = getCatalogProvider(providerId);

  if (!provider) {
    return null;
  }

  return {
    provider,
    models: getCatalogProviderModels(providerId),
  };
}

export function getCatalogProviderModels(
  providerId: string,
  service?: CatalogService,
) {
  const models = modelsByProviderId.get(providerId) ?? [];

  if (!service) {
    return [...models];
  }

  return models.filter((model) => model.service === service);
}

export function getCatalogModel(
  providerId: string,
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
  providerId: string,
  service: CatalogService,
  allowedStates: CatalogSupportState[] = ["native", "partial", "routed"],
) {
  const provider = getCatalogProvider(providerId);

  if (!provider) {
    return false;
  }

  return allowedStates.includes(provider.verifiedSupport[service].state);
}

export function isCatalogProviderOpenAiCompatible(providerId: string) {
  return getCatalogProvider(providerId)?.derived.openAiCompatible ?? null;
}

export function getCatalogModelConstraints(
  providerId: string,
  modelId: string,
  service?: CatalogService,
) {
  return getCatalogModel(providerId, modelId, service)?.derived.constraints ?? [];
}

export function getCatalogRecordingConstraints(
  providerId: string,
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

export function getCatalogAppIntegrationNotes() {
  return [...PROVIDER_CATALOG_SNAPSHOT.appIntegrationNotes];
}

export function getCatalogSupplementalReport() {
  return PROVIDER_CATALOG_SNAPSHOT.supplementalReport;
}

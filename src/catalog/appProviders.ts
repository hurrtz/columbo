import type { Provider } from "../types";
import { RUNTIME_PROVIDER_MANIFEST } from "../constants/providers/runtimeManifest";

import {
  getCatalogModel,
  getCatalogProvider,
  getCatalogProviderModels,
} from "./index";
import type {
  CatalogConstraint,
  CatalogLanguageSupport,
  CatalogModelDocument,
  CatalogProviderId,
  CatalogService,
  CatalogSupportState,
} from "./types";

export const APP_PROVIDER_CATALOG_IDS: Record<Provider, CatalogProviderId> = Object.fromEntries(
  Object.entries(RUNTIME_PROVIDER_MANIFEST).map(([provider, manifest]) => [
    provider,
    manifest.catalogProviderId,
  ]),
) as Record<Provider, CatalogProviderId>;

const APP_PROVIDERS_BY_CATALOG_ID: Partial<Record<CatalogProviderId, Provider>> =
  Object.fromEntries(
    Object.entries(APP_PROVIDER_CATALOG_IDS).map(([provider, catalogProviderId]) => [
      catalogProviderId,
      provider as Provider,
    ]),
  );

export function getCatalogProviderIdForAppProvider(provider: Provider) {
  return APP_PROVIDER_CATALOG_IDS[provider];
}

export function getAppProviderForCatalogProviderId(
  catalogProviderId: CatalogProviderId,
) {
  return APP_PROVIDERS_BY_CATALOG_ID[catalogProviderId] ?? null;
}

export function getCatalogProviderForAppProvider(provider: Provider) {
  return getCatalogProvider(getCatalogProviderIdForAppProvider(provider));
}

export function getCatalogVerifiedServiceStateForAppProvider(
  provider: Provider,
  service: CatalogService,
): CatalogSupportState {
  return getCatalogProviderForAppProvider(provider)?.verifiedSupport[service] ?? "unsupported";
}

export function isCatalogServiceSupportedForAppProvider(
  provider: Provider,
  service: CatalogService,
  allowedStates: CatalogSupportState[] = ["native", "partial", "routed"],
) {
  return allowedStates.includes(
    getCatalogVerifiedServiceStateForAppProvider(provider, service),
  );
}

export function getCatalogModelsForAppProvider(
  provider: Provider,
  service?: CatalogService,
) {
  return getCatalogProviderModels(
    getCatalogProviderIdForAppProvider(provider),
    service,
  );
}

export function getCatalogModelForAppProvider(
  provider: Provider,
  modelId: string,
  service?: CatalogService,
) {
  return getCatalogModel(
    getCatalogProviderIdForAppProvider(provider),
    modelId,
    service,
  );
}

export function getCatalogConstraintsForAppProvider(
  provider: Provider,
  modelId: string,
  service?: CatalogService,
): CatalogConstraint[] {
  return getCatalogModelForAppProvider(provider, modelId, service)?.constraints ?? [];
}

export function getCatalogLanguageSupportForAppProvider(
  provider: Provider,
  modelId: string,
  service?: CatalogService,
): CatalogLanguageSupport | null {
  return getCatalogModelForAppProvider(provider, modelId, service)?.languageSupport ?? null;
}

export function getCatalogRealtimeModelsForAppProvider(
  provider: Provider,
  service: CatalogService,
): CatalogModelDocument[] {
  return getCatalogModelsForAppProvider(provider, service).filter(
    (model) => model.supportsRealtime === true,
  );
}

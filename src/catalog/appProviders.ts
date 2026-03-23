import { Provider } from "../types";

import {
  getCatalogModel,
  getCatalogProvider,
  getCatalogProviderModels,
} from "./index";
import type {
  CatalogConstraint,
  CatalogLanguageSupport,
  CatalogModelDocument,
  CatalogPriceMeasurement,
  CatalogService,
  CatalogSupportState,
} from "./types";

export const APP_PROVIDER_CATALOG_IDS: Record<Provider, string> = {
  openai: "openai",
  anthropic: "anthropic",
  gemini: "google-vertex-ai-studio",
  cohere: "cohere",
  deepseek: "deepseek",
  groq: "groq",
  mistral: "mistral-ai",
  nvidia: "nvidia-nim",
  together: "together-ai",
  xai: "xai",
};

export function getCatalogProviderIdForAppProvider(provider: Provider) {
  return APP_PROVIDER_CATALOG_IDS[provider];
}

export function getCatalogProviderForAppProvider(provider: Provider) {
  return getCatalogProvider(getCatalogProviderIdForAppProvider(provider));
}

export function getCatalogVerifiedServiceStateForAppProvider(
  provider: Provider,
  service: CatalogService,
): CatalogSupportState {
  return (
    getCatalogProviderForAppProvider(provider)?.verifiedSupport[service].state ??
    "unsupported"
  );
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

export function getCatalogPriceMeasurementsForAppProvider(
  provider: Provider,
  modelId: string,
  service?: CatalogService,
): CatalogPriceMeasurement[] {
  return (
    getCatalogModelForAppProvider(provider, modelId, service)?.derived
      .priceMeasurements ?? []
  );
}

export function getCatalogConstraintsForAppProvider(
  provider: Provider,
  modelId: string,
  service?: CatalogService,
): CatalogConstraint[] {
  return (
    getCatalogModelForAppProvider(provider, modelId, service)?.derived
      .constraints ?? []
  );
}

export function getCatalogLanguageSupportForAppProvider(
  provider: Provider,
  modelId: string,
  service?: CatalogService,
): CatalogLanguageSupport | null {
  return (
    getCatalogModelForAppProvider(provider, modelId, service)?.derived
      .languageSupport ?? null
  );
}

export function getCatalogRealtimeModelsForAppProvider(
  provider: Provider,
  service: CatalogService,
): CatalogModelDocument[] {
  return getCatalogModelsForAppProvider(provider, service).filter(
    (model) => model.derived.supportsRealtime === true,
  );
}

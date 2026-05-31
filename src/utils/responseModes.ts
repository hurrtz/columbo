import { getCatalogModelsForAppProvider } from "../catalog/appProviders";
import { PROVIDER_DEFAULT_MODELS, PROVIDER_MODELS } from "../constants/models";
import {
  Provider,
  ResponseMode,
  ResponseModeRoute,
  ResponseModeSelections,
  Settings,
} from "../types";
import { hasProviderCredentialForCapability } from "./providerCredentials";

export const RESPONSE_MODE_ORDER: ResponseMode[] = ["quick", "normal", "deep"];

/**
 * Derives a full set of response-mode routes ({@link ResponseModeSelections})
 * from a single provider's LLM catalog models.
 *
 * `quick`/`normal`/`deep` map to the first three LLM model ids in catalog
 * order. If the provider exposes fewer than three LLM models, the last
 * available id is repeated so every mode receives a valid route. If the
 * provider has no catalog LLM models, the manifest default model id is used
 * (falling back to an empty model only as a last resort).
 *
 * Pure: no side effects, depends only on its argument and static catalog data.
 */
export function deriveResponseModesForProvider(
  provider: Provider,
): ResponseModeSelections {
  const catalogModelIds = getCatalogModelsForAppProvider(provider, "llm").map(
    (model) => model.modelId,
  );

  const fallbackModel = PROVIDER_DEFAULT_MODELS[provider] ?? "";
  const availableModelIds =
    catalogModelIds.length > 0 ? catalogModelIds : [fallbackModel];

  const pickModel = (index: number): string =>
    availableModelIds[index] ??
    availableModelIds[availableModelIds.length - 1] ??
    fallbackModel;

  return RESPONSE_MODE_ORDER.reduce((selections, mode, index) => {
    selections[mode] = { provider, model: pickModel(index) };
    return selections;
  }, {} as ResponseModeSelections);
}

export function getResponseModeRoute(
  settings: Settings,
  mode: ResponseMode = settings.activeResponseMode,
): ResponseModeRoute {
  return settings.responseModes[mode];
}

export function isResponseModeReady(
  settings: Settings,
  mode: ResponseMode,
): boolean {
  const route = getResponseModeRoute(settings, mode);
  return hasProviderCredentialForCapability(
    route.provider,
    settings.apiKeys[route.provider],
    "llm",
  );
}

export function getAvailableResponseModes(settings: Settings): ResponseMode[] {
  return RESPONSE_MODE_ORDER.filter((mode) => isResponseModeReady(settings, mode));
}

export function isValidModelForProvider(
  provider: Provider,
  model: string,
): boolean {
  return PROVIDER_MODELS[provider].some((entry) => entry.id === model);
}

export function getDefaultModelForProvider(provider: Provider): string {
  const curatedDefault = PROVIDER_DEFAULT_MODELS[provider];

  if (isValidModelForProvider(provider, curatedDefault)) {
    return curatedDefault;
  }

  return PROVIDER_MODELS[provider][0]?.id ?? "";
}

export function getProviderValidationModel(
  settings: Settings,
  provider: Provider,
): string {
  const activeRoute = getResponseModeRoute(settings);

  if (activeRoute.provider === provider && activeRoute.model.trim()) {
    return activeRoute.model;
  }

  for (const mode of RESPONSE_MODE_ORDER) {
    const route = settings.responseModes[mode];

    if (route.provider === provider && route.model.trim()) {
      return route.model;
    }
  }

  return settings.providerModels[provider];
}

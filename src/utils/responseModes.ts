import { PROVIDER_DEFAULT_MODELS, PROVIDER_MODELS } from "../constants/models";
import {
  DEFAULT_RESPONSE_MODE_COUNT,
  MAX_RESPONSE_MODES,
  createResponseModeId,
} from "../constants/providers/defaults";
import {
  Provider,
  ResponseMode,
  ResponseModeConfig,
  ResponseModeRoute,
  ResponseModeSelections,
  Settings,
} from "../types";
import { normalizeResponseModeRouteEffort } from "./modelEffort";
import { hasProviderCredentialForCapability } from "./providerCredentials";

export const LEGACY_RESPONSE_MODE_ORDER = ["quick", "normal", "deep"] as const;

export function getResponseModeIds(modes: ResponseModeSelections): ResponseMode[] {
  return modes.map((mode) => mode.id);
}

export function getNextResponseModeId(modes: ResponseModeSelections) {
  const existingIds = new Set(getResponseModeIds(modes));

  for (let index = 0; index < MAX_RESPONSE_MODES; index += 1) {
    const id = createResponseModeId(index);

    if (!existingIds.has(id)) {
      return id;
    }
  }

  return createResponseModeId(modes.length);
}

/**
 * Derives a full set of response-mode routes ({@link ResponseModeSelections})
 * from a single provider's curated runtime LLM models.
 *
 * `quick`/`normal`/`deep` map to the first three runtime model ids in picker
 * order. If the provider exposes fewer than three LLM models, the last
 * available id is repeated so every mode receives a valid route. If the
 * provider has no runtime LLM models, the manifest default model id is used
 * (falling back to an empty model only as a last resort).
 *
 * Pure: no side effects, depends only on its argument and static runtime data.
 */
export function deriveResponseModesForProvider(
  provider: Provider,
  count = DEFAULT_RESPONSE_MODE_COUNT,
): ResponseModeSelections {
  const runtimeModelIds = PROVIDER_MODELS[provider].map((model) => model.id);

  const fallbackModel = PROVIDER_DEFAULT_MODELS[provider] ?? "";
  const availableModelIds =
    runtimeModelIds.length > 0 ? runtimeModelIds : [fallbackModel];

  const pickModel = (index: number): string =>
    availableModelIds[index] ??
    availableModelIds[availableModelIds.length - 1] ??
    fallbackModel;

  return Array.from({ length: count }, (_, index) => ({
    id: createResponseModeId(index),
    route: normalizeResponseModeRouteEffort({
      provider,
      model: pickModel(index),
    }),
  }));
}

export function getResponseModeEntry(
  modes: ResponseModeSelections,
  mode: ResponseMode,
): ResponseModeConfig | undefined {
  return modes.find((entry) => entry.id === mode);
}

export function getResponseModeRoute(
  settings: Settings,
  mode: ResponseMode = settings.activeResponseMode,
): ResponseModeRoute {
  return (
    getResponseModeEntry(settings.responseModes, mode)?.route ??
    settings.responseModes[0]?.route
  );
}

export function isResponseModeReady(
  settings: Settings,
  mode: ResponseMode,
): boolean {
  const route = getResponseModeRoute(settings, mode);

  if (!route) {
    return false;
  }

  return (
    route.model.trim().length > 0 &&
    hasProviderCredentialForCapability(
      route.provider,
      settings.apiKeys[route.provider],
      "llm",
    )
  );
}

export function getAvailableResponseModes(settings: Settings): ResponseMode[] {
  return settings.responseModes
    .filter((entry) => isResponseModeReady(settings, entry.id))
    .map((entry) => entry.id);
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

  if (activeRoute?.provider === provider && activeRoute.model.trim()) {
    return activeRoute.model;
  }

  for (const { route } of settings.responseModes) {
    if (route.provider === provider && route.model.trim()) {
      return route.model;
    }
  }

  return settings.providerModels[provider];
}

import {
  PROVIDER_DEFAULT_STT_MODELS,
  PROVIDER_DEFAULT_TTS_MODELS,
  PROVIDER_ORDER,
  getProviderSttModelOptions,
  getProviderTtsModelOptions,
} from "../../constants/models";
import {
  createRuntimeProviderStringRecord,
  extractRuntimeProviderStringRecord,
  isRuntimeProviderId,
} from "../../constants/providers/runtimeState";
import {
  createDefaultWebSearchProviderSettings,
  isWebSearchMode,
  isWebSearchProvider,
  normalizeWebSearchProviderSettings,
} from "../../constants/webSearch";
import {
  type Provider,
  type ProviderApiKeys,
  type ProviderModelSelections,
  type ProviderSttModelSelections,
  type ProviderTtsModelSelections,
  type ProviderTtsVoiceSelections,
  type ResponseMode,
  type ResponseModeRoute,
  type ResponseModeSelections,
  type Settings,
  DEFAULT_SETTINGS,
  getDefaultAssistantInstructions,
  getDefaultTtsListenLanguages,
} from "../../types";
import {
  getDefaultModelForProvider,
  isValidModelForProvider,
  RESPONSE_MODE_ORDER,
} from "../../utils/responseModes";
import {
  LEGACY_MODEL_FIELD_KEYS,
  type LegacyStoredSettings,
  type StoredProviderModels,
} from "./types";

function isProvider(value: unknown): value is Provider {
  return isRuntimeProviderId(value);
}

const LEGACY_PROVIDER_ALIASES: Record<string, Provider> = {
  grok: "xai",
};

function migrateLegacyProviderId(value: unknown): unknown {
  return typeof value === "string" && value in LEGACY_PROVIDER_ALIASES
    ? LEGACY_PROVIDER_ALIASES[value]
    : value;
}

function migrateLegacyProviderRecord<T>(
  record: Partial<Record<string, T>> | undefined,
): Partial<Record<string, T>> | undefined {
  if (!record || typeof record !== "object") {
    return record;
  }

  let migrated: Partial<Record<string, T>> | undefined;

  for (const [legacyId, canonicalId] of Object.entries(LEGACY_PROVIDER_ALIASES)) {
    if (!(legacyId in record)) {
      continue;
    }

    migrated = migrated ?? { ...record };
    const legacyValue = migrated[legacyId];
    // Prefer an existing canonical value if both are present.
    if (migrated[canonicalId] === undefined && legacyValue !== undefined) {
      migrated[canonicalId] = legacyValue;
    }
    delete migrated[legacyId];
  }

  return migrated ?? record;
}

function migrateLegacyProviders(
  storedSettings?: LegacyStoredSettings,
  storedApiKeys?: Partial<ProviderApiKeys>,
): {
  storedSettings?: LegacyStoredSettings;
  storedApiKeys?: Partial<ProviderApiKeys>;
} {
  const migratedApiKeys = migrateLegacyProviderRecord(
    storedApiKeys as Partial<Record<string, string>> | undefined,
  ) as Partial<ProviderApiKeys> | undefined;

  if (!storedSettings) {
    return { storedSettings, storedApiKeys: migratedApiKeys };
  }

  return {
    storedSettings: {
      ...storedSettings,
      ttsProvider: migrateLegacyProviderId(storedSettings.ttsProvider) as
        | Provider
        | null
        | undefined,
      sttProvider: migrateLegacyProviderId(storedSettings.sttProvider) as
        | Provider
        | null
        | undefined,
      lastProvider: migrateLegacyProviderId(storedSettings.lastProvider) as
        | Provider
        | undefined,
      apiKeys: migrateLegacyProviderRecord(
        storedSettings.apiKeys as Partial<Record<string, string>> | undefined,
      ) as LegacyStoredSettings["apiKeys"],
      providerTtsVoices: migrateLegacyProviderRecord(
        storedSettings.providerTtsVoices as
          | Partial<Record<string, string>>
          | undefined,
      ) as LegacyStoredSettings["providerTtsVoices"],
      providerTtsModels: migrateLegacyProviderRecord(
        storedSettings.providerTtsModels as
          | Partial<Record<string, string>>
          | undefined,
      ) as LegacyStoredSettings["providerTtsModels"],
      providerSttModels: migrateLegacyProviderRecord(
        storedSettings.providerSttModels as
          | Partial<Record<string, string>>
          | undefined,
      ) as LegacyStoredSettings["providerSttModels"],
      providerModels: migrateLegacyProviderRecord(
        storedSettings.providerModels as
          | Partial<Record<string, string>>
          | undefined,
      ) as LegacyStoredSettings["providerModels"],
    },
    storedApiKeys: migratedApiKeys,
  };
}

function isResponseMode(value: unknown): value is ResponseMode {
  return typeof value === "string" && RESPONSE_MODE_ORDER.includes(value as ResponseMode);
}

function extractStoredProviderModels(
  storedSettings?: LegacyStoredSettings,
): StoredProviderModels {
  if (!storedSettings) {
    return {};
  }

  const extractedModels = extractRuntimeProviderStringRecord(
    storedSettings.providerModels,
  );

  return PROVIDER_ORDER.reduce((accumulator, provider) => {
    const providerModels = storedSettings.providerModels?.[provider];
    const legacyFieldKey = LEGACY_MODEL_FIELD_KEYS[provider];
    const legacyValue = legacyFieldKey
      ? storedSettings[legacyFieldKey]
      : undefined;
    const value =
      extractedModels[provider] ??
      (typeof providerModels === "string" && providerModels
        ? providerModels
        : typeof legacyValue === "string" && legacyValue
          ? legacyValue
          : undefined);

    if (value) {
      accumulator[provider] = value;
    }

    return accumulator;
  }, {} as StoredProviderModels);
}

function extractStoredProviderTtsVoices(
  storedSettings?: LegacyStoredSettings,
): Partial<ProviderTtsVoiceSelections> {
  if (!storedSettings) {
    return {};
  }

  const storedProviderVoices =
    extractRuntimeProviderStringRecord(
      storedSettings.providerTtsVoices,
    ) as Partial<ProviderTtsVoiceSelections>;
  const legacyTtsVoice =
    typeof storedSettings.ttsVoice === "string" && storedSettings.ttsVoice
      ? storedSettings.ttsVoice
      : undefined;

  return PROVIDER_ORDER.reduce((accumulator, provider) => {
    const providerVoice = storedProviderVoices[provider];
    const value =
      typeof providerVoice === "string" && providerVoice
        ? providerVoice
        : provider === "openai" && legacyTtsVoice
          ? legacyTtsVoice
          : undefined;

    if (value) {
      accumulator[provider] = value;
    }

    return accumulator;
  }, {} as Partial<ProviderTtsVoiceSelections>);
}

function extractStoredProviderTtsModels(
  storedSettings?: LegacyStoredSettings,
): Partial<ProviderTtsModelSelections> {
  return extractRuntimeProviderStringRecord(
    storedSettings?.providerTtsModels,
  ) as Partial<ProviderTtsModelSelections>;
}

function extractStoredProviderSttModels(
  storedSettings?: LegacyStoredSettings,
): Partial<ProviderSttModelSelections> {
  return extractRuntimeProviderStringRecord(
    storedSettings?.providerSttModels,
  ) as Partial<ProviderSttModelSelections>;
}

function getLegacyResponseModeRoute(
  storedSettings: LegacyStoredSettings | undefined,
  providerModels: ProviderModelSelections,
): ResponseModeRoute {
  const provider = isProvider(storedSettings?.lastProvider)
    ? storedSettings.lastProvider
    : DEFAULT_SETTINGS.lastProvider;
  const providerModel = providerModels[provider];

  return {
    provider,
    model: isValidModelForProvider(provider, providerModel)
      ? providerModel
      : getDefaultModelForProvider(provider),
  };
}

function extractStoredResponseModes(
  storedSettings: LegacyStoredSettings | undefined,
  providerModels: ProviderModelSelections,
): Partial<ResponseModeSelections> {
  const storedResponseModes = storedSettings?.responseModes;

  if (!storedResponseModes || typeof storedResponseModes !== "object") {
    return {};
  }

  return RESPONSE_MODE_ORDER.reduce((accumulator, mode) => {
    const entry = storedResponseModes[mode];

    if (!entry || typeof entry !== "object") {
      return accumulator;
    }

    const provider = isProvider(entry.provider) ? entry.provider : undefined;

    if (!provider) {
      return accumulator;
    }

    const fallbackModel = providerModels[provider] || getDefaultModelForProvider(provider);
    const model =
      typeof entry.model === "string" && isValidModelForProvider(provider, entry.model)
        ? entry.model
        : isValidModelForProvider(provider, fallbackModel)
          ? fallbackModel
          : getDefaultModelForProvider(provider);

    accumulator[mode] = {
      provider,
      model,
    };

    return accumulator;
  }, {} as Partial<ResponseModeSelections>);
}

function extractStoredWebSearchProviderSettings(
  storedSettings?: LegacyStoredSettings,
) {
  const defaults = createDefaultWebSearchProviderSettings();

  if (!storedSettings?.webSearchProviderSettings) {
    return defaults;
  }

  return {
    openai: normalizeWebSearchProviderSettings(
      "openai",
      storedSettings.webSearchProviderSettings.openai,
    ),
    perplexity: normalizeWebSearchProviderSettings(
      "perplexity",
      storedSettings.webSearchProviderSettings.perplexity,
    ),
    tavily: normalizeWebSearchProviderSettings(
      "tavily",
      storedSettings.webSearchProviderSettings.tavily,
    ),
    brave: normalizeWebSearchProviderSettings(
      "brave",
      storedSettings.webSearchProviderSettings.brave,
    ),
    exa: normalizeWebSearchProviderSettings(
      "exa",
      storedSettings.webSearchProviderSettings.exa,
    ),
    firecrawl: normalizeWebSearchProviderSettings(
      "firecrawl",
      storedSettings.webSearchProviderSettings.firecrawl,
    ),
    serpapi: normalizeWebSearchProviderSettings(
      "serpapi",
      storedSettings.webSearchProviderSettings.serpapi,
    ),
  };
}

export function mergeSettings(
  rawStoredSettings?: LegacyStoredSettings,
  rawStoredApiKeys?: Partial<ProviderApiKeys>,
): Settings {
  const { storedSettings, storedApiKeys } = migrateLegacyProviders(
    rawStoredSettings,
    rawStoredApiKeys,
  );
  const replyPlayback =
    storedSettings?.replyPlayback ??
    storedSettings?.ttsPlayback ??
    DEFAULT_SETTINGS.replyPlayback;
  const language = storedSettings?.language ?? DEFAULT_SETTINGS.language;
  const storedTtsListenLanguages = Array.isArray(storedSettings?.ttsListenLanguages)
    ? storedSettings.ttsListenLanguages.filter(
        (value): value is Settings["ttsListenLanguages"][number] =>
          typeof value === "string" && value.length > 0,
      )
    : [];
  const assistantInstructions =
    typeof storedSettings?.assistantInstructions === "string" &&
    storedSettings.assistantInstructions.trim()
      ? storedSettings.assistantInstructions
      : getDefaultAssistantInstructions(language);
  const mergedApiKeys = {
    ...createRuntimeProviderStringRecord(
      "",
      extractRuntimeProviderStringRecord(storedSettings?.apiKeys),
    ),
    ...extractRuntimeProviderStringRecord(storedApiKeys),
  };
  const mergedProviderModels = {
    ...DEFAULT_SETTINGS.providerModels,
    ...extractStoredProviderModels(storedSettings),
  };
  const mergedProviderSttModels = {
    ...DEFAULT_SETTINGS.providerSttModels,
    ...extractStoredProviderSttModels(storedSettings),
  };
  const mergedProviderTtsModels = {
    ...DEFAULT_SETTINGS.providerTtsModels,
    ...extractStoredProviderTtsModels(storedSettings),
  };

  for (const provider of PROVIDER_ORDER) {
    const supportedSttModels = getProviderSttModelOptions(provider);

    if (supportedSttModels.length > 0) {
      const fallbackSttModel =
        PROVIDER_DEFAULT_STT_MODELS[provider] ?? supportedSttModels[0]?.id ?? "";

      if (
        mergedProviderSttModels[provider] &&
        !supportedSttModels.some((model) => model.id === mergedProviderSttModels[provider])
      ) {
        mergedProviderSttModels[provider] = fallbackSttModel;
      }
    }

    const supportedTtsModels = getProviderTtsModelOptions(provider);

    if (supportedTtsModels.length > 0) {
      const fallbackTtsModel =
        PROVIDER_DEFAULT_TTS_MODELS[provider] ?? supportedTtsModels[0]?.id ?? "";

      if (
        mergedProviderTtsModels[provider] &&
        !supportedTtsModels.some((model) => model.id === mergedProviderTtsModels[provider])
      ) {
        mergedProviderTtsModels[provider] = fallbackTtsModel;
      }
    }
  }

  const legacyResponseModeRoute = getLegacyResponseModeRoute(
    storedSettings,
    mergedProviderModels,
  );
  const extractedResponseModes = extractStoredResponseModes(
    storedSettings,
    mergedProviderModels,
  );
  const webSearchProviderSettings =
    extractStoredWebSearchProviderSettings(storedSettings);
  const hasStoredResponseModes = RESPONSE_MODE_ORDER.some(
    (mode) => !!extractedResponseModes[mode],
  );
  const spokenRepliesEnabled =
    typeof storedSettings?.spokenRepliesEnabled === "boolean"
      ? storedSettings.spokenRepliesEnabled
      : DEFAULT_SETTINGS.spokenRepliesEnabled;
  const hasConfiguredKeys = Object.values(mergedApiKeys).some(
    (apiKey) => apiKey.trim().length > 0,
  );
  const ttsMode: Settings["ttsMode"] =
    storedSettings?.ttsMode === "provider" ? "provider" : "native";
  const sanitizedStoredSettings = storedSettings
    ? (() => {
        const { localTtsVoices: _localTtsVoices, ...rest } = storedSettings;
        return rest;
      })()
    : storedSettings;

  return {
    ...DEFAULT_SETTINGS,
    ...sanitizedStoredSettings,
    ttsMode,
    language,
    replyPlayback,
    spokenRepliesEnabled,
    ttsListenLanguages:
      storedTtsListenLanguages.length > 0
        ? storedTtsListenLanguages
        : getDefaultTtsListenLanguages(language),
    setupGuideDismissed:
      typeof storedSettings?.setupGuideDismissed === "boolean"
        ? storedSettings.setupGuideDismissed
        : hasConfiguredKeys,
    assistantInstructions,
    webSearchMode: isWebSearchMode(storedSettings?.webSearchMode)
      ? storedSettings.webSearchMode
      : typeof storedSettings?.webSearchEnabled === "boolean"
        ? storedSettings.webSearchEnabled
          ? "on"
          : "off"
        : DEFAULT_SETTINGS.webSearchMode,
    webSearchProvider: isWebSearchProvider(storedSettings?.webSearchProvider)
      ? storedSettings.webSearchProvider
      : DEFAULT_SETTINGS.webSearchProvider,
    webSearchProviderSettings,
    activeResponseMode: isResponseMode(storedSettings?.activeResponseMode)
      ? storedSettings.activeResponseMode
      : DEFAULT_SETTINGS.activeResponseMode,
    responseModes:
      !storedSettings
        ? DEFAULT_SETTINGS.responseModes
        : hasStoredResponseModes
          ? {
              ...DEFAULT_SETTINGS.responseModes,
              ...extractedResponseModes,
            }
          : {
              quick: legacyResponseModeRoute,
              normal: legacyResponseModeRoute,
              deep: legacyResponseModeRoute,
            },
    providerModels: mergedProviderModels,
    providerSttModels: mergedProviderSttModels,
    providerTtsModels: mergedProviderTtsModels,
    providerTtsVoices: {
      ...DEFAULT_SETTINGS.providerTtsVoices,
      ...extractStoredProviderTtsVoices(storedSettings),
    },
    apiKeys: mergedApiKeys,
  };
}

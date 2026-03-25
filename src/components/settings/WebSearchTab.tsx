import React from "react";
import { Linking, Text, View } from "react-native";

import {
  getAppProviderForCatalogProviderId,
  getCatalogProviderIdForAppProvider,
} from "../../catalog/appProviders";
import {
  PROVIDER_API_KEY_URLS,
  PROVIDER_LABELS,
} from "../../constants/models";
import {
  DEFAULT_WEB_SEARCH_PROVIDER,
  getWebSearchProviderControlSupport,
  getWebSearchProviderModel,
  type WebSearchDepth,
  type WebSearchMode,
  type WebSearchProvider,
  type WebSearchSearchMode,
  WEB_SEARCH_PROVIDER_IDS,
} from "../../constants/webSearch";
import { useLocalization } from "../../i18n";
import type { Settings } from "../../types";
import { useTheme } from "../../theme/ThemeContext";
import { Picker } from "../Picker";

import {
  ProviderApiKeyCard,
  ProviderSelectionGrid,
} from "./ProvidersSections";
import { PickerSection, RadioGroup } from "./SettingsSectionPrimitives";
import { styles } from "./styles";
import { ProviderValidationState, TextInputFocusHandler } from "./types";

interface WebSearchTabProps {
  settings: Settings;
  onUpdate: (
    partial: Partial<Omit<Settings, "apiKeys" | "providerModels">>,
  ) => void;
  onUpdateApiKey: (provider: WebSearchProvider, apiKey: string) => void;
  onTextInputFocus: TextInputFocusHandler;
  onValidateWebSearchProvider: (provider: WebSearchProvider) => Promise<void>;
}

export function WebSearchTab({
  settings,
  onUpdate,
  onUpdateApiKey,
  onTextInputFocus,
  onValidateWebSearchProvider,
}: WebSearchTabProps) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const webSearchModeOptions: {
    value: WebSearchMode;
    label: string;
    description: string;
  }[] = [
    {
      value: "off",
      label: t("webSearchModeOff"),
      description: t("webSearchModeOffDescription"),
    },
    {
      value: "auto",
      label: t("webSearchModeAuto"),
      description: t("webSearchModeAutoDescription"),
    },
    {
      value: "on",
      label: t("webSearchModeOn"),
      description: t("webSearchModeOnDescription"),
    },
  ];
  const [selectedCatalogProviderId, setSelectedCatalogProviderId] = React.useState(
    getCatalogProviderIdForAppProvider(
      settings.webSearchProvider ?? DEFAULT_WEB_SEARCH_PROVIDER,
    ),
  );
  const [apiKeyVisible, setApiKeyVisible] = React.useState(false);
  const [validationStateByProvider, setValidationStateByProvider] =
    React.useState<Partial<Record<WebSearchProvider, ProviderValidationState>>>(
      {},
    );

  React.useEffect(() => {
    setSelectedCatalogProviderId(
      getCatalogProviderIdForAppProvider(
        settings.webSearchProvider ?? DEFAULT_WEB_SEARCH_PROVIDER,
      ),
    );
  }, [settings.webSearchProvider]);

  const selectedProvider =
    (getAppProviderForCatalogProviderId(
      selectedCatalogProviderId,
    ) as WebSearchProvider | null) ?? DEFAULT_WEB_SEARCH_PROVIDER;
  const selectedProviderSettings = settings.webSearchProviderSettings[selectedProvider];
  const selectedProviderControlSupport =
    getWebSearchProviderControlSupport(selectedProvider);
  const selectedModel = getWebSearchProviderModel(selectedProvider);
  const selectedApiKey = settings.apiKeys[selectedProvider] ?? "";
  const trimmedApiKey = selectedApiKey.trim();
  const selectedSettingsKey = JSON.stringify(selectedProviderSettings);
  const storedValidationState = validationStateByProvider[selectedProvider];
  const validationState =
    storedValidationState?.apiKey === trimmedApiKey &&
    storedValidationState?.model === selectedModel &&
    storedValidationState?.configKey === selectedSettingsKey
      ? storedValidationState
      : { status: "idle" as const };

  React.useEffect(() => {
    setApiKeyVisible(false);
  }, [selectedProvider]);

  const handleSelectProvider = React.useCallback(
    (catalogProviderId: string) => {
      setSelectedCatalogProviderId(catalogProviderId);
      const runtimeProvider = getAppProviderForCatalogProviderId(catalogProviderId);

      if (!runtimeProvider) {
        return;
      }

      onUpdate({ webSearchProvider: runtimeProvider as WebSearchProvider });
    },
    [onUpdate],
  );

  const handleValidateProvider = React.useCallback(async () => {
    setValidationStateByProvider((previous) => ({
      ...previous,
      [selectedProvider]: {
        status: "validating",
        apiKey: trimmedApiKey,
        configKey: selectedSettingsKey,
        model: selectedModel,
      },
    }));

    try {
      await onValidateWebSearchProvider(selectedProvider);
      setValidationStateByProvider((previous) => ({
        ...previous,
        [selectedProvider]: {
          status: "success",
          message: t("providerValidationSuccess", {
            provider: PROVIDER_LABELS[selectedProvider],
          }),
          apiKey: trimmedApiKey,
          configKey: selectedSettingsKey,
          model: selectedModel,
        },
      }));
    } catch (error) {
      setValidationStateByProvider((previous) => ({
        ...previous,
        [selectedProvider]: {
          status: "error",
          message:
            error instanceof Error ? error.message : t("providerValidationFailed"),
          apiKey: trimmedApiKey,
          configKey: selectedSettingsKey,
          model: selectedModel,
        },
      }));
    }
  }, [
    onValidateWebSearchProvider,
    selectedModel,
    selectedProvider,
    selectedSettingsKey,
    t,
    trimmedApiKey,
  ]);

  const updateSelectedProviderSettings = React.useCallback(
    (
      partial: Partial<Settings["webSearchProviderSettings"][WebSearchProvider]>,
    ) => {
      onUpdate({
        webSearchProviderSettings: {
          ...settings.webSearchProviderSettings,
          [selectedProvider]: {
            ...selectedProviderSettings,
            ...partial,
          },
        },
      });
    },
    [onUpdate, selectedProvider, selectedProviderSettings, settings.webSearchProviderSettings],
  );
  const getWebSearchProviderHealthState = React.useCallback(
    (provider: WebSearchProvider) => {
      const apiKey = settings.apiKeys[provider].trim();

      if (!apiKey) {
        return "unconfigured" as const;
      }

      const providerValidationState = validationStateByProvider[provider];
      const providerModel = getWebSearchProviderModel(provider);
      const providerSettingsKey = JSON.stringify(
        settings.webSearchProviderSettings[provider],
      );
      const stateMatchesCurrentConfig =
        providerValidationState?.apiKey === apiKey &&
        providerValidationState?.model === providerModel &&
        providerValidationState?.configKey === providerSettingsKey;

      if (!stateMatchesCurrentConfig || !providerValidationState) {
        return "configured" as const;
      }

      if (providerValidationState.status === "validating") {
        return "validating" as const;
      }

      if (providerValidationState.status === "success") {
        return "healthy" as const;
      }

      if (providerValidationState.status === "error") {
        return "failing" as const;
      }

      return "configured" as const;
    },
    [settings.apiKeys, settings.webSearchProviderSettings, validationStateByProvider],
  );

  return (
    <>
      <RadioGroup
        label={t("webSearchMode")}
        options={webSearchModeOptions}
        value={settings.webSearchMode}
        onChange={(value) => onUpdate({ webSearchMode: value })}
      />

      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: colors.surfaceElevated,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t("webSearchProvider")}
        </Text>
        <ProviderSelectionGrid
          settings={settings}
          selectedCatalogProviderId={selectedCatalogProviderId}
          visibleProviders={WEB_SEARCH_PROVIDER_IDS}
          includeCatalogOnly={false}
          getProviderHealthState={getWebSearchProviderHealthState}
          onSelectCatalogProvider={handleSelectProvider}
        />
        <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 0 }]}>
          {t("webSearchProviderHint")}
        </Text>
        <Text style={[styles.sectionHint, { color: colors.textMuted }]}>
          {t("webSearchModelHint", { model: selectedModel })}
        </Text>
      </View>

      <ProviderApiKeyCard
        catalogProviderId={getCatalogProviderIdForAppProvider(selectedProvider)}
        runtimeProvider={selectedProvider}
        apiKey={selectedApiKey}
        apiKeyVisible={apiKeyVisible}
        secureApiKey={trimmedApiKey.length > 0 && !apiKeyVisible}
        validationState={validationState}
        shouldShowValidateAction={
          trimmedApiKey.length > 0 && validationState.status !== "success"
        }
        onOpenProviderPortal={() => {
          void Linking.openURL(PROVIDER_API_KEY_URLS[selectedProvider]);
        }}
        onUpdateApiKey={(provider, apiKey) =>
          onUpdateApiKey(provider as WebSearchProvider, apiKey)
        }
        onTextInputFocus={onTextInputFocus}
        onToggleApiKeyVisibility={() =>
          setApiKeyVisible((previous) => !previous)
        }
        onValidateProvider={handleValidateProvider}
        showCatalogSummary={false}
      />

      {selectedProviderControlSupport.resultLimit ||
      selectedProviderControlSupport.depth ||
      selectedProviderControlSupport.searchMode ? (
        <PickerSection>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            {t("webSearchQualityControls")}
          </Text>
          {selectedProviderControlSupport.searchMode ? (
            <Picker
              label={t("webSearchSearchMode")}
              value={selectedProviderSettings.searchMode}
              options={[
                {
                  value: "quick",
                  label: t("webSearchSearchModeQuick"),
                },
                {
                  value: "balanced",
                  label: t("webSearchSearchModeBalanced"),
                },
                {
                  value: "deep",
                  label: t("webSearchSearchModeDeep"),
                },
              ]}
              onChange={(value) =>
                updateSelectedProviderSettings({
                  searchMode: value as WebSearchSearchMode,
                })
              }
            />
          ) : null}
          {selectedProviderControlSupport.depth ? (
            <Picker
              label={t("webSearchDepth")}
              value={selectedProviderSettings.depth}
              options={[
                {
                  value: "standard",
                  label: t("webSearchDepthStandard"),
                },
                {
                  value: "deep",
                  label: t("webSearchDepthDeep"),
                },
              ]}
              onChange={(value) =>
                updateSelectedProviderSettings({
                  depth: value as WebSearchDepth,
                })
              }
            />
          ) : null}
          {selectedProviderControlSupport.resultLimit ? (
            <Picker
              label={t("webSearchResultCount")}
              value={String(selectedProviderSettings.resultLimit)}
              options={["3", "5", "8"].map((value) => ({
                value,
                label: value,
              }))}
              onChange={(value) =>
                updateSelectedProviderSettings({
                  resultLimit: Number(value) as 3 | 5 | 8,
                })
              }
            />
          ) : null}
          <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 0 }]}>
            {t("webSearchQualityHint", {
              provider: PROVIDER_LABELS[selectedProvider],
            })}
          </Text>
        </PickerSection>
      ) : (
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            {t("webSearchQualityControls")}
          </Text>
          <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 0 }]}>
            {t("webSearchNoExtraControls", {
              provider: PROVIDER_LABELS[selectedProvider],
            })}
          </Text>
        </View>
      )}

      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: colors.surfaceElevated,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t("webSearch")}
        </Text>
        <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 0 }]}>
          {t("webSearchHomeHint")}
        </Text>
      </View>
    </>
  );
}

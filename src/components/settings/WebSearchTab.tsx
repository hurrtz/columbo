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
  getWebSearchProviderModel,
  type WebSearchProvider,
  WEB_SEARCH_PROVIDER_IDS,
} from "../../constants/webSearch";
import { useLocalization } from "../../i18n";
import type { Settings } from "../../types";
import { useTheme } from "../../theme/ThemeContext";

import {
  ProviderApiKeyCard,
  ProviderSelectionGrid,
} from "./ProvidersSections";
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
  const selectedModel = getWebSearchProviderModel(selectedProvider);
  const selectedApiKey = settings.apiKeys[selectedProvider] ?? "";
  const trimmedApiKey = selectedApiKey.trim();
  const storedValidationState = validationStateByProvider[selectedProvider];
  const validationState =
    storedValidationState?.apiKey === trimmedApiKey &&
    storedValidationState?.model === selectedModel
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
          model: selectedModel,
        },
      }));
    }
  }, [
    onValidateWebSearchProvider,
    selectedModel,
    selectedProvider,
    t,
    trimmedApiKey,
  ]);

  return (
    <>
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

import React, { useMemo } from "react";
import { Text, View } from "react-native";

import type { CatalogProviderId } from "../../catalog/types";
import { useLocalization } from "../../i18n";
import {
  Provider,
  ResponseMode,
  ResponseModeRoute,
  Settings,
} from "../../types";
import { useTheme } from "../../theme/ThemeContext";
import {
  PROVIDER_LLM_SUPPORT,
  PROVIDER_ORDER,
  PROVIDER_STT_SUPPORT,
  PROVIDER_TTS_SUPPORT,
} from "../../constants/models";
import { getEnabledProviders } from "../../utils/providerCapabilities";

import {
  ProviderApiKeyCard,
  ProviderSelectionGrid,
  ResponseModesSection,
} from "./ProvidersSections";
import { styles } from "./styles";
import { TextInputFocusHandler } from "./types";
import { useProvidersTabState } from "./useProvidersTabState";

interface ProvidersTabProps {
  settings: Settings;
  focusProvider?: Provider;
  focusCatalogProviderId?: CatalogProviderId;
  onUpdateResponseModeRoute: (
    mode: ResponseMode,
    route: ResponseModeRoute,
  ) => void;
  onAddResponseMode: () => void;
  onRemoveResponseMode: (mode: ResponseMode) => void;
  onUpdateApiKey: (provider: Provider, apiKey: string) => void;
  onTextInputFocus: TextInputFocusHandler;
  onValidateProvider: (provider: Provider) => Promise<void>;
}

export function ProvidersTab({
  settings,
  focusProvider,
  focusCatalogProviderId,
  onUpdateResponseModeRoute,
  onAddResponseMode,
  onRemoveResponseMode,
  onUpdateApiKey,
  onTextInputFocus,
  onValidateProvider,
}: ProvidersTabProps) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const enabledProviders = useMemo(() => getEnabledProviders(settings), [settings]);
  const providerGridProviders = useMemo(
    () =>
      PROVIDER_ORDER.filter(
        (provider) =>
          PROVIDER_LLM_SUPPORT[provider] === "provider" ||
          PROVIDER_STT_SUPPORT[provider] === "provider" ||
          PROVIDER_TTS_SUPPORT[provider] === "provider",
      ),
    [],
  );
  const {
    selectedCatalogProviderId,
    setSelectedCatalogProviderId,
    selectedRuntimeProvider,
    apiKeyVisible,
    setApiKeyVisible,
    selectedProviderApiKey,
    validationState,
    shouldShowValidateAction,
    secureApiKey,
    getProviderHealthState,
    handleOpenProviderPortal,
    handleValidateProviderKey,
  } = useProvidersTabState({
    settings,
    focusProvider,
    focusCatalogProviderId,
    onValidateProvider,
  });

  return (
    <>
      <ResponseModesSection
        settings={settings}
        enabledProviders={enabledProviders}
        onUpdateResponseModeRoute={onUpdateResponseModeRoute}
        onAddResponseMode={onAddResponseMode}
        onRemoveResponseMode={onRemoveResponseMode}
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
          {t("providers")}
        </Text>

        <ProviderSelectionGrid
          settings={settings}
          selectedCatalogProviderId={selectedCatalogProviderId}
          visibleProviders={providerGridProviders}
          getProviderHealthState={getProviderHealthState}
          onSelectCatalogProvider={setSelectedCatalogProviderId}
        />

        <ProviderApiKeyCard
          catalogProviderId={selectedCatalogProviderId}
          runtimeProvider={selectedRuntimeProvider}
          apiKey={selectedProviderApiKey}
          apiKeyVisible={apiKeyVisible}
          secureApiKey={secureApiKey}
          validationState={validationState}
          shouldShowValidateAction={shouldShowValidateAction}
          onOpenProviderPortal={handleOpenProviderPortal}
          onUpdateApiKey={onUpdateApiKey}
          onTextInputFocus={onTextInputFocus}
          onToggleApiKeyVisibility={() =>
            setApiKeyVisible((previous) => !previous)
          }
          onValidateProvider={handleValidateProviderKey}
        />
      </View>
    </>
  );
}

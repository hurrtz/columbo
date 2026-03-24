import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { getCatalogProviderEntry, listCatalogProviders } from "../../catalog";
import { APP_PROVIDER_CATALOG_IDS } from "../../catalog/appProviders";
import {
  PROVIDER_LABELS,
  PROVIDER_MODELS,
  PROVIDER_ORDER,
  getProviderApiKeyHint,
  getProviderApiKeyPlaceholder,
} from "../../constants/models";
import { useLocalization } from "../../i18n";
import {
  Provider,
  ResponseMode,
  ResponseModeRoute,
  Settings,
} from "../../types";
import { useTheme } from "../../theme/ThemeContext";
import {
  getDefaultModelForProvider,
  isValidModelForProvider,
  RESPONSE_MODE_ORDER,
} from "../../utils/responseModes";
import { Picker } from "../Picker";
import { ProviderIcon } from "../ProviderIcon";

import {
  getResponseModeDescription,
  getResponseModeLabel,
  renderProviderPickerOptions,
} from "./helpers";
import { styles } from "./styles";
import {
  ProviderValidationState,
  TextInputFocusHandler,
} from "./types";

export function ResponseModesSection({
  settings,
  enabledProviders,
  onUpdateResponseModeRoute,
}: {
  settings: Settings;
  enabledProviders: Provider[];
  onUpdateResponseModeRoute: (
    mode: ResponseMode,
    route: ResponseModeRoute,
  ) => void;
}) {
  const { colors } = useTheme();
  const { t } = useLocalization();

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
        {t("responseModes")}
      </Text>

      <View style={styles.responseModeList}>
        {RESPONSE_MODE_ORDER.map((mode, index) => {
          const route = settings.responseModes[mode];

          return (
            <View
              key={mode}
              style={[
                styles.responseModeItem,
                {
                  borderTopColor: colors.border,
                  borderTopWidth: index === 0 ? 0 : 1,
                  paddingBottom:
                    index === RESPONSE_MODE_ORDER.length - 1 ? 4 : 18,
                  paddingTop: index === 0 ? 8 : 20,
                },
              ]}
            >
              <View style={styles.responseModeCopy}>
                <Text style={[styles.responseModeTitle, { color: colors.text }]}>
                  {getResponseModeLabel(mode, t)}
                </Text>
                <Text
                  style={[
                    styles.responseModeDescription,
                    { color: colors.textMuted },
                  ]}
                >
                  {getResponseModeDescription(mode, t)}
                </Text>
              </View>

              <Picker
                label={t("provider")}
                dropdownLabel={t("provider")}
                hideLabel
                containerStyle={styles.responseModePicker}
                value={route.provider}
                options={renderProviderPickerOptions(enabledProviders)}
                disabled={enabledProviders.length === 0}
                onChange={(value) => {
                  const nextProvider = value as Provider;
                  const preferredModel = settings.providerModels[nextProvider];
                  const nextModel = isValidModelForProvider(
                    nextProvider,
                    preferredModel,
                  )
                    ? preferredModel
                    : getDefaultModelForProvider(nextProvider);

                  onUpdateResponseModeRoute(mode, {
                    provider: nextProvider,
                    model: nextModel,
                  });
                }}
              />

              <Picker
                label={t("model")}
                dropdownLabel={t("model")}
                hideLabel
                containerStyle={styles.responseModePickerLast}
                value={route.model}
                options={PROVIDER_MODELS[route.provider].map((model) => ({
                  value: model.id,
                  label: model.name,
                }))}
                onChange={(value) =>
                  onUpdateResponseModeRoute(mode, {
                    ...route,
                    model: value,
                  })
                }
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function ProviderSelectionGrid({
  settings,
  selectedCatalogProviderId,
  onSelectCatalogProvider,
}: {
  settings: Settings;
  selectedCatalogProviderId: string;
  onSelectCatalogProvider: (catalogProviderId: string) => void;
}) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const runtimeProviderIds = React.useMemo(
    () => new Set(Object.values(APP_PROVIDER_CATALOG_IDS)),
    [],
  );
  const catalogProviders = React.useMemo(() => {
    const providersById = new Map(
      listCatalogProviders().map((provider) => [provider.providerId, provider]),
    );

    const runtimeButtons = PROVIDER_ORDER.map((provider) => {
      const providerId = APP_PROVIDER_CATALOG_IDS[provider];
      const catalogProvider = providersById.get(providerId);

      return {
        key: providerId,
        label: PROVIDER_LABELS[provider],
        iconProvider: provider,
        runtimeProvider: provider,
        providerId,
        providerName: catalogProvider?.providerName ?? PROVIDER_LABELS[provider],
        catalogOnly: false,
      };
    });

    const catalogOnlyButtons = listCatalogProviders()
      .filter((provider) => !runtimeProviderIds.has(provider.providerId))
      .sort((left, right) =>
        left.providerName.localeCompare(right.providerName),
      )
      .map((provider) => ({
        key: provider.providerId,
        label: provider.providerName,
        iconProvider: provider.providerId,
        runtimeProvider: null,
        providerId: provider.providerId,
        providerName: provider.providerName,
        catalogOnly: true,
      }));

    return [...runtimeButtons, ...catalogOnlyButtons];
  }, [runtimeProviderIds]);
  const catalogOnlyProviderCount = catalogProviders.filter(
    (provider) => provider.catalogOnly,
  ).length;

  return (
    <>
      <View style={styles.providerButtonGrid}>
        {catalogProviders.map((providerButton) => {
          const runtimeProvider = providerButton.runtimeProvider;
          const active = providerButton.providerId === selectedCatalogProviderId;
          const configured =
            runtimeProvider !== null &&
            settings.apiKeys[runtimeProvider].trim().length > 0;

          return (
            <Pressable
              key={providerButton.key}
              style={[
                styles.providerButton,
                {
                  backgroundColor: active
                    ? colors.accentSoft
                    : configured
                      ? colors.surface
                      : colors.surfaceElevated,
                  borderColor: active
                    ? colors.accent
                    : configured
                      ? colors.borderStrong
                      : colors.border,
                  shadowColor: active
                    ? colors.accent
                    : configured
                      ? colors.glow
                      : "transparent",
                  opacity: providerButton.catalogOnly ? 0.84 : 1,
                },
              ]}
              onPress={() => onSelectCatalogProvider(providerButton.providerId)}
              accessibilityRole="button"
              accessibilityLabel={
                runtimeProvider
                  ? t("openProviderSettings", {
                      provider: providerButton.label,
                    })
                  : t("openProviderCatalogDetails", {
                      provider: providerButton.label,
                    })
              }
              accessibilityState={{ selected: active }}
            >
              <ProviderIcon
                provider={providerButton.iconProvider}
                label={providerButton.providerName}
                color={active || configured ? colors.text : colors.textSecondary}
              />
              {configured ? (
                <View
                  style={[
                    styles.providerButtonBadge,
                    {
                      backgroundColor: active ? colors.surface : colors.accent,
                      borderColor: colors.borderStrong,
                    },
                  ]}
                >
                  <Feather
                    name="check"
                    size={10}
                    color={active ? colors.accent : colors.surface}
                  />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {catalogOnlyProviderCount > 0 ? (
        <Text style={[styles.sectionHint, { color: colors.textMuted }]}>
          {t("catalogOnlyProvidersHint", {
            count: catalogOnlyProviderCount,
          })}
        </Text>
      ) : null}
    </>
  );
}

export function ProviderApiKeyCard({
  catalogProviderId,
  runtimeProvider,
  apiKey,
  apiKeyVisible,
  secureApiKey,
  validationState,
  shouldShowValidateAction,
  onOpenProviderPortal,
  onUpdateApiKey,
  onTextInputFocus,
  onToggleApiKeyVisibility,
  onValidateProvider,
}: {
  catalogProviderId: string;
  runtimeProvider: Provider | null;
  apiKey: string;
  apiKeyVisible: boolean;
  secureApiKey: boolean;
  validationState: ProviderValidationState;
  shouldShowValidateAction: boolean;
  onOpenProviderPortal: () => void;
  onUpdateApiKey: (provider: Provider, apiKey: string) => void;
  onTextInputFocus: TextInputFocusHandler;
  onToggleApiKeyVisibility: () => void;
  onValidateProvider: () => Promise<void>;
}) {
  const { colors } = useTheme();
  const { t, language } = useLocalization();
  const catalogEntry = getCatalogProviderEntry(catalogProviderId);

  if (!runtimeProvider && catalogEntry) {
    const catalogModelGroups = [
      { key: "llm", label: "LLM", models: catalogEntry.llms },
      { key: "stt", label: t("stt"), models: catalogEntry.stt },
      { key: "tts", label: t("tts"), models: catalogEntry.tts },
    ] as const;

    return (
      <View
        style={[
          styles.apiKeyCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.apiKeyHeader}>
          <Text style={[styles.apiKeyTitle, { color: colors.text }]}>
            {catalogEntry.provider.providerName}
          </Text>
        </View>
        <Text style={[styles.apiKeyHint, { color: colors.textMuted }]}>
          {t("catalogProviderReadOnlyHint")}
        </Text>
        <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 10 }]}>
          {t("catalogProviderModelCounts", {
            llm: catalogEntry.llms.length,
            stt: catalogEntry.stt.length,
            tts: catalogEntry.tts.length,
          })}
        </Text>
        <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 8 }]}>
          {t("catalogProviderSupportSummary", {
            llm: catalogEntry.provider.verifiedSupport.llm,
            stt: catalogEntry.provider.verifiedSupport.stt,
            tts: catalogEntry.provider.verifiedSupport.tts,
          })}
        </Text>
        {catalogEntry.provider.integration.needsLiveDiscovery ? (
          <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 8 }]}>
            {t("catalogProviderLiveDiscoveryHint")}
          </Text>
        ) : null}
        {catalogEntry.provider.summaries.integrationNotes ? (
          <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 8 }]}>
            {catalogEntry.provider.summaries.integrationNotes}
          </Text>
        ) : null}
        <View style={styles.catalogModelGroups}>
          {catalogModelGroups.map((group) => (
            <View key={group.key} style={styles.catalogModelGroup}>
              <Text
                style={[
                  styles.catalogModelGroupTitle,
                  { color: colors.textSecondary },
                ]}
              >
                {group.label}
              </Text>
              {group.models.length > 0 ? (
                group.models.map((model) => (
                  <View
                    key={`${group.key}:${model.modelId}`}
                    style={styles.catalogModelItem}
                  >
                    <Text
                      style={[styles.catalogModelName, { color: colors.text }]}
                    >
                      {model.publicName}
                    </Text>
                    <Text
                      style={[
                        styles.catalogModelMeta,
                        { color: colors.textMuted },
                      ]}
                    >
                      {model.modelId}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 0 }]}>
                  {t("catalogProviderNoModels")}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (!runtimeProvider) {
    return null;
  }

  return (
    <View
      style={[
        styles.apiKeyCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.apiKeyHeader}>
        <Text style={[styles.apiKeyTitle, { color: colors.text }]}>
          {PROVIDER_LABELS[runtimeProvider]}
        </Text>
        <TouchableOpacity
          style={styles.apiKeyPortalLink}
          onPress={onOpenProviderPortal}
          accessibilityRole="link"
          accessibilityLabel={t("createProviderApiKey", {
            provider: PROVIDER_LABELS[runtimeProvider],
          })}
          activeOpacity={0.75}
        >
          <Text style={[styles.apiKeyPortalLinkText, { color: colors.accent }]}>
            {t("createApiKey")}
          </Text>
          <Feather name="external-link" size={13} color={colors.accent} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.apiKeyHint, { color: colors.textMuted }]}>
        {getProviderApiKeyHint(runtimeProvider, language)}
      </Text>
      <View style={styles.apiKeyInputRow}>
        <TextInput
          value={apiKey}
          onChangeText={(value) => onUpdateApiKey(runtimeProvider, value)}
          onFocus={onTextInputFocus}
          placeholder={getProviderApiKeyPlaceholder(runtimeProvider, language)}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.accent}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="password"
          importantForAutofill="no"
          spellCheck={false}
          contextMenuHidden={false}
          selectTextOnFocus={apiKeyVisible}
          keyboardType="ascii-capable"
          returnKeyType="done"
          secureTextEntry={secureApiKey}
          style={[
            styles.apiKeyInput,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
        />
        <TouchableOpacity
          style={[
            styles.apiKeyVisibilityButton,
            {
              backgroundColor: colors.surface,
            },
          ]}
          onPress={onToggleApiKeyVisibility}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={apiKeyVisible ? t("hideKey") : t("showKey")}
        >
          <Feather
            name={apiKeyVisible ? "eye-off" : "eye"}
            size={16}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      {shouldShowValidateAction ? (
        <View style={styles.apiKeyMetaRow}>
          <TouchableOpacity
            style={[
              styles.apiKeyValidateLink,
              validationState.status === "validating"
                ? styles.apiKeyValidateLinkDisabled
                : null,
            ]}
            onPress={() => {
              void onValidateProvider();
            }}
            activeOpacity={0.75}
            disabled={validationState.status === "validating"}
          >
            <Text style={[styles.apiKeyValidateText, { color: colors.accent }]}>
              {validationState.status === "validating"
                ? t("validatingKey")
                : t("validateKey")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <Text
        style={[
          styles.sectionHint,
          {
            color: colors.textMuted,
            marginTop: shouldShowValidateAction ? 8 : 10,
          },
        ]}
      >
        {t("apiKeyProtectedHint")}
      </Text>
      {validationState.status !== "idle" && validationState.message ? (
        <View
          style={[
            styles.validationCard,
            {
              backgroundColor:
                validationState.status === "success"
                  ? colors.accentSoft
                  : colors.surfaceElevated,
              borderColor:
                validationState.status === "success"
                  ? colors.borderStrong
                  : validationState.status === "error"
                    ? colors.danger
                    : colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.validationText,
              {
                color:
                  validationState.status === "success"
                    ? colors.accent
                    : validationState.status === "error"
                      ? colors.danger
                      : colors.textSecondary,
              },
            ]}
          >
            {validationState.message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

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
import type { CatalogProviderId } from "../../catalog/types";
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
  ProviderHealthState,
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

export function ProviderSelectionGrid<TProvider extends Provider>({
  settings,
  selectedCatalogProviderId,
  onSelectCatalogProvider,
  visibleProviders: visibleProvidersProp,
  includeCatalogOnly = true,
  isConfigured,
  getProviderHealthState,
}: {
  settings: Settings;
  selectedCatalogProviderId: CatalogProviderId;
  onSelectCatalogProvider: (catalogProviderId: CatalogProviderId) => void;
  visibleProviders?: readonly TProvider[];
  includeCatalogOnly?: boolean;
  isConfigured?: (provider: TProvider) => boolean;
  getProviderHealthState?: (provider: TProvider) => ProviderHealthState;
}) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const visibleProviders = (visibleProvidersProp ??
    PROVIDER_ORDER) as readonly TProvider[];
  const runtimeProviderIds = React.useMemo(
    () =>
      new Set(
        visibleProviders.map((provider) => APP_PROVIDER_CATALOG_IDS[provider]),
      ),
    [visibleProviders],
  );
  const catalogProviders = React.useMemo(() => {
    const providersById = new Map(
      listCatalogProviders().map((provider) => [provider.providerId, provider]),
    );

    const runtimeButtons = visibleProviders.map((provider) => {
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

    const catalogOnlyButtons = includeCatalogOnly
      ? listCatalogProviders()
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
          }))
      : [];

    return [...runtimeButtons, ...catalogOnlyButtons];
  }, [includeCatalogOnly, runtimeProviderIds, visibleProviders]);
  const catalogOnlyProviderCount = catalogProviders.filter(
    (provider) => provider.catalogOnly,
  ).length;
  const healthSummary = visibleProviders.reduce(
    (summary, provider) => {
      const healthState = getProviderHealthState?.(provider);

      if (!healthState) {
        return summary;
      }

      summary[healthState] += 1;
      return summary;
    },
    {
      healthy: 0,
      configured: 0,
      validating: 0,
      failing: 0,
      unconfigured: 0,
    },
  );

  const getHealthBadge = (
    healthState: ProviderHealthState,
  ):
    | {
        icon: React.ComponentProps<typeof Feather>["name"];
        backgroundColor: string;
        borderColor: string;
        iconColor: string;
      }
    | null => {
    switch (healthState) {
      case "healthy":
        return {
          icon: "check",
          backgroundColor: colors.accent,
          borderColor: colors.borderStrong,
          iconColor: colors.surface,
        };
      case "validating":
        return {
          icon: "loader",
          backgroundColor: colors.surface,
          borderColor: colors.borderStrong,
          iconColor: colors.accent,
        };
      case "failing":
        return {
          icon: "alert-triangle",
          backgroundColor: colors.surface,
          borderColor: colors.danger,
          iconColor: colors.danger,
        };
      case "configured":
        return {
          icon: "minus",
          backgroundColor: colors.surface,
          borderColor: colors.borderStrong,
          iconColor: colors.textSecondary,
        };
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.providerButtonGrid}>
        {catalogProviders.map((providerButton) => {
          const runtimeProvider = providerButton.runtimeProvider;
          const active = providerButton.providerId === selectedCatalogProviderId;
          const healthState =
            runtimeProvider !== null
              ? getProviderHealthState?.(runtimeProvider) ??
                (isConfigured
                  ? isConfigured(runtimeProvider)
                    ? "configured"
                    : "unconfigured"
                  : settings.apiKeys[runtimeProvider].trim().length > 0
                    ? "configured"
                    : "unconfigured")
              : null;
          const configured =
            runtimeProvider !== null && healthState !== "unconfigured";
          const healthBadge =
            healthState && runtimeProvider
              ? getHealthBadge(healthState)
              : null;

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
              {healthBadge ? (
                <View
                  style={[
                    styles.providerButtonBadge,
                    {
                      backgroundColor: healthBadge.backgroundColor,
                      borderColor: healthBadge.borderColor,
                    },
                  ]}
                >
                  <Feather
                    name={healthBadge.icon}
                    size={10}
                    color={healthBadge.iconColor}
                  />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {getProviderHealthState ? (
        <View style={styles.providerHealthSummary}>
          <View
            style={[
              styles.providerHealthPill,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderStrong,
              },
            ]}
          >
            <Text style={[styles.providerHealthPillText, { color: colors.text }]}>
              {t("providerHealthSummaryReady", { count: healthSummary.healthy })}
            </Text>
          </View>
          <View
            style={[
              styles.providerHealthPill,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderStrong,
              },
            ]}
          >
            <Text
              style={[styles.providerHealthPillText, { color: colors.textSecondary }]}
            >
              {t("providerHealthSummaryConfigured", {
                count: healthSummary.configured,
              })}
            </Text>
          </View>
          <View
            style={[
              styles.providerHealthPill,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderStrong,
              },
            ]}
          >
            <Text
              style={[styles.providerHealthPillText, { color: colors.textSecondary }]}
            >
              {t("providerHealthSummaryChecking", {
                count: healthSummary.validating,
              })}
            </Text>
          </View>
          <View
            style={[
              styles.providerHealthPill,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderStrong,
              },
            ]}
          >
            <Text
              style={[styles.providerHealthPillText, { color: colors.danger }]}
            >
              {t("providerHealthSummaryFailing", {
                count: healthSummary.failing,
              })}
            </Text>
          </View>
          <View
            style={[
              styles.providerHealthPill,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[styles.providerHealthPillText, { color: colors.textMuted }]}
            >
              {t("providerHealthSummaryMissing", {
                count: healthSummary.unconfigured,
              })}
            </Text>
          </View>
        </View>
      ) : null}

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

type CatalogProviderEntryData = NonNullable<
  ReturnType<typeof getCatalogProviderEntry>
>;

function hasMeaningfulCatalogSummary(
  summary?: string | null,
): summary is string {
  if (!summary) {
    return false;
  }

  const normalized = summary.trim().toLowerCase();
  return normalized.length > 0 && normalized !== "unknown" && normalized !== "unknown.";
}

function CatalogProviderSummary({
  catalogEntry,
  readOnly,
}: {
  catalogEntry: CatalogProviderEntryData;
  readOnly: boolean;
}) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const catalogModelGroups = [
    { key: "llm", label: "LLM", models: catalogEntry.llms },
    { key: "stt", label: t("stt"), models: catalogEntry.stt },
    { key: "tts", label: t("tts"), models: catalogEntry.tts },
  ] as const;
  const summaryLines = [
    hasMeaningfulCatalogSummary(catalogEntry.provider.summaries.pricing)
      ? t("catalogProviderPricingSummary", {
          summary: catalogEntry.provider.summaries.pricing,
        })
      : null,
    hasMeaningfulCatalogSummary(catalogEntry.provider.summaries.limits)
      ? t("catalogProviderLimitsSummary", {
          summary: catalogEntry.provider.summaries.limits,
        })
      : null,
    hasMeaningfulCatalogSummary(catalogEntry.provider.summaries.region)
      ? t("catalogProviderRegionSummary", {
          summary: catalogEntry.provider.summaries.region,
        })
      : null,
    hasMeaningfulCatalogSummary(catalogEntry.provider.summaries.sttLanguages)
      ? t("catalogProviderSttLanguagesSummary", {
          summary: catalogEntry.provider.summaries.sttLanguages,
        })
      : null,
    hasMeaningfulCatalogSummary(catalogEntry.provider.summaries.ttsLanguages)
      ? t("catalogProviderTtsLanguagesSummary", {
          summary: catalogEntry.provider.summaries.ttsLanguages,
        })
      : null,
    hasMeaningfulCatalogSummary(catalogEntry.provider.summaries.freeTier)
      ? t("catalogProviderFreeTierSummary", {
          summary: catalogEntry.provider.summaries.freeTier,
        })
      : null,
    hasMeaningfulCatalogSummary(catalogEntry.provider.summaries.integrationNotes)
      ? t("catalogProviderIntegrationNotesSummary", {
          summary: catalogEntry.provider.summaries.integrationNotes,
        })
      : null,
  ].filter((line): line is string => Boolean(line));

  return (
    <>
      {readOnly ? (
        <Text style={[styles.apiKeyHint, { color: colors.textMuted }]}>
          {t("catalogProviderReadOnlyHint")}
        </Text>
      ) : (
        <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 12 }]}>
          {t("catalogProviderReferenceHint")}
        </Text>
      )}
      <Text style={[styles.sectionHint, { color: colors.textMuted, marginTop: 8 }]}>
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
      {summaryLines.map((line) => (
        <Text
          key={line}
          style={[styles.sectionHint, { color: colors.textMuted, marginTop: 8 }]}
        >
          {line}
        </Text>
      ))}
      <View style={styles.catalogModelGroups}>
        {catalogModelGroups.map((group) => (
          <View key={group.key} style={styles.catalogModelGroup}>
            <Text
              style={[styles.catalogModelGroupTitle, { color: colors.textSecondary }]}
            >
              {group.label}
            </Text>
            {group.models.length > 0 ? (
              group.models.map((model) => (
                <View
                  key={`${group.key}:${model.modelId}`}
                  style={styles.catalogModelItem}
                >
                  <Text style={[styles.catalogModelName, { color: colors.text }]}>
                    {model.publicName}
                  </Text>
                  <Text
                    style={[styles.catalogModelMeta, { color: colors.textMuted }]}
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
  showCatalogSummary = true,
}: {
  catalogProviderId: CatalogProviderId;
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
  showCatalogSummary?: boolean;
}) {
  const { colors } = useTheme();
  const { t, language } = useLocalization();
  const catalogEntry = getCatalogProviderEntry(catalogProviderId);

  if (!runtimeProvider && catalogEntry) {
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
        <CatalogProviderSummary catalogEntry={catalogEntry} readOnly />
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
          textContentType="none"
          importantForAutofill="no"
          spellCheck={false}
          contextMenuHidden={false}
          selectTextOnFocus={apiKeyVisible}
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
      {catalogEntry && showCatalogSummary ? (
        <CatalogProviderSummary catalogEntry={catalogEntry} readOnly={false} />
      ) : null}
    </View>
  );
}

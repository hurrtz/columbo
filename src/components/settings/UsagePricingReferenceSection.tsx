import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { PROVIDER_LABELS } from "../../constants/models";
import {
  PRICING_ASSUMPTIONS,
  PRICING_ASSUMPTIONS_LAST_UPDATED,
} from "../../constants/usagePricing";
import { useLocalization } from "../../i18n";
import { useTheme } from "../../theme/ThemeContext";

import { PickerSection } from "./SettingsSectionPrimitives";
import { styles } from "./styles";

export function UsagePricingReferenceSection() {
  const { colors } = useTheme();
  const { t } = useLocalization();

  return (
    <PickerSection>
      <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>
        {t("pricingAssumptions")}
      </Text>
      <Text
        style={[
          styles.sectionHint,
          styles.pricingSectionHint,
          { color: colors.textMuted },
        ]}
      >
        {t("pricingAssumptionsHint", {
          date: PRICING_ASSUMPTIONS_LAST_UPDATED,
        })}
      </Text>
      <View style={styles.pricingAssumptionList}>
        {PRICING_ASSUMPTIONS.map((assumption) => (
          <View
            key={`${assumption.provider}:${assumption.modelLabel}`}
            style={[
              styles.pricingAssumptionRow,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.pricingAssumptionCopy}>
              <Text
                style={[styles.pricingAssumptionTitle, { color: colors.text }]}
              >
                {`${PROVIDER_LABELS[assumption.provider]} · ${assumption.modelLabel}`}
              </Text>
              <Text
                style={[
                  styles.pricingAssumptionMeta,
                  { color: colors.textSecondary },
                ]}
              >
                {t("pricingAssumptionRates", {
                  input: assumption.inputUsdPerMillion.toFixed(2),
                  output: assumption.outputUsdPerMillion.toFixed(2),
                })}
              </Text>
              <Text
                style={[
                  styles.pricingAssumptionMeta,
                  { color: colors.textMuted },
                ]}
              >
                {t("pricingAssumptionCheckedAt", {
                  date: assumption.checkedAt,
                })}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.pricingSourceButton,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                void Linking.openURL(assumption.sourceUrl);
              }}
              activeOpacity={0.85}
              accessibilityRole="link"
              accessibilityLabel={t("openPricingSource", {
                source: assumption.sourceLabel,
              })}
            >
              <Text
                style={[styles.pricingSourceButtonText, { color: colors.text }]}
              >
                {t("source")}
              </Text>
              <Feather name="external-link" size={14} color={colors.accent} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </PickerSection>
  );
}

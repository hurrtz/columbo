import React from "react";

import { useLocalization } from "../../i18n";
import { AppLanguage, Settings, ThemeMode } from "../../types";
import { Picker } from "../Picker";

import { PickerSection, RadioGroup } from "./shared";

interface UiTabProps {
  settings: Settings;
  onUpdate: (
    partial: Partial<Omit<Settings, "apiKeys" | "providerModels">>,
  ) => void;
}

export function UiTab({ settings, onUpdate }: UiTabProps) {
  const { t } = useLocalization();

  return (
    <>
      <RadioGroup<ThemeMode>
        label={t("theme")}
        options={[
          { value: "light", label: t("light") },
          { value: "dark", label: t("dark") },
          { value: "system", label: t("system") },
        ]}
        value={settings.theme}
        onChange={(value) => onUpdate({ theme: value })}
      />
      <PickerSection>
        <Picker
          label={t("language")}
          value={settings.language}
          options={[
            { value: "en", label: t("english") },
            { value: "de", label: t("german") },
          ]}
          onChange={(value) => onUpdate({ language: value as AppLanguage })}
        />
      </PickerSection>
      <RadioGroup<"show" | "hide">
        label={t("usageStats")}
        options={[
          {
            value: "hide",
            label: t("hide"),
            description: t("usageStatsHiddenDescription"),
          },
          {
            value: "show",
            label: t("show"),
            description: t("usageStatsVisibleDescription"),
          },
        ]}
        value={settings.showUsageStats ? "show" : "hide"}
        onChange={(value) => onUpdate({ showUsageStats: value === "show" })}
      />
      <RadioGroup<"show" | "hide">
        label={t("debugLogButton")}
        options={[
          {
            value: "hide",
            label: t("hide"),
            description: t("debugLogButtonHiddenDescription"),
          },
          {
            value: "show",
            label: t("show"),
            description: t("debugLogButtonVisibleDescription"),
          },
        ]}
        value={settings.showDebugLogButton ? "show" : "hide"}
        onChange={(value) =>
          onUpdate({ showDebugLogButton: value === "show" })
        }
        helperText={t("debugLogButtonUsageDescription")}
      />
    </>
  );
}

import { useCallback } from "react";

import { getProviderValidationTarget } from "../../components/settings/providerSupport";
import type { WebSearchProvider } from "../../constants/webSearch";
import { recordDebugLogEvent } from "../../services/debugLogCapture";
import { validateProviderConnection } from "../../services/llm";
import { validateTtsProviderConnection } from "../../services/providerValidation";
import { validateWebSearchConnection } from "../../services/webSearch";
import type { AppLanguage, Provider, Settings } from "../../types";
import { getProviderValidationModel } from "../../utils/responseModes";

export function useProviderConnectionValidation(params: {
  language: AppLanguage;
  settings: Settings;
}) {
  const { language, settings } = params;

  const validateProvider = useCallback(
    async (provider: Provider) => {
      const apiKey = settings.apiKeys[provider].trim();
      const target = getProviderValidationTarget(settings, provider);

      recordDebugLogEvent({
        event: "provider-validation-requested",
        payload: { provider, target: target.kind },
      });

      try {
        if (target.kind === "llm") {
          await validateProviderConnection({
            provider,
            model: getProviderValidationModel(settings, provider),
            apiKey,
            language,
          });
        } else if (target.kind === "tts") {
          let voice = "";
          try {
            const parsed = target.configKey ? JSON.parse(target.configKey) : null;
            voice = typeof parsed?.voice === "string" ? parsed.voice : "";
          } catch {
            voice = "";
          }

          await validateTtsProviderConnection({
            provider,
            model: target.model,
            voice,
            apiKey,
            language,
          });
        }

        recordDebugLogEvent({
          event: "provider-validation-succeeded",
          payload: { provider, target: target.kind },
        });
      } catch (error) {
        recordDebugLogEvent({
          event: "provider-validation-failed",
          level: "error",
          payload: {
            message: error instanceof Error ? error.message : String(error),
            provider,
            target: target.kind,
          },
        });
        throw error;
      }
    },
    [language, settings],
  );

  const validateWebSearchProvider = useCallback(
    async (provider: WebSearchProvider) => {
      const apiKey = settings.apiKeys[provider].trim();
      recordDebugLogEvent({
        event: "web-search-validation-requested",
        payload: { provider },
      });

      try {
        await validateWebSearchConnection({
          provider,
          apiKey,
          language,
          options: settings.webSearchProviderSettings[provider],
        });
        recordDebugLogEvent({
          event: "web-search-validation-succeeded",
          payload: { provider },
        });
      } catch (error) {
        recordDebugLogEvent({
          event: "web-search-validation-failed",
          level: "error",
          payload: {
            message: error instanceof Error ? error.message : String(error),
            provider,
          },
        });
        throw error;
      }
    },
    [language, settings.apiKeys, settings.webSearchProviderSettings],
  );

  return { validateProvider, validateWebSearchProvider };
}

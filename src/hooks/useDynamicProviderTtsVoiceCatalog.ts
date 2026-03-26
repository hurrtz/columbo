import { useEffect, useState } from "react";

import type { Provider } from "../types";
import {
  fetchDynamicProviderTtsVoiceOptions,
  providerHasDynamicTtsVoiceCatalog,
  subscribeToProviderTtsVoiceCatalog,
} from "../services/tts/voiceCatalog";

export function useDynamicProviderTtsVoiceCatalog(params: {
  provider?: Provider | null;
  apiKey?: string;
  enabled?: boolean;
}) {
  const { provider, apiKey, enabled = true } = params;
  const [, setVersion] = useState(0);

  useEffect(() => {
    return subscribeToProviderTtsVoiceCatalog(() => {
      setVersion((current) => current + 1);
    });
  }, []);

  useEffect(() => {
    if (
      !enabled ||
      !provider ||
      !providerHasDynamicTtsVoiceCatalog(provider) ||
      !apiKey?.trim()
    ) {
      return;
    }

    const controller = new AbortController();

    void fetchDynamicProviderTtsVoiceOptions({
      provider,
      apiKey,
      abortSignal: controller.signal,
    }).catch((error) => {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.warn("[tts-voice-catalog]", error);
    });

    return () => {
      controller.abort();
    };
  }, [apiKey, enabled, provider]);
}

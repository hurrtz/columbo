import { getTtsListenLanguageLabel } from "../constants/localTts";
import { translate } from "../i18n";
import {
  createSpeechRequestId,
  recordSpeechDiagnostic,
  SpeechDiagnosticsContext,
} from "./speech/diagnostics";
import {
  AppLanguage,
  LocalTtsVoiceSelections,
  Provider,
  TtsBackendMode,
  TtsListenLanguage,
} from "../types";
import {
  splitIntoSentences,
  splitTextForTts,
} from "./tts/chunking";
import {
  getResolvedLocalTtsSelection,
  trySynthesizeResolvedLocalSpeech,
} from "./tts/localRoute";
import { synthesizeProviderSpeech } from "./tts/providerRoute";
import {
  getProviderTtsTimeoutMs,
  getSelectedProviderModel,
  LOCAL_TTS_MAX_INPUT_CHARS,
  PROVIDER_TTS_MAX_INPUT_CHARS,
  PROVIDER_TTS_MAX_TIMEOUT_MS,
  PROVIDER_TTS_TIMEOUT_MS,
  PROVIDER_TTS_TIMEOUT_MS_PER_CHAR,
  TTS_PROVIDER_CONFIGS,
  TtsRequestError,
} from "./tts/shared";

export {
  getProviderTtsTimeoutMs,
  LOCAL_TTS_MAX_INPUT_CHARS,
  PROVIDER_TTS_MAX_INPUT_CHARS,
  PROVIDER_TTS_MAX_TIMEOUT_MS,
  PROVIDER_TTS_TIMEOUT_MS,
  PROVIDER_TTS_TIMEOUT_MS_PER_CHAR,
  splitIntoSentences,
  splitTextForTts,
  TtsRequestError,
};

function resolveProviderTtsModel(params: {
  provider?: Provider | null;
  providerModel?: string;
}) {
  if (!params.provider) {
    return null;
  }

  const config = TTS_PROVIDER_CONFIGS[params.provider];

  if (!config) {
    return params.providerModel?.trim() || null;
  }

  return getSelectedProviderModel({
    provider: params.provider,
    providerModel: params.providerModel,
    config,
  });
}

export async function synthesizeSpeech(params: {
  text: string;
  voice: string;
  mode: TtsBackendMode;
  provider?: Provider | null;
  providerModel?: string;
  apiKey?: string;
  language: AppLanguage;
  listenLanguages?: TtsListenLanguage[];
  localVoices?: LocalTtsVoiceSelections;
  diagnostics?: SpeechDiagnosticsContext;
  strictLocalVoice?: boolean;
  abortSignal?: AbortSignal;
  onProviderFallback?: (error: Error) => void;
}): Promise<string> {
  const {
    text,
    voice,
    mode,
    provider,
    providerModel,
    apiKey,
    language,
    listenLanguages,
    localVoices,
    diagnostics,
    strictLocalVoice,
    abortSignal,
    onProviderFallback,
  } = params;
  const requestId = diagnostics?.requestId ?? createSpeechRequestId("tts");
  const resolvedProviderModel = resolveProviderTtsModel({
    provider,
    providerModel,
  });

  recordSpeechDiagnostic({
    requestId,
    source: diagnostics?.source ?? "unknown",
    stage: "tts-requested",
    requestedRoute: mode,
    mode,
    provider: provider ?? null,
    providerModel: resolvedProviderModel,
    voice: voice || null,
    language: listenLanguages?.[0] ?? "app",
    textLength: text.trim().length,
  });

  if (mode === "native") {
    throw new Error(
      translate(language, "nativeTtsDoesNotSynthesizeAudioFiles"),
    );
  }

  if (mode === "local") {
    const localSelection = getResolvedLocalTtsSelection({
      text,
      language,
      listenLanguages,
      localVoices,
    });

    try {
      const localResult = await trySynthesizeResolvedLocalSpeech({
        text,
        language,
        listenLanguages,
        localVoices,
        diagnostics: {
          requestId,
          source: diagnostics?.source,
        },
        strictLocalVoice,
      });

      if (localResult) {
        recordSpeechDiagnostic({
          requestId,
          source: diagnostics?.source ?? "unknown",
          stage: "tts-succeeded",
          requestedRoute: "local",
          actualRoute: "local",
          language: localResult.resolvedLanguage,
          voice: localResult.voice,
          textLength: text.trim().length,
        });
        return localResult.audioPath;
      }
    } catch (error) {
      if (!provider || !apiKey?.trim()) {
        recordSpeechDiagnostic({
          requestId,
          source: diagnostics?.source ?? "unknown",
          stage: "tts-failed",
          requestedRoute: "local",
          actualRoute: "local",
          provider: provider ?? null,
          providerModel: resolvedProviderModel,
          voice: voice || null,
          textLength: text.trim().length,
          message: error instanceof Error ? error.message : String(error),
        });
        throw error;
      }

      recordSpeechDiagnostic({
        requestId,
        source: diagnostics?.source ?? "unknown",
        stage: "tts-fallback",
        requestedRoute: "local",
        actualRoute: "provider",
        provider,
        providerModel: resolvedProviderModel,
        voice: voice || null,
        textLength: text.trim().length,
        fallbackReason:
          error instanceof Error ? error.message : "Local synthesis failed.",
      });
    }

    if (provider && apiKey?.trim()) {
      const audioPath = await synthesizeProviderSpeech({
        text,
        voice,
        provider,
        providerModel,
        apiKey,
        language,
        abortSignal,
      });
      recordSpeechDiagnostic({
        requestId,
        source: diagnostics?.source ?? "unknown",
        stage: "tts-succeeded",
        requestedRoute: "local",
        actualRoute: "provider",
        provider,
        providerModel: resolvedProviderModel,
        voice: voice || null,
        textLength: text.trim().length,
      });
      return audioPath;
    }

    recordSpeechDiagnostic({
      requestId,
      source: diagnostics?.source ?? "unknown",
      stage: "tts-failed",
      requestedRoute: "local",
      actualRoute: "local",
      voice: voice || null,
      textLength: text.trim().length,
      fallbackReason: "No provider fallback configured.",
    });

    throw new Error(
      translate(language, "localTtsUnavailableForLanguage", {
        languageLabel: getTtsListenLanguageLabel(
          localSelection.resolvedLanguage,
          language,
        ),
      }),
    );
  }

  if (!provider) {
    try {
      const localResult = await trySynthesizeResolvedLocalSpeech({
        text,
        language,
        listenLanguages,
        localVoices,
        diagnostics: {
          requestId,
          source: diagnostics?.source,
        },
        strictLocalVoice,
      });

      if (localResult) {
        recordSpeechDiagnostic({
          requestId,
          source: diagnostics?.source ?? "unknown",
          stage: "tts-succeeded",
          requestedRoute: "provider",
          actualRoute: "local",
          language: localResult.resolvedLanguage,
          textLength: text.trim().length,
          fallbackReason: "No provider configured.",
        });
        return localResult.audioPath;
      }
    } catch {
      // Provider mode still falls through to the native fallback upstream if local is unavailable.
    }

    throw new Error(
      translate(language, "chooseTextToSpeechProviderInSettings"),
    );
  }

  try {
    const audioPath = await synthesizeProviderSpeech({
      text,
      voice,
      provider,
      providerModel,
      apiKey,
      language,
      abortSignal,
    });
    recordSpeechDiagnostic({
      requestId,
      source: diagnostics?.source ?? "unknown",
      stage: "tts-succeeded",
      requestedRoute: "provider",
      actualRoute: "provider",
      provider,
      providerModel: resolvedProviderModel,
      voice: voice || null,
      textLength: text.trim().length,
    });
    return audioPath;
  } catch (providerError) {
    const normalizedProviderError =
      providerError instanceof Error
        ? providerError
        : new Error(String(providerError));

    try {
      const localResult = await trySynthesizeResolvedLocalSpeech({
        text,
        language,
        listenLanguages,
        localVoices,
        diagnostics: {
          requestId,
          source: diagnostics?.source,
        },
        strictLocalVoice,
      });

      if (localResult) {
        onProviderFallback?.(normalizedProviderError);
        recordSpeechDiagnostic({
          requestId,
          source: diagnostics?.source ?? "unknown",
          stage: "tts-fallback",
          requestedRoute: "provider",
          actualRoute: "local",
          language: localResult.resolvedLanguage,
          provider,
          providerModel: resolvedProviderModel,
          voice: voice || null,
          textLength: text.trim().length,
          fallbackReason: normalizedProviderError.message,
        });
        return localResult.audioPath;
      }
    } catch {
      // Provider remains the primary mode here; fall through to native fallback upstream.
    }

    recordSpeechDiagnostic({
      requestId,
      source: diagnostics?.source ?? "unknown",
      stage: "tts-failed",
      requestedRoute: "provider",
      actualRoute: "provider",
      provider,
      providerModel: resolvedProviderModel,
      voice: voice || null,
      textLength: text.trim().length,
      message: normalizedProviderError.message,
    });

    throw normalizedProviderError;
  }
}

export async function synthesizeSpeechSequence(params: {
  text: string;
  voice: string;
  mode: TtsBackendMode;
  provider?: Provider | null;
  providerModel?: string;
  apiKey?: string;
  language: AppLanguage;
  listenLanguages?: TtsListenLanguage[];
  localVoices?: LocalTtsVoiceSelections;
  diagnostics?: SpeechDiagnosticsContext;
  abortSignal?: AbortSignal;
}) {
  const maxChars =
    params.mode === "local"
      ? LOCAL_TTS_MAX_INPUT_CHARS
      : PROVIDER_TTS_MAX_INPUT_CHARS;
  const segments = splitTextForTts(params.text, maxChars);

  if (segments.length === 0) {
    return [];
  }

  const audioFiles: string[] = [];

  for (const segment of segments) {
    audioFiles.push(
      await synthesizeSpeech({
        ...params,
        text: segment,
      }),
    );
  }

  return audioFiles;
}

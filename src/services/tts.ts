import { translate } from "../i18n";
import {
  createSpeechRequestId,
  recordSpeechDiagnostic,
  SpeechDiagnosticsContext,
} from "./speech/diagnostics";
import {
  AppLanguage,
  Provider,
  TtsBackendMode,
  TtsListenLanguage,
} from "../types";
import {
  splitIntoSentences,
  splitTextForTts,
} from "./tts/chunking";
import { synthesizeProviderSpeech } from "./tts/providerRoute";
import {
  getProviderTtsTimeoutMs,
  getSelectedProviderModel,
  PROVIDER_TTS_MAX_INPUT_CHARS,
  PROVIDER_TTS_MAX_TIMEOUT_MS,
  PROVIDER_TTS_TIMEOUT_MS,
  PROVIDER_TTS_TIMEOUT_MS_PER_CHAR,
  TTS_PROVIDER_CONFIGS,
  TtsRequestError,
} from "./tts/shared";

export {
  getProviderTtsTimeoutMs,
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
  diagnostics?: SpeechDiagnosticsContext;
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
    diagnostics,
    abortSignal,
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

  if (!provider) {
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
  diagnostics?: SpeechDiagnosticsContext;
  abortSignal?: AbortSignal;
}) {
  const segments = splitTextForTts(params.text, PROVIDER_TTS_MAX_INPUT_CHARS);

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

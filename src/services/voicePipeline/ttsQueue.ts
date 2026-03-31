import { createSpeechRequestId } from "../speech/diagnostics";
import type { SpeechDiagnosticSource } from "../speech/diagnostics";
import {
  LOCAL_TTS_MAX_INPUT_CHARS,
  PROVIDER_TTS_MAX_INPUT_CHARS,
  splitTextForTts,
  synthesizeSpeech,
} from "../tts";
import { extractCompleteSentences } from "./streaming";
import type { RunVoicePipelineParams } from "./types";

interface CreateVoicePipelineTtsQueueParams {
  abortSignal?: AbortSignal;
  callbacks: RunVoicePipelineParams["callbacks"];
  diagnosticsSource?: SpeechDiagnosticSource;
  language: RunVoicePipelineParams["language"];
  localTtsVoices?: RunVoicePipelineParams["localTtsVoices"];
  replyPlayback: RunVoicePipelineParams["replyPlayback"];
  spokenRepliesEnabled?: RunVoicePipelineParams["spokenRepliesEnabled"];
  ttsApiKey?: string;
  ttsListenLanguages?: RunVoicePipelineParams["ttsListenLanguages"];
  ttsMode: RunVoicePipelineParams["ttsMode"];
  ttsModel?: string;
  ttsProvider?: RunVoicePipelineParams["ttsProvider"];
  ttsVoice: string;
}

export function createVoicePipelineTtsQueue({
  abortSignal,
  callbacks,
  diagnosticsSource = "conversation",
  language,
  localTtsVoices,
  replyPlayback,
  spokenRepliesEnabled = true,
  ttsApiKey,
  ttsListenLanguages,
  ttsMode,
  ttsModel,
  ttsProvider,
  ttsVoice,
}: CreateVoicePipelineTtsQueueParams) {
  const STREAM_TTS_FOLLOW_UP_MIN_CHARS = 160;
  let sentenceBuffer = "";
  let streamReadyBuffer = "";
  let ttsChain = Promise.resolve();
  const ttsQueue: Promise<void>[] = [];
  let hasQueuedSpeech = false;
  let providerFallbackActivated = false;
  let fallbackNotified = false;
  const effectiveReplyPlayback = ttsMode === "local" ? "wait" : replyPlayback;
  const speechDiagnostics = {
    requestId: createSpeechRequestId(diagnosticsSource),
    source: diagnosticsSource,
    provider: ttsProvider ?? null,
    providerModel: ttsModel || null,
  };

  const notifyTtsFallback = (error: Error) => {
    if (fallbackNotified) {
      return;
    }

    fallbackNotified = true;
    callbacks.onTtsFallback?.(error);
  };

  const enqueueTtsChunk = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const task = ttsChain.then(async () => {
      if (abortSignal?.aborted) {
        return;
      }

      if (!spokenRepliesEnabled) {
        return;
      }

      if (ttsMode === "native") {
        callbacks.onSpeechTextReady(trimmed, undefined, speechDiagnostics);
        return;
      }

      const shouldUseProviderRoute =
        ttsMode === "provider" && !providerFallbackActivated;
      const mode =
        shouldUseProviderRoute
          ? "provider"
          : ttsMode === "provider"
            ? "local"
            : ttsMode;

      try {
        const audio = await synthesizeSpeech({
          text: trimmed,
          voice: ttsVoice,
          mode,
          provider: shouldUseProviderRoute ? ttsProvider : undefined,
          providerModel: shouldUseProviderRoute ? ttsModel : undefined,
          apiKey: shouldUseProviderRoute ? ttsApiKey : undefined,
          language,
          listenLanguages: ttsListenLanguages,
          localVoices: localTtsVoices,
          diagnostics: speechDiagnostics,
          onProviderFallback: (error) => {
            providerFallbackActivated = true;
            notifyTtsFallback(error);
          },
        });

        if (!abortSignal?.aborted) {
          callbacks.onAudioReady(audio, speechDiagnostics);
        }
      } catch (error) {
        const normalizedError =
          error instanceof Error ? error : new Error(String(error));

        if (shouldUseProviderRoute) {
          providerFallbackActivated = true;
        }

        notifyTtsFallback(normalizedError);

        if (!abortSignal?.aborted) {
          callbacks.onSpeechTextReady(trimmed, undefined, speechDiagnostics);
        }
      }
    });

    ttsChain = task.catch((error) => {
      callbacks.onError(
        error instanceof Error ? error : new Error(String(error)),
      );
    });
    ttsQueue.push(task.catch(() => undefined));
  };

  const enqueueTts = (text: string) => {
    if (!spokenRepliesEnabled) {
      return;
    }

    if (ttsMode === "native") {
      enqueueTtsChunk(text);
      return;
    }

    const segments = splitTextForTts(
      text,
      ttsMode === "local"
        ? LOCAL_TTS_MAX_INPUT_CHARS
        : PROVIDER_TTS_MAX_INPUT_CHARS,
    );

    if (segments.length === 0) {
      return;
    }

    hasQueuedSpeech = true;
    segments.forEach(enqueueTtsChunk);
  };

  const flushStreamReadyBuffer = (force = false) => {
    const trimmed = streamReadyBuffer.trim();

    if (!trimmed) {
      streamReadyBuffer = "";
      return;
    }

    if (
      !force &&
      hasQueuedSpeech &&
      trimmed.length < STREAM_TTS_FOLLOW_UP_MIN_CHARS &&
      !/\n\s*\n/.test(streamReadyBuffer)
    ) {
      return;
    }

    enqueueTts(streamReadyBuffer);
    streamReadyBuffer = "";
  };

  const handleStreamChunk = (text: string) => {
    callbacks.onChunk(text);

    if (effectiveReplyPlayback !== "stream") {
      return;
    }

    sentenceBuffer += text;
    const { completeSentences, remainder } =
      extractCompleteSentences(sentenceBuffer);

    if (completeSentences.length > 0) {
      streamReadyBuffer += completeSentences.join("");
      flushStreamReadyBuffer();
    }
    sentenceBuffer = remainder;
  };

  const handleResponseDone = async (fullText: string) => {
    if (effectiveReplyPlayback === "stream") {
      if (sentenceBuffer.trim()) {
        streamReadyBuffer += sentenceBuffer;
      }
      flushStreamReadyBuffer(true);
    } else {
      enqueueTts(fullText);
    }

    await Promise.all(ttsQueue);
  };

  return {
    handleResponseDone,
    handleStreamChunk,
  };
}

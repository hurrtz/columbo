import { createSpeechRequestId } from "../speech/diagnostics";
import type { SpeechDiagnosticSource } from "../speech/diagnostics";
import {
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
  fallbackToNativeOnProviderError?: boolean;
  language: RunVoicePipelineParams["language"];
  replyPlayback: RunVoicePipelineParams["replyPlayback"];
  spokenRepliesEnabled?: RunVoicePipelineParams["spokenRepliesEnabled"];
  ttsApiKey?: string;
  ttsListenLanguages?: RunVoicePipelineParams["ttsListenLanguages"];
  ttsMode: RunVoicePipelineParams["ttsMode"];
  ttsModel?: string;
  ttsProvider?: RunVoicePipelineParams["ttsProvider"];
  ttsVoice: string;
}

const PROVIDER_TTS_TARGET_CHUNK_CHARS = 1200;
const GEMINI_TTS_TARGET_CHUNK_CHARS = 450;

export function createVoicePipelineTtsQueue({
  abortSignal,
  callbacks,
  diagnosticsSource = "conversation",
  fallbackToNativeOnProviderError = true,
  language,
  replyPlayback,
  spokenRepliesEnabled = true,
  ttsApiKey,
  ttsListenLanguages,
  ttsMode,
  ttsModel,
  ttsProvider,
  ttsVoice,
}: CreateVoicePipelineTtsQueueParams) {
  let sentenceBuffer = "";
  let ttsChain = Promise.resolve();
  const ttsQueue: Promise<void>[] = [];
  let fallbackNotified = false;
  let fatalProviderError = false;
  let fatalProviderErrorNotified = false;
  let playbackRoute: "native" | "provider" | null =
    ttsMode === "native" ? "native" : null;
  const effectiveReplyPlayback = replyPlayback;
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

      if (fatalProviderError) {
        return;
      }

      if (!spokenRepliesEnabled) {
        return;
      }

      if (playbackRoute === "native") {
        callbacks.onSpeechTextReady(trimmed, undefined, speechDiagnostics);
        return;
      }

      try {
        const audio = await synthesizeSpeech({
          text: trimmed,
          voice: ttsVoice,
          mode: "provider",
          provider: ttsProvider,
          providerModel: ttsModel,
          apiKey: ttsApiKey,
          language,
          listenLanguages: ttsListenLanguages,
          diagnostics: speechDiagnostics,
          abortSignal,
          onProviderFallback: fallbackToNativeOnProviderError
            ? notifyTtsFallback
            : undefined,
        });

        if (!abortSignal?.aborted) {
          playbackRoute = "provider";
          callbacks.onAudioReady(audio, speechDiagnostics);
        }
      } catch (error) {
        const normalizedError =
          error instanceof Error ? error : new Error(String(error));

        if (
          fallbackToNativeOnProviderError &&
          !abortSignal?.aborted &&
          playbackRoute !== "provider"
        ) {
          playbackRoute = "native";
          notifyTtsFallback(normalizedError);
          callbacks.onSpeechTextReady(trimmed, undefined, speechDiagnostics);
          return;
        }

        fatalProviderError = true;
        throw normalizedError;
      }
    });

    ttsChain = task.catch((error) => {
      if (fatalProviderErrorNotified) {
        return;
      }

      fatalProviderErrorNotified = true;
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

    const targetChunkChars =
      ttsProvider === "gemini"
        ? GEMINI_TTS_TARGET_CHUNK_CHARS
        : PROVIDER_TTS_TARGET_CHUNK_CHARS;
    const segments = splitTextForTts(
      text,
      Math.min(PROVIDER_TTS_MAX_INPUT_CHARS, targetChunkChars),
    );

    if (segments.length === 0) {
      return;
    }

    segments.forEach(enqueueTtsChunk);
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
      enqueueTts(completeSentences.join(""));
    }
    sentenceBuffer = remainder;
  };

  const handleResponseDone = async (fullText: string) => {
    if (effectiveReplyPlayback === "stream") {
      if (sentenceBuffer.trim()) {
        enqueueTts(sentenceBuffer);
      }
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

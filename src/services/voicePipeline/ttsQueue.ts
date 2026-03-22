import { createSpeechRequestId } from "../speech/diagnostics";
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
  language: RunVoicePipelineParams["language"];
  localTtsVoices?: RunVoicePipelineParams["localTtsVoices"];
  replyPlayback: RunVoicePipelineParams["replyPlayback"];
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
  language,
  localTtsVoices,
  replyPlayback,
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
  const effectiveReplyPlayback = ttsMode === "local" ? "wait" : replyPlayback;
  const speechDiagnostics = {
    requestId: createSpeechRequestId("conversation"),
    source: "conversation" as const,
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

      if (ttsMode === "native") {
        callbacks.onSpeechTextReady(trimmed, undefined, speechDiagnostics);
        return;
      }

      try {
        const audio = await synthesizeSpeech({
          text: trimmed,
          voice: ttsVoice,
          mode: ttsMode,
          provider: ttsProvider,
          providerModel: ttsModel,
          apiKey: ttsApiKey,
          language,
          listenLanguages: ttsListenLanguages,
          localVoices: localTtsVoices,
          diagnostics: speechDiagnostics,
        });

        if (!abortSignal?.aborted) {
          callbacks.onAudioReady(audio, speechDiagnostics);
        }
      } catch (error) {
        const normalizedError =
          error instanceof Error ? error : new Error(String(error));

        callbacks.onTtsFallback?.(normalizedError);

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

    completeSentences.forEach(enqueueTts);
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

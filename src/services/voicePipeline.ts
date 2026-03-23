import { streamChat } from "./llm";
import type { Message } from "../types";
import { recordDebugLogEvent } from "./debugLogCapture";
import { cleanupCapturedAudio } from "./voicePipeline/cleanup";
import { resolveContextualMessages } from "./voicePipeline/context";
import { createVoicePipelineTtsQueue } from "./voicePipeline/ttsQueue";
import { resolvePipelineTranscription } from "./voicePipeline/transcription";
import type { RunVoicePipelineParams } from "./voicePipeline/types";

export async function runVoicePipeline(
  params: RunVoicePipelineParams,
): Promise<string | null> {
  const {
    audioUri,
    transcriptionOverride,
    messages,
    model,
    provider,
    providerApiKey,
    sttMode,
    sttProvider,
    sttApiKey,
    sttModel,
    ttsMode,
    ttsProvider,
    ttsApiKey,
    ttsModel,
    ttsVoice,
    ttsListenLanguages,
    localTtsVoices,
    replyPlayback,
    contextSummary,
    summarizedMessageCount,
    assistantInstructions,
    responseLength,
    responseTone,
    language,
    callbacks,
    abortSignal,
  } = params;

  let transcription: string | null = null;

  try {
    recordDebugLogEvent({
      event: "voice-pipeline-run-start",
      payload: {
        hasAudioUri: !!audioUri,
        hasTranscriptionOverride: !!transcriptionOverride,
        replyPlayback,
        sttMode,
        ttsMode,
      },
    });

    transcription = await resolvePipelineTranscription({
      abortSignal,
      audioUri,
      language,
      sttApiKey,
      sttMode,
      sttModel,
      sttProvider,
      transcriptionOverride,
    });

    if (!transcription) {
      recordDebugLogEvent({
        event: "voice-pipeline-run-empty-transcription",
        level: "warn",
      });
      return null;
    }
    if (abortSignal?.aborted) {
      recordDebugLogEvent({
        event: "voice-pipeline-run-aborted-after-transcription",
      });
      return transcription;
    }

    callbacks.onTranscription(transcription);
    if (abortSignal?.aborted) {
      recordDebugLogEvent({
        event: "voice-pipeline-run-aborted-after-onTranscription",
      });
      return transcription;
    }

    const contextResult = await resolveContextualMessages({
      abortSignal,
      callbacks,
      contextSummary,
      language,
      messages,
      model,
      provider,
      providerApiKey,
      summarizedMessageCount,
    });

    if (contextResult.aborted) {
      recordDebugLogEvent({
        event: "voice-pipeline-run-context-aborted",
      });
      return transcription;
    }

    const allMessages: Message[] = [
      ...contextResult.contextualMessages,
      {
        id: "pending",
        role: "user",
        content: transcription,
        model: null,
        provider: null,
        timestamp: new Date().toISOString(),
      },
    ];
    const ttsQueue = createVoicePipelineTtsQueue({
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
    });

    await streamChat({
      messages: allMessages,
      model,
      provider,
      apiKey: providerApiKey,
      assistantInstructions,
      responseLength,
      responseTone,
      language,
      conversationSummary: contextResult.effectiveSummary || undefined,
      abortSignal,
      onChunk: (text) => {
        if (abortSignal?.aborted) return;
        ttsQueue.handleStreamChunk(text);
      },
      onDone: async (fullText, usage) => {
        if (abortSignal?.aborted) return;
        callbacks.onResponseDone(fullText, usage);
        await ttsQueue.handleResponseDone(fullText);
      },
      onError: callbacks.onError,
    });
    recordDebugLogEvent({
      event: "voice-pipeline-run-complete",
      payload: {
        textLength: transcription.trim().length,
      },
    });
    return transcription;
  } finally {
    recordDebugLogEvent({
      event: "voice-pipeline-run-cleanup",
      payload: {
        hadAudioUri: !!audioUri,
      },
    });
    await cleanupCapturedAudio(audioUri);
  }
}

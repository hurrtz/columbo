import { streamChat } from "./llm";
import type { Message } from "../types";
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

    if (!transcription) return null;
    if (abortSignal?.aborted) return transcription;

    callbacks.onTranscription(transcription);
    if (abortSignal?.aborted) return transcription;

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
    return transcription;
  } finally {
    await cleanupCapturedAudio(audioUri);
  }
}

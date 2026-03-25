import { useCallback, useRef } from "react";

import { recordDebugLogEvent } from "../../services/debugLogCapture";
import { runVoicePipeline } from "../../services/voicePipeline";
import type { UsageEstimate } from "../../types";
import type { PipelinePhase, UseVoicePipelineParams } from "./types";

type VoiceCaptureHandlerParams = Omit<UseVoicePipelineParams, "isRecording"> & {
  abortRef: React.MutableRefObject<AbortController | null>;
  handleRepeatLastReply: (
    textOverride?: string,
    messageId?: string,
  ) => Promise<void>;
  lastCompletedReplyRef: React.MutableRefObject<string>;
  setPipelinePhase: (phase: PipelinePhase) => void;
  setStreamingText: (text: string | ((prev: string) => string)) => void;
};

export function useVoiceCaptureHandler({
  abortRef,
  activeConversation,
  addMessage,
  assistantInstructions,
  createConversation,
  handleRepeatLastReply,
  language,
  lastCompletedReplyRef,
  localTtsVoices,
  model,
  player,
  provider,
  providerApiKey,
  replyPlayback,
  responseLength,
  responseTone,
  selectedSttModel,
  selectedTtsModel,
  selectedTtsVoice,
  setPipelinePhase,
  setStreamingText,
  showToast,
  sttApiKey,
  sttMode,
  sttProvider,
  t,
  ttsApiKey,
  ttsListenLanguages,
  ttsMode,
  ttsProvider,
  updateConversationContextSummary,
}: VoiceCaptureHandlerParams) {
  const ttsFallbackToastShownRef = useRef(false);
  const playbackStartedRef = useRef(false);

  const handleVoiceCaptureDone = useCallback(
    async ({
      audioUri,
      transcriptionOverride,
    }: {
      audioUri?: string;
      transcriptionOverride?: string;
    }) => {
      recordDebugLogEvent({
        event: "voice-pipeline-handle-capture-start",
        payload: {
          hasAudioUri: !!audioUri,
          hasTranscriptionOverride: !!transcriptionOverride,
          ttsMode,
        },
      });
      setPipelinePhase(transcriptionOverride ? "thinking" : "transcribing");
      setStreamingText("");
      ttsFallbackToastShownRef.current = false;
      playbackStartedRef.current = false;
      abortRef.current = new AbortController();
      player.resetCancellation();

      try {
        const transcription = await runVoicePipeline({
          audioUri,
          transcriptionOverride,
          messages: activeConversation?.messages || [],
          contextSummary: activeConversation?.contextSummary,
          summarizedMessageCount: activeConversation?.summarizedMessageCount,
          model,
          provider,
          providerApiKey,
          sttMode,
          sttProvider,
          sttApiKey,
          sttModel: selectedSttModel,
          ttsMode,
          ttsProvider,
          ttsApiKey,
          ttsModel: selectedTtsModel,
          ttsVoice: selectedTtsVoice,
          ttsListenLanguages,
          localTtsVoices,
          replyPlayback,
          assistantInstructions,
          responseLength,
          responseTone,
          language,
          abortSignal: abortRef.current!.signal,
          callbacks: {
            onTranscription: (text) => {
              recordDebugLogEvent({
                event: "voice-pipeline-transcription-ready",
                payload: {
                  textLength: text.trim().length,
                },
              });
              setPipelinePhase("thinking");
              if (!activeConversation) {
                createConversation(text, model, provider);
              }
              setTimeout(() => {
                addMessage({
                  role: "user",
                  content: text,
                  model: null,
                  provider: null,
                });
              }, 0);
            },
            onContextSummary: (summary, summarizedCount, usage) => {
              recordDebugLogEvent({
                event: "voice-pipeline-context-summary-updated",
                payload: {
                  summarizedCount,
                  summaryLength: summary.trim().length,
                  totalTokens: usage?.totalTokens ?? null,
                },
              });
              updateConversationContextSummary(
                summary,
                summarizedCount,
                usage,
                model,
                provider,
              );
            },
            onChunk: (text) => {
              recordDebugLogEvent({
                event: "voice-pipeline-stream-chunk",
                payload: {
                  chunkLength: text.length,
                },
              });
              setPipelinePhase(
                playbackStartedRef.current ? "speaking" : "thinking",
              );
              setStreamingText((prev) => prev + text);
            },
            onResponseDone: (fullText, usage?: UsageEstimate) => {
              recordDebugLogEvent({
                event: "voice-pipeline-response-done",
                payload: {
                  textLength: fullText.trim().length,
                  totalTokens: usage?.totalTokens ?? null,
                },
              });
              setStreamingText("");
              setPipelinePhase(
                ttsMode === "native" || playbackStartedRef.current
                  ? "speaking"
                  : "synthesizing",
              );
              lastCompletedReplyRef.current = fullText;
              addMessage({
                role: "assistant",
                content: fullText,
                model,
                provider,
                usage,
              });
            },
            onAudioReady: (audioData, diagnostics) => {
              recordDebugLogEvent({
                event: "voice-pipeline-audio-ready",
                payload: {
                  requestId: diagnostics?.requestId ?? null,
                  uri: audioData,
                },
              });
              playbackStartedRef.current = true;
              setPipelinePhase("speaking");
              player.enqueueAudio(audioData, diagnostics);
            },
            onSpeechTextReady: (text, _voice, diagnostics) => {
              recordDebugLogEvent({
                event: "voice-pipeline-speech-text-ready",
                payload: {
                  requestId: diagnostics?.requestId ?? null,
                  textLength: text.trim().length,
                },
              });
              playbackStartedRef.current = true;
              setPipelinePhase("speaking");
              player.speakText(text, {
                diagnostics,
              });
            },
            onTtsFallback: () => {
              recordDebugLogEvent({
                event: "voice-pipeline-tts-fallback",
                level: "warn",
                payload: {
                  ttsMode,
                },
              });
              if (ttsFallbackToastShownRef.current) {
                return;
              }

              ttsFallbackToastShownRef.current = true;
              showToast(
                ttsMode === "local"
                  ? t("localVoiceFallback")
                  : t("providerVoiceFallback"),
              );
            },
            onError: async (error) => {
              recordDebugLogEvent({
                event: "voice-pipeline-error",
                level: "error",
                payload: {
                  hasAudioUri: !!audioUri,
                  hasTranscriptionOverride: !!transcriptionOverride,
                  message: error.message,
                },
              });
              await player.stopPlayback();
              setPipelinePhase("idle");
              const retryAction = lastCompletedReplyRef.current.trim()
                ? () => {
                    void handleRepeatLastReply(lastCompletedReplyRef.current);
                  }
                : () => {
                    void handleVoiceCaptureDone({
                      audioUri,
                      transcriptionOverride,
                    });
                  };

              showToast(error.message, retryAction);
            },
          },
        });

        if (!transcription) {
          recordDebugLogEvent({
            event: "voice-pipeline-no-transcription",
            level: "warn",
          });
          showToast(t("couldntCatchThatTryAgain"));
        }
      } catch (error) {
        if (abortRef.current?.signal.aborted) {
          recordDebugLogEvent({
            event: "voice-pipeline-aborted",
            payload: {
              hasAudioUri: !!audioUri,
              hasTranscriptionOverride: !!transcriptionOverride,
            },
          });
          return;
        }

        recordDebugLogEvent({
          event: "voice-pipeline-catch-error",
          level: "error",
          payload: {
            message:
              error instanceof Error ? error.message : t("couldntProcessVoiceInput"),
          },
        });
        showToast(
          error instanceof Error ? error.message : t("couldntProcessVoiceInput"),
        );
      } finally {
        recordDebugLogEvent({
          event: "voice-pipeline-finalizing",
          payload: {
            hasPendingPlayback: player.hasPendingPlaybackNow(),
          },
        });
        if (player.hasPendingPlaybackNow()) {
          setPipelinePhase("speaking");
        }

        if (player.hasPendingPlaybackNow()) {
          await player.waitForDrain();
        }
        setPipelinePhase("idle");
        recordDebugLogEvent({
          event: "voice-pipeline-finished",
          payload: {
            finalPhase: "idle",
          },
        });
      }
    },
    [
      abortRef,
      activeConversation,
      addMessage,
      assistantInstructions,
      createConversation,
      handleRepeatLastReply,
      language,
      lastCompletedReplyRef,
      localTtsVoices,
      model,
      player,
      provider,
      providerApiKey,
      replyPlayback,
      responseLength,
      responseTone,
      selectedSttModel,
      selectedTtsModel,
      selectedTtsVoice,
      setPipelinePhase,
      setStreamingText,
      showToast,
      sttApiKey,
      sttMode,
      sttProvider,
      t,
      ttsApiKey,
      ttsListenLanguages,
      ttsMode,
      ttsProvider,
      updateConversationContextSummary,
    ],
  );

  return {
    handleVoiceCaptureDone,
  };
}

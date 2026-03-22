import { useCallback } from "react";
import type { MutableRefObject } from "react";

import { PipelinePhase } from "../../../hooks/useVoicePipeline";

import type { AudioPlayerController } from "./types";

interface UseVoiceSessionCancellationParams {
  abortRef: MutableRefObject<AbortController | null>;
  player: AudioPlayerController;
  rollbackCancelableVoiceTurn: () => Promise<void>;
  setPipelinePhase: (phase: PipelinePhase) => void;
  setStreamingText: (text: string) => void;
}

export function useVoiceSessionCancellation({
  abortRef,
  player,
  rollbackCancelableVoiceTurn,
  setPipelinePhase,
  setStreamingText,
}: UseVoiceSessionCancellationParams) {
  const resetPipelineState = useCallback(() => {
    abortRef.current?.abort();
    setPipelinePhase("idle");
    setStreamingText("");
  }, [abortRef, setPipelinePhase, setStreamingText]);

  const cancelCurrentInteraction = useCallback(
    async ({ rollbackConversation }: { rollbackConversation: boolean }) => {
      resetPipelineState();

      if (player.isPlaying) {
        await player.stopPlayback();
      }

      if (rollbackConversation) {
        await rollbackCancelableVoiceTurn();
      }
    },
    [player, resetPipelineState, rollbackCancelableVoiceTurn],
  );

  return {
    cancelCurrentInteraction,
    resetPipelineState,
  };
}

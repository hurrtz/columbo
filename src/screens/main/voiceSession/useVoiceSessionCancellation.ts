import { useCallback } from "react";
import type { MutableRefObject } from "react";

import { PipelinePhase } from "../../../hooks/useVoicePipeline";

import type { AudioPlayerController } from "./types";

interface UseVoiceSessionCancellationParams {
  abortRef: MutableRefObject<AbortController | null>;
  player: AudioPlayerController;
  setPipelinePhase: (phase: PipelinePhase) => void;
  setStreamingText: (text: string) => void;
}

export function useVoiceSessionCancellation({
  abortRef,
  player,
  setPipelinePhase,
  setStreamingText,
}: UseVoiceSessionCancellationParams) {
  const resetPipelineState = useCallback(() => {
    abortRef.current?.abort();
    setPipelinePhase("idle");
    setStreamingText("");
  }, [abortRef, setPipelinePhase, setStreamingText]);

  const cancelCurrentInteraction = useCallback(
    async () => {
      resetPipelineState();

      if (player.isPlaying) {
        await player.stopPlayback();
      }

    },
    [player, resetPipelineState],
  );

  return {
    cancelCurrentInteraction,
    resetPipelineState,
  };
}

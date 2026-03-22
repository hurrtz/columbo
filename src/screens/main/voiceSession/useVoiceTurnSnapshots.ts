import { useCallback, useRef } from "react";

interface UseVoiceTurnSnapshotsParams<Snapshot> {
  captureActiveConversationSnapshot: () => Snapshot;
  handleVoiceCaptureDone: (params: {
    audioUri?: string;
    transcriptionOverride?: string;
  }) => Promise<void>;
  restoreActiveConversationSnapshot: (snapshot: Snapshot) => Promise<void>;
}

export function useVoiceTurnSnapshots<Snapshot>({
  captureActiveConversationSnapshot,
  handleVoiceCaptureDone,
  restoreActiveConversationSnapshot,
}: UseVoiceTurnSnapshotsParams<Snapshot>) {
  const voiceTurnSessionRef = useRef(0);
  const voiceTurnSnapshotRef = useRef<Snapshot | null>(null);
  const cancelableVoiceTurnSessionRef = useRef<number | null>(null);

  const clearCancelableVoiceTurn = useCallback(() => {
    cancelableVoiceTurnSessionRef.current = null;
  }, []);

  const resetVoiceTurnSnapshots = useCallback(() => {
    voiceTurnSnapshotRef.current = null;
    cancelableVoiceTurnSessionRef.current = null;
  }, []);

  const rollbackCancelableVoiceTurn = useCallback(async () => {
    const snapshot = voiceTurnSnapshotRef.current;

    if (!snapshot || cancelableVoiceTurnSessionRef.current === null) {
      return;
    }

    resetVoiceTurnSnapshots();
    await restoreActiveConversationSnapshot(snapshot);
  }, [resetVoiceTurnSnapshots, restoreActiveConversationSnapshot]);

  const processCapturedVoiceTurn = useCallback(
    async (params: { audioUri?: string; transcriptionOverride?: string }) => {
      const sessionId = voiceTurnSessionRef.current + 1;
      voiceTurnSessionRef.current = sessionId;
      voiceTurnSnapshotRef.current = captureActiveConversationSnapshot();
      cancelableVoiceTurnSessionRef.current = sessionId;

      try {
        await handleVoiceCaptureDone(params);
      } finally {
        if (cancelableVoiceTurnSessionRef.current === sessionId) {
          cancelableVoiceTurnSessionRef.current = null;
        }

        if (voiceTurnSessionRef.current === sessionId) {
          voiceTurnSnapshotRef.current = null;
        }
      }
    },
    [captureActiveConversationSnapshot, handleVoiceCaptureDone],
  );

  return {
    clearCancelableVoiceTurn,
    processCapturedVoiceTurn,
    resetVoiceTurnSnapshots,
    rollbackCancelableVoiceTurn,
  };
}

import {
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";

export function useStreamingTextScheduler({
  abortRef,
  setStreamingText,
}: {
  abortRef: MutableRefObject<AbortController | null>;
  setStreamingText: Dispatch<SetStateAction<string>>;
}) {
  const renderFrameRef = useRef<number | null>(null);
  const renderBufferRef = useRef("");
  const renderRunIdRef = useRef(0);

  const cancelStreamingRender = useCallback((runId?: number) => {
    if (runId !== undefined && renderRunIdRef.current !== runId) {
      return;
    }

    if (renderFrameRef.current !== null) {
      cancelAnimationFrame(renderFrameRef.current);
      renderFrameRef.current = null;
    }
    renderBufferRef.current = "";
  }, []);

  const beginStreamingRender = useCallback(() => {
    cancelStreamingRender();
    const runId = renderRunIdRef.current + 1;
    renderRunIdRef.current = runId;
    setStreamingText("");
    return runId;
  }, [cancelStreamingRender, setStreamingText]);

  const queueStreamingRender = useCallback(
    (text: string, runId: number) => {
      if (!text || renderRunIdRef.current !== runId) {
        return;
      }

      renderBufferRef.current += text;
      if (renderFrameRef.current !== null) {
        return;
      }

      renderFrameRef.current = requestAnimationFrame(() => {
        renderFrameRef.current = null;
        const aborted = abortRef.current?.signal.aborted ?? false;

        if (renderRunIdRef.current !== runId || aborted) {
          renderBufferRef.current = "";
          return;
        }

        const bufferedText = renderBufferRef.current;
        renderBufferRef.current = "";
        if (bufferedText) {
          setStreamingText((previous) => previous + bufferedText);
        }
      });
    },
    [abortRef, setStreamingText],
  );

  useEffect(
    () => () => {
      renderRunIdRef.current += 1;
      cancelStreamingRender();
    },
    [cancelStreamingRender],
  );

  return {
    beginStreamingRender,
    cancelStreamingRender,
    queueStreamingRender,
  };
}

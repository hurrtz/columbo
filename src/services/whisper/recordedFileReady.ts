import * as FileSystem from "expo-file-system/legacy";

import type { AppLanguage } from "../../types";
import { createRecordedFileNotReadyError } from "./errors";
import { throwIfAborted, waitForDelayOrAbort } from "./abort";

const RECORDED_FILE_READY_POLL_MS = 90;
const RECORDED_FILE_READY_ATTEMPTS = 12;
const RECORDED_FILE_MIN_BYTES = 4096;

export async function waitForRecordedFileReady(
  fileUri: string,
  language: AppLanguage,
  abortSignal?: AbortSignal,
) {
  let lastStableSize = -1;

  const getFileSize = async () => {
    const info = await FileSystem.getInfoAsync(fileUri);
    const size =
      "size" in info && typeof info.size === "number" ? info.size : 0;

    return {
      exists: info.exists,
      size,
    };
  };

  for (let attempt = 0; attempt < RECORDED_FILE_READY_ATTEMPTS; attempt += 1) {
    throwIfAborted(abortSignal);
    const info = await getFileSize();

    if (
      info.exists &&
      info.size >= RECORDED_FILE_MIN_BYTES &&
      info.size === lastStableSize
    ) {
      return;
    }

    lastStableSize = info.size;

    await waitForDelayOrAbort(RECORDED_FILE_READY_POLL_MS, abortSignal);
  }

  throwIfAborted(abortSignal);
  const info = await getFileSize();

  if (info.exists && info.size >= RECORDED_FILE_MIN_BYTES) {
    return;
  }

  throw createRecordedFileNotReadyError(language);
}

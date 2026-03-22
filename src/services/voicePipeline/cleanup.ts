import * as FileSystem from "expo-file-system/legacy";

export async function cleanupCapturedAudio(fileUri?: string) {
  if (!fileUri) {
    return;
  }

  try {
    await FileSystem.deleteAsync(fileUri, {
      idempotent: true,
    });
  } catch {
    // Ignore temp-file cleanup failures.
  }
}

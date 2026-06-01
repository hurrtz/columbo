import { getStrictestCatalogMaxConstraint } from "../catalog";
import { getCatalogConstraintsForAppProvider } from "../catalog/appProviders";
import type { Provider, SttBackendMode } from "../types";

// Worst-case (uncompressed 16 kHz mono 16-bit PCM) upload bitrate of the audio
// we send to provider STT ≈ 32,000 bytes/s. Compressed recordings are smaller,
// so a cap derived from this stays safely under the limit for them too.
const RECORDING_BYTES_PER_SECOND = 16_000 * 2;
// Headroom below the hard provider limit (container overhead + estimate slack).
const SIZE_SAFETY_FACTOR = 0.9;
// Generous fallback when no provider upload limit is known (native STT, or a
// model without a documented size cap).
export const FALLBACK_MAX_RECORDING_MS = 15 * 60 * 1000;
const MIN_MAX_RECORDING_MS = 30_000;

/**
 * Largest single-turn recording duration that stays safely under the active STT
 * model's upload size limit. Derived from the catalog `file_size_bytes`
 * constraint and the worst-case recording bitrate, so it adapts per provider/
 * model and only auto-stops shortly before an upload would actually overflow.
 * Falls back to a generous default when there is no known limit.
 */
export function getMaxRecordingMs(params: {
  sttMode: SttBackendMode;
  sttProvider: Provider | null;
  sttModel: string;
}): number {
  if (params.sttMode !== "provider" || !params.sttProvider) {
    return FALLBACK_MAX_RECORDING_MS;
  }

  const maxBytes = getStrictestCatalogMaxConstraint(
    getCatalogConstraintsForAppProvider(
      params.sttProvider,
      params.sttModel,
      "stt",
    ),
    "file_size_bytes",
  )?.value;

  if (!maxBytes || maxBytes <= 0) {
    return FALLBACK_MAX_RECORDING_MS;
  }

  const safeMs =
    ((maxBytes * SIZE_SAFETY_FACTOR) / RECORDING_BYTES_PER_SECOND) * 1000;
  return Math.max(MIN_MAX_RECORDING_MS, Math.round(safeMs));
}

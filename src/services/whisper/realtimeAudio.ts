import * as FileSystem from "expo-file-system/legacy";

function base64ToBytes(base64: string) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return new Uint8Array(BufferCtor.from(base64, "base64"));
  }

  if (typeof atob !== "undefined") {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  }

  throw new Error("No base64 decoder available for realtime audio.");
}

function bytesToBase64(bytes: Uint8Array) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return BufferCtor.from(bytes).toString("base64");
  }

  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  if (typeof btoa !== "undefined") {
    return btoa(binary);
  }

  throw new Error("No base64 encoder available for realtime audio.");
}

function findWavChunk(
  bytes: Uint8Array,
  view: DataView,
  chunkId: string,
  startOffset = 12,
) {
  let offset = startOffset;

  while (offset + 8 <= bytes.length) {
    const id = String.fromCharCode(
      bytes[offset],
      bytes[offset + 1],
      bytes[offset + 2],
      bytes[offset + 3],
    );
    const size = view.getUint32(offset + 4, true);
    const dataOffset = offset + 8;

    if (id === chunkId) {
      return {
        offset: dataOffset,
        size,
      };
    }

    offset = dataOffset + size + (size % 2);
  }

  return null;
}

function parseWav(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const riff = String.fromCharCode(
    bytes[0],
    bytes[1],
    bytes[2],
    bytes[3],
  );
  const wave = String.fromCharCode(
    bytes[8],
    bytes[9],
    bytes[10],
    bytes[11],
  );

  if (riff !== "RIFF" || wave !== "WAVE") {
    throw new Error("Realtime transcription currently requires a WAV recording.");
  }

  const fmtChunk = findWavChunk(bytes, view, "fmt ");
  const dataChunk = findWavChunk(bytes, view, "data");

  if (!fmtChunk || !dataChunk || fmtChunk.size < 16) {
    throw new Error("Unsupported WAV file: missing format or data chunk.");
  }

  const audioFormat = view.getUint16(fmtChunk.offset, true);
  const channels = view.getUint16(fmtChunk.offset + 2, true);
  const sampleRate = view.getUint32(fmtChunk.offset + 4, true);
  const bitsPerSample = view.getUint16(fmtChunk.offset + 14, true);

  return {
    view,
    audioFormat,
    channels,
    sampleRate,
    bitsPerSample,
    dataOffset: dataChunk.offset,
    dataSize: dataChunk.size,
  };
}

function readSample(params: {
  view: DataView;
  audioFormat: number;
  bitsPerSample: number;
  offset: number;
}) {
  if (params.audioFormat === 1 && params.bitsPerSample === 16) {
    return params.view.getInt16(params.offset, true) / 32768;
  }

  if (params.audioFormat === 3 && params.bitsPerSample === 32) {
    return params.view.getFloat32(params.offset, true);
  }

  throw new Error(
    `Unsupported WAV format for realtime transcription: format=${params.audioFormat}, bits=${params.bitsPerSample}.`,
  );
}

function decodeMonoFloatSamples(bytes: Uint8Array) {
  const parsed = parseWav(bytes);
  const bytesPerSample = parsed.bitsPerSample / 8;
  const frameSize = bytesPerSample * parsed.channels;
  const frameCount = Math.floor(parsed.dataSize / frameSize);
  const monoSamples = new Float32Array(frameCount);

  for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
    let sum = 0;

    for (let channelIndex = 0; channelIndex < parsed.channels; channelIndex += 1) {
      const offset =
        parsed.dataOffset +
        frameIndex * frameSize +
        channelIndex * bytesPerSample;

      sum += readSample({
        view: parsed.view,
        audioFormat: parsed.audioFormat,
        bitsPerSample: parsed.bitsPerSample,
        offset,
      });
    }

    monoSamples[frameIndex] = sum / parsed.channels;
  }

  return {
    sampleRate: parsed.sampleRate,
    samples: monoSamples,
  };
}

function resampleMonoPcm(samples: Float32Array, sourceRate: number, targetRate: number) {
  if (sourceRate === targetRate) {
    return samples;
  }

  const ratio = sourceRate / targetRate;
  const outputLength = Math.max(1, Math.round(samples.length / ratio));
  const resampled = new Float32Array(outputLength);

  for (let index = 0; index < outputLength; index += 1) {
    const sourceIndex = index * ratio;
    const left = Math.floor(sourceIndex);
    const right = Math.min(samples.length - 1, left + 1);
    const blend = sourceIndex - left;
    resampled[index] =
      samples[left] * (1 - blend) + samples[right] * blend;
  }

  return resampled;
}

function floatSamplesToPcm16Bytes(samples: Float32Array) {
  const pcm16 = new Int16Array(samples.length);

  for (let index = 0; index < samples.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index]));
    pcm16[index] =
      sample < 0 ? Math.round(sample * 32768) : Math.round(sample * 32767);
  }

  return new Uint8Array(pcm16.buffer);
}

export function chunkBytes(bytes: Uint8Array, chunkSize: number) {
  const chunks: Uint8Array[] = [];

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    chunks.push(bytes.subarray(offset, Math.min(bytes.length, offset + chunkSize)));
  }

  return chunks;
}

export async function readFileBytes(fileUri: string) {
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });

  return base64ToBytes(base64);
}

export async function readFileBase64(fileUri: string) {
  return FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });
}

export async function readMonoPcm16Audio(params: {
  fileUri: string;
  sampleRate?: number;
}) {
  const bytes = await readFileBytes(params.fileUri);
  const decoded = decodeMonoFloatSamples(bytes);
  const resampled = resampleMonoPcm(
    decoded.samples,
    decoded.sampleRate,
    params.sampleRate ?? 16000,
  );
  const pcmBytes = floatSamplesToPcm16Bytes(resampled);

  return {
    bytes: pcmBytes,
    base64: bytesToBase64(pcmBytes),
    sampleRate: params.sampleRate ?? 16000,
  };
}

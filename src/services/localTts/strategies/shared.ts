import { writeWaveformFile, normalizeLocalTtsText } from "../audioFile";

type LocalTtsEngine = {
  synthesizeToFile?: (params: {
    text: string;
    sid: number;
    speed: number;
  }) => Promise<string>;
  generateSpeech?: (
    text: string,
    options: {
      sid: number;
      speed: number;
    },
  ) => Promise<{
    samples?: ArrayLike<number> | null;
    sampleRate?: number | null;
  }>;
};

export async function synthesizeEngineSpeechToFile(params: {
  engine: LocalTtsEngine;
  text: string;
  sid: number;
  speed: number;
}) {
  if (typeof params.engine.synthesizeToFile === "function") {
    return params.engine.synthesizeToFile({
      text: params.text,
      sid: params.sid,
      speed: params.speed,
    });
  }

  const audio = await params.engine.generateSpeech?.(params.text, {
    sid: params.sid,
    speed: params.speed,
  });

  if (!audio?.samples || !audio?.sampleRate) {
    throw new Error("The local voice model did not return audio.");
  }

  return writeWaveformFile(Float32Array.from(audio.samples), audio.sampleRate);
}

export function normalizeLocalSpeechText(text: string) {
  return normalizeLocalTtsText(text);
}

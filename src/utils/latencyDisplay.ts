export interface LatencyCountdown {
  overtime: boolean;
  text: string;
}

function formatDurationSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatLatencyCountdown(
  elapsedMs: number,
  estimatedMs: number,
): LatencyCountdown {
  const remainingMs = Math.max(0, estimatedMs) - Math.max(0, elapsedMs);

  if (remainingMs >= 0) {
    return {
      overtime: false,
      text: formatDurationSeconds(Math.ceil(remainingMs / 1000)),
    };
  }

  return {
    overtime: true,
    text: `+${formatDurationSeconds(Math.ceil(Math.abs(remainingMs) / 1000))}`,
  };
}

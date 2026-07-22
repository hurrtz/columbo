import { splitIntoSentences } from "../tts";

export function extractCompleteSentences(text: string): {
  completeSentences: string[];
  remainder: string;
} {
  if (!text) {
    return {
      completeSentences: [],
      remainder: "",
    };
  }

  const segments = splitIntoSentences(text);
  const endsWithSentenceBoundary = /[.!?\n]\s*$/.test(text);
  const endsWithAmbiguousSingleCharacterPeriod =
    /(?:^|\s)[A-Za-z0-9]\.\s*$/.test(text);
  const completeCount =
    endsWithSentenceBoundary && !endsWithAmbiguousSingleCharacterPeriod
    ? segments.length
    : Math.max(segments.length - 1, 0);

  return {
    completeSentences: segments
      .slice(0, completeCount)
      .filter((segment) => segment.trim()),
    remainder: segments.slice(completeCount).join(""),
  };
}

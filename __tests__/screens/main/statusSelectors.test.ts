import {
  formatThinkingStatus,
  getStatusDisplayData,
  getStatusIndicatorTone,
  isLongRunningPhase,
} from "../../../src/screens/main/statusSelectors";

const withElapsed = (detail: string, seconds: number) =>
  `${detail} · ${seconds}s`;

describe("statusSelectors", () => {
  it("builds idle state labels from message count and input mode", () => {
    const status = getStatusDisplayData({
      inputMode: "push-to-talk",
      messageCount: 3,
      pipelinePhase: "idle",
      providerLabel: "OpenAI",
      t: (key, params) =>
        ({
          freshSession: "Fresh session",
          holdToSpeak: "Hold to speak",
          idle: "Idle",
          messageCount: `${params?.count} messages`,
        }[key] ?? key),
      ttsProviderLabel: "OpenAI",
      visualPhase: "idle",
    });

    expect(status).toEqual({
      actionLabel: "Hold to speak",
      messageCountLabel: "3 messages",
      statusDetail: "3 messages",
      statusTitle: "Idle",
    });
  });

  it("uses tap-to-speak wording for toggle mode", () => {
    const status = getStatusDisplayData({
      inputMode: "toggle-to-talk",
      messageCount: 0,
      pipelinePhase: "idle",
      providerLabel: "OpenAI",
      t: (key) =>
        ({
          freshSession: "Fresh session",
          tapToSpeak: "Tap to speak",
          idle: "Idle",
        }[key] ?? key),
      ttsProviderLabel: "OpenAI",
      visualPhase: "idle",
    });

    expect(status.actionLabel).toBe("Tap to speak");
  });

  it("tells toggle-mode users to tap again while recording", () => {
    const status = getStatusDisplayData({
      inputMode: "toggle-to-talk",
      messageCount: 0,
      pipelinePhase: "idle",
      providerLabel: "OpenAI",
      t: (key) =>
        ({
          listening: "Listening",
          listeningToYourVoice: "Listening to your voice",
          tapAgainToSend: "Tap again to send",
        }[key] ?? key),
      ttsProviderLabel: "OpenAI",
      visualPhase: "recording",
    });

    expect(status.actionLabel).toBe("Tap again to send");
    expect(status.statusDetail).toBe("Listening to your voice");
  });

  it("keeps listening wording while push-to-talk is held", () => {
    const status = getStatusDisplayData({
      inputMode: "push-to-talk",
      messageCount: 0,
      pipelinePhase: "idle",
      providerLabel: "OpenAI",
      t: (key) =>
        ({
          listening: "Listening",
          listeningToYourVoice: "Listening to your voice",
        }[key] ?? key),
      ttsProviderLabel: "OpenAI",
      visualPhase: "recording",
    });

    expect(status.actionLabel).toBe("Listening");
  });

  it("maps active phases to stable indicator tones", () => {
    expect(getStatusIndicatorTone("recording", "idle")).toBe("danger");
    expect(getStatusIndicatorTone("speaking", "speaking")).toBe("accent");
    expect(getStatusIndicatorTone("searching", "searching")).toBe("muted");
    expect(getStatusIndicatorTone("thinking", "thinking")).toBe("muted");
    expect(getStatusIndicatorTone("idle", "idle")).toBe("accentWarm");
  });

  it("treats thinking, searching, and synthesizing as long-running", () => {
    expect(isLongRunningPhase("thinking")).toBe(true);
    expect(isLongRunningPhase("searching")).toBe(true);
    expect(isLongRunningPhase("synthesizing")).toBe(true);
    expect(isLongRunningPhase("idle")).toBe(false);
    expect(isLongRunningPhase("transcribing")).toBe(false);
    expect(isLongRunningPhase("speaking")).toBe(false);
  });

  describe("formatThinkingStatus", () => {
    const base = {
      baseDetail: "Waiting for OpenAI",
      reassurance: "Good answers take a moment…",
      withElapsed,
    };

    it("returns the base detail before any time has elapsed", () => {
      expect(formatThinkingStatus({ ...base, elapsedSeconds: 0 })).toBe(
        "Waiting for OpenAI",
      );
    });

    it("appends an elapsed-seconds counter once time has passed", () => {
      expect(formatThinkingStatus({ ...base, elapsedSeconds: 3 })).toBe(
        "Waiting for OpenAI · 3s",
      );
    });

    it("adds the reassurance line at the threshold", () => {
      expect(formatThinkingStatus({ ...base, elapsedSeconds: 8 })).toBe(
        "Waiting for OpenAI · 8s\nGood answers take a moment…",
      );
    });

    it("respects a custom reassurance threshold", () => {
      expect(
        formatThinkingStatus({
          ...base,
          elapsedSeconds: 5,
          reassureAfterSeconds: 5,
        }),
      ).toBe("Waiting for OpenAI · 5s\nGood answers take a moment…");
    });
  });
});

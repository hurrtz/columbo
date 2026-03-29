import {
  getStatusDisplayData,
  getStatusIndicatorTone,
} from "../../../src/screens/main/statusSelectors";

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

  it("maps active phases to stable indicator tones", () => {
    expect(getStatusIndicatorTone("recording", "idle")).toBe("danger");
    expect(getStatusIndicatorTone("speaking", "speaking")).toBe("accent");
    expect(getStatusIndicatorTone("searching", "searching")).toBe("muted");
    expect(getStatusIndicatorTone("thinking", "thinking")).toBe("muted");
    expect(getStatusIndicatorTone("idle", "idle")).toBe("accentWarm");
  });
});

import React from "react";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { LocalizationProvider } from "../../src/i18n";
import { DEFAULT_SETTINGS } from "../../src/types";
import { useSetupGuideController } from "../../src/screens/main/useSetupGuideController";

jest.mock("../../src/services/llm", () => ({
  streamChat: jest.fn(),
  validateProviderConnection: jest.fn(),
}));

jest.mock("../../src/services/tts/localRoute", () => ({
  getResolvedLocalTtsSelection: jest.fn(() => ({
    resolvedLanguage: "en",
    localVoice: "af_heart",
    canUseLocal: true,
  })),
}));

jest.mock("../../src/screens/main/useSetupGuideVoiceTest", () => ({
  useSetupGuideVoiceTest: jest.fn(() => ({
    phase: "idle",
    transcript: "",
    reply: "",
    errorMessage: null,
    isRecording: false,
    isBusy: false,
    hasCompleted: false,
    handleAction: jest.fn(),
    reset: jest.fn().mockResolvedValue(undefined),
  })),
}));

const { validateProviderConnection } = jest.requireMock("../../src/services/llm") as {
  validateProviderConnection: jest.Mock;
};

function createSettings() {
  return {
    ...DEFAULT_SETTINGS,
    lastProvider: "openai" as const,
    apiKeys: {
      ...DEFAULT_SETTINGS.apiKeys,
      openai: "test-openai-key",
    },
  };
}

function createAnthropicSettings() {
  return {
    ...DEFAULT_SETTINGS,
    lastProvider: "anthropic" as const,
    apiKeys: {
      ...DEFAULT_SETTINGS.apiKeys,
      anthropic: "test-anthropic-key",
    },
  };
}

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(LocalizationProvider, { language: "en" }, children);

function createControllerParams() {
  return {
    loaded: true,
    openSettings: jest.fn(),
    setSetupGuideVisible: jest.fn(),
    setupGuideVisible: false,
    setupGuideDismissed: true,
    settings: createSettings(),
    updateSettings: jest.fn(),
    updateApiKey: jest.fn(),
    localTtsPackStates: {},
    player: {
      isPlaying: false,
      stopPlayback: jest.fn().mockResolvedValue(undefined),
      resetCancellation: jest.fn(),
      enqueueAudio: jest.fn(),
      waitForDrain: jest.fn().mockResolvedValue(undefined),
    } as never,
    recorder: {
      isRecording: false,
      startRecording: jest.fn().mockResolvedValue(undefined),
      stopRecording: jest.fn().mockResolvedValue(null),
    } as never,
    nativeStt: {
      isAvailable: true,
      isRecording: false,
      startRecognition: jest.fn().mockResolvedValue(undefined),
      stopRecognition: jest.fn().mockResolvedValue(null),
      abortRecognition: jest.fn().mockResolvedValue(undefined),
    } as never,
  };
}

describe("useSetupGuideController", () => {
  beforeEach(() => {
    validateProviderConnection.mockReset();
    validateProviderConnection.mockResolvedValue(undefined);
  });

  it("shows the setup guide once settings are loaded and not dismissed", async () => {
    const params = createControllerParams();
    params.setupGuideDismissed = false;

    renderHook(() => useSetupGuideController(params), { wrapper });

    await waitFor(() => {
      expect(params.setSetupGuideVisible).toHaveBeenCalledWith(true);
    });
  });

  it("validates the selected provider key and saves the detected setup", async () => {
    const params = createControllerParams();
    const { result } = renderHook(() => useSetupGuideController(params), {
      wrapper,
    });

    act(() => {
      result.current.handleOpenSetupGuide("provider");
    });

    await act(async () => {
      await result.current.handleValidateProviderKey();
    });

    expect(validateProviderConnection).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "openai",
        apiKey: "test-openai-key",
      }),
    );
    expect(result.current.currentValidationState.status).toBe("success");

    act(() => {
      result.current.handleContinueFromProvider();
      result.current.handleContinueFromVoiceTest();
    });

    await act(async () => {
      await result.current.handleFinishSetupGuide();
    });

    expect(params.updateSettings).toHaveBeenCalledWith(
      expect.objectContaining({
        activeResponseMode: "normal",
        lastProvider: "openai",
        setupGuideDismissed: true,
        spokenRepliesEnabled: true,
        sttMode: "native",
        ttsMode: "provider",
        ttsProvider: "openai",
      }),
    );
  });

  it("saves onboarding in text-only mode when no acceptable TTS route is available", async () => {
    const params = createControllerParams();
    params.settings = createAnthropicSettings();

    const { result } = renderHook(() => useSetupGuideController(params), {
      wrapper,
    });

    act(() => {
      result.current.handleOpenSetupGuide("provider");
      result.current.handleSelectProvider("anthropic");
    });

    await act(async () => {
      await result.current.handleValidateProviderKey();
    });

    act(() => {
      result.current.handleContinueFromProvider();
      result.current.handleContinueFromVoiceTest();
    });

    await act(async () => {
      await result.current.handleFinishSetupGuide();
    });

    expect(params.updateSettings).toHaveBeenCalledWith(
      expect.objectContaining({
        lastProvider: "anthropic",
        spokenRepliesEnabled: false,
      }),
    );
  });
});

import React from "react";
import { fireEvent } from "@testing-library/react-native";

import { MainScreen } from "../../src/screens/MainScreen";
import { DEFAULT_SETTINGS, type Settings } from "../../src/types";
import { getDefaultModelForProvider } from "../../src/utils/responseModes";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => {
    const React = require("react");
    const { View } = require("react-native");
    return React.createElement(View, null, children);
  },
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => {
    const React = require("react");
    const { View } = require("react-native");
    return React.createElement(View, null, children);
  },
}));

jest.mock("expo-status-bar", () => ({
  StatusBar: () => null,
}));

jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(async () => undefined),
}));

jest.mock("expo-file-system/legacy", () => ({
  cacheDirectory: "file:///tmp/",
  documentDirectory: "file:///tmp/",
  deleteAsync: jest.fn(async () => undefined),
  getInfoAsync: jest.fn(async () => ({ exists: false })),
  makeDirectoryAsync: jest.fn(async () => undefined),
  readAsStringAsync: jest.fn(async () => ""),
  writeAsStringAsync: jest.fn(async () => undefined),
}));

jest.mock("../../src/context/SettingsContext", () => ({
  useSharedSettings: jest.fn(() => ({
    settings: require("../../src/types").DEFAULT_SETTINGS,
    updateSettings: jest.fn(),
    updateActiveResponseMode: jest.fn(),
    updateResponseModeRoute: jest.fn(),
    updateProviderSttModel: jest.fn(),
    updateProviderTtsModel: jest.fn(),
    updateProviderTtsVoice: jest.fn(),
    updateLocalTtsVoice: jest.fn(),
    updateApiKey: jest.fn(),
    loaded: true,
  })),
}));

jest.mock("../../src/hooks/useConversations", () => ({
  useConversations: jest.fn(() => ({
    conversations: [],
    activeConversation: null,
    createConversation: jest.fn(),
    selectConversation: jest.fn(),
    getConversationById: jest.fn(),
    addMessage: jest.fn(),
    updateMessage: jest.fn(),
    updateConversationContextSummary: jest.fn(),
    clearConversationMemory: jest.fn(),
    renameConversation: jest.fn(),
    toggleConversationPinned: jest.fn(),
    searchConversations: jest.fn(async () => []),
    deleteConversation: jest.fn(),
    clearActiveConversation: jest.fn(),
    captureActiveConversationSnapshot: jest.fn(),
    restoreActiveConversationSnapshot: jest.fn(),
  })),
}));

jest.mock("../../src/hooks/useAudioRecorder", () => ({
  useAudioRecorder: jest.fn(() => ({
    isRecording: false,
    waveformVariant: "bars",
  })),
}));

jest.mock("../../src/hooks/useNativeSpeechRecognizer", () => ({
  useNativeSpeechRecognizer: jest.fn(() => ({
    isRecording: false,
    waveformVariant: "bars",
  })),
}));

jest.mock("../../src/hooks/useAudioPlayer", () => ({
  useAudioPlayer: jest.fn(() => ({
    isPlaybackPaused: false,
    isPlaying: false,
    pausePlayback: jest.fn(async () => true),
    resumePlayback: jest.fn(async () => true),
    stopPlayback: jest.fn(async () => undefined),
  })),
}));

jest.mock("../../src/hooks/useVoicePipeline", () => ({
  useVoicePipeline: jest.fn(() => ({
    pipelinePhase: "idle",
    setPipelinePhase: jest.fn(),
    streamingText: "",
    setStreamingText: jest.fn(),
    abortRef: { current: null },
    lastCompletedReplyRef: { current: "" },
    replayPhase: "idle",
    activeReplayMessageId: null,
    handleRepeatLastReply: jest.fn(async () => undefined),
    stopReplay: jest.fn(async () => undefined),
    handleVoiceCaptureDone: jest.fn(async () => undefined),
  })),
}));

jest.mock("../../src/services/llm", () => ({
  validateProviderConnection: jest.fn(async () => undefined),
}));

jest.mock("../../src/services/webSearch", () => ({
  validateWebSearchConnection: jest.fn(async () => undefined),
}));

jest.mock("../../src/screens/main/MainScreenTopBar", () => ({
  MainScreenTopBar: ({
    onToggleDebugLog,
    onOpenDrawer,
    onOpenSettings,
  }: {
    onToggleDebugLog?: () => void;
    onOpenDrawer: () => void;
    onOpenSettings: () => void;
  }) => {
    const React = require("react");
    const { Text, TouchableOpacity, View } = require("react-native");
    const children = [];

    if (onToggleDebugLog) {
      children.push(React.createElement(
        TouchableOpacity,
        { key: "debug-log", onPress: onToggleDebugLog },
        React.createElement(Text, null, "toggle-debug-log"),
      ));
    }

    children.push(
      React.createElement(
        TouchableOpacity,
        { key: "drawer", onPress: onOpenDrawer },
        React.createElement(Text, null, "open-drawer"),
      ),
      React.createElement(
        TouchableOpacity,
        { key: "settings", onPress: onOpenSettings },
        React.createElement(Text, null, "open-settings"),
      ),
    );

    return React.createElement(View, null, children);
  },
}));

jest.mock("../../src/screens/main/MainScreenRouteCard", () => ({
  MainScreenRouteCard: ({ showStyleChip }: { showStyleChip?: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(
      Text,
      null,
      showStyleChip ? "route-card-with-style-chip" : "route-card",
    );
  },
}));

jest.mock("../../src/screens/main/MainScreenVoiceStage", () => ({
  MainScreenVoiceStage: ({ disabled }: { disabled?: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(
      Text,
      null,
      disabled ? "voice-stage:disabled" : "voice-stage:enabled",
    );
  },
}));

jest.mock("../../src/screens/main/TranscriptPreviewCard", () => ({
  TranscriptPreviewCard: () => null,
}));

jest.mock("../../src/screens/main/StatusDetailsModal", () => ({
  StatusDetailsModal: ({ visible }: { visible: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, visible ? "status:open" : "status:closed");
  },
}));

jest.mock("../../src/screens/main/TranscriptModal", () => ({
  TranscriptModal: ({ visible }: { visible: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, visible ? "transcript:open" : "transcript:closed");
  },
}));

jest.mock("../../src/components/SettingsModal", () => ({
  SettingsModal: ({ visible }: { visible: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, visible ? "settings:open" : "settings:closed");
  },
}));

jest.mock("../../src/components/SetupGuideModal", () => ({
  SetupGuideModal: ({ visible }: { visible: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, visible ? "setup:open" : "setup:closed");
  },
}));

jest.mock("../../src/components/ConversationMemoryModal", () => ({
  ConversationMemoryModal: ({ visible }: { visible: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, visible ? "memory:open" : "memory:closed");
  },
}));

jest.mock("../../src/components/ConversationDrawer", () => ({
  ConversationDrawer: ({ visible }: { visible: boolean }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, visible ? "drawer:open" : "drawer:closed");
  },
}));

jest.mock("../../src/components/Toast", () => ({
  Toast: () => null,
}));

jest.mock("../../src/screens/main/useProviderAvailabilityGuards", () => ({
  useProviderAvailabilityGuards: jest.fn(),
}));

jest.mock("../../src/screens/main/useSetupGuideController", () => ({
  useSetupGuideController: jest.fn(() => ({
    handleDismissSetupGuide: jest.fn(),
    handleChooseSetupPreset: jest.fn(),
  })),
}));

jest.mock("../../src/screens/main/useVoiceSessionController", () => ({
  useVoiceSessionController: jest.fn(() => ({
    handlePressIn: jest.fn(),
    handlePressOut: jest.fn(),
    handleTogglePress: jest.fn(),
    resetVoiceSessionState: jest.fn(),
  })),
}));

jest.mock("../../src/screens/main/useConversationActions", () => ({
  useConversationActions: jest.fn(() => ({
    handleCopyMessage: jest.fn(),
    handleCopyThread: jest.fn(),
    handleShareThread: jest.fn(),
    handleShareMessage: jest.fn(),
    handleRenameThread: jest.fn(),
    handleTogglePinned: jest.fn(),
    handleSelectConversation: jest.fn(),
    handleStartNewSession: jest.fn(),
    openMemory: jest.fn(),
    handleCopyMemory: jest.fn(),
    handleClearMemory: jest.fn(),
  })),
}));

jest.mock("../../src/screens/main/usePreviewVoiceController", () => ({
  usePreviewVoiceController: jest.fn(() => ({
    handlePreviewVoice: jest.fn(async () => undefined),
    stopPreviewVoice: jest.fn(async () => undefined),
  })),
}));

const { useSharedSettings } = jest.requireMock(
  "../../src/context/SettingsContext",
) as {
  useSharedSettings: jest.Mock;
};

function createSharedSettingsValue(settingsOverrides: Partial<Settings> = {}) {
  return {
    settings: {
      ...DEFAULT_SETTINGS,
      ...settingsOverrides,
    },
    updateSettings: jest.fn(),
    updateActiveResponseMode: jest.fn(),
    updateResponseModeRoute: jest.fn(),
    updateProviderSttModel: jest.fn(),
    updateProviderTtsModel: jest.fn(),
    updateProviderTtsVoice: jest.fn(),
    updateLocalTtsVoice: jest.fn(),
    updateApiKey: jest.fn(),
    loaded: true,
  };
}

describe("MainScreen", () => {
  beforeEach(() => {
    useSharedSettings.mockReturnValue(createSharedSettingsValue());
  });

  it("renders the shell with the route card", () => {
    const screen = renderWithProviders(<MainScreen />);

    expect(screen.getByText("route-card")).toBeTruthy();
    expect(screen.getByText("voice-stage:disabled")).toBeTruthy();
    expect(screen.getByText("settings:closed")).toBeTruthy();
    expect(screen.getByText("drawer:closed")).toBeTruthy();
  });

  it("enables the voice stage when the active reply provider is configured", () => {
    useSharedSettings.mockReturnValue(
      createSharedSettingsValue({
        apiKeys: {
          ...DEFAULT_SETTINGS.apiKeys,
          [DEFAULT_SETTINGS.responseModes.normal.provider]: "provider-key",
        },
      }),
    );

    const screen = renderWithProviders(<MainScreen />);

    expect(screen.getByText("voice-stage:enabled")).toBeTruthy();
  });

  it("opens settings and the drawer from the top bar", () => {
    const screen = renderWithProviders(<MainScreen />);

    fireEvent.press(screen.getByText("open-settings"));
    fireEvent.press(screen.getByText("open-drawer"));

    expect(screen.getByText("settings:open")).toBeTruthy();
    expect(screen.getByText("drawer:open")).toBeTruthy();
  });

  it("hides the debug log action by default", () => {
    const screen = renderWithProviders(<MainScreen />);

    expect(screen.queryByText("toggle-debug-log")).toBeNull();
  });

  it("renders the debug log action when enabled in app settings", () => {
    useSharedSettings.mockReturnValue(
      createSharedSettingsValue({ showDebugLogButton: true }),
    );

    const screen = renderWithProviders(<MainScreen />);

    expect(screen.getByText("toggle-debug-log")).toBeTruthy();
  });

  it("hides the style chip when no provider is configured", () => {
    const screen = renderWithProviders(<MainScreen />);

    expect(screen.queryByText("route-card-with-style-chip")).toBeNull();
    expect(screen.getByText("route-card")).toBeTruthy();
  });

  it("renders the style chip when a reply provider is configured", () => {
    const route = {
      provider: DEFAULT_SETTINGS.responseModes.normal.provider,
      model: getDefaultModelForProvider(
        DEFAULT_SETTINGS.responseModes.normal.provider,
      ),
    };

    useSharedSettings.mockReturnValue(
      createSharedSettingsValue({
        responseModes: {
          quick: route,
          normal: route,
          deep: route,
        },
        apiKeys: {
          ...DEFAULT_SETTINGS.apiKeys,
          [DEFAULT_SETTINGS.responseModes.normal.provider]: "provider-key",
        },
      }),
    );

    const screen = renderWithProviders(<MainScreen />);

    expect(screen.getByText("route-card-with-style-chip")).toBeTruthy();
  });
});

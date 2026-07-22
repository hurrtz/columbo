import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { ChatTranscript } from "../../components/ChatTranscript";
import { Colors } from "../../theme/colors";
import { Message } from "../../types";

import { TranslateFn } from "./shared";
import { styles } from "./styles";

interface TranscriptPreviewCardProps {
  activeConversationId?: string | null;
  activeConversationTitle?: string;
  colors: Colors;
  layout?: "portrait" | "landscape";
  messages: Message[];
  activeReplayMessageId?: string | null;
  onCopyMessage: (message: Message) => void;
  onRepeatMessage?: (message: Message) => void;
  onRetryMessage: (message: Message) => void;
  onOpenStyleSheet?: () => void;
  onOpenSpeakingSettings?: () => void;
  onShareMessage?: (message: Message) => void;
  presentation?: "card" | "canvas";
  preferredHeight?: number;
  scrollEnabled?: boolean;
  replayPhase?: "idle" | "preparing" | "speaking";
  showUsageStats: boolean;
  showStyleControl?: boolean;
  showWhenEmpty?: boolean;
  style?: StyleProp<ViewStyle>;
  t: TranslateFn;
}

export function TranscriptPreviewCard({
  activeConversationId,
  activeConversationTitle,
  colors,
  layout = "portrait",
  messages,
  activeReplayMessageId = null,
  onCopyMessage,
  onRepeatMessage,
  onRetryMessage,
  onOpenStyleSheet,
  onOpenSpeakingSettings,
  onShareMessage,
  presentation = "card",
  preferredHeight,
  scrollEnabled = false,
  replayPhase = "idle",
  showUsageStats,
  showStyleControl = false,
  showWhenEmpty = false,
  style,
  t,
}: TranscriptPreviewCardProps) {
  if (!showWhenEmpty && messages.length === 0) {
    return null;
  }

  const usesCanvasPresentation =
    layout === "landscape" || presentation === "canvas";
  const usesPortraitCanvas =
    layout === "portrait" && presentation === "canvas";

  return (
    <View
      testID="transcript-preview-card"
      style={[
        styles.transcriptShell,
        usesCanvasPresentation ? styles.transcriptShellCanvas : null,
        usesPortraitCanvas ? styles.transcriptShellPortraitCanvas : null,
        preferredHeight ? { height: preferredHeight } : null,
        style,
        {
          backgroundColor: usesCanvasPresentation
            ? "transparent"
            : colors.surface,
          borderColor: colors.border,
          shadowColor: colors.glow,
        },
      ]}
    >
      <View
        testID="transcript-preview-header"
        style={[
          styles.transcriptHeader,
          usesPortraitCanvas ? styles.transcriptHeaderPortraitCanvas : null,
          {
            borderBottomColor: colors.border,
            borderTopColor: colors.border,
          },
        ]}
      >
        <View style={styles.transcriptHeaderCopy}>
          <Text
            numberOfLines={1}
            style={[styles.transcriptTitle, { color: colors.text }]}
          >
            {activeConversationTitle ?? t("freshSession")}
          </Text>
        </View>

        {showStyleControl && onOpenStyleSheet ? (
          <View style={styles.transcriptHeaderControls}>
            <TouchableOpacity
              testID="conversation-style-control"
              style={styles.transcriptStyleControl}
              onPress={onOpenStyleSheet}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={t("openStyleSheet")}
            >
              <Feather name="sliders" size={19} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View style={styles.transcriptBody}>
        <ChatTranscript
          conversationId={activeConversationId}
          messages={messages}
          emptyTitle={t("noTranscriptYet")}
          emptyDescription={t("previewTranscriptEmptyDescription")}
          contentContainerStyle={styles.previewTranscriptContent}
          messageSelectionEnabled
          scrollEnabled={scrollEnabled}
          showUsageStats={showUsageStats}
          activeRepeatMessageId={activeReplayMessageId}
          onCopyMessage={onCopyMessage}
          onRepeatMessage={onRepeatMessage}
          onRetryMessage={onRetryMessage}
          onOpenSpeakingSettings={onOpenSpeakingSettings}
          onShareMessage={onShareMessage}
          repeatPlaybackStatus={replayPhase}
        />
      </View>
    </View>
  );
}

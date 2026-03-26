import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { ChatTranscript } from "../../components/ChatTranscript";
import { Colors } from "../../theme/colors";
import { Message } from "../../types";

import { TranslateFn } from "./shared";
import { styles } from "./styles";

interface TranscriptPreviewCardProps {
  colors: Colors;
  layout?: "portrait" | "landscape";
  messages: Message[];
  onCopyMessage: (message: Message) => void;
  onOpenTranscript: () => void;
  preferredHeight?: number;
  scrollEnabled?: boolean;
  showUsageStats: boolean;
  showWhenEmpty?: boolean;
  style?: StyleProp<ViewStyle>;
  t: TranslateFn;
}

export function TranscriptPreviewCard({
  colors,
  layout = "portrait",
  messages,
  onCopyMessage,
  onOpenTranscript,
  preferredHeight,
  scrollEnabled = false,
  showUsageStats,
  showWhenEmpty = false,
  style,
  t,
}: TranscriptPreviewCardProps) {
  if (!showWhenEmpty && messages.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.transcriptShell,
        layout === "landscape" ? styles.transcriptShellLandscape : null,
        preferredHeight ? { height: preferredHeight } : null,
        style,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.glow,
        },
      ]}
    >
      <View style={styles.transcriptHeader}>
        <TouchableOpacity
          style={[
            styles.expandButton,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
          onPress={onOpenTranscript}
        >
          <Text style={[styles.expandButtonText, { color: colors.text }]}>
            {t("showTranscript")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transcriptBody}>
        <ChatTranscript
          messages={messages}
          emptyTitle={t("noTranscriptYet")}
          emptyDescription={t("previewTranscriptEmptyDescription")}
          contentContainerStyle={styles.previewTranscriptContent}
          scrollEnabled={scrollEnabled}
          showUsageStats={showUsageStats}
          onCopyMessage={onCopyMessage}
        />
      </View>
    </View>
  );
}

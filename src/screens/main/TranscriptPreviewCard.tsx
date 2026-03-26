import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  showUsageStats: boolean;
  t: TranslateFn;
}

export function TranscriptPreviewCard({
  colors,
  layout = "portrait",
  messages,
  onCopyMessage,
  onOpenTranscript,
  preferredHeight,
  showUsageStats,
  t,
}: TranscriptPreviewCardProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.transcriptShell,
        layout === "landscape" ? styles.transcriptShellLandscape : null,
        preferredHeight ? { height: preferredHeight } : null,
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
          scrollEnabled={false}
          showUsageStats={showUsageStats}
          onCopyMessage={onCopyMessage}
        />
      </View>
    </View>
  );
}

import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { getProviderModelName, PROVIDER_LABELS } from "../../constants/models";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useLocalization } from "../../i18n";
import { getAccessibleForeground } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";
import type { Message } from "../../types";
import { formatTokenCount } from "../../utils/usageStats";
import { getWebSearchSourceDisplayTitle } from "../../utils/webSearchSources";
import { ProviderIcon } from "../ProviderIcon";
import { styles } from "./styles";
import type { ChatBubbleProps, RepeatState } from "./types";

const messageTimestampFormatters = new Map<string, Intl.DateTimeFormat>();
const COPY_CONFIRMATION_DURATION_MS = 3_000;

function formatMessageTimestamp(timestamp: string, locale: string) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  let formatter = messageTimestampFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    messageTimestampFormatters.set(locale, formatter);
  }

  return formatter.format(date).replace(/,\s*/, " · ");
}

function RepeatActionIcon({
  state,
  color,
}: {
  state: RepeatState;
  color: string;
}) {
  const rotation = useRef(new Animated.Value(0)).current;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (state !== "preparing" || reducedMotion) {
      rotation.stopAnimation();
      rotation.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      }),
    );
    animation.start();

    return () => {
      animation.stop();
      rotation.stopAnimation();
      rotation.setValue(0);
    };
  }, [reducedMotion, rotation, state]);

  if (state === "speaking") {
    return <Feather name="square" size={14} color={color} />;
  }

  if (state === "preparing") {
    return (
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        <Feather name="loader" size={14} color={color} />
      </Animated.View>
    );
  }

  return <Feather name="volume-2" size={14} color={color} />;
}

function MessageHeader({ message }: { message: Message }) {
  const { colors } = useTheme();
  const { locale, t } = useLocalization();
  const isUser = message.role === "user";

  const providerLabel = message.provider
    ? PROVIDER_LABELS[message.provider]
    : null;
  const modelLabel =
    message.provider && message.model
      ? getProviderModelName(message.provider, message.model)
      : message.model;
  const timestampLabel = formatMessageTimestamp(message.timestamp, locale);

  return (
    <View testID={`message-header-${message.id}`} style={styles.metaRow}>
      {isUser ? (
        <>
          <Text
            testID={`message-timestamp-${message.id}`}
            numberOfLines={1}
            style={[styles.timestampLabel, { color: colors.textMuted }]}
          >
            {timestampLabel}
          </Text>
          <Text style={[styles.roleLabel, { color: colors.accent }]}>
            {t("you")}
          </Text>
        </>
      ) : (
        <>
          <View style={styles.modelChip}>
            {message.provider ? (
              <View style={styles.providerIcon}>
                <ProviderIcon
                  provider={message.provider}
                  label={providerLabel ?? undefined}
                  color={colors.accent}
                  size={16}
                />
              </View>
            ) : null}
            {modelLabel ? (
              <Text
                numberOfLines={1}
                style={[styles.modelLabel, { color: colors.textSecondary }]}
              >
                {modelLabel}
              </Text>
            ) : !message.provider ? (
              <Text style={[styles.roleLabel, { color: colors.accent }]}>
                {t("assistant")}
              </Text>
            ) : null}
          </View>
          <Text
            testID={`message-timestamp-${message.id}`}
            numberOfLines={1}
            style={[styles.timestampLabel, { color: colors.textMuted }]}
          >
            {timestampLabel}
          </Text>
        </>
      )}
    </View>
  );
}

function MessageText({
  message,
  selectable,
}: {
  message: Message;
  selectable: boolean;
}) {
  const { colors } = useTheme();

  if (!message.content.trim()) {
    return null;
  }

  return selectable ? (
    <TextInput
      value={message.content}
      multiline
      readOnly
      scrollEnabled={false}
      selectionColor={colors.accent}
      testID={`selectable-message-${message.id}`}
      style={[styles.content, styles.selectableContent, { color: colors.text }]}
    />
  ) : (
    <Text style={[styles.content, { color: colors.text }]}>
      {message.content}
    </Text>
  );
}

function ReplyFailureCard({
  message,
  onRetry,
}: Pick<ChatBubbleProps, "message" | "onRetry">) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const replyFailure = message.metadata?.replyFailure;

  if (message.role !== "user" || !replyFailure) {
    return null;
  }

  return (
    <View
      style={[
        styles.replyFailureCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.danger,
        },
      ]}
    >
      <View style={styles.replyFailureHeader}>
        <Feather name="alert-circle" size={14} color={colors.danger} />
        <Text style={[styles.replyFailureTitle, { color: colors.danger }]}>
          {t("replyFailed")}
        </Text>
      </View>
      <Text
        style={[styles.replyFailureMessage, { color: colors.textSecondary }]}
      >
        {replyFailure.message}
      </Text>
      <Text style={[styles.replyFailureHint, { color: colors.textMuted }]}>
        {t("replyFailedHint")}
      </Text>
      {onRetry ? (
        <TouchableOpacity
          style={[
            styles.replyFailureAction,
            {
              backgroundColor: colors.accentSoft,
              borderColor: colors.borderStrong,
            },
          ]}
          onPress={() => onRetry(message)}
          activeOpacity={0.86}
          accessibilityRole="button"
          accessibilityLabel={t("retryReply")}
        >
          <Feather name="rotate-ccw" size={13} color={colors.accent} />
          <Text
            style={[styles.replyFailureActionText, { color: colors.accent }]}
          >
            {t("retry")}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function PipelineNotices({
  message,
  onRepeat,
  onOpenSpeakingSettings,
}: Pick<ChatBubbleProps, "message" | "onRepeat" | "onOpenSpeakingSettings">) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const notices =
    message.role === "assistant" ? (message.metadata?.notices ?? []) : [];

  if (notices.length === 0) {
    return null;
  }

  return (
    <View style={styles.noticeList}>
      {notices.map((notice, index) => (
        <View
          key={`${notice.stage}:${notice.message}:${notice.detail ?? ""}:${index}`}
          style={[
            styles.noticeCard,
            {
              backgroundColor: colors.surfaceAlt,
              borderColor:
                notice.level === "error" ? colors.danger : colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.noticeIcon,
              {
                backgroundColor:
                  notice.level === "error" ? colors.surface : colors.accentSoft,
                borderColor:
                  notice.level === "error"
                    ? colors.danger
                    : colors.borderStrong,
              },
            ]}
          >
            <Feather
              name={notice.level === "error" ? "alert-triangle" : "info"}
              size={12}
              color={notice.level === "error" ? colors.danger : colors.accent}
            />
          </View>
          <View style={styles.noticeCopy}>
            <Text
              style={[
                styles.noticeLabel,
                {
                  color: notice.level === "error" ? colors.danger : colors.text,
                },
              ]}
            >
              {notice.stage === "stt"
                ? t("speechToText")
                : notice.stage === "tts"
                  ? t("textToSpeech")
                  : t("webSearch")}
            </Text>
            <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
              {notice.message}
            </Text>
            {notice.detail ? (
              <Text style={[styles.noticeDetail, { color: colors.textMuted }]}>
                {notice.detail}
              </Text>
            ) : null}
            {notice.stage === "tts" && notice.level === "error" ? (
              <View style={styles.noticeActions}>
                {onRepeat ? (
                  <TouchableOpacity
                    style={[
                      styles.noticeAction,
                      {
                        backgroundColor: colors.accentSoft,
                        borderColor: colors.accent,
                      },
                    ]}
                    onPress={() => onRepeat(message)}
                    activeOpacity={0.86}
                    accessibilityRole="button"
                    accessibilityLabel={t("retrySpeech")}
                  >
                    <Feather name="volume-2" size={13} color={colors.accent} />
                    <Text
                      style={[
                        styles.noticeActionText,
                        { color: colors.accent },
                      ]}
                    >
                      {t("retrySpeech")}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {onOpenSpeakingSettings ? (
                  <TouchableOpacity
                    style={[
                      styles.noticeAction,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={onOpenSpeakingSettings}
                    activeOpacity={0.86}
                    accessibilityRole="button"
                    accessibilityLabel={t("openSpeakingSettings")}
                  >
                    <Feather
                      name="settings"
                      size={13}
                      color={colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.noticeActionText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {t("openSpeakingSettings")}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

function WebSearchReferences({ message }: { message: Message }) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const [expanded, setExpanded] = useState(false);
  const webSearch =
    message.role === "assistant" ? message.metadata?.webSearch : undefined;

  if (!webSearch) {
    return null;
  }

  return (
    <View
      testID={`web-search-references-${message.id}`}
      style={[
        styles.referenceCard,
        {
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        testID={`web-search-accordion-${message.id}`}
        style={styles.referenceToggle}
        onPress={() => setExpanded((current) => !current)}
        activeOpacity={0.76}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={
          expanded ? t("collapseWebSearchDetails") : t("expandWebSearchDetails")
        }
      >
        <View style={styles.referenceToggleTitleRow}>
          <Feather name="globe" size={14} color={colors.accent} />
          <Text style={[styles.referenceToggleTitle, { color: colors.text }]}>
            {t("webSearch")}
          </Text>
        </View>
        <View style={styles.referenceToggleMeta}>
          <Text
            style={[styles.referenceSourceCount, { color: colors.textMuted }]}
          >
            {t("webSearchSourceCount", {
              count: webSearch.sources.length,
            })}
          </Text>
          <Feather
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {expanded ? (
        <View style={styles.referenceContent}>
          <Text style={[styles.referenceHeading, { color: colors.textMuted }]}>
            {t("searchQuery")}
          </Text>
          <Text style={[styles.referenceQuery, { color: colors.text }]}>
            {webSearch.query}
          </Text>
          <Text
            style={[styles.referenceSummary, { color: colors.textSecondary }]}
          >
            {webSearch.summary}
          </Text>
          {webSearch.sources.length > 0 ? (
            <>
              <Text
                style={[styles.referenceHeading, { color: colors.textMuted }]}
              >
                {t("sources")}
              </Text>
              <View style={styles.sourcesRow}>
                {webSearch.sources.map((source) => {
                  const sourceTitle = getWebSearchSourceDisplayTitle(
                    source.title,
                    source.url,
                  );

                  return (
                    <TouchableOpacity
                      key={source.url}
                      style={[
                        styles.sourceChip,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                        },
                      ]}
                      onPress={() => {
                        void Linking.openURL(source.url);
                      }}
                      activeOpacity={0.86}
                      accessibilityRole="link"
                      accessibilityLabel={t("openSourceLink", {
                        source: sourceTitle,
                      })}
                    >
                      <Text
                        numberOfLines={1}
                        style={[styles.sourceLabel, { color: colors.text }]}
                      >
                        {sourceTitle}
                      </Text>
                      <Feather
                        name="arrow-up-right"
                        size={12}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

function UsageCard({
  message,
  showUsageStats,
}: Pick<ChatBubbleProps, "message" | "showUsageStats">) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const usage =
    message.role === "assistant" && showUsageStats ? message.usage : undefined;

  if (!usage) {
    return null;
  }

  return (
    <View
      style={[
        styles.usageCard,
        {
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.usageText, { color: colors.textSecondary }]}>
        {t("estimatedUsageInline", {
          prompt: formatTokenCount(usage.promptTokens),
          completion: formatTokenCount(usage.completionTokens),
          total: formatTokenCount(usage.totalTokens),
        })}
      </Text>
    </View>
  );
}

function useTimedConfirmation(resetKey: string) {
  const [confirmed, setConfirmed] = useState(false);
  const isMountedRef = useRef(true);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );

  useEffect(() => {
    setConfirmed(false);

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, [resetKey]);

  const showConfirmation = () => {
    if (!isMountedRef.current) {
      return;
    }

    setConfirmed(true);
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    resetTimeoutRef.current = setTimeout(() => {
      resetTimeoutRef.current = null;
      setConfirmed(false);
    }, COPY_CONFIRMATION_DURATION_MS);
  };

  return { confirmed, showConfirmation };
}

function MessageActions({
  message,
  onCopy,
  onShare,
  onRepeat,
  repeatState = "idle",
}: Pick<
  ChatBubbleProps,
  "message" | "onCopy" | "onShare" | "onRepeat" | "repeatState"
>) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const {
    confirmed: copyConfirmed,
    showConfirmation: showCopyConfirmation,
  } = useTimedConfirmation(message.id);

  const handleCopyPress = async () => {
    try {
      if (await onCopy?.(message)) {
        showCopyConfirmation();
      }
    } catch {
      // The owning action reports clipboard failures; keep the button neutral.
    }
  };

  if (!onCopy && !onShare && !onRepeat) {
    return null;
  }

  return (
    <View
      testID={`message-actions-${message.id}`}
      style={[
        styles.actionRow,
        {
          backgroundColor: colors.surfaceAlt,
          borderTopColor: colors.border,
        },
      ]}
    >
      {onCopy ? (
        <TouchableOpacity
          testID={`message-copy-action-${message.id}`}
          style={[
            styles.iconAction,
            {
              backgroundColor: copyConfirmed
                ? colors.success
                : colors.surfaceAlt,
              borderColor: copyConfirmed ? colors.success : colors.border,
            },
          ]}
          onPress={() => {
            void handleCopyPress();
          }}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel={copyConfirmed ? t("messageCopied") : t("copy")}
        >
          <Feather
            name={copyConfirmed ? "check" : "copy"}
            size={14}
            color={
              copyConfirmed
                ? getAccessibleForeground(colors.success)
                : colors.textSecondary
            }
          />
        </TouchableOpacity>
      ) : null}
      {onShare ? (
        <TouchableOpacity
          style={[
            styles.iconAction,
            {
              backgroundColor: colors.surfaceAlt,
              borderColor: colors.border,
            },
          ]}
          onPress={() => onShare(message)}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel={t("share")}
        >
          <Feather name="share-2" size={14} color={colors.textSecondary} />
        </TouchableOpacity>
      ) : null}
      {onRepeat ? (
        <TouchableOpacity
          testID={`message-repeat-action-${message.id}`}
          style={[
            styles.iconAction,
            {
              backgroundColor:
                repeatState === "speaking"
                  ? colors.success
                  : repeatState === "preparing"
                    ? colors.phaseSynthesizing
                    : colors.surfaceAlt,
              borderColor:
                repeatState === "speaking"
                  ? colors.success
                  : repeatState === "preparing"
                    ? colors.phaseSynthesizing
                    : colors.border,
            },
          ]}
          onPress={() => onRepeat(message)}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel={
            repeatState === "speaking" ? t("stop") : t("repeatReply")
          }
        >
          <RepeatActionIcon
            state={repeatState}
            color={
              repeatState === "speaking"
                ? getAccessibleForeground(colors.success)
                : repeatState === "preparing"
                  ? getAccessibleForeground(colors.phaseSynthesizing)
                  : colors.textSecondary
            }
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function ChatBubbleContent({
  message,
  onCopy,
  onShare,
  onRepeat,
  onRetry,
  onOpenSpeakingSettings,
  repeatState = "idle",
  selectable = false,
  showUsageStats = false,
}: ChatBubbleProps) {
  return (
    <>
      <MessageHeader message={message} />
      <MessageText message={message} selectable={selectable} />
      <ReplyFailureCard message={message} onRetry={onRetry} />
      <PipelineNotices
        message={message}
        onRepeat={onRepeat}
        onOpenSpeakingSettings={onOpenSpeakingSettings}
      />
      <WebSearchReferences message={message} />
      <UsageCard message={message} showUsageStats={showUsageStats} />
      {selectable && message.role === "assistant" ? (
        <MessageActions
          message={message}
          onCopy={onCopy}
          onShare={onShare}
          onRepeat={onRepeat}
          repeatState={repeatState}
        />
      ) : null}
    </>
  );
}

import ActivityKit
import SwiftUI
import WidgetKit

@main
struct ColumboLiveActivityBundle: WidgetBundle {
  var body: some Widget {
    ColumboVoiceLiveActivity()
  }
}

struct ColumboVoiceLiveActivity: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: ColumboVoiceActivityAttributes.self) { context in
      ColumboLockScreenActivityView(context: context)
        .activityBackgroundTint(Color(red: 0.055, green: 0.063, blue: 0.082))
        .activitySystemActionForegroundColor(.white)
        .widgetURL(URL(string: "columbo://"))
    } dynamicIsland: { context in
      DynamicIsland {
        DynamicIslandExpandedRegion(.leading) {
          ColumboActivityIcon(context: context, size: 20)
        }
        DynamicIslandExpandedRegion(.trailing) {
          ColumboActivityTimer(context: context)
            .font(.system(.body, design: .rounded, weight: .semibold))
        }
        DynamicIslandExpandedRegion(.bottom) {
          HStack(spacing: 8) {
            Text(ColumboActivityCopy.phaseLabel(for: context))
              .font(.subheadline.weight(.medium))
              .lineLimit(1)
            Spacer(minLength: 8)
            Text(ColumboActivityCopy.statusLabel(for: context))
              .font(.caption)
              .foregroundStyle(.secondary)
              .lineLimit(1)
          }
        }
      } compactLeading: {
        ColumboActivityIcon(context: context, size: 15)
      } compactTrailing: {
        ColumboActivityTimer(context: context)
          .font(.system(.caption, design: .rounded, weight: .semibold))
          .frame(minWidth: 36)
      } minimal: {
        ColumboActivityIcon(context: context, size: 14)
      }
      .widgetURL(URL(string: "columbo://"))
      .keylineTint(.cyan)
    }
  }
}

private struct ColumboLockScreenActivityView: View {
  let context: ActivityViewContext<ColumboVoiceActivityAttributes>

  var body: some View {
    HStack(spacing: 12) {
      ColumboActivityIcon(context: context, size: 22)

      VStack(alignment: .leading, spacing: 3) {
        Text("Columbo")
          .font(.headline)
        Text(ColumboActivityCopy.phaseLabel(for: context))
          .font(.subheadline)
          .foregroundStyle(.secondary)
          .lineLimit(1)
      }

      Spacer(minLength: 12)

      VStack(alignment: .trailing, spacing: 3) {
        ColumboActivityTimer(context: context)
          .font(.system(.headline, design: .rounded, weight: .semibold))
        Text(ColumboActivityCopy.statusLabel(for: context))
          .font(.caption2)
          .foregroundStyle(.secondary)
          .lineLimit(1)
      }
    }
    .padding(.horizontal, 4)
  }
}

private struct ColumboActivityIcon: View {
  let context: ActivityViewContext<ColumboVoiceActivityAttributes>
  let size: CGFloat

  var body: some View {
    Image(systemName: ColumboActivityCopy.symbolName(for: context))
      .font(.system(size: size, weight: .semibold))
      .foregroundStyle(context.isStale ? .orange : .cyan)
      .accessibilityHidden(true)
  }
}

private struct ColumboActivityTimer: View {
  let context: ActivityViewContext<ColumboVoiceActivityAttributes>

  var body: some View {
    if context.isStale {
      Image(systemName: "pause.fill")
        .foregroundStyle(.orange)
        .accessibilityLabel(ColumboActivityCopy.possiblyPaused)
    } else if let expectedSpeechAt = context.state.expectedSpeechAt {
      Text(expectedSpeechAt, style: .timer)
        .monospacedDigit()
        .contentTransition(.numericText())
        .accessibilityLabel(ColumboActivityCopy.estimatedTime)
    } else {
      ProgressView()
        .tint(.cyan)
        .accessibilityLabel(ColumboActivityCopy.working)
    }
  }
}

private enum ColumboActivityCopy {
  private static var isGerman: Bool {
    Locale.current.language.languageCode?.identifier == "de"
  }

  static var estimatedTime: String {
    isGerman ? "Geschätzte Zeit bis zur Wiedergabe" : "Estimated time until playback"
  }

  static var possiblyPaused: String {
    isGerman ? "Möglicherweise pausiert" : "Possibly paused"
  }

  static var working: String {
    isGerman ? "In Arbeit" : "Working"
  }

  static func phaseLabel(
    for context: ActivityViewContext<ColumboVoiceActivityAttributes>
  ) -> String {
    if context.isStale {
      return isGerman ? "Columbo öffnen, um fortzufahren" : "Open Columbo to continue"
    }

    switch context.state.phase {
    case "listening":
      return isGerman ? "Hört zu" : "Listening"
    case "transcribing":
      return isGerman ? "Verarbeitet Sprache" : "Processing speech"
    case "searching":
      return isGerman ? "Sucht" : "Searching"
    case "synthesizing":
      return isGerman ? "Bereitet Stimme vor" : "Preparing voice"
    default:
      return isGerman ? "Denkt nach" : "Thinking"
    }
  }

  static func statusLabel(
    for context: ActivityViewContext<ColumboVoiceActivityAttributes>
  ) -> String {
    context.isStale ? possiblyPaused : working
  }

  static func symbolName(
    for context: ActivityViewContext<ColumboVoiceActivityAttributes>
  ) -> String {
    if context.isStale {
      return "exclamationmark.circle.fill"
    }

    switch context.state.phase {
    case "listening":
      return "microphone.fill"
    case "transcribing":
      return "waveform"
    case "searching":
      return "globe"
    case "synthesizing":
      return "speaker.wave.2.fill"
    default:
      return "sparkles"
    }
  }
}

import ActivityKit
import SwiftUI
import WidgetKit

@main
struct MrBroccoliLiveActivityBundle: WidgetBundle {
  var body: some Widget {
    MrBroccoliVoiceLiveActivity()
  }
}

struct MrBroccoliVoiceLiveActivity: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: MrBroccoliVoiceActivityAttributes.self) { context in
      MrBroccoliLockScreenActivityView(context: context)
        .activityBackgroundTint(Color(red: 0.055, green: 0.063, blue: 0.082))
        .activitySystemActionForegroundColor(.white)
        .widgetURL(URL(string: "mrbroccoli://"))
    } dynamicIsland: { context in
      DynamicIsland {
        DynamicIslandExpandedRegion(.leading) {
          MrBroccoliActivityIcon(context: context, size: 20)
        }
        DynamicIslandExpandedRegion(.trailing) {
          MrBroccoliActivityTimer(context: context)
            .font(.system(.body, design: .rounded, weight: .semibold))
        }
        DynamicIslandExpandedRegion(.bottom) {
          HStack(spacing: 8) {
            Text(MrBroccoliActivityCopy.phaseLabel(for: context))
              .font(.subheadline.weight(.medium))
              .lineLimit(1)
            Spacer(minLength: 8)
            Text(MrBroccoliActivityCopy.statusLabel(for: context))
              .font(.caption)
              .foregroundStyle(.secondary)
              .lineLimit(1)
          }
        }
      } compactLeading: {
        MrBroccoliActivityIcon(context: context, size: 15)
      } compactTrailing: {
        MrBroccoliActivityTimer(context: context)
          .font(.system(.caption, design: .rounded, weight: .semibold))
          .frame(minWidth: 36)
      } minimal: {
        MrBroccoliActivityIcon(context: context, size: 14)
      }
      .widgetURL(URL(string: "mrbroccoli://"))
      .keylineTint(.cyan)
    }
  }
}

private struct MrBroccoliLockScreenActivityView: View {
  let context: ActivityViewContext<MrBroccoliVoiceActivityAttributes>

  var body: some View {
    HStack(spacing: 12) {
      MrBroccoliActivityIcon(context: context, size: 22)

      VStack(alignment: .leading, spacing: 3) {
        Text("Mr Broccoli")
          .font(.headline)
        Text(MrBroccoliActivityCopy.phaseLabel(for: context))
          .font(.subheadline)
          .foregroundStyle(.secondary)
          .lineLimit(1)
      }

      Spacer(minLength: 12)

      VStack(alignment: .trailing, spacing: 3) {
        MrBroccoliActivityTimer(context: context)
          .font(.system(.headline, design: .rounded, weight: .semibold))
        Text(MrBroccoliActivityCopy.statusLabel(for: context))
          .font(.caption2)
          .foregroundStyle(.secondary)
          .lineLimit(1)
      }
    }
    .padding(.horizontal, 4)
  }
}

private struct MrBroccoliActivityIcon: View {
  let context: ActivityViewContext<MrBroccoliVoiceActivityAttributes>
  let size: CGFloat

  var body: some View {
    Image(systemName: MrBroccoliActivityCopy.symbolName(for: context))
      .font(.system(size: size, weight: .semibold))
      .foregroundStyle(context.isStale ? .orange : .cyan)
      .accessibilityHidden(true)
  }
}

private struct MrBroccoliActivityTimer: View {
  let context: ActivityViewContext<MrBroccoliVoiceActivityAttributes>

  var body: some View {
    if context.isStale {
      Image(systemName: "pause.fill")
        .foregroundStyle(.orange)
        .accessibilityLabel(MrBroccoliActivityCopy.possiblyPaused)
    } else if let expectedSpeechAt = context.state.expectedSpeechAt {
      Text(expectedSpeechAt, style: .timer)
        .monospacedDigit()
        .contentTransition(.numericText())
        .accessibilityLabel(MrBroccoliActivityCopy.estimatedTime)
    } else {
      ProgressView()
        .tint(.cyan)
        .accessibilityLabel(MrBroccoliActivityCopy.working)
    }
  }
}

private enum MrBroccoliActivityCopy {
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
    for context: ActivityViewContext<MrBroccoliVoiceActivityAttributes>
  ) -> String {
    if context.isStale {
      return isGerman ? "Mr Broccoli öffnen, um fortzufahren" : "Open Mr Broccoli to continue"
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
    for context: ActivityViewContext<MrBroccoliVoiceActivityAttributes>
  ) -> String {
    context.isStale ? possiblyPaused : working
  }

  static func symbolName(
    for context: ActivityViewContext<MrBroccoliVoiceActivityAttributes>
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

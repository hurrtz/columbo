import ActivityKit
import Foundation

@available(iOS 16.1, *)
struct ColumboVoiceActivityAttributes: ActivityAttributes {
  struct ContentState: Codable, Hashable {
    var phase: String
    var expectedSpeechAt: Date?
  }

  var startedAt: Date
}

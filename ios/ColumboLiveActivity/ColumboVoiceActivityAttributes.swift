import ActivityKit
import Foundation

struct ColumboVoiceActivityAttributes: ActivityAttributes {
  struct ContentState: Codable, Hashable {
    var phase: String
    var expectedSpeechAt: Date?
  }

  var startedAt: Date
}

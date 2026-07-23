import AVFoundation
import Foundation

enum MrBroccoliWaveformAudioSession {
  static func activateRecordingSession() throws {
    let session = AVAudioSession.sharedInstance()
    try session.setCategory(
      .playAndRecord,
      mode: .measurement,
      options: [.defaultToSpeaker, .allowBluetoothHFP]
    )
    try session.setActive(true)
  }

  static func deactivate() {
    try? AVAudioSession.sharedInstance().setActive(
      false,
      options: [.notifyOthersOnDeactivation]
    )
  }
}

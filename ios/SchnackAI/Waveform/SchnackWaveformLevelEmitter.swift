import Foundation

final class SchnackWaveformLevelEmitter {
  private let intervalMs: Int
  private var emitTimer: DispatchSourceTimer?

  init(intervalMs: Int) {
    self.intervalMs = intervalMs
  }

  func start(
    sessionId: String,
    sampleProvider: @escaping () -> [Double],
    onLevels: @escaping ([String: Any]) -> Void
  ) {
    stop()

    let timer = DispatchSource.makeTimerSource(queue: DispatchQueue.main)
    timer.schedule(
      deadline: .now(),
      repeating: .milliseconds(intervalMs)
    )
    timer.setEventHandler {
      let samples = sampleProvider()
      let averageMagnitude =
        samples.reduce(0.0) { partialResult, sample in
          partialResult + abs(sample)
        } / Double(max(1, samples.count))

      onLevels([
        "type": "levels",
        "sessionId": sessionId,
        "samples": samples,
        "averageMagnitude": averageMagnitude,
      ])
    }
    emitTimer = timer
    timer.resume()
  }

  func stop() {
    emitTimer?.setEventHandler {}
    emitTimer?.cancel()
    emitTimer = nil
  }
}

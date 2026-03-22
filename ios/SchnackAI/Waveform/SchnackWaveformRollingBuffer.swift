import AVFoundation
import Foundation

final class SchnackWaveformRollingBuffer {
  private let sampleCount: Int
  private let stateLock = NSLock()
  private let inputProcessor: SchnackWaveformInputProcessor
  private var rollingSamples: [Float]
  private var rollingCursor = 0
  private var rollingFilled = false

  init(sampleCount: Int, referenceFloor: Float) {
    self.sampleCount = sampleCount
    self.inputProcessor = SchnackWaveformInputProcessor(referenceFloor: referenceFloor)
    self.rollingSamples = Array(repeating: Float.zero, count: sampleCount)
  }

  func reset() {
    stateLock.lock()
    rollingSamples = Array(repeating: Float.zero, count: sampleCount)
    rollingCursor = 0
    rollingFilled = false
    stateLock.unlock()

    inputProcessor.reset()
    SchnackWaveformCoordinator.shared.clear(channel: .input)
  }

  func append(samples: [Float]) {
    let shapedSamples = inputProcessor.shape(samples: samples)

    stateLock.lock()
    for sample in shapedSamples {
      rollingSamples[rollingCursor] = SchnackWaveformAudioAnalysis.clamp(sample: sample)
      rollingCursor = (rollingCursor + 1) % rollingSamples.count
      if rollingCursor == 0 {
        rollingFilled = true
      }
    }
    let orderedSamples = orderedSamplesLocked()
    stateLock.unlock()

    SchnackWaveformCoordinator.shared.setSamples(
      channel: .input,
      samples: orderedSamples,
      appendedCount: shapedSamples.count
    )
  }

  func append(
    buffer: AVAudioPCMBuffer,
    targetCount: Int
  ) {
    append(
      samples: inputProcessor.extractEnvelopeSamples(
        from: buffer,
        targetCount: targetCount
      )
    )
  }

  func snapshot() -> [Double] {
    stateLock.lock()
    let orderedSamples = orderedSamplesLocked()
    stateLock.unlock()
    return orderedSamples.map(Double.init)
  }

  private func orderedSamplesLocked() -> [Float] {
    if rollingFilled {
      return
        Array(rollingSamples[rollingCursor...]) +
        Array(rollingSamples[..<rollingCursor])
    }

    return
      Array(repeating: 0, count: rollingSamples.count - rollingCursor) +
      Array(rollingSamples[..<rollingCursor])
  }
}

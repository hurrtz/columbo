import UIKit

enum MrBroccoliWaveformChannel: String {
  case input
  case output
}

enum MrBroccoliWaveformRenderStyle: String {
  case automatic
  case waveform
  case envelope
}

final class MrBroccoliWaveformCoordinator {
  static let shared = MrBroccoliWaveformCoordinator()

  private let stateLock = NSLock()
  // Match the rendered oscilloscope window so the wave front fills the dock
  // quickly instead of spending the first half of short clips mostly flat.
  private let defaultSampleCount = 96
  private let inputVisualDelayMs: CFTimeInterval = 72
  private let maxLiveSnapshots = 40
  private var liveSnapshotsByChannel: [MrBroccoliWaveformChannel: [MrBroccoliWaveformLiveSnapshot]]
  private var playbackStateByChannel: [MrBroccoliWaveformChannel: MrBroccoliWaveformPlaybackState]

  private init() {
    let initialSnapshot = MrBroccoliWaveformLiveSnapshot(
      samples: MrBroccoliWaveformMath.emptySamples(count: defaultSampleCount),
      updatedAt: CACurrentMediaTime(),
      appendedCount: 0
    )
    liveSnapshotsByChannel = [
      .input: [initialSnapshot],
      .output: [initialSnapshot],
    ]
    playbackStateByChannel = [:]
  }

  func setSamples(
    channel: MrBroccoliWaveformChannel,
    samples: [Float],
    appendedCount: Int = 0
  ) {
    appendSnapshot(
      channel: channel,
      samples: MrBroccoliWaveformMath.normalize(samples: samples),
      appendedCount: appendedCount
    )
  }

  func setSamples(
    channel: MrBroccoliWaveformChannel,
    samples: [Double],
    appendedCount: Int = 0
  ) {
    appendSnapshot(
      channel: channel,
      samples: MrBroccoliWaveformMath.normalize(samples: samples),
      appendedCount: appendedCount
    )
  }

  func clear(channel: MrBroccoliWaveformChannel) {
    stateLock.lock()
    let count =
      max(
        defaultSampleCount,
        liveSnapshotsByChannel[channel]?.last?.samples.count ?? defaultSampleCount
      )
    liveSnapshotsByChannel[channel] = [
      MrBroccoliWaveformLiveSnapshot(
        samples: MrBroccoliWaveformMath.emptySamples(count: count),
        updatedAt: CACurrentMediaTime(),
        appendedCount: 0
      ),
    ]
    playbackStateByChannel[channel] = nil
    stateLock.unlock()
  }

  func samples(for channel: MrBroccoliWaveformChannel) -> [CGFloat] {
    stateLock.lock()
    let samples: [CGFloat]
    if let playbackState = playbackStateByChannel[channel] {
      samples = MrBroccoliWaveformMath.playbackWindow(
        playbackState: playbackState,
        now: CACurrentMediaTime(),
        defaultSampleCount: defaultSampleCount
      )
    } else {
      samples =
        MrBroccoliWaveformMath.delayedLiveSamples(
          snapshots: liveSnapshotsByChannel[channel],
          channel: channel,
          now: CACurrentMediaTime(),
          inputVisualDelayMs: inputVisualDelayMs
        ) ??
        MrBroccoliWaveformMath.emptySamples(count: defaultSampleCount)
    }
    stateLock.unlock()
    return samples
  }

  func startPlayback(
    channel: MrBroccoliWaveformChannel,
    itemId: String,
    samples: [Double],
    durationMs: Double,
    elapsedMs: Double = 0
  ) {
    stateLock.lock()
    playbackStateByChannel[channel] = MrBroccoliWaveformPlaybackState(
      itemId: itemId,
      samples: MrBroccoliWaveformMath.normalize(samples: samples),
      durationMs: max(1, durationMs),
      startedAt: CACurrentMediaTime() - max(0, elapsedMs) / 1_000
    )
    stateLock.unlock()
  }

  func stopPlayback(channel: MrBroccoliWaveformChannel, itemId: String?) {
    stateLock.lock()
    if let currentPlayback = playbackStateByChannel[channel] {
      if itemId == nil || currentPlayback.itemId == itemId {
        playbackStateByChannel[channel] = nil
        let count =
          max(
            defaultSampleCount,
            liveSnapshotsByChannel[channel]?.last?.samples.count ?? defaultSampleCount
          )
        liveSnapshotsByChannel[channel] = [
          MrBroccoliWaveformLiveSnapshot(
            samples: MrBroccoliWaveformMath.emptySamples(count: count),
            updatedAt: CACurrentMediaTime(),
            appendedCount: 0
          ),
        ]
      }
    }
    stateLock.unlock()
  }

  private func appendSnapshot(
    channel: MrBroccoliWaveformChannel,
    samples: [CGFloat],
    appendedCount: Int
  ) {
    stateLock.lock()
    let snapshot = MrBroccoliWaveformLiveSnapshot(
      samples: samples,
      updatedAt: CACurrentMediaTime(),
      appendedCount: max(0, appendedCount)
    )
    var snapshots = liveSnapshotsByChannel[channel] ?? []
    snapshots.append(snapshot)
    if snapshots.count > maxLiveSnapshots {
      snapshots.removeFirst(snapshots.count - maxLiveSnapshots)
    }
    liveSnapshotsByChannel[channel] = snapshots
    stateLock.unlock()
  }
}

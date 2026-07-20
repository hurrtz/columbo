import UIKit

enum ColumboWaveformChannel: String {
  case input
  case output
}

enum ColumboWaveformRenderStyle: String {
  case automatic
  case waveform
  case envelope
}

final class ColumboWaveformCoordinator {
  static let shared = ColumboWaveformCoordinator()

  private let stateLock = NSLock()
  private let defaultSampleCount = 192
  private let inputVisualDelayMs: CFTimeInterval = 72
  private let maxLiveSnapshots = 40
  private var liveSnapshotsByChannel: [ColumboWaveformChannel: [ColumboWaveformLiveSnapshot]]
  private var playbackStateByChannel: [ColumboWaveformChannel: ColumboWaveformPlaybackState]

  private init() {
    let initialSnapshot = ColumboWaveformLiveSnapshot(
      samples: ColumboWaveformMath.emptySamples(count: defaultSampleCount),
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
    channel: ColumboWaveformChannel,
    samples: [Float],
    appendedCount: Int = 0
  ) {
    appendSnapshot(
      channel: channel,
      samples: ColumboWaveformMath.normalize(samples: samples),
      appendedCount: appendedCount
    )
  }

  func setSamples(
    channel: ColumboWaveformChannel,
    samples: [Double],
    appendedCount: Int = 0
  ) {
    appendSnapshot(
      channel: channel,
      samples: ColumboWaveformMath.normalize(samples: samples),
      appendedCount: appendedCount
    )
  }

  func clear(channel: ColumboWaveformChannel) {
    stateLock.lock()
    let count =
      max(
        defaultSampleCount,
        liveSnapshotsByChannel[channel]?.last?.samples.count ?? defaultSampleCount
      )
    liveSnapshotsByChannel[channel] = [
      ColumboWaveformLiveSnapshot(
        samples: ColumboWaveformMath.emptySamples(count: count),
        updatedAt: CACurrentMediaTime(),
        appendedCount: 0
      ),
    ]
    playbackStateByChannel[channel] = nil
    stateLock.unlock()
  }

  func samples(for channel: ColumboWaveformChannel) -> [CGFloat] {
    stateLock.lock()
    let samples: [CGFloat]
    if let playbackState = playbackStateByChannel[channel] {
      samples = ColumboWaveformMath.playbackWindow(
        playbackState: playbackState,
        now: CACurrentMediaTime(),
        defaultSampleCount: defaultSampleCount
      )
    } else {
      samples =
        ColumboWaveformMath.delayedLiveSamples(
          snapshots: liveSnapshotsByChannel[channel],
          channel: channel,
          now: CACurrentMediaTime(),
          inputVisualDelayMs: inputVisualDelayMs
        ) ??
        ColumboWaveformMath.emptySamples(count: defaultSampleCount)
    }
    stateLock.unlock()
    return samples
  }

  func startPlayback(
    channel: ColumboWaveformChannel,
    itemId: String,
    samples: [Double],
    durationMs: Double
  ) {
    stateLock.lock()
    playbackStateByChannel[channel] = ColumboWaveformPlaybackState(
      itemId: itemId,
      samples: ColumboWaveformMath.normalize(samples: samples),
      durationMs: max(1, durationMs),
      startedAt: CACurrentMediaTime()
    )
    stateLock.unlock()
  }

  func stopPlayback(channel: ColumboWaveformChannel, itemId: String?) {
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
          ColumboWaveformLiveSnapshot(
            samples: ColumboWaveformMath.emptySamples(count: count),
            updatedAt: CACurrentMediaTime(),
            appendedCount: 0
          ),
        ]
      }
    }
    stateLock.unlock()
  }

  private func appendSnapshot(
    channel: ColumboWaveformChannel,
    samples: [CGFloat],
    appendedCount: Int
  ) {
    stateLock.lock()
    let snapshot = ColumboWaveformLiveSnapshot(
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

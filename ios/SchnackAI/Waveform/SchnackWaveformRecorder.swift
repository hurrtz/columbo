import AVFoundation
import Foundation

final class SchnackWaveformRecorder {
  static let rollingSampleCount = 192
  private static let inputSampleChunkCount = 6
  private static let inputTapBufferSize: AVAudioFrameCount = 256
  private static let inputReferenceFloor: Float = 0.11

  var onEvent: (([String: Any]) -> Void)?

  private let stateLock = NSLock()
  private let levelEmitter = SchnackWaveformLevelEmitter(intervalMs: 80)
  private let rollingBuffer = SchnackWaveformRollingBuffer(
    sampleCount: SchnackWaveformRecorder.rollingSampleCount,
    referenceFloor: SchnackWaveformRecorder.inputReferenceFloor
  )
  private var audioEngine: AVAudioEngine?
  private var audioFile: AVAudioFile?
  private var activeSessionId: String?
  private var outputURL: URL?
  private var pendingRecordingErrorSessionId: String?

  func startRecording(
    sessionId: String,
    outputURL: URL
  ) throws -> URL {
    guard activeSessionId == nil else {
      throw NSError(
        domain: "SchnackNativeWaveform",
        code: 100,
        userInfo: [NSLocalizedDescriptionKey: "Another native waveform recording session is already active."]
      )
    }

    try FileManager.default.createDirectory(
      at: outputURL.deletingLastPathComponent(),
      withIntermediateDirectories: true
    )

    try SchnackWaveformAudioSession.activateRecordingSession()

    let engine = AVAudioEngine()
    let inputNode = engine.inputNode
    let inputFormat = inputNode.inputFormat(forBus: 0)

    guard inputFormat.channelCount > 0 else {
      throw NSError(
        domain: "SchnackNativeWaveform",
        code: 101,
        userInfo: [NSLocalizedDescriptionKey: "No microphone input channels are available."]
      )
    }

    let fileSettings: [String: Any] = [
      AVFormatIDKey: kAudioFormatLinearPCM,
      AVSampleRateKey: inputFormat.sampleRate,
      AVNumberOfChannelsKey: inputFormat.channelCount,
      AVLinearPCMBitDepthKey: 32,
      AVLinearPCMIsFloatKey: true,
      AVLinearPCMIsBigEndianKey: false,
      AVLinearPCMIsNonInterleaved: false,
    ]

    let file = try AVAudioFile(
      forWriting: outputURL,
      settings: fileSettings,
      commonFormat: .pcmFormatFloat32,
      interleaved: false
    )

    rollingBuffer.reset()

    inputNode.installTap(
      onBus: 0,
      bufferSize: Self.inputTapBufferSize,
      format: inputFormat
    ) { [weak self] buffer, _ in
      guard let self else {
        return
      }

      do {
        try file.write(from: buffer)
      } catch {
        self.handleRecordingWriteError(
          sessionId: sessionId,
          message: error.localizedDescription
        )
        return
      }

      self.rollingBuffer.append(
        buffer: buffer,
        targetCount: Self.inputSampleChunkCount
      )
    }

    engine.prepare()
    try engine.start()

    audioEngine = engine
    audioFile = file
    activeSessionId = sessionId
    self.outputURL = outputURL
    levelEmitter.start(
      sessionId: sessionId,
      sampleProvider: { [weak self] in
        self?.rollingBuffer.snapshot() ?? []
      },
      onLevels: { [weak self] body in
        self?.emitEvent(body)
      }
    )

    emitEvent([
      "type": "started",
      "sessionId": sessionId,
      "uri": outputURL.absoluteString,
    ])

    return outputURL
  }

  func stopRecording(sessionId: String) throws -> URL {
    let outputURL = try finishRecording(sessionId: sessionId, deleteOutput: false)
    emitEvent([
      "type": "stopped",
      "sessionId": sessionId,
      "uri": outputURL.absoluteString,
    ])
    return outputURL
  }

  func cancelRecording(sessionId: String) throws {
    _ = try finishRecording(sessionId: sessionId, deleteOutput: true)
    emitEvent([
      "type": "cancelled",
      "sessionId": sessionId,
    ])
  }

  func cleanup() {
    cleanupRecording(deleteOutput: false)
  }

  private func finishRecording(sessionId: String, deleteOutput: Bool) throws -> URL {
    guard activeSessionId == sessionId else {
      throw NSError(
        domain: "SchnackNativeWaveform",
        code: 1,
        userInfo: [NSLocalizedDescriptionKey: "The native waveform recorder is not active for this session."]
      )
    }

    guard let outputURL else {
      throw NSError(
        domain: "SchnackNativeWaveform",
        code: 2,
        userInfo: [NSLocalizedDescriptionKey: "The native waveform recorder has no output file."]
      )
    }

    cleanupRecording(deleteOutput: deleteOutput)
    return outputURL
  }

  private func cleanupRecording(deleteOutput: Bool) {
    levelEmitter.stop()

    if let inputNode = audioEngine?.inputNode {
      inputNode.removeTap(onBus: 0)
    }

    audioEngine?.stop()
    audioEngine = nil
    audioFile = nil
    activeSessionId = nil
    pendingRecordingErrorSessionId = nil

    let outputURL = self.outputURL
    self.outputURL = nil

    rollingBuffer.reset()
    SchnackWaveformAudioSession.deactivate()

    if deleteOutput, let outputURL {
      try? FileManager.default.removeItem(at: outputURL)
    }
  }

  private func handleRecordingWriteError(sessionId: String, message: String) {
    stateLock.lock()
    let shouldHandleError =
      activeSessionId == sessionId &&
      pendingRecordingErrorSessionId != sessionId
    if shouldHandleError {
      pendingRecordingErrorSessionId = sessionId
    }
    stateLock.unlock()

    guard shouldHandleError else {
      return
    }

    DispatchQueue.main.async {
      guard self.activeSessionId == sessionId else {
        self.stateLock.lock()
        if self.pendingRecordingErrorSessionId == sessionId {
          self.pendingRecordingErrorSessionId = nil
        }
        self.stateLock.unlock()
        return
      }

      self.emitEvent([
        "type": "error",
        "sessionId": sessionId,
        "message": message,
      ])
      self.cleanupRecording(deleteOutput: true)
    }
  }

  private func emitEvent(_ body: [String: Any]) {
    onEvent?(body)
  }
}

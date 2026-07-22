import AVFoundation
import Foundation
import React

@objc(ColumboNativeWaveform)
final class ColumboNativeWaveform: RCTEventEmitter {
  private static let eventName = "ColumboNativeWaveformEvent"
  private var hasListeners = false
  private lazy var recorder: ColumboWaveformRecorder = {
    let recorder = ColumboWaveformRecorder()
    recorder.onEvent = { [weak self] body in
      self?.emitEvent(body)
    }
    return recorder
  }()

  override static func requiresMainQueueSetup() -> Bool {
    true
  }

  override func supportedEvents() -> [String]! {
    [Self.eventName]
  }

  override func startObserving() {
    hasListeners = true
  }

  override func stopObserving() {
    hasListeners = false
  }

  @objc(startRecording:outputUri:resolver:rejecter:)
  func startRecording(
    _ sessionId: String,
    outputUri: String?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard !sessionId.isEmpty else {
        reject("native_waveform_record_error", "sessionId is required.", nil)
        return
      }

      do {
        let outputURL = try self.resolveOutputURL(from: outputUri)
        let recording = try self.recorder.startRecording(
          sessionId: sessionId,
          outputURL: outputURL
        )
        resolve(["uri": recording.absoluteString])
      } catch {
        self.recorder.cleanup()
        reject("native_waveform_record_error", error.localizedDescription, error)
      }
    }
  }

  @objc(stopRecording:resolver:rejecter:)
  func stopRecording(
    _ sessionId: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      do {
        let outputURL = try self.recorder.stopRecording(sessionId: sessionId)
        resolve(["uri": outputURL.absoluteString])
      } catch {
        reject("native_waveform_record_error", error.localizedDescription, error)
      }
    }
  }

  @objc(cancelRecording:resolver:rejecter:)
  func cancelRecording(
    _ sessionId: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      do {
        try self.recorder.cancelRecording(sessionId: sessionId)
        resolve(true)
      } catch {
        reject("native_waveform_record_error", error.localizedDescription, error)
      }
    }
  }

  override func invalidate() {
    super.invalidate()
    DispatchQueue.main.async {
      self.recorder.cleanup()
    }
  }

  private func emitEvent(_ body: [String: Any]) {
    guard hasListeners else {
      return
    }

    sendEvent(withName: Self.eventName, body: body)
  }

  private func resolveOutputURL(from uri: String?) throws -> URL {
    if let uri, !uri.isEmpty {
      if let fileURL = URL(string: uri), fileURL.isFileURL {
        return fileURL
      }

      return URL(fileURLWithPath: uri)
    }

    let cachesDirectory = try FileManager.default.url(
      for: .cachesDirectory,
      in: .userDomainMask,
      appropriateFor: nil,
      create: true
    )

    return cachesDirectory.appendingPathComponent(
      "native-waveform-\(Date().timeIntervalSince1970).wav"
    )
  }
}

import ActivityKit
import Foundation
import React
import UIKit

@objc(ColumboVoiceLiveActivity)
final class ColumboVoiceLiveActivity: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    true
  }

  @objc(setState:expectedSpeechAtMs:resolver:rejecter:)
  func setState(
    _ phase: String,
    expectedSpeechAtMs: NSNumber?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard #available(iOS 16.2, *) else {
      resolve(false)
      return
    }

    Task { @MainActor in
      do {
        resolve(
          try await ColumboVoiceLiveActivityStore.setState(
            phase: phase,
            expectedSpeechAtMs: expectedSpeechAtMs
          )
        )
      } catch {
        reject("voice_live_activity_error", error.localizedDescription, error)
      }
    }
  }

  @objc(endActivity:rejecter:)
  func endActivity(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard #available(iOS 16.2, *) else {
      resolve(false)
      return
    }

    Task { @MainActor in
      await ColumboVoiceLiveActivityStore.endAll()
      resolve(true)
    }
  }
}

@available(iOS 16.2, *)
@MainActor
private enum ColumboVoiceLiveActivityStore {
  private static let freshnessWindow: TimeInterval = 45
  private static var currentActivity: Activity<ColumboVoiceActivityAttributes>?

  static func setState(
    phase: String,
    expectedSpeechAtMs: NSNumber?
  ) async throws -> Bool {
    guard ActivityAuthorizationInfo().areActivitiesEnabled else {
      return false
    }

    let expectedSpeechAt = expectedSpeechAtMs.map {
      Date(timeIntervalSince1970: $0.doubleValue / 1000)
    }
    let state = ColumboVoiceActivityAttributes.ContentState(
      phase: phase,
      expectedSpeechAt: expectedSpeechAt
    )
    let content = ActivityContent(
      state: state,
      staleDate: Date().addingTimeInterval(freshnessWindow),
      relevanceScore: 1
    )

    if let activity = activeActivity() {
      await activity.update(content)
      return true
    }

    // Apple only permits an app to start its own Live Activity while it is in
    // the foreground. Once started, local updates may continue during the
    // app's bounded background execution time.
    guard UIApplication.shared.applicationState != .background else {
      return false
    }

    currentActivity = try Activity.request(
      attributes: ColumboVoiceActivityAttributes(startedAt: Date()),
      content: content,
      pushType: nil
    )
    return true
  }

  static func endAll() async {
    let activities = Activity<ColumboVoiceActivityAttributes>.activities

    for activity in activities {
      await activity.end(nil, dismissalPolicy: .immediate)
    }

    currentActivity = nil
  }

  private static func activeActivity() -> Activity<ColumboVoiceActivityAttributes>? {
    if let currentActivity,
       Activity<ColumboVoiceActivityAttributes>.activities.contains(where: {
         $0.id == currentActivity.id
       }) {
      return currentActivity
    }

    currentActivity = Activity<ColumboVoiceActivityAttributes>.activities.first
    return currentActivity
  }
}

package com.tobiaswinkler.app.columbo

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class ColumboNativeWaveformPackage : ReactPackage {
  override fun createNativeModules(
    reactContext: ReactApplicationContext,
  ): List<NativeModule> =
    listOf(
      ColumboNativeWaveformModule(reactContext),
      ColumboNativeAudioQueueModule(reactContext),
      ColumboVoiceLiveActivityModule(reactContext),
    )

  override fun createViewManagers(
    reactContext: ReactApplicationContext,
  ): List<ViewManager<*, *>> = listOf(ColumboNativeWaveformViewManager())
}

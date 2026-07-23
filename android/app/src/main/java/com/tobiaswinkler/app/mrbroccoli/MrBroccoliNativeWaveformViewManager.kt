package com.tobiaswinkler.app.mrbroccoli

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class MrBroccoliNativeWaveformViewManager : SimpleViewManager<MrBroccoliWaveformView>() {
  override fun getName(): String = "MrBroccoliNativeWaveformView"

  override fun createViewInstance(reactContext: ThemedReactContext): MrBroccoliWaveformView =
    MrBroccoliWaveformView(reactContext)

  @ReactProp(name = "channel")
  fun setChannel(view: MrBroccoliWaveformView, channel: String?) {
    view.channel = channel ?: "input"
  }

  @ReactProp(name = "active", defaultBoolean = true)
  fun setActive(view: MrBroccoliWaveformView, active: Boolean) {
    view.active = active
  }

  @ReactProp(name = "lineColor", customType = "Color")
  fun setLineColor(view: MrBroccoliWaveformView, color: Int?) {
    if (color != null) {
      view.lineColor = color
    }
  }

  @ReactProp(name = "baselineColor", customType = "Color")
  fun setBaselineColor(view: MrBroccoliWaveformView, color: Int?) {
    if (color != null) {
      view.baselineColor = color
    }
  }

  @ReactProp(name = "lineWidth", defaultFloat = 3f)
  fun setLineWidth(view: MrBroccoliWaveformView, lineWidth: Float) {
    view.lineWidth = lineWidth
  }

  @ReactProp(name = "renderStyle")
  fun setRenderStyle(view: MrBroccoliWaveformView, renderStyle: String?) {
    view.renderStyle = renderStyle ?: "automatic"
  }
}

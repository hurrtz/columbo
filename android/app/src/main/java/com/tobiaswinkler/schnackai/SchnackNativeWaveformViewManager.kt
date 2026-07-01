package com.tobiaswinkler.schnackai

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class SchnackNativeWaveformViewManager : SimpleViewManager<SchnackWaveformView>() {
  override fun getName(): String = "SchnackNativeWaveformView"

  override fun createViewInstance(reactContext: ThemedReactContext): SchnackWaveformView =
    SchnackWaveformView(reactContext)

  @ReactProp(name = "channel")
  fun setChannel(view: SchnackWaveformView, channel: String?) {
    view.channel = channel ?: "input"
  }

  @ReactProp(name = "active", defaultBoolean = true)
  fun setActive(view: SchnackWaveformView, active: Boolean) {
    view.active = active
  }

  @ReactProp(name = "lineColor", customType = "Color")
  fun setLineColor(view: SchnackWaveformView, color: Int?) {
    if (color != null) {
      view.lineColor = color
    }
  }

  @ReactProp(name = "baselineColor", customType = "Color")
  fun setBaselineColor(view: SchnackWaveformView, color: Int?) {
    if (color != null) {
      view.baselineColor = color
    }
  }

  @ReactProp(name = "lineWidth", defaultFloat = 3f)
  fun setLineWidth(view: SchnackWaveformView, lineWidth: Float) {
    view.lineWidth = lineWidth
  }

  @ReactProp(name = "renderStyle")
  fun setRenderStyle(view: SchnackWaveformView, renderStyle: String?) {
    view.renderStyle = renderStyle ?: "automatic"
  }
}

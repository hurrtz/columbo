package com.tobiaswinkler.app.columbo

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class ColumboNativeWaveformViewManager : SimpleViewManager<ColumboWaveformView>() {
  override fun getName(): String = "ColumboNativeWaveformView"

  override fun createViewInstance(reactContext: ThemedReactContext): ColumboWaveformView =
    ColumboWaveformView(reactContext)

  @ReactProp(name = "channel")
  fun setChannel(view: ColumboWaveformView, channel: String?) {
    view.channel = channel ?: "input"
  }

  @ReactProp(name = "active", defaultBoolean = true)
  fun setActive(view: ColumboWaveformView, active: Boolean) {
    view.active = active
  }

  @ReactProp(name = "lineColor", customType = "Color")
  fun setLineColor(view: ColumboWaveformView, color: Int?) {
    if (color != null) {
      view.lineColor = color
    }
  }

  @ReactProp(name = "baselineColor", customType = "Color")
  fun setBaselineColor(view: ColumboWaveformView, color: Int?) {
    if (color != null) {
      view.baselineColor = color
    }
  }

  @ReactProp(name = "lineWidth", defaultFloat = 3f)
  fun setLineWidth(view: ColumboWaveformView, lineWidth: Float) {
    view.lineWidth = lineWidth
  }

  @ReactProp(name = "renderStyle")
  fun setRenderStyle(view: ColumboWaveformView, renderStyle: String?) {
    view.renderStyle = renderStyle ?: "automatic"
  }
}

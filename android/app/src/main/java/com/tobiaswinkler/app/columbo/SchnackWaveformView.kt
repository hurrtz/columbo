package com.tobiaswinkler.app.columbo

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Path
import android.view.View
import kotlin.math.max

class SchnackWaveformView(context: Context) : View(context) {
  var channel: String = "input"
    set(value) {
      field = if (value == "output") "output" else "input"
      invalidate()
    }

  var active: Boolean = true
    set(value) {
      field = value
      updateAnimation()
      invalidate()
    }

  var lineColor: Int = Color.argb(245, 255, 255, 255)
    set(value) {
      field = value
      invalidate()
    }

  var baselineColor: Int = Color.argb(31, 255, 255, 255)
    set(value) {
      field = value
      invalidate()
    }

  var lineWidth: Float = 3f
    set(value) {
      field = max(1f, value)
      invalidate()
    }

  var renderStyle: String = "automatic"
    set(value) {
      field =
        when (value) {
          "waveform", "envelope" -> value
          else -> "automatic"
        }
      invalidate()
    }

  private val baselinePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
    style = Paint.Style.STROKE
    strokeWidth = 1f
  }
  private val linePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
    style = Paint.Style.STROKE
    strokeCap = Paint.Cap.ROUND
    strokeJoin = Paint.Join.ROUND
  }
  private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
    style = Paint.Style.FILL
  }
  private val path = Path()
  private val fillPath = Path()
  private var animating = false

  private val animationTick =
    object : Runnable {
      override fun run() {
        if (!animating) {
          return
        }

        invalidate()
        postOnAnimation(this)
      }
    }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    updateAnimation()
  }

  override fun onDetachedFromWindow() {
    animating = false
    removeCallbacks(animationTick)
    super.onDetachedFromWindow()
  }

  override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)

    val width = width.toFloat()
    val height = height.toFloat()
    if (width <= 1f || height <= 1f) {
      return
    }

    val centerY = height / 2f
    baselinePaint.color = baselineColor
    canvas.drawLine(0f, centerY, width, centerY, baselinePaint)

    val samples = SchnackWaveformStateCoordinator.samples(channel)
    if (samples.isEmpty()) {
      return
    }

    linePaint.color = lineColor
    linePaint.strokeWidth = lineWidth
    fillPaint.color = withAlpha(lineColor, if (active) 30 else 15)

    if (resolvedRenderStyle() == "envelope") {
      drawEnvelope(canvas, samples, width, height, centerY)
    } else {
      drawWaveform(canvas, samples, width, height, centerY)
    }
  }

  private fun drawEnvelope(
    canvas: Canvas,
    samples: List<Double>,
    width: Float,
    height: Float,
    centerY: Float,
  ) {
    path.reset()
    fillPath.reset()

    val amplitude = height * 0.42f
    samples.forEachIndexed { index, sample ->
      val x = xForSample(index, samples.size, width)
      val y = centerY - (sample.toFloat() * amplitude)
      if (index == 0) {
        path.moveTo(x, y)
        fillPath.moveTo(x, centerY)
        fillPath.lineTo(x, y)
      } else {
        path.lineTo(x, y)
        fillPath.lineTo(x, y)
      }
    }

    fillPath.lineTo(width, centerY)
    fillPath.close()
    canvas.drawPath(fillPath, fillPaint)
    canvas.drawPath(path, linePaint)
  }

  private fun drawWaveform(
    canvas: Canvas,
    samples: List<Double>,
    width: Float,
    height: Float,
    centerY: Float,
  ) {
    path.reset()
    fillPath.reset()

    val amplitude = height * 0.42f
    samples.forEachIndexed { index, sample ->
      val x = xForSample(index, samples.size, width)
      val direction = if (index % 2 == 0) -1f else 1f
      val y = centerY + direction * sample.toFloat() * amplitude
      if (index == 0) {
        path.moveTo(x, y)
        fillPath.moveTo(x, centerY)
        fillPath.lineTo(x, y)
      } else {
        path.lineTo(x, y)
        fillPath.lineTo(x, y)
      }
    }

    fillPath.lineTo(width, centerY)
    fillPath.close()
    canvas.drawPath(fillPath, fillPaint)
    canvas.drawPath(path, linePaint)
  }

  private fun resolvedRenderStyle(): String =
    if (renderStyle == "automatic") {
      if (channel == "output") "waveform" else "envelope"
    } else {
      renderStyle
    }

  private fun xForSample(index: Int, count: Int, width: Float): Float {
    if (count <= 1) {
      return 0f
    }

    return index.toFloat() / (count - 1).toFloat() * width
  }

  private fun updateAnimation() {
    val shouldAnimate = active && windowToken != null
    if (shouldAnimate == animating) {
      return
    }

    animating = shouldAnimate
    removeCallbacks(animationTick)
    if (animating) {
      postOnAnimation(animationTick)
    }
  }

  private fun withAlpha(color: Int, alpha: Int): Int =
    Color.argb(
      alpha.coerceIn(0, 255),
      Color.red(color),
      Color.green(color),
      Color.blue(color),
    )
}

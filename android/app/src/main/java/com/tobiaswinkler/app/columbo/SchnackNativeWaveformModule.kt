package com.tobiaswinkler.app.columbo

import android.media.MediaRecorder
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.File
import java.util.ArrayDeque
import kotlin.math.sqrt

class SchnackNativeWaveformModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val NAME = "SchnackNativeWaveform"
    private const val EVENT_NAME = "SchnackNativeWaveformEvent"
    private const val LEVEL_HISTORY_SIZE = 48
    private const val LEVEL_TICK_MS = 100L
  }

  private val mainHandler = Handler(Looper.getMainLooper())
  private val lock = Any()
  private val levelHistory = ArrayDeque<Double>(LEVEL_HISTORY_SIZE)

  private var recorder: MediaRecorder? = null
  private var activeSessionId: String? = null
  private var activeOutputFile: File? = null

  private val levelTicker =
    object : Runnable {
      override fun run() {
        emitLevelSnapshot()

        synchronized(lock) {
          if (activeSessionId != null) {
            mainHandler.postDelayed(this, LEVEL_TICK_MS)
          }
        }
      }
    }

  override fun getName(): String = NAME

  @ReactMethod
  fun addListener(eventName: String?) = Unit

  @ReactMethod
  fun removeListeners(count: Int) = Unit

  @ReactMethod
  fun startRecording(sessionId: String, outputUri: String?, promise: Promise) {
    synchronized(lock) {
      if (sessionId.isBlank()) {
        promise.reject(
          "native_waveform_record_error",
          "sessionId is required.",
        )
        return
      }

      if (recorder != null || activeSessionId != null) {
        promise.reject(
          "native_waveform_record_error",
          "Another native waveform recording session is already active.",
        )
        return
      }

      try {
        val outputFile = resolveOutputFile(outputUri)
        outputFile.parentFile?.mkdirs()

        val nextRecorder =
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            MediaRecorder(reactApplicationContext)
          } else {
            @Suppress("DEPRECATION")
            MediaRecorder()
          }

        configureRecorder(nextRecorder, outputFile)
        nextRecorder.prepare()
        nextRecorder.start()

        recorder = nextRecorder
        activeSessionId = sessionId
        activeOutputFile = outputFile
        levelHistory.clear()
        startLevelTickerLocked()

        emitLifecycleEvent(
          type = "started",
          sessionId = sessionId,
          file = outputFile,
        )
        promise.resolve(createUriResult(outputFile))
      } catch (error: Exception) {
        cleanupRecorderLocked(deleteOutput = true)
        emitErrorEvent(
          sessionId = sessionId,
          message =
            error.message ?: "The native waveform recorder could not be started.",
        )
        promise.reject(
          "native_waveform_record_error",
          error.message ?: "The native waveform recorder could not be started.",
          error,
        )
      }
    }
  }

  @ReactMethod
  fun stopRecording(sessionId: String, promise: Promise) {
    synchronized(lock) {
      val currentRecorder = recorder
      val currentSessionId = activeSessionId
      val outputFile = activeOutputFile

      if (
        currentRecorder == null ||
        currentSessionId == null ||
        outputFile == null ||
        currentSessionId != sessionId
      ) {
        promise.reject(
          "native_waveform_record_error",
          "No active recording session matches the requested sessionId.",
        )
        return
      }

      stopLevelTickerLocked()

      try {
        currentRecorder.stop()
        currentRecorder.reset()
        currentRecorder.release()

        recorder = null
        activeSessionId = null
        activeOutputFile = null
        levelHistory.clear()

        emitLifecycleEvent(
          type = "stopped",
          sessionId = sessionId,
          file = outputFile,
        )
        promise.resolve(createUriResult(outputFile))
      } catch (error: RuntimeException) {
        cleanupRecorderLocked(deleteOutput = true)
        emitErrorEvent(
          sessionId = sessionId,
          message = "The recording was too short to be processed.",
        )
        promise.reject(
          "native_waveform_record_error",
          "The recording was too short to be processed.",
          error,
        )
      } catch (error: Exception) {
        cleanupRecorderLocked(deleteOutput = true)
        emitErrorEvent(
          sessionId = sessionId,
          message =
            error.message ?: "The native waveform recorder could not be stopped.",
        )
        promise.reject(
          "native_waveform_record_error",
          error.message ?: "The native waveform recorder could not be stopped.",
          error,
        )
      }
    }
  }

  @ReactMethod
  fun cancelRecording(sessionId: String, promise: Promise) {
    synchronized(lock) {
      if (recorder == null || activeSessionId == null || activeSessionId != sessionId) {
        promise.resolve(false)
        return
      }

      cleanupRecorderLocked(deleteOutput = true)
      emitLifecycleEvent(type = "cancelled", sessionId = sessionId)
      promise.resolve(true)
    }
  }

  @ReactMethod
  fun analyzeAudioFile(uri: String, sampleCount: Double?, promise: Promise) {
    try {
      promise.resolve(
        SchnackWaveformAudioAnalyzer.analyze(
          reactApplicationContext,
          uri,
          sampleCount?.toInt(),
        ),
      )
    } catch (error: Exception) {
      promise.reject(
        "native_waveform_analysis_error",
        error.message ?: "The audio file could not be analyzed for waveform output.",
        error,
      )
    }
  }

  @ReactMethod
  fun startOutputPlayback(
    itemId: String,
    samples: ReadableArray,
    durationMs: Double,
    promise: Promise,
  ) {
    if (itemId.isBlank()) {
      promise.reject(
        "native_waveform_output_error",
        "itemId is required.",
      )
      return
    }

    SchnackWaveformStateCoordinator.startPlayback(
      channel = "output",
      itemId = itemId,
      samples = samples.toDoubleList(),
      durationMs = durationMs,
    )
    promise.resolve(true)
  }

  @ReactMethod
  fun stopOutputPlayback(itemId: String?, promise: Promise) {
    SchnackWaveformStateCoordinator.stopPlayback(
      channel = "output",
      itemId = itemId,
    )
    promise.resolve(true)
  }

  override fun invalidate() {
    synchronized(lock) {
      cleanupRecorderLocked(deleteOutput = true)
    }
    SchnackWaveformStateCoordinator.clear("input")
    SchnackWaveformStateCoordinator.clear("output")
    super.invalidate()
  }

  private fun configureRecorder(recorder: MediaRecorder, outputFile: File) {
    recorder.setAudioSource(MediaRecorder.AudioSource.MIC)
    recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
    recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
    recorder.setAudioChannels(1)
    recorder.setAudioSamplingRate(16_000)
    recorder.setAudioEncodingBitRate(64_000)
    recorder.setOutputFile(outputFile.absolutePath)
  }

  private fun resolveOutputFile(outputUri: String?): File {
    if (!outputUri.isNullOrBlank()) {
      val parsed = Uri.parse(outputUri)
      val path =
        if (parsed.scheme == "file") {
          parsed.path
        } else {
          outputUri
        }

      if (!path.isNullOrBlank()) {
        return File(path)
      }
    }

    val fileName = "native-waveform-${System.currentTimeMillis()}.m4a"
    return File(reactApplicationContext.cacheDir, fileName)
  }

  private fun startLevelTickerLocked() {
    stopLevelTickerLocked()
    mainHandler.post(levelTicker)
  }

  private fun stopLevelTickerLocked() {
    mainHandler.removeCallbacks(levelTicker)
  }

  private fun emitLevelSnapshot() {
    val currentSessionId: String
    val currentRecorder: MediaRecorder

    synchronized(lock) {
      currentSessionId = activeSessionId ?: return
      currentRecorder = recorder ?: return

      val rawAmplitude =
        try {
          currentRecorder.maxAmplitude
        } catch (_: RuntimeException) {
          0
        }
      val normalized = normalizeAmplitude(rawAmplitude)

      if (levelHistory.size >= LEVEL_HISTORY_SIZE) {
        levelHistory.removeFirst()
      }
      levelHistory.addLast(normalized)
      SchnackWaveformStateCoordinator.setSamples(
        channel = "input",
        samples = levelHistory.toList(),
      )
    }

    val payload = Arguments.createMap().apply {
      putString("type", "levels")
      putString("sessionId", currentSessionId)
      putArray("samples", createSamplesArray())
      putDouble("averageMagnitude", averageLevelMagnitude())
    }

    emitEvent(payload)
  }

  private fun createSamplesArray(): WritableArray {
    val snapshot =
      synchronized(lock) {
        levelHistory.toList()
      }

    return Arguments.createArray().apply {
      snapshot.forEach { value ->
        pushDouble(value)
      }
    }
  }

  private fun averageLevelMagnitude(): Double {
    val snapshot =
      synchronized(lock) {
        levelHistory.toList()
      }

    if (snapshot.isEmpty()) {
      return 0.0
    }

    return snapshot.sum() / snapshot.size
  }

  private fun normalizeAmplitude(value: Int): Double {
    if (value <= 0) {
      return 0.0
    }

    val clamped = value.coerceIn(0, Short.MAX_VALUE.toInt()).toDouble()
    return sqrt(clamped / Short.MAX_VALUE.toDouble()).coerceIn(0.0, 1.0)
  }

  private fun cleanupRecorderLocked(deleteOutput: Boolean) {
    stopLevelTickerLocked()

    val currentRecorder = recorder
    val outputFile = activeOutputFile

    recorder = null
    activeSessionId = null
    activeOutputFile = null
    levelHistory.clear()

    if (currentRecorder != null) {
      try {
        currentRecorder.stop()
      } catch (_: RuntimeException) {
      } catch (_: IllegalStateException) {
      }

      try {
        currentRecorder.reset()
      } catch (_: RuntimeException) {
      } catch (_: IllegalStateException) {
      }

      try {
        currentRecorder.release()
      } catch (_: RuntimeException) {
      }
    }

    if (deleteOutput) {
      outputFile?.delete()
    }
  }

  private fun emitLifecycleEvent(type: String, sessionId: String, file: File? = null) {
    val payload = Arguments.createMap().apply {
      putString("type", type)
      putString("sessionId", sessionId)
      if (file != null) {
        putString("uri", Uri.fromFile(file).toString())
      } else {
        putNull("uri")
      }
    }

    emitEvent(payload)
  }

  private fun emitErrorEvent(sessionId: String, message: String) {
    val payload = Arguments.createMap().apply {
      putString("type", "error")
      putString("sessionId", sessionId)
      putString("message", message)
    }

    emitEvent(payload)
  }

  private fun createUriResult(file: File): WritableMap =
    Arguments.createMap().apply {
      putString("uri", Uri.fromFile(file).toString())
    }

  private fun emitEvent(payload: WritableMap) {
    val reactContext = getReactApplicationContextIfActiveOrWarn() ?: return
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(EVENT_NAME, payload)
  }

  private fun ReadableArray.toDoubleList(): List<Double> =
    (0 until size()).map { index ->
      getDouble(index)
    }
}

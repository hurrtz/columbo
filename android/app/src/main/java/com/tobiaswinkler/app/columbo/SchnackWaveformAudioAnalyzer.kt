package com.tobiaswinkler.app.columbo

import android.media.MediaCodec
import android.media.MediaExtractor
import android.media.MediaFormat
import android.net.Uri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import java.io.File
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.max

object SchnackWaveformAudioAnalyzer {
  fun analyze(
    reactContext: ReactApplicationContext,
    uri: String,
    sampleCount: Int?,
  ): WritableMap {
    val file = resolveFile(uri)
    if (!file.exists()) {
      throw IllegalArgumentException("The audio file could not be found for waveform analysis.")
    }

    val targetCount = max(64, sampleCount ?: 960)
    val decoded = decodePcmSamples(file)
    val durationMs =
      if (decoded.sampleRate > 0 && decoded.samples.isNotEmpty()) {
        decoded.samples.size.toDouble() / decoded.sampleRate.toDouble() * 1000.0
      } else {
        decoded.durationUs.coerceAtLeast(0L).toDouble() / 1000.0
      }
    val peakSamples = extractPeakSamples(decoded.samples, targetCount)

    return Arguments.createMap().apply {
      putArray(
        "samples",
        Arguments.createArray().apply {
          peakSamples.forEach { pushDouble(it) }
        },
      )
      putDouble("durationMs", durationMs)
    }
  }

  fun extractPeakSamples(samples: List<Float>, targetCount: Int): List<Double> {
    if (samples.isEmpty()) {
      return emptyList()
    }

    val count = max(64, targetCount)
    val bucketSize =
      ceil(samples.size.toDouble() / count.toDouble()).toInt().coerceAtLeast(1)

    return (0 until count).map { bucketIndex ->
      val start = bucketIndex * bucketSize
      val end = minOf(samples.size, start + bucketSize)
      if (start >= samples.size || start >= end) {
        0.0
      } else {
        var peak = 0.0f
        for (index in start until end) {
          peak = max(peak, abs(samples[index]))
        }
        peak.coerceIn(0.0f, 1.0f).toDouble()
      }
    }
  }

  private fun resolveFile(uri: String): File {
    val parsed = Uri.parse(uri)
    val path =
      if (parsed.scheme == "file") {
        parsed.path
      } else {
        uri
      }

    require(!path.isNullOrBlank()) {
      "The audio file could not be found for waveform analysis."
    }
    return File(path)
  }

  private fun decodePcmSamples(file: File): DecodedAudio {
    val extractor = MediaExtractor()
    extractor.setDataSource(file.absolutePath)

    try {
      val trackIndex = selectAudioTrack(extractor)
      if (trackIndex < 0) {
        return DecodedAudio(emptyList(), 0, 0L)
      }

      extractor.selectTrack(trackIndex)
      val format = extractor.getTrackFormat(trackIndex)
      val mime = format.getString(MediaFormat.KEY_MIME)
        ?: return DecodedAudio(emptyList(), 0, 0L)
      val sampleRate = format.getInteger(MediaFormat.KEY_SAMPLE_RATE)
      val channelCount = format.getInteger(MediaFormat.KEY_CHANNEL_COUNT).coerceAtLeast(1)
      val durationUs =
        if (format.containsKey(MediaFormat.KEY_DURATION)) {
          format.getLong(MediaFormat.KEY_DURATION)
        } else {
          0L
        }

      val codec = MediaCodec.createDecoderByType(mime)
      codec.configure(format, null, null, 0)
      codec.start()
      try {
        return DecodedAudio(
          samples = drainDecoder(extractor, codec, channelCount),
          sampleRate = sampleRate,
          durationUs = durationUs,
        )
      } finally {
        codec.stop()
        codec.release()
      }
    } finally {
      extractor.release()
    }
  }

  private fun selectAudioTrack(extractor: MediaExtractor): Int {
    for (index in 0 until extractor.trackCount) {
      val format = extractor.getTrackFormat(index)
      val mime = format.getString(MediaFormat.KEY_MIME) ?: continue
      if (mime.startsWith("audio/")) {
        return index
      }
    }

    return -1
  }

  private fun drainDecoder(
    extractor: MediaExtractor,
    codec: MediaCodec,
    channelCount: Int,
  ): List<Float> {
    val bufferInfo = MediaCodec.BufferInfo()
    val samples = mutableListOf<Float>()
    var inputDone = false
    var outputDone = false

    while (!outputDone) {
      if (!inputDone) {
        val inputIndex = codec.dequeueInputBuffer(10_000)
        if (inputIndex >= 0) {
          val inputBuffer = codec.getInputBuffer(inputIndex)
          val size = inputBuffer?.let { extractor.readSampleData(it, 0) } ?: -1
          if (size < 0) {
            codec.queueInputBuffer(
              inputIndex,
              0,
              0,
              0L,
              MediaCodec.BUFFER_FLAG_END_OF_STREAM,
            )
            inputDone = true
          } else {
            codec.queueInputBuffer(
              inputIndex,
              0,
              size,
              extractor.sampleTime.coerceAtLeast(0L),
              0,
            )
            extractor.advance()
          }
        }
      }

      val outputIndex = codec.dequeueOutputBuffer(bufferInfo, 10_000)
      if (outputIndex >= 0) {
        val outputBuffer = codec.getOutputBuffer(outputIndex)
        if (outputBuffer != null && bufferInfo.size > 0) {
          appendPcm16Samples(
            buffer = outputBuffer,
            offset = bufferInfo.offset,
            size = bufferInfo.size,
            channelCount = channelCount,
            output = samples,
          )
        }
        outputDone = bufferInfo.flags and MediaCodec.BUFFER_FLAG_END_OF_STREAM != 0
        codec.releaseOutputBuffer(outputIndex, false)
      }
    }

    return samples
  }

  private fun appendPcm16Samples(
    buffer: ByteBuffer,
    offset: Int,
    size: Int,
    channelCount: Int,
    output: MutableList<Float>,
  ) {
    val duplicate = buffer.duplicate().order(ByteOrder.LITTLE_ENDIAN)
    duplicate.position(offset)
    duplicate.limit(offset + size)

    val shorts = size / 2
    var index = 0
    while (index < shorts) {
      var peak = 0.0f
      for (channel in 0 until channelCount) {
        if (index >= shorts) {
          break
        }

        peak = max(peak, abs(duplicate.short / Short.MAX_VALUE.toFloat()))
        index += 1
      }
      output.add(peak.coerceIn(0.0f, 1.0f))
    }
  }

  private data class DecodedAudio(
    val samples: List<Float>,
    val sampleRate: Int,
    val durationUs: Long,
  )
}

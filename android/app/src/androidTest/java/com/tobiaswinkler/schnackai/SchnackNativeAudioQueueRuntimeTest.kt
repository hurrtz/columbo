package com.tobiaswinkler.schnackai

import android.net.Uri
import androidx.test.core.app.ApplicationProvider
import java.io.File
import java.util.Collections
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import kotlin.math.PI
import kotlin.math.sin
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class SchnackNativeAudioQueueRuntimeTest {
  @Test
  fun mediaPlayerBackedQueueEmitsStartedFinishedAndDrainedForLocalAudio() {
    val context = ApplicationProvider.getApplicationContext<android.content.Context>()
    val firstUri = writeToneFile(File(context.cacheDir, "queue-runtime-first.wav"), 360.0)
    val secondUri = writeToneFile(File(context.cacheDir, "queue-runtime-second.wav"), 520.0)
    val events = Collections.synchronizedList(mutableListOf<SchnackAudioQueueEvent>())
    val eventLatch = CountDownLatch(5)
    val coordinator = SchnackAudioQueueCoordinator(
      playerFactory = { item, callbacks ->
        SchnackAndroidAudioQueuePlayer(
          context = context,
          item = item,
          callbacks = callbacks,
        )
      },
      eventSink = { event ->
        events.add(event)
        eventLatch.countDown()
      },
    )

    coordinator.enqueue(item("first", firstUri))
    coordinator.enqueue(item("second", secondUri))

    assertTrue(coordinator.start())
    assertTrue(eventLatch.await(5, TimeUnit.SECONDS))

    assertEquals(
      listOf("started", "finished", "started", "finished", "drained"),
      events.map { it.type },
    )
    assertEquals(listOf("first", "first", "second", "second"), events.mapNotNull { it.itemId })
  }

  @Test
  fun outputWaveformPlaybackStateAdvancesAndStopsOnDeviceRuntime() {
    SchnackWaveformStateCoordinator.clear("output")

    SchnackWaveformStateCoordinator.startPlayback(
      channel = "output",
      itemId = "runtime-output",
      samples = List(260) { index -> if (index % 2 == 0) 0.8 else 0.2 },
      durationMs = 400.0,
    )

    Thread.sleep(120)
    assertTrue(SchnackWaveformStateCoordinator.samples("output").any { it > 0.0 })

    SchnackWaveformStateCoordinator.stopPlayback("output", "runtime-output")
    assertTrue(SchnackWaveformStateCoordinator.samples("output").all { it == 0.0 })
  }

  private fun item(id: String, uri: String) = SchnackAudioQueueItem(
    uri = uri,
    itemId = id,
    requestId = "runtime-$id",
    source = "instrumentation",
  )

  private fun writeToneFile(file: File, frequency: Double): String {
    val sampleRate = 16_000
    val durationMs = 220
    val sampleCount = sampleRate * durationMs / 1000
    val dataLength = sampleCount * 2
    val bytes = ByteArray(44 + dataLength)

    writeAscii(bytes, 0, "RIFF")
    writeIntLE(bytes, 4, 36 + dataLength)
    writeAscii(bytes, 8, "WAVE")
    writeAscii(bytes, 12, "fmt ")
    writeIntLE(bytes, 16, 16)
    writeShortLE(bytes, 20, 1)
    writeShortLE(bytes, 22, 1)
    writeIntLE(bytes, 24, sampleRate)
    writeIntLE(bytes, 28, sampleRate * 2)
    writeShortLE(bytes, 32, 2)
    writeShortLE(bytes, 34, 16)
    writeAscii(bytes, 36, "data")
    writeIntLE(bytes, 40, dataLength)

    for (index in 0 until sampleCount) {
      val progress = index.toDouble() / (sampleCount - 1).coerceAtLeast(1)
      val envelope = sin(PI * progress)
      val sample = sin((2.0 * PI * frequency * index) / sampleRate)
      val value = (sample * envelope * 16_000).toInt().toShort()
      val offset = 44 + index * 2
      bytes[offset] = (value.toInt() and 0xff).toByte()
      bytes[offset + 1] = ((value.toInt() shr 8) and 0xff).toByte()
    }

    file.writeBytes(bytes)
    return Uri.fromFile(file).toString()
  }

  private fun writeAscii(bytes: ByteArray, offset: Int, value: String) {
    value.toByteArray(Charsets.US_ASCII).copyInto(bytes, offset)
  }

  private fun writeIntLE(bytes: ByteArray, offset: Int, value: Int) {
    bytes[offset] = (value and 0xff).toByte()
    bytes[offset + 1] = ((value shr 8) and 0xff).toByte()
    bytes[offset + 2] = ((value shr 16) and 0xff).toByte()
    bytes[offset + 3] = ((value shr 24) and 0xff).toByte()
  }

  private fun writeShortLE(bytes: ByteArray, offset: Int, value: Int) {
    bytes[offset] = (value and 0xff).toByte()
    bytes[offset + 1] = ((value shr 8) and 0xff).toByte()
  }
}

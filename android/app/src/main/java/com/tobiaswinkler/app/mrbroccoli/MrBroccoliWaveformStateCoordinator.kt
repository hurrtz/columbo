package com.tobiaswinkler.app.mrbroccoli

import kotlin.math.abs
import kotlin.math.max

object MrBroccoliWaveformStateCoordinator {
  private const val DEFAULT_SAMPLE_COUNT = 192
  private val lock = Any()
  private val liveSamplesByChannel = mutableMapOf<String, List<Double>>()
  private val playbackStateByChannel = mutableMapOf<String, PlaybackState>()

  fun setSamples(channel: String, samples: List<Double>) {
    synchronized(lock) {
      liveSamplesByChannel[channel] = normalize(samples)
      playbackStateByChannel.remove(channel)
    }
  }

  fun clear(channel: String) {
    synchronized(lock) {
      liveSamplesByChannel[channel] = emptySamples(DEFAULT_SAMPLE_COUNT)
      playbackStateByChannel.remove(channel)
    }
  }

  fun samples(channel: String): List<Double> =
    synchronized(lock) {
      val playbackState = playbackStateByChannel[channel]
      if (playbackState != null) {
        playbackWindow(playbackState)
      } else {
        liveSamplesByChannel[channel] ?: emptySamples(DEFAULT_SAMPLE_COUNT)
      }
    }

  fun startPlayback(
    channel: String,
    itemId: String,
    samples: List<Double>,
    durationMs: Double,
    elapsedMs: Double = 0.0,
  ) {
    synchronized(lock) {
      playbackStateByChannel[channel] = PlaybackState(
        itemId = itemId,
        samples = normalize(samples),
        durationMs = max(1.0, durationMs),
        startedAtMs = System.currentTimeMillis() - elapsedMs.coerceAtLeast(0.0).toLong(),
      )
    }
  }

  fun stopPlayback(channel: String, itemId: String?) {
    synchronized(lock) {
      val current = playbackStateByChannel[channel]
      if (current == null || itemId == null || current.itemId == itemId) {
        playbackStateByChannel.remove(channel)
        liveSamplesByChannel[channel] = emptySamples(DEFAULT_SAMPLE_COUNT)
      }
    }
  }

  private fun playbackWindow(playbackState: PlaybackState): List<Double> {
    if (playbackState.samples.isEmpty()) {
      return emptySamples(DEFAULT_SAMPLE_COUNT)
    }

    val elapsedMs = (System.currentTimeMillis() - playbackState.startedAtMs)
      .toDouble()
      .coerceAtLeast(0.0)
    val progress = (elapsedMs / playbackState.durationMs).coerceIn(0.0, 1.0)
    val endIndex = ((playbackState.samples.size - 1) * progress).toInt()
    val startIndex = max(0, endIndex - DEFAULT_SAMPLE_COUNT + 1)
    val window = playbackState.samples.subList(startIndex, endIndex + 1)

    if (window.size >= DEFAULT_SAMPLE_COUNT) {
      return window
    }

    return emptySamples(DEFAULT_SAMPLE_COUNT - window.size) + window
  }

  private fun normalize(samples: List<Double>): List<Double> =
    samples.map { abs(it).coerceIn(0.0, 1.0) }

  private fun emptySamples(count: Int): List<Double> =
    List(count.coerceAtLeast(0)) { 0.0 }

  private data class PlaybackState(
    val itemId: String,
    val samples: List<Double>,
    val durationMs: Double,
    val startedAtMs: Long,
  )
}

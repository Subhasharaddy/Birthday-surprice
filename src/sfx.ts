let ctx: AudioContext | null = null
export function sfx(kind: 'open' | 'cheer' | 'page') {
  try {
    ctx = ctx ?? new AudioContext()
    const notes = kind === 'open' ? [523, 659, 784] : kind === 'cheer' ? [659, 784, 988, 1319] : [440, 587]
    notes.forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain(), t = ctx!.currentTime + i * 0.09
      o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
      o.connect(g).connect(ctx!.destination); o.start(t); o.stop(t + 0.3)
    })
  } catch { /* audio unavailable: ignore */ }
}

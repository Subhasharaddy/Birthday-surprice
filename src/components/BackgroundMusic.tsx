import { useEffect, useRef, useState } from 'react'
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { config } from '../data/birthdayConfig'

export default function Music() {
  const a = useRef<HTMLAudioElement>(null)
  const [on, setOn] = useState(false), [bad, setBad] = useState(false), [mute, setMute] = useState(false), [vol, setVol] = useState(0.5)
  useEffect(() => { if (a.current) { a.current.volume = vol; a.current.muted = mute } }, [vol, mute])
  const toggle = () => {
    const el = a.current; if (!el || bad) return
    if (on) { el.pause(); setOn(false) } else el.play().then(() => setOn(true)).catch(() => setBad(true))
  }
  return (
    <div className="music glass" title={bad ? `Add a song at public/${config.musicFile}` : 'Music'}>
      <audio ref={a} src={`${import.meta.env.BASE_URL}${config.musicFile}`} loop preload="none" onError={() => setBad(true)} />
      <Music2 size={18} className={on ? 'spin' : ''} />
      <button onClick={toggle} disabled={bad} aria-label="Play or pause">{on ? <Pause size={18} /> : <Play size={18} />}</button>
      <button onClick={() => setMute(!mute)} aria-label="Mute or unmute">{mute ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
      <input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Volume" />
      {bad && <small>no song yet</small>}
    </div>
  )
}

import { useEffect, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { config } from './data/birthdayConfig'
import { Scene, MiniGifts } from './components/Scene3D'
import Gallery from './components/MemoryGallery'
import Letter from './components/BirthdayLetter'
import Music from './components/BackgroundMusic'
import { burst, fireworks } from './confetti'
import { sfx } from './sfx'

const webgl = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } })()
const name = config.friendName

const Reveal = ({ children, id }: { children: ReactNode; id?: string }) => (
  <motion.section id={id} className="sec" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}>{children}</motion.section>)

function Gifts() {
  const [active, setActive] = useState<number | null>(null)
  const pick = (i: number) => { if (active === i) return; setActive(i); sfx('open'); burst() }
  const titles = ['A Little Happiness 💝', 'Our Memories 📸', 'Something Special 💌']
  return (<>
    <h2>Pick a Gift 🎁</h2>
    <div className="gifts">{webgl ? <MiniGifts active={active} onPick={pick} /> :
      <div className="row">{titles.map((t, i) => <button key={i} className="magic" onClick={() => pick(i)}>{t}</button>)}</div>}</div>
    <div className="row small">{titles.map((t, i) => <span key={i} className={active === i ? 'tag on' : 'tag'}>{t}</span>)}</div>
    <AnimatePresence mode="wait"><motion.div key={active ?? 'none'} className="reveal" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
      {active === null && <p>Tap a gift ✨</p>}
      {active === 0 && <p className="big">{config.wishText}</p>}
      {active === 1 && <Gallery limit={3} />}
      {active === 2 && <Letter />}
    </motion.div></AnimatePresence></>)
}

export default function App() {
  const [stage, setStage] = useState<'intro' | 'count' | 'party'>('intro')
  const [open, setOpen] = useState(false), [n, setN] = useState(3), [lit, setLit] = useState(true), [wish, setWish] = useState(false)

  useEffect(() => {
    if (stage !== 'count') return
    if (n === 0) { setStage('party'); burst(); sfx('cheer'); return }
    const t = setTimeout(() => setN(n - 1), 800); return () => clearTimeout(t)
  }, [stage, n])

  const start = () => { if (open) return; setOpen(true); sfx('open'); burst(); setTimeout(() => { setN(3); setStage('count') }, 1500) }
  const blow = () => { if (!lit) return; setLit(false); sfx('cheer'); burst(); fireworks() }
  const makeWish = () => { setWish(true); burst(); sfx('open'); setTimeout(() => setWish(false), 3500) }
  const replay = () => { setLit(true); setWish(false); setN(3); setStage('count'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <main>
      <Music />
      {stage === 'intro' && (
        <section className="hero">
          <div className="canvas">{webgl && <Scene mode="intro" open={open} lit onBlow={() => {}} />}</div>
          <motion.div className="hero-text" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1>Hey, {name}... 💖</h1>
            <p>Someone has created a little world just for you.</p>
            <button className="magic" onClick={start} disabled={open}>Open Your Surprise 🎁</button>
          </motion.div>
        </section>)}
      {stage === 'count' && <div className="hero center"><AnimatePresence mode="wait"><motion.div key={n} className="count" initial={{ scale: 0.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 2, opacity: 0 }}>{n || '🎉'}</motion.div></AnimatePresence></div>}
      {stage === 'party' && (<>
        <section className="hero">
          <div className="canvas">{webgl && <Scene mode="cake" open lit={lit} onBlow={blow} />}</div>
          <div className="hero-text top">
            <motion.h1 initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={{ opacity: 1, letterSpacing: '0.02em' }} transition={{ duration: 1.5 }}>HAPPY BIRTHDAY, {name}! 🎂</motion.h1>
            <p>{config.birthdayMessage}</p>
            <div className="row">
              <button className="magic" onClick={blow} disabled={!lit}>{lit ? 'Blow Out the Candles 🕯️' : 'Wish granted! 🎉'}</button>
              <button className="magic alt" onClick={makeWish}>Make a Birthday Wish ✨</button>
            </div>
            <AnimatePresence>{wish && <motion.p className="wish" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>✨ Close your eyes… make it a big one. ✨</motion.p>}</AnimatePresence>
          </div>
        </section>
        <Reveal><Gifts /></Reveal>
        <Reveal id="memories"><h2>Little Moments, Big Memories 💖</h2><Gallery /></Reveal>
        <Reveal><h2>A Letter For You 💌</h2><Letter /></Reveal>
        <Reveal>
          <motion.div onViewportEnter={fireworks} animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}><Heart size={140} fill="#ff6fb5" color="#ff6fb5" /></motion.div>
          <h2>You are loved, {name}. 💖</h2><p className="big">Thank you for being you.</p>
          <button className="magic" onClick={replay}>Celebrate Again 🎉</button>
        </Reveal></>)}
    </main>)
}

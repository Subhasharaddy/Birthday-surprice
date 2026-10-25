import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { config } from '../data/birthdayConfig'
import { sfx } from '../sfx'

export default function Letter() {
  const [open, setOpen] = useState(false)
  const [n, setN] = useState(0)
  const lines = config.birthdayLetter.split('\n')
  useEffect(() => {
    if (!open || n >= lines.length) return
    const t = setTimeout(() => setN(n + 1), lines[n] ? 450 : 150)
    return () => clearTimeout(t)
  }, [open, n, lines])
  if (!open) return (
    <motion.button className="env" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} onClick={() => { setOpen(true); sfx('page') }} aria-label="Open the letter">
      <Mail size={90} /><span>Tap to open 💌</span>
    </motion.button>
  )
  return (
    <motion.div className="letter" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} style={{ originY: 0 }} transition={{ duration: 0.8 }}>
      {lines.slice(0, n).map((l, i) => <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{l || '\u00A0'}</motion.p>)}
    </motion.div>
  )
}

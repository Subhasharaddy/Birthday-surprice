import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../data/birthdayConfig'

function Card({ file, caption, onOpen }: { file: string; caption: string; onOpen: () => void }) {
  const [bad, setBad] = useState(false)
  return (
    <motion.button className="photo" whileHover={{ rotateY: 8, rotateX: -6, scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onOpen}>
      {bad ? <div className="ph">📸</div> : <img src={`${import.meta.env.BASE_URL}images/${file}`} alt={caption} loading="lazy" onError={() => setBad(true)} />}
      <span>{caption}</span>
    </motion.button>
  )
}

export default function Gallery({ limit }: { limit?: number }) {
  const [sel, setSel] = useState<number | null>(null)
  const list = config.photos.slice(0, limit)
  return (
    <>
      <div className="grid">{list.map((p, i) => <Card key={p.file} {...p} onOpen={() => setSel(i)} />)}</div>
      <AnimatePresence>{sel !== null && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}>
          <Card {...list[sel]} onOpen={() => setSel(null)} />
        </motion.div>)}</AnimatePresence>
    </>
  )
}

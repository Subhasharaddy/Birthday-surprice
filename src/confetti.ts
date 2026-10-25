import confetti from 'canvas-confetti'
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const colors = ['#ff6fb5', '#a66bff', '#4de1ff', '#ffd166', '#ffffff']
export const burst = () => { if (reduce()) return; confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 }, colors }) }
export const fireworks = () => {
  if (reduce()) return
  for (let i = 0; i < 6; i++) setTimeout(() => confetti({ particleCount: 70, spread: 360, startVelocity: 25, ticks: 70, colors,
    origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.4 + 0.1 } }), i * 350)
}

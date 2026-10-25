import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { config } from '../data/birthdayConfig'
const C = config.themeColors
const mobile = typeof window !== 'undefined' && window.innerWidth < 700
const L = THREE.MathUtils.lerp

export function Gift({ open = false, color = C.pink, position = [0, 0, 0] as [number, number, number], scale = 1, onClick }:
  { open?: boolean; color?: string; position?: [number, number, number]; scale?: number; onClick?: () => void }) {
  const g = useRef<THREE.Group>(null), lid = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (g.current) { g.current.rotation.y = L(g.current.rotation.y, s.pointer.x * 0.8, 0.05); g.current.rotation.x = L(g.current.rotation.x, -s.pointer.y * 0.3, 0.05) }
    if (lid.current) { lid.current.position.y = L(lid.current.position.y, open ? 2.1 : 0.9, 0.07); lid.current.rotation.z = L(lid.current.rotation.z, open ? 0.7 : 0, 0.07) }
  })
  return (
    <Float speed={2} floatIntensity={1} position={position}>
      <group ref={g} scale={scale} onClick={onClick} onPointerOver={() => (document.body.style.cursor = onClick ? 'pointer' : '')} onPointerOut={() => (document.body.style.cursor = '')}>
        <mesh><boxGeometry args={[1.6, 1.6, 1.6]} /><meshStandardMaterial color={color} roughness={0.35} /></mesh>
        <mesh><boxGeometry args={[1.62, 1.62, 0.3]} /><meshStandardMaterial color={C.gold} metalness={0.4} roughness={0.3} /></mesh>
        <group ref={lid} position={[0, 0.9, 0]}>
          <mesh><boxGeometry args={[1.8, 0.3, 1.8]} /><meshStandardMaterial color={color} roughness={0.35} /></mesh>
          <mesh><boxGeometry args={[0.3, 0.32, 1.82]} /><meshStandardMaterial color={C.gold} metalness={0.4} roughness={0.3} /></mesh>
          <mesh position={[0.3, 0.3, 0]}><torusGeometry args={[0.28, 0.08, 8, 16]} /><meshStandardMaterial color={C.gold} /></mesh>
          <mesh position={[-0.3, 0.3, 0]}><torusGeometry args={[0.28, 0.08, 8, 16]} /><meshStandardMaterial color={C.gold} /></mesh>
        </group>
      </group>
    </Float>
  )
}

function Flame({ i, lit, onBlow }: { i: number; lit: boolean; onBlow: () => void }) {
  const m = useRef<THREE.Mesh>(null)
  useFrame((s) => { if (m.current) m.current.scale.y = 1.4 + Math.sin(s.clock.elapsedTime * 12 + i) * 0.25 })
  return <mesh ref={m} visible={lit} position={[0, 0.42, 0]} onClick={(e) => { e.stopPropagation(); onBlow() }}>
    <sphereGeometry args={[0.1, 12, 12]} /><meshStandardMaterial color="#ffb703" emissive="#ff9f1c" emissiveIntensity={3} /></mesh>
}

function Cake({ lit, onBlow }: { lit: boolean; onBlow: () => void }) {
  const g = useRef<THREE.Group>(null)
  useFrame((_, d) => { if (g.current) g.current.rotation.y += d * 0.35 })
  const cols = [C.pink, C.cyan, C.gold, C.purple, C.pink]
  return (
    <Float speed={1.5} floatIntensity={0.6}>
      <group ref={g} position={[0, -0.9, 0]}>
        <mesh><cylinderGeometry args={[1.7, 1.7, 0.9, 40]} /><meshStandardMaterial color={C.pink} roughness={0.5} /></mesh>
        <mesh position={[0, 0.7, 0]}><cylinderGeometry args={[1.15, 1.15, 0.7, 40]} /><meshStandardMaterial color={C.purple} roughness={0.5} /></mesh>
        {cols.map((c, i) => {
          const a = (i / cols.length) * Math.PI * 2
          return <group key={i} position={[Math.cos(a) * 0.65, 1.35, Math.sin(a) * 0.65]}>
            <mesh onClick={(e) => { e.stopPropagation(); onBlow() }}><cylinderGeometry args={[0.07, 0.07, 0.6, 12]} /><meshStandardMaterial color={c} /></mesh>
            <Flame i={i} lit={lit} onBlow={onBlow} /></group>
        })}
      </group>
    </Float>
  )
}

const balloons = [[-4, 1, -2, C.pink], [4, 2, -3, C.cyan], [-3, -1, -4, C.purple], [3.5, -1.5, -2, C.gold], [-5.5, 2.5, -5, C.cyan], [5.5, 0, -5, C.pink], [0, 3, -6, C.purple]] as const
function Balloons() {
  return <>{balloons.map(([x, y, z, c], i) => (
    <Float key={i} speed={1 + i * 0.15} floatIntensity={2.5} position={[x, y, z]}>
      <mesh scale={[1, 1.25, 1]}><sphereGeometry args={[0.6, 24, 24]} /><meshStandardMaterial color={c} roughness={0.15} metalness={0.2} /></mesh></Float>))}</>
}

function Lights() {
  return <><ambientLight intensity={0.8} /><pointLight position={[4, 5, 4]} intensity={80} color={C.cyan} /><pointLight position={[-4, 3, 3]} intensity={70} color={C.pink} />
    <Stars radius={60} depth={40} count={mobile ? 700 : 2000} factor={4} fade speed={1} />
    <Sparkles count={mobile ? 30 : 70} scale={10} size={4} color={C.gold} /></>
}

export function Scene({ mode, open, lit, onBlow }: { mode: 'intro' | 'cake'; open: boolean; lit: boolean; onBlow: () => void }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1, 7], fov: 50 }}>
      <Lights /><Balloons />
      {mode === 'intro' ? <Gift open={open} scale={1.2} /> : <Cake lit={lit} onBlow={onBlow} />}
    </Canvas>
  )
}

export function MiniGifts({ active, onPick }: { active: number | null; onPick: (i: number) => void }) {
  const cols = [C.pink, C.cyan, C.purple]
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.2, 8], fov: 45 }}>
      <ambientLight intensity={0.9} /><pointLight position={[3, 5, 5]} intensity={90} color="#fff" />
      <Sparkles count={30} scale={8} size={3} color={C.gold} />
      {cols.map((c, i) => <Gift key={i} color={c} open={active === i} position={[(i - 1) * 3, -0.5, 0]} onClick={() => onPick(i)} />)}
    </Canvas>
  )
}

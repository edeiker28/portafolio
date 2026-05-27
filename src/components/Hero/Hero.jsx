import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personal } from '@/data/personal'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % personal.roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-gamer/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-purple-light text-sm mb-4 tracking-widest uppercase"
        >
          &gt; Hola, soy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-4 animate-glitch"
          style={{ textShadow: '2px 0 #7c3aed, -2px 0 #dc2626' }}
        >
          {personal.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="h-8 mb-6"
        >
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg md:text-xl text-muted font-mono"
          >
            <span className="text-purple-light">{'// '}</span>
            {personal.roles[roleIndex]}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-muted max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {personal.shortBio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-purple-primary hover:bg-purple-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-glow hover:shadow-[0_0_30px_rgba(124,58,237,0.7)]"
          >
            Ver Proyectos
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-red-gamer/50 text-red-light hover:border-red-gamer hover:bg-red-gamer/10 font-semibold rounded-lg transition-all duration-300 hover:shadow-glow-red"
          >
            Contactar
          </a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-2xl"
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}

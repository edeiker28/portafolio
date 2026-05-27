import { motion } from 'framer-motion'
import { personal } from '@/data/personal'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.p variants={fadeInUp} className="font-mono text-purple-light text-sm mb-2 tracking-widest uppercase">
          &gt; sobre_mi.py
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
          Sobre <span className="text-purple-light">Mí</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeInUp}>
            <p className="text-muted leading-relaxed mb-6">{personal.bio}</p>
            <div className="flex flex-wrap gap-2">
              {personal.specialties.map(s => (
                <span key={s} className="text-xs font-mono px-3 py-1 rounded-full glow-border text-purple-light">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
            {[
              { label: 'Tecnologías', value: Object.values(personal.stack).flat().length + '+' },
              { label: 'Proyectos', value: personal.featuredProjects.length + '+' },
              { label: 'Institución', value: 'CECAR' },
              { label: 'Enfoque', value: 'Backend' },
            ].map(stat => (
              <div key={stat.label} className="glass glow-border rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-purple-light mb-1">{stat.value}</p>
                <p className="text-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

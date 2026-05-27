import { motion } from 'framer-motion'
import { personal } from '@/data/personal'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-gradient-to-b from-transparent via-red-gamer/5 to-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.p variants={fadeInUp} className="font-mono text-purple-light text-sm mb-2 tracking-widest uppercase">
            &gt; educacion.md
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-purple-light">Educación</span>
          </motion.h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-primary via-red-gamer to-transparent" />

            <div className="space-y-10">
              {personal.education.map((edu) => (
                <motion.div key={edu.institution} variants={fadeInUp} className="flex gap-8 pl-16 relative">
                  <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-bg border-2 border-purple-primary shadow-glow-sm" />

                  <div className="glass glow-border rounded-xl p-6 flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-lg text-white">{edu.institution}</h3>
                      <span className="font-mono text-xs text-purple-light shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

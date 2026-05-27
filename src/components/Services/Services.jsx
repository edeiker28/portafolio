import { motion } from 'framer-motion'
import { personal } from '@/data/personal'
import { FiCode, FiLayers, FiDatabase, FiCpu } from 'react-icons/fi'

const icons = [FiCode, FiLayers, FiDatabase, FiCpu]
const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p variants={fadeInUp} className="font-mono text-purple-light text-sm mb-2 tracking-widest uppercase">
            &gt; servicios.json
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
            Mis <span className="text-purple-light">Servicios</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {personal.services.map((service, i) => {
              const Icon = icons[i]
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ y: -6, boxShadow: '0 0 25px rgba(124,58,237,0.4)' }}
                  className="glass glow-border rounded-xl p-6 text-center group transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-primary/40 transition-colors">
                    <Icon className="text-purple-light" size={22} />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm">{service.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

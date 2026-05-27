import { motion } from 'framer-motion'
import { personal } from '@/data/personal'
import { FiMail, FiGithub } from 'react-icons/fi'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-t from-purple-primary/10 to-transparent">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.p variants={fadeInUp} className="font-mono text-purple-light text-sm mb-2 tracking-widest uppercase">
            &gt; contacto.sh
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Hablemos <span className="text-purple-light">:)</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted mb-10 leading-relaxed">
            Abierto a nuevas oportunidades, proyectos colaborativos o simplemente una buena conversación sobre tecnología.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 px-8 py-4 bg-purple-primary hover:bg-purple-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-glow hover:shadow-[0_0_30px_rgba(124,58,237,0.7)]"
            >
              <FiMail size={18} />
              {personal.email}
            </a>
            <a
              href={`https://github.com/${personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-muted/30 hover:border-purple-light text-muted hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <FiGithub size={18} />
              @{personal.github}
            </a>
          </motion.div>
        </motion.div>

        <div className="border-t border-purple-primary/20 pt-8">
          <p className="font-mono text-xs text-muted">
            <span className="text-purple-light">&lt;</span>
            {personal.name}
            <span className="text-purple-light">/&gt;</span>
            {' — '}Built with React + Vite
          </p>
        </div>
      </div>
    </section>
  )
}

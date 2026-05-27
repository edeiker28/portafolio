import { motion } from 'framer-motion'
import { personal } from '@/data/personal'
import {
  SiPython, SiFastapi, SiFlask, SiSqlalchemy, SiNodedotjs,
  SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5, SiCss3,
  SiMariadb, SiMysql, SiPostgresql, SiMongodb, SiSqlite,
  SiDocker, SiGit, SiGithub, SiLinux, SiPostman,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

const iconMap = {
  Python: SiPython, FastAPI: SiFastapi, Flask: SiFlask,
  SQLAlchemy: SiSqlalchemy, 'Node.js': SiNodedotjs,
  React: SiReact, JavaScript: SiJavascript, TypeScript: SiTypescript,
  TailwindCSS: SiTailwindcss, HTML5: SiHtml5, CSS3: SiCss3,
  MariaDB: SiMariadb, MySQL: SiMysql, PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb, SQLite: SiSqlite,
  Docker: SiDocker, Git: SiGit, GitHub: SiGithub,
  Linux: SiLinux, Postman: SiPostman, 'VS Code': VscVscode,
}

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function TechStack() {
  const categories = Object.entries(personal.stack).filter(([cat]) => cat !== 'Arquitectura')

  return (
    <section id="stack" className="py-24 px-6 bg-gradient-to-b from-transparent via-purple-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p variants={fadeInUp} className="font-mono text-purple-light text-sm mb-2 tracking-widest uppercase">
            &gt; tech_stack.json
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
            Stack <span className="text-purple-light">Tecnológico</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map(([category, techs]) => (
              <motion.div key={category} variants={fadeInUp} className="glass glow-border rounded-xl p-6">
                <h3 className="font-mono text-purple-light text-sm mb-4 uppercase tracking-wider">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {techs.map(tech => {
                    const Icon = iconMap[tech]
                    return (
                      <motion.div
                        key={tech}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="flex items-center gap-2 glass glow-border-red rounded-lg px-3 py-2 text-sm cursor-default group"
                      >
                        {Icon && <Icon className="text-red-gamer group-hover:text-red-light transition-colors" size={16} />}
                        <span className="text-muted group-hover:text-white transition-colors">{tech}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

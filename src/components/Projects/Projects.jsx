import { motion } from 'framer-motion'
import { personal } from '@/data/personal'
import { useGitHubRepos } from '@/hooks/useGitHubRepos'
import RepoCard from './RepoCard'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos(personal.github)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p variants={fadeInUp} className="font-mono text-purple-light text-sm mb-2 tracking-widest uppercase">
            &gt; proyectos.list
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Proyectos <span className="text-purple-light">Destacados</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted mb-12">
            Proyectos propios y repositorios de GitHub en tiempo real.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {personal.featuredProjects.map(project => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="glass rounded-xl p-6 border border-purple-primary/40 shadow-glow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-gamer animate-pulse-slow" />
                  <span className="font-mono text-xs text-red-light uppercase tracking-wider">Destacado</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-muted text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-purple-primary/20 text-purple-light border border-purple-primary/30">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="text-xs text-muted space-y-1">
                  {project.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-purple-light">▸</span> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.h3 variants={fadeInUp} className="font-mono text-purple-light text-sm mb-6 uppercase tracking-wider">
            &gt; github_repos ({repos.length})
          </motion.h3>

          {loading && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass glow-border rounded-xl p-5 h-32 animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <p className="text-red-light font-mono text-sm">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {repos.map(repo => (
                <motion.div key={repo.id} variants={fadeInUp}>
                  <RepoCard repo={repo} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

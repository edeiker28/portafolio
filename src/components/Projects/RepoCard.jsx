import { motion } from 'framer-motion'
import { FiStar, FiGitBranch, FiExternalLink } from 'react-icons/fi'

const langColors = {
  Python: '#3b82f6', JavaScript: '#eab308', TypeScript: '#60a5fa',
  CSS: '#a855f7', HTML: '#f97316', default: '#64748b',
}

export default function RepoCard({ repo }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
      className="glass glow-border rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono text-white font-semibold text-sm truncate">{repo.name}</h3>
        <FiExternalLink className="text-muted shrink-0" size={14} />
      </div>

      <p className="text-muted text-xs leading-relaxed line-clamp-2 flex-1">
        {repo.description || 'Sin descripción.'}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: langColors[repo.language] || langColors.default }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FiStar size={12} /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FiGitBranch size={12} /> {repo.forks_count}
        </span>
      </div>
    </motion.a>
  )
}

import { useState, useEffect } from 'react'

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`
        )
        if (!res.ok) throw new Error()
        const data = await res.json()
        setRepos(data.filter(r => !r.fork))
      } catch {
        setError('No se pudieron cargar los repositorios.')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [username])

  return { repos, loading, error }
}

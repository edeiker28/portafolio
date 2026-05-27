import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useGitHubRepos } from './useGitHubRepos'

const mockRepos = [
  { id: 1, name: 'repo-1', description: 'Test repo', html_url: 'https://github.com/edeiker28/repo-1', language: 'Python', stargazers_count: 2, forks_count: 0, topics: [], fork: false },
]

describe('useGitHubRepos', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('returns repos on successful fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    })

    const { result } = renderHook(() => useGitHubRepos('edeiker28'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.repos).toEqual(mockRepos)
    expect(result.current.error).toBeNull()
  })

  it('returns error on failed fetch', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false })

    const { result } = renderHook(() => useGitHubRepos('edeiker28'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('No se pudieron cargar los repositorios.')
    expect(result.current.repos).toEqual([])
  })
})

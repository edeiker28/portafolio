# Portfolio Personal — Edeiker Buelvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un portafolio personal single-page con estética gamer (negro/morado/rojo), animaciones con Framer Motion, repos de GitHub en vivo y toda la información personal de Edeiker Buelvas.

**Architecture:** SPA con React + Vite. Un hook `useGitHubRepos` consume la API pública de GitHub. Los datos personales viven en `src/data/personal.js`. Cada sección es un componente independiente ensamblado en `App.jsx` con scroll suave entre anclas.

**Tech Stack:** React 18, Vite, TailwindCSS v3, Framer Motion, React Icons, Vitest, React Testing Library

---

## File Map

| Archivo | Responsabilidad |
|---------|----------------|
| `vite.config.js` | Config Vite con alias `@` → `src/` |
| `tailwind.config.js` | Paleta gamer, fuentes, plugins |
| `src/index.css` | Base styles, custom scrollbar, glitch keyframes |
| `src/data/personal.js` | Toda la info personal (bio, stack, proyectos, educación) |
| `src/hooks/useGitHubRepos.js` | Fetch repos GitHub, estados loading/error |
| `src/components/Navbar/Navbar.jsx` | Nav fija, links con ancla, blur glass |
| `src/components/Hero/Hero.jsx` | Nombre glitch, rol animado, CTA buttons |
| `src/components/About/About.jsx` | Bio, stats, descripción |
| `src/components/TechStack/TechStack.jsx` | Grid de tecnologías con iconos por categoría |
| `src/components/Projects/Projects.jsx` | Orquesta featured + repos GitHub |
| `src/components/Projects/RepoCard.jsx` | Tarjeta individual de repo |
| `src/components/Education/Education.jsx` | Timeline CECAR + SENA |
| `src/components/Services/Services.jsx` | 4 cards de servicios |
| `src/components/Contact/Contact.jsx` | Email, GitHub, footer |
| `src/App.jsx` | Ensambla secciones, scroll container |
| `src/main.jsx` | Entry point |
| `src/test/setup.js` | Setup Vitest + Testing Library |
| `src/hooks/useGitHubRepos.test.js` | Tests del hook |

---

## Task 1: Inicializar proyecto y configurar entorno

**Files:**
- Create: `C:\proyectos\portafolio\` (scaffolded por Vite)
- Modify: `vite.config.js`
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Crear proyecto Vite**

```bash
cd C:\proyectos
npm create vite@latest portafolio -- --template react
cd portafolio
npm install
```

- [ ] **Step 2: Instalar dependencias**

```bash
npm install framer-motion react-icons
npm install -D tailwindcss postcss autoprefixer vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npx tailwindcss init -p
```

- [ ] **Step 3: Configurar vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 4: Configurar tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090f',
        purple: {
          primary: '#7c3aed',
          light: '#a855f7',
          dark: '#5b21b6',
        },
        red: {
          gamer: '#dc2626',
          light: '#ef4444',
        },
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        glitch: 'glitch 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(124, 58, 237, 0.5)',
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.5)',
        'glow-sm': '0 0 10px rgba(124, 58, 237, 0.3)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Configurar src/index.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { scroll-behavior: smooth; }
  body {
    background-color: #09090f;
    color: #f1f5f9;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #09090f; }
  ::-webkit-scrollbar-thumb {
    background: #7c3aed;
    border-radius: 3px;
  }
}

@layer utilities {
  .glow-border {
    border: 1px solid rgba(124, 58, 237, 0.4);
    box-shadow: 0 0 15px rgba(124, 58, 237, 0.2);
  }
  .glow-border-red {
    border: 1px solid rgba(220, 38, 38, 0.4);
    box-shadow: 0 0 15px rgba(220, 38, 38, 0.2);
  }
  .glass {
    background: rgba(9, 9, 15, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .grid-bg {
    background-image:
      linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
  }
}
```

- [ ] **Step 6: Crear setup de tests**

```js
// src/test/setup.js
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Verificar que el proyecto levanta**

```bash
npm run dev
```

Esperado: servidor en `http://localhost:5173` sin errores de consola.

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "feat: initialize React + Vite portfolio project with gamer theme config"
```

---

## Task 2: Datos personales y hook de GitHub

**Files:**
- Create: `src/data/personal.js`
- Create: `src/hooks/useGitHubRepos.js`
- Create: `src/hooks/useGitHubRepos.test.js`

- [ ] **Step 1: Crear src/data/personal.js**

```js
export const personal = {
  name: 'Edeiker Buelvas',
  roles: ['Desarrollador Full Stack', 'Backend Developer', 'Arquitectura de Software'],
  taglines: [
    'Construyendo soluciones modernas con código limpio.',
    'Backend sólido para aplicaciones escalables.',
    'APIs modernas, eficientes y mantenibles.',
    'Transformando ideas en aplicaciones funcionales.',
  ],
  shortBio: 'Desarrollador de software apasionado por crear aplicaciones modernas, escalables y eficientes utilizando tecnologías backend y frontend actuales.',
  bio: 'Soy desarrollador de software enfocado en el desarrollo de aplicaciones web modernas, arquitectura backend y diseño de sistemas escalables. Me especializo principalmente en backend con Python utilizando tecnologías como FastAPI y Flask para construir APIs REST eficientes, seguras y mantenibles. También tengo experiencia trabajando con bases de datos SQL y NoSQL, automatización de procesos y desarrollo full stack. Disfruto crear proyectos completos donde pueda integrar lógica de negocio, arquitectura de software, bases de datos y experiencias web modernas.',
  github: 'edeiker28',
  email: 'edeiker28@gmail.com',
  specialties: [
    'Desarrollo Backend', 'APIs REST', 'Arquitectura de Software',
    'Desarrollo Full Stack', 'Bases de Datos SQL y NoSQL',
    'Automatización con Python', 'Integración de IA',
    'Diseño de sistemas escalables', 'Optimización y rendimiento',
  ],
  stack: {
    Backend: ['Python', 'FastAPI', 'Flask', 'SQLAlchemy', 'Node.js'],
    Frontend: ['React', 'JavaScript', 'TypeScript', 'TailwindCSS', 'HTML5', 'CSS3'],
    'Bases de Datos': ['MariaDB', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
    'DevOps y Herramientas': ['Docker', 'Git', 'GitHub', 'Linux', 'Postman', 'VS Code'],
    'Arquitectura': ['Clean Architecture', 'APIs REST', 'DDD', 'Microservicios', 'Patrones de diseño'],
  },
  featuredProjects: [
    {
      title: 'Sistema de Mesa de Ayuda / Ticketing',
      description: 'Aplicación moderna para gestión de tickets y soporte técnico.',
      tech: ['FastAPI', 'SQLAlchemy', 'MariaDB', 'Docker', 'React'],
      features: ['Gestión de tickets', 'Roles y permisos', 'APIs REST', 'Dashboard administrativo', 'Gestión de usuarios', 'Sistema de prioridades'],
    },
    {
      title: 'Plataforma AgroConnect',
      description: 'Sistema orientado a conectar productores y compradores mediante arquitectura moderna basada en dominios.',
      tech: ['Python', 'FastAPI', 'React', 'MySQL'],
      features: ['Gestión de productos', 'Arquitectura escalable', 'APIs modernas', 'Integración de servicios'],
    },
  ],
  education: [
    {
      institution: 'CECAR',
      description: 'Último semestre en formación profesional relacionada con desarrollo de software y tecnologías informáticas.',
      period: '2020 — Presente',
    },
    {
      institution: 'SENA',
      description: 'Curso complementario enfocado en programación en la nube y tecnologías modernas para desarrollo de aplicaciones.',
      period: '2024 — Presente',
    },
  ],
  services: [
    { title: 'Desarrollo Backend', description: 'Construcción de APIs modernas y escalables utilizando Python y FastAPI.' },
    { title: 'Desarrollo Full Stack', description: 'Creación de aplicaciones web completas integrando frontend y backend.' },
    { title: 'Diseño de Bases de Datos', description: 'Modelado y optimización de bases de datos SQL y NoSQL.' },
    { title: 'Arquitectura de Software', description: 'Diseño de arquitecturas limpias, mantenibles y escalables.' },
  ],
  goals: [
    'Arquitectura de software', 'Inteligencia artificial',
    'DevOps', 'Cloud Computing', 'Seguridad informática', 'Sistemas distribuidos',
  ],
}
```

- [ ] **Step 2: Escribir test del hook useGitHubRepos**

```js
// src/hooks/useGitHubRepos.test.js
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useGitHubRepos } from './useGitHubRepos'

const mockRepos = [
  { id: 1, name: 'repo-1', description: 'Test repo', html_url: 'https://github.com/edeiker28/repo-1', language: 'Python', stargazers_count: 2, forks_count: 0, topics: [] },
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
```

- [ ] **Step 3: Correr test para verificar que falla**

```bash
npx vitest run src/hooks/useGitHubRepos.test.js
```

Esperado: FAIL — `useGitHubRepos` no existe.

- [ ] **Step 4: Implementar src/hooks/useGitHubRepos.js**

```js
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
```

- [ ] **Step 5: Correr tests para verificar que pasan**

```bash
npx vitest run src/hooks/useGitHubRepos.test.js
```

Esperado: 2 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/personal.js src/hooks/useGitHubRepos.js src/hooks/useGitHubRepos.test.js
git commit -m "feat: add personal data layer and GitHub repos hook with tests"
```

---

## Task 3: Navbar

**Files:**
- Create: `src/components/Navbar/Navbar.jsx`

- [ ] **Step 1: Crear Navbar.jsx**

```jsx
// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Educación', href: '#education' },
  { label: 'Servicios', href: '#services' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-purple-primary/20' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-mono font-bold text-xl">
          <span className="text-purple-light">&lt;</span>
          EB
          <span className="text-purple-light">/&gt;</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted hover:text-purple-light transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-purple-light"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-purple-primary/20 px-6 py-4 flex flex-col gap-4"
        >
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted hover:text-purple-light transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar/Navbar.jsx
git commit -m "feat: add gamer navbar with glass effect and mobile menu"
```

---

## Task 4: Hero

**Files:**
- Create: `src/components/Hero/Hero.jsx`

- [ ] **Step 1: Crear Hero.jsx**

```jsx
// src/components/Hero/Hero.jsx
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
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-gamer/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-purple-light text-sm mb-4 tracking-widest uppercase"
        >
          &gt; Hola, soy
        </motion.p>

        {/* Name with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-4 animate-glitch"
          style={{ textShadow: '2px 0 #7c3aed, -2px 0 #dc2626' }}
        >
          {personal.name}
        </motion.h1>

        {/* Animated role */}
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

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-muted max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {personal.shortBio}
        </motion.p>

        {/* CTA Buttons */}
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

        {/* Scroll indicator */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero/Hero.jsx
git commit -m "feat: add hero section with glitch name, animated roles, and CTA buttons"
```

---

## Task 5: About

**Files:**
- Create: `src/components/About/About.jsx`

- [ ] **Step 1: Crear About.jsx**

```jsx
// src/components/About/About.jsx
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
          {/* Bio */}
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

          {/* Stats */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About/About.jsx
git commit -m "feat: add about section with bio and stats cards"
```

---

## Task 6: TechStack

**Files:**
- Create: `src/components/TechStack/TechStack.jsx`

- [ ] **Step 1: Crear TechStack.jsx**

```jsx
// src/components/TechStack/TechStack.jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TechStack/TechStack.jsx
git commit -m "feat: add tech stack section with icons and categories"
```

---

## Task 7: Projects (featured + GitHub repos)

**Files:**
- Create: `src/components/Projects/RepoCard.jsx`
- Create: `src/components/Projects/Projects.jsx`

- [ ] **Step 1: Crear RepoCard.jsx**

```jsx
// src/components/Projects/RepoCard.jsx
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
```

- [ ] **Step 2: Crear Projects.jsx**

```jsx
// src/components/Projects/Projects.jsx
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

          {/* Featured */}
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

          {/* GitHub repos */}
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects/
git commit -m "feat: add projects section with featured cards and live GitHub repos"
```

---

## Task 8: Education

**Files:**
- Create: `src/components/Education/Education.jsx`

- [ ] **Step 1: Crear Education.jsx**

```jsx
// src/components/Education/Education.jsx
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
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-primary via-red-gamer to-transparent" />

            <div className="space-y-10">
              {personal.education.map((edu, i) => (
                <motion.div key={edu.institution} variants={fadeInUp} className="flex gap-8 pl-16 relative">
                  {/* Dot */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Education/Education.jsx
git commit -m "feat: add education timeline section"
```

---

## Task 9: Services

**Files:**
- Create: `src/components/Services/Services.jsx`

- [ ] **Step 1: Crear Services.jsx**

```jsx
// src/components/Services/Services.jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Services/Services.jsx
git commit -m "feat: add services section with animated cards"
```

---

## Task 10: Contact y Footer

**Files:**
- Create: `src/components/Contact/Contact.jsx`

- [ ] **Step 1: Crear Contact.jsx**

```jsx
// src/components/Contact/Contact.jsx
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

        {/* Footer */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact/Contact.jsx
git commit -m "feat: add contact section and footer"
```

---

## Task 11: Ensamblar App.jsx y main.jsx

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/main.jsx`
- Modify: `index.html`

- [ ] **Step 1: Actualizar index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Portafolio de Edeiker Buelvas — Desarrollador Full Stack & Backend Developer" />
    <title>Edeiker Buelvas | Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Actualizar src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Actualizar src/App.jsx**

```jsx
import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import TechStack from '@/components/TechStack/TechStack'
import Projects from '@/components/Projects/Projects'
import Education from '@/components/Education/Education'
import Services from '@/components/Services/Services'
import Contact from '@/components/Contact/Contact'

export default function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Education />
      <Services />
      <Contact />
    </div>
  )
}
```

- [ ] **Step 4: Correr el proyecto y verificar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:5173` y verificar:
- Navbar visible y sticky
- Hero con glitch, roles rotativos, botones CTA
- Todas las secciones renderizan sin errores de consola
- Repos de GitHub cargan (o muestran skeleton)
- Responsive en mobile (reducir ventana)

- [ ] **Step 5: Correr todos los tests**

```bash
npx vitest run
```

Esperado: todos los tests PASS.

- [ ] **Step 6: Commit final**

```bash
git add src/App.jsx src/main.jsx index.html
git commit -m "feat: assemble full portfolio SPA — all sections connected"
```

# Portfolio Personal — Edeiker Buelvas

## Overview
Portafolio personal de desarrollador con estética gamer moderna (sin pixel art). Single Page Application con scroll suave, repos de GitHub en vivo y animaciones.

## Stack
- React 18 + Vite
- TailwindCSS
- Framer Motion
- React Icons
- GitHub REST API (fetch nativo)

## Paleta de Colores
| Rol | Hex |
|-----|-----|
| Fondo | `#09090f` |
| Morado primario | `#7c3aed` |
| Rojo secundario | `#dc2626` |
| Glow | `#a855f7` |
| Texto | `#f1f5f9` |
| Muted | `#64748b` |

## Efectos Visuales
- Glitch text en el nombre (Hero)
- Neon glow en bordes de cards y navbar
- Glassmorphism oscuro en tarjetas
- Grid sutil animado en el fondo
- Animaciones de entrada con Framer Motion (scroll trigger)

## Secciones (en orden)
1. **Navbar** — fijo en top, logo/nombre, links con anclas, efecto blur/glass
2. **Hero** — nombre con glitch, rol animado, frase rotativa, botones CTA (Ver Proyectos / Contactar)
3. **About** — texto bio, stats (repos, tecnologías, años)
4. **Tech Stack** — grid de tecnologías con iconos, agrupadas por categoría
5. **Projects** — repos de GitHub API + 2 proyectos destacados fijos (Mesa de Ayuda, AgroConnect)
6. **Education** — timeline CECAR + SENA
7. **Services** — 4 cards de servicios ofrecidos
8. **Contact** — email, GitHub, footer

## Estructura de Archivos
```
portafolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── TechStack/
│   │   ├── Projects/
│   │   ├── Education/
│   │   ├── Services/
│   │   └── Contact/
│   ├── hooks/
│   │   └── useGitHubRepos.js
│   ├── data/
│   │   └── personal.js
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

## Datos
- GitHub username: `edeiker28`
- Email: `edeiker28@gmail.com`
- Repos: fetch de `https://api.github.com/users/edeiker28/repos?sort=updated&per_page=20`

## Proyectos Destacados (hardcoded)
- **Mesa de Ayuda** — FastAPI · SQLAlchemy · MariaDB · Docker · React
- **AgroConnect** — Python · FastAPI · React · MySQL

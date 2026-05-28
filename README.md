# Portafolio Personal — Edeiker Buelvas

Portafolio personal desarrollado como SPA con estética gamer. Muestra proyectos, stack tecnológico, educación y servicios. Los repositorios de GitHub se cargan en tiempo real desde la API pública.

## Stack

- **React 19** + **Vite 8**
- **TailwindCSS v3** — tema gamer (negro `#09090f`, morado `#7c3aed`, rojo `#dc2626`)
- **Framer Motion 12** — animaciones y transiciones
- **React Icons 5**
- **GitHub REST API** — repos en vivo de [@edeiker28](https://github.com/edeiker28)
- **Vitest** + **Testing Library** — tests unitarios

## Secciones

| Sección | Descripción |
|---------|-------------|
| Hero | Efecto glitch en el nombre, roles rotativos |
| About | Bio, estadísticas y especialidades |
| TechStack | Iconos agrupados por categoría |
| Projects | Proyectos destacados + repos de GitHub en vivo |
| Education | Timeline CECAR + SENA |
| Services | 4 cards de servicios ofrecidos |
| Contact | Links de contacto y footer |

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:4000)
npm run dev

# Build de producción
npm run build

# Correr tests
npm run test
```

## Personalización

Todos los datos del portafolio están centralizados en un solo archivo:

```
src/data/personal.js
```

Desde ahí puedes editar: nombre, bio, stack, proyectos destacados, educación y servicios.

## Estructura del proyecto

```
src/
├── components/
│   ├── About/
│   ├── Contact/
│   ├── Education/
│   ├── Hero/
│   ├── Navbar/
│   ├── Projects/
│   ├── Services/
│   └── TechStack/
├── data/
│   └── personal.js       # todos los datos del portafolio
├── hooks/
│   └── useGitHubRepos.js # fetch repos GitHub
└── App.jsx
```

## Tests

```bash
npm run test
```

2 tests cubriendo el hook `useGitHubRepos`.

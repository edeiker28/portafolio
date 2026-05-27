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

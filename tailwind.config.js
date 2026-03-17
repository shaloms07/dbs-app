/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef7f5',
          100: '#d8ece8',
          500: '#19857d',
          600: '#146d67',
          700: '#114f4b',
          900: '#132c32',
        },
        score: {
          poor: '#d95d39',
          below: '#e98647',
          average: '#d9b75f',
          good: '#4a7db4',
          excellent: '#1f8f80',
        },
        success: '#1f8f80',
        warning: '#d9b75f',
        error: '#d95d39',
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideUp: 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          'from': { transform: 'translateY(100%)' },
          'to': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

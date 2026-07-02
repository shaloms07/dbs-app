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
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b8d7ff',
          300: '#7fb9ff',
          500: '#1468F4',
          600: '#0058D1',
          700: '#0048ad',
          800: '#003a8a',
          900: '#273471',
        },
        score: {
          poor: '#d95d39',
          below: '#f59e0b',
          average: '#00D3FF',
          good: '#1468F4',
          excellent: '#0058D1',
        },
        success: '#0058D1',
        warning: '#00D3FF',
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
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'milk': '#F5EFE6',
        'milk-100': '#FAF6F0',
        'milk-200': '#F5EFE6',
        'brown': {
          DEFAULT: '#6F4E37',
          50:  '#F3EDE7',
          100: '#E6D9CD',
          200: '#C9A887',
          300: '#A87F55',
          400: '#8B6441',
          500: '#6F4E37',
          600: '#5A3E2C',
          700: '#452F21',
          800: '#302017',
          900: '#1C120D',
        },
        'ink': '#2C1810',
        'ink-soft': '#5A4A42',
      },
      fontFamily: {
        'serif': [
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          '"Songti SC"',
          'SimSun',
          'serif',
        ],
        'sans': [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      boxShadow: {
        'paper': '0 4px 20px rgba(111, 78, 55, 0.10)',
        'paper-hover': '0 8px 28px rgba(111, 78, 55, 0.18)',
      },
      borderRadius: {
        'card': '16px',
        'btn': '12px',
      },
    },
  },
  plugins: [],
};

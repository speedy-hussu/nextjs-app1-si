/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4f9',
          100: '#d9e3f2',
          200: '#b3c7e5',
          300: '#8daad8',
          400: '#678ecb',
          500: '#4172be',
          600: '#345b98',
          700: '#274472',
          800: '#1a2d4c',
          900: '#0e2c52', // Base color
          950: '#071a33',
        },
        secondary: {
          50: '#f8f5f0',
          100: '#f1e8d9',
          200: '#e3d0b3',
          300: '#d5b98d',
          400: '#c7a267',
          500: '#b98b41',
          600: '#946f34',
          700: '#6f5327',
          800: '#4a381a',
          900: '#251c0d',
        },
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 15px rgba(14, 44, 82, 0.2)',
      },
    },
  },
  plugins: [],
}


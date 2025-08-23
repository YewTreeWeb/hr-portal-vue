/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7f2',
          100: '#ffffff',
          200: '#dfe0eb',
          300: '#f0f1f7',
          400: '#9fa2b4',
          500: '#88c0d0',
          600: '#5e81ac',
          700: '#4550e5',
          800: '#262125',
          900: '#0d0d0d'
        },
        dark: {
          50: '#f0f1f7',
          100: '#dfe0eb',
          200: '#9fa2b4',
          300: '#4550e5',
          400: '#3b4252',
          500: '#262125',
          600: '#131419',
          700: '#1c1c24',
          800: '#0d0d0d',
          900: '#000000'
        },
        accent: {
          50: '#e6f3f7',
          100: '#b3dde8',
          200: '#88c0d0',
          300: '#5e81ac',
          400: '#4550e5',
          500: '#3b4252',
          600: '#2e3440',
          700: '#242933',
          800: '#1a1f26',
          900: '#0f1419'
        },
        error: '#d36b75'
      },
      fontFamily: {
        sans: ['Asap', 'system-ui', 'sans-serif'],
        header: ['Ubuntu', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}

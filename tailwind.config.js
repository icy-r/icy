/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#00ff00',
      },
      dropShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        '2xl': '0 2px 4px rgba(0, 20, 5, 0.8)',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        housler: {
          primary: '#2c3e50',
          accent: '#e74c3c',
          light: '#ecf0f1',
        },
      },
    },
  },
  plugins: [],
}

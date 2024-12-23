/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#FFA500',
          600: '#E69500'
        }
      },
      container: {
        center: true,
        padding: '1rem'
      }
    },
  },
  plugins: [],
}
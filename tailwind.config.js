/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'carousel-background':'rgba(156, 163, 175,0.5)',
      }
    },
  },
  plugins: [],
}


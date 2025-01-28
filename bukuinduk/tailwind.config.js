/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homepage': "url('/src/assets/pexels-codioful-7130469 1.png')"
      }
    },
    fontFamily: {
      'body': ['Helvetica', 'Arial', 'sans-serif'],
      'header' : ['Coolvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'homepage': '#ACABAF', // Menggunakan backgroundColor untuk warna latar belakang
      },
      fontFamily: {
        'body': ['Helvetica', 'Arial', 'sans-serif'],
        'header': ['Coolvetica', 'Arial', 'sans-serif'] // Pastikan font Coolvetica tersedia
      }
    },
  },
  plugins: [],
}
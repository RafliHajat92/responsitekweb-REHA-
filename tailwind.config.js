/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Tentukan file sumber Tailwind
  darkMode: "class", // Aktifkan dark mode berbasis class
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Tambahkan font Poppins di sini
      },
    },
  },
  plugins: [],
};

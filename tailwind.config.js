/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Tentukan file sumber Tailwind
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Tambahkan font Poppins di sini
      },
    },
  },
  plugins: [],
};

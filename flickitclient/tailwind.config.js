/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        fellFrench:["IM Fell French Canon SC", "serif"],
        DancingScript:["Dancing Script","cursive"]
      }
    },
  },
  plugins: [],
}


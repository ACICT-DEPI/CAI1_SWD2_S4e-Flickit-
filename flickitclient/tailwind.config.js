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
        DancingScript:["Dancing Script","cursive"],
        Risque: ["Risque", "cursive"],
        akaya:["akaya"]
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #4361EE, #4CC9F0, #7209B7, #F72585)',
      },
      blur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '0',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      primary: "#FF742C",
      secondary: "#fff",
      transparent: "#00000000",
      
      primary_text: "#fff",
      secondary_text: "#BBBBBB",
      
      black: "#000",
    },
    backgroundImage: {
      background: ""
    }
  },
  plugins: [],
}


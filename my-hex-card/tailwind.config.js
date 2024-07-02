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
      
      primary_text: "#000",
      secondary_text: "#777",

      background_color: "#f8f8f8",
      
      black: "#000",
    },
    backgroundImage: {
      background: ""
    },
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '70px',

      title: '35px',
      subtitle: '16px',
      tiny_text: '10px',
      medium_text: '12px',
    },
    fontWeight: {
      title: '700',
      subtitle: '400',
      normal: '400',
      medium: '500',
    },
    content: {
      c1: "/assets/img/big_circle.png"
    }
  },
  plugins: [],
}


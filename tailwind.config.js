/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      sans: [/* "Arial",  */"sans-serif"],
    },
    fontSize: {
      // 'xs': ['0.8125rem', {lineHeight: '0.975rem',}],
      'sm': ['0.875rem', {lineHeight: '1.225rem'}],
      // 'semi-base': ['0.9375rem', {lineHeight: '1.125rem'}],
      'base': ['1rem', {lineHeight: '1.2rem'}],
      'lg': ['1.125rem', {lineHeight: '1.35rem'}],
      'xl': ['1.375rem', {lineHeight: '1.65rem'}],
      // '2xl': ['1.5rem', {lineHeight: '2.4rem'}],
      // '2.1xl': ['1.5625rem', {lineHeight: '2.5rem'}],
      // '2.5xl': ['1.75rem', {lineHeight: '2.1rem'}],
      // '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
      // '4xl': ['2.5rem', {lineHeight: '3rem'}],
      // '3.5xl': ['2.8125rem', {lineHeight: '3.9375rem'}],
      // '4.5xl': ['3.25rem', {lineHeight: '3.9rem'}],
      // '5xl': ['3.4375rem', {lineHeight: '4.125rem'}],
      // '6xl': ['4.0625rem', {lineHeight: '4.875rem'}],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'primary-bg':'#020202',
        'primary-bg--light':'#F7F6F9',
        
        // text
        'white':'#FEFEFE',
        'black':'#323949',
        'gray': '#9998B8',
        'text-80': 'rgba(50, 57, 73, 0.80)',
        'blue1': '#6A97FF',
        'gray-100': '#9998B8',
        

        'card-light':'#1B212D',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
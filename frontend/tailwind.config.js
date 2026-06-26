/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#F7C59F',
        accent: '#004E89',
        background: '#FFFFFF',
        text: '#2D2D2D',
        success: '#2ECC71',
        warning: '#F1C40F',
        danger: '#E74C3C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

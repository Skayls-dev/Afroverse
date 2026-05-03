/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D9E75',
        accent: '#534AB7',
        dark: '#0f0f0f',
      }
    }
  },
  plugins: []
}

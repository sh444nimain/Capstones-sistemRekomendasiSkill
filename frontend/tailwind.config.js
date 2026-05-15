/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563eb',   
          secondary: '#7c3aed', 
          success: '#10b981',  
          danger: '#ef4444',
          dark: '#0f172a', 
          light: '#f8fafc',  
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'muslim-green': '#10B981', // Emerald 500
        'muslim-dark': '#064E3B', // Emerald 900
        'muslim-gray': '#E5E7EB', // Gray 200
        primary: {
          DEFAULT: '#0ea5a4',
          50: '#e6f7f6',
          100: '#cfeff0'
        },
        accent: '#ff7ab6',
        bg: '#0f1724',
        card: '#121826',
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'], // Google Font for Arabic
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'status-fill': {
          '0%': {
            width: '0%',
            opacity: '1',
          },
          '85%': {
            width: '100%',
            opacity: '1',
          },
          '90%': {
            width: '100%',
            opacity: '0.8',
          },
          '95%': {
            width: '100%',
            opacity: '0.4',
          },
          '100%': {
            width: '100%',
            opacity: '0',
          },
        },
      },
      animation: {
        'status-fill': 'status-fill 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}

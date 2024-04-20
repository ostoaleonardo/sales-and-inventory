const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'bar-growth': {
          '0%': {
            transform: 'scaleY(0)',
            transformOrigin: 'bottom',
          },
          '100%': {
            transform: 'scaleY(1)',
            transformOrigin: 'bottom',
          },
        }
      },
      animation: {
        'bar-growth': 'bar-growth 0.5s ease-out',
      },
    },
  },
  plugins: [nextui()],
}

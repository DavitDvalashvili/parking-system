/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "bpg-arial-caps": ['"BPG Arial Caps", sans-serif'],
        "bpg-arial": ['"BPG Arial", sans-serif'],
        "alk-sanet": ['"ALK Sanet", sans-serif']
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulldown: {
          '0%': { marginBottom: '100%' },
          '100%': { marginBottom: '0%' }
        }
      },
      animation: {
        'fade-in': 'fadein .5s linear',
        'pull-down': 'pulldown .3s ease-in-out'
      }
    },
  },
  plugins: [],
}


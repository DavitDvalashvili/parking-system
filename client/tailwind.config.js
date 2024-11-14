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
        "alk-sanet": ['"ALK Sanet", sans-serif'],
        "firego": ["FiraGO"]
      },
      colors: {
        "text-primary-blue": "#063776",
        "button-bg-yellow": "#FFCA40",
        "border-color": "#EEEEEE",
        "text-gray-secondary": "#333333"
      },
      backgroundImage: {
        'bg-gradient': 'linear-gradient(223.09deg, #063776 0.75%, #063776 20.17%, #0C67DC 70.33%)',
        'bg-image': 'url("/BgDecoration.svg")'
      },
      backgroundPosition: {
        'top-right': 'top right',
        'center': 'center',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat', 
      }
    },
  },
  plugins: [],
}


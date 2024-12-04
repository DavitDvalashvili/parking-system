/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        firago: ["Firago", "sans-serif"],
      },
      colors: {
        "text-primary-blue": "#063776",
        "text-secondary-blue": "#163165",
        "bg-main": "#F8F9FA",
        "button-bg-yellow": "#FFCA40",
        "border-color": "#EEEEEE",
        "border-color-secondary": "#63769A",
        "border-color-tertiary": "#E0EAFC",
        "text-gray-primary": "#334155",
        "text-gray-secondary": "#333333",
        "delete-button-red": "#EE4444",
        "button-green": "#15CD5C",
        "text-gray-tertiary": "#ACB2BB",
        "bg-color-4": "#F5F8FF",
        "text-color-4": "#A0A0A0",
      },
      backgroundImage: {
        "bg-gradient":
          "linear-gradient(223.09deg, #063776 0.75%, #063776 20.17%, #0C67DC 70.33%)",
        "bg-image": 'url("/BgDecoration.svg")',
        "cards-image": 'url("/cards.svg")',
      },
      boxShadow: {
        custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

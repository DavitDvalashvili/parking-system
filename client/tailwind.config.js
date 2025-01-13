/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        firago: ["Firago", "sans-serif"],
      },
      colors: {
        "primary-blue": "#063776",
        "secondary-blue": "#163165",
        "gray-primary": "#334155",
        "gray-secondary": "#333333",
        "gray-tertiary": "#ACB2BB",
        "gray-light": "#A0A0A0",
        //  border colors
        "border-primary": "#EEEEEE",
        "border-secondary": "#63769A",
        "border-tertiary": "#E0EAFC",
        //button colors
        "button-red": "#EE4444",
        "button-green": "#15CD5C",
        "button-yellow": "#FFCA40",
        //background colors
        "bg-primary": "#F8F9FA",
        "bg-secondary": "#F5F8FF",
      },
      borderRadius: {
        primary: "10px",
        secondary: "30px",
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

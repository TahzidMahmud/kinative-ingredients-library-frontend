/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    minWidth: {
      50: "50%",
      70: "70%",
      30: "30%",
      40: "40%",
      25: "25%",
      75: "75%",
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};

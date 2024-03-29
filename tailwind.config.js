/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    minWidth: {
      0: "0%",
      50: "50%",
      60: "60%",
      70: "70%",
      30: "30%",
      40: "40%",
      25: "25%",
      20: "20%",
      15: "15%",
      18: "18%",
      75: "75%",
      100: "100%",
      // 100: "100vh",
    },
    minHeight: {
      50: "50%",
      60: "60%",
      70: "70%",
      30: "30%",
      40: "40%",
      25: "25%",
      75: "75%",
    },

    height: {
      128: "32rem",
      100: "100vh",
    },
    width: {
      3: "3rem",
    },
    extend: {
      colors: {
        "footer-bg": "#210373",
        "copy-bg": "#ff2b03",
        "border-color": "#ead05b",
        facebook: "#385899",
        twitter: "#16a2f2",
        instragram: "#be2ea3",
        youtube: "#ff0000",
        linkedin: "#0070ae",
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],

  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/line-clamp"),
    require("tw-elements/dist/plugin"),
  ],
};

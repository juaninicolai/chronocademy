import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        "blue-500": "#0033CC",
        "blue-400": "#335CD6",
        "blue-300": "#6685E0",
        "blue-200": "#99ADEB",
        "blue-100": "#CCD6F5",
        "green-500": "#009933",
        "green-400": "#33AD5C",
        "green-300": "#66C285",
        "green-200": "#99D6AD",
        "green-100": "#CCEBD6",
        "orange-500": "#FD7501",
        "orange-400": "#FD9134",
        "orange-300": "#FEAC67",
        "orange-200": "#FEC899",
        "orange-100": "#FFE3CC",
      },
      secondary: {
        "yellow-500": "#FDAB02",
        "yellow-400": "#FDBC35",
        "yellow-300": "#FECD67",
        "yellow-200": "#FEDD9A",
        "yellow-100": "#FFEECC",
        "black-500": "#000000",
        "black-400": "#333333",
        "black-300": "#666666",
        "black-200": "#999999",
        "black-100": "#CCCCCC",
        "white-500": "#FFFFFF",
      },
    },
    //TODO responsive design
    fontFamily: {
      inter: ["var(--font-inter)", "sans-serif"],
      roboto: ["var(--font-roboto)", "sans-serif"],
    },
    extend: {
      fontSize: {
        h1: ["28px", { lineHeight: "1.5" }],
        h2: ["24px", { lineHeight: "1.5" }],
        h3: ["20px", { lineHeight: "1.5" }],
        paragraph: ["12px", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};
export default config;

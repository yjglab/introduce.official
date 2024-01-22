import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");
const config: Config = {
  content: ["./node_modules/preline/preline.js", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: colors.indigo,
        general: colors.blue,
        success: colors.green,
        error: colors.red,
      },
      animation: {
        shine: "shineKey 2s ease-in-out infinite alternate",
        flip: "flip 4s infinite steps(2, end)",
        rotate: "rotate 2s linear infinite both",
      },
      keyframes: {
        shineKey: {
          from: {
            backgroundPosition: "0% 50%",
          },
          to: {
            backgroundPosition: "100% 50%",
          },
        },
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};

export default config;

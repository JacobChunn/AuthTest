import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
	  colors: {
        green: colors.green,
        lime: colors.lime,
        red: colors.red,
        rose: colors.rose,
        yellow: colors.yellow,
        softYellow: '#fefaa6',
        purple: colors.purple,
        indigo: colors.indigo,
        orange: colors.orange,
        amber: colors.amber,
        blue: colors.blue,
        black: colors.black,
        white: colors.white,
		
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;

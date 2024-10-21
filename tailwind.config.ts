import { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#409EFF",
        secondary: "#4A4A4A",
      },
    },
  },
  plugins: [],
} satisfies Config;

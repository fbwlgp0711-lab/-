import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D1B3E",
        accent: "#B8975A",
        background: "#F9F7F4",
        brand: {
          navy: "#0D1B3E",
          gold: "#B8975A",
          white: "#F9F7F4",
          gray: "#374151",
        },
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)"],
        sans: ["var(--font-noto-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;

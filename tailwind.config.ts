import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        walnut: {
          DEFAULT: "#302019",
          light: "#412C22",
          dark: "#211410",
        },
        wood: {
          DEFAULT: "#68472F",
          light: "#845D3E",
          dark: "#4B321F",
        },
        mustard: {
          DEFAULT: "#C5A04A",
          light: "#D2B266",
          dark: "#A3823A",
        },
        turmeric: {
          DEFAULT: "#D9BC6A",
          light: "#E6CE8F",
          dark: "#C5A04A",
        },
        cream: {
          DEFAULT: "#F8F3E9",
          light: "#FDFBF6",
          dark: "#E8DBC3",
          muted: "#D9C8A8",
        },
        olive: {
          DEFAULT: "#56634A",
          light: "#6C7A5E",
          dark: "#414C37",
        },
        charcoal: {
          DEFAULT: "#292620",
          light: "#403B32",
          dark: "#1B1915",
        },
        terracotta: {
          DEFAULT: "#A9573D",
          light: "#BE7256",
          dark: "#84402C",
        },
        warmwhite: "#FDFBF6",
      },
      fontFamily: {
        heading: ["\"Plus Jakarta Sans\"", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        kitchen: "0 4px 20px -2px rgba(48, 32, 25, 0.10), 0 2px 6px -1px rgba(41, 38, 32, 0.05)",
        "kitchen-lg": "0 12px 32px -6px rgba(48, 32, 25, 0.18), 0 4px 12px -2px rgba(41, 38, 32, 0.08)",
        "kitchen-warm": "0 10px 25px -3px rgba(197, 160, 74, 0.30), 0 4px 10px -2px rgba(104, 71, 47, 0.10)",
      },
    },
  },
  plugins: [],
};
export default config;

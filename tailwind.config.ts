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
          DEFAULT: "#281914",
          light: "#3A2620",
          dark: "#1A0F0B",
        },
        wood: {
          DEFAULT: "#68472F",
          light: "#845D3E",
          dark: "#4B321F",
        },
        mustard: {
          DEFAULT: "#E1B52A",
          light: "#EB C44D",
          dark: "#C19A1B",
        },
        turmeric: {
          DEFAULT: "#F3C928",
          light: "#F7D85C",
          dark: "#DCB012",
        },
        cream: {
          DEFAULT: "#F8F2E8",
          light: "#FFFDF8",
          dark: "#EDE0CC",
          muted: "#E3D3B8",
        },
        olive: {
          DEFAULT: "#40583A",
          light: "#546F4B",
          dark: "#2C3E27",
        },
        charcoal: {
          DEFAULT: "#25241F",
          light: "#3B3932",
          dark: "#171613",
        },
        warmwhite: "#FFFDF8",
      },
      fontFamily: {
        heading: ["\"Plus Jakarta Sans\"", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        kitchen: "0 4px 20px -2px rgba(40, 25, 20, 0.10), 0 2px 6px -1px rgba(37, 36, 31, 0.05)",
        "kitchen-lg": "0 12px 32px -6px rgba(40, 25, 20, 0.18), 0 4px 12px -2px rgba(37, 36, 31, 0.08)",
        "kitchen-warm": "0 10px 25px -3px rgba(225, 181, 42, 0.28), 0 4px 10px -2px rgba(104, 71, 47, 0.10)",
      },
    },
  },
  plugins: [],
};
export default config;

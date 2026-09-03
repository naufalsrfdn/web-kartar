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
        oskar: {
          red: "#FF4D00",
          orange: "#FF8C00",
          yellow: "#FFC700",
          dark: "#111111",
          cream: "#FAF7F2",
          surface: "#FFFFFF",
          muted: "#F3EFEA",
          border: "#1E293B",
        },
      },
      boxShadow: {
        neo: "3px 3px 0px 0px rgba(17, 17, 17, 1)",
        "neo-lg": "5px 5px 0px 0px rgba(17, 17, 17, 1)",
        "neo-sm": "2px 2px 0px 0px rgba(17, 17, 17, 1)",
        "neo-red": "3px 3px 0px 0px rgba(255, 77, 0, 1)",
      },
      borderRadius: {
        neo: "0.75rem",
      },
    },
  },
  plugins: [],
};
export default config;

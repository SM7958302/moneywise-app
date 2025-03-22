import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(217 19% 27%)",
        input: "hsl(217 19% 27%)",
        ring: "hsl(224 71.4% 45%)",
        background: "hsl(224 71.4% 4%)",
        foreground: "hsl(210 20% 98%)",
        primary: {
          DEFAULT: "hsl(224 71.4% 45%)",
          foreground: "hsl(210 20% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(217 19% 27%)",
          foreground: "hsl(215 20.2% 65.1%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 20% 98%)",
        },
        muted: {
          DEFAULT: "hsl(217 19% 27%)",
          foreground: "hsl(215 20.2% 65.1%)",
        },
        accent: {
          DEFAULT: "hsl(217 19% 27%)",
          foreground: "hsl(215 20.2% 65.1%)",
        },
        popover: {
          DEFAULT: "hsl(224 71.4% 4%)",
          foreground: "hsl(210 20% 98%)",
        },
        card: {
          DEFAULT: "hsl(224 71.4% 4%)",
          foreground: "hsl(210 20% 98%)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
}

export default config 
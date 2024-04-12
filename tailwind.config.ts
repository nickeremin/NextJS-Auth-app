import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        // Font Colors
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        tertiary: "rgb(var(--tertiary))",

        // Background Colors
        background: {
          DEFAULT: "rgb(var(--background))",
        },
        border: "rgb(var(--border))",
        ring: "rgb(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "auth-background":
          "url('/public/images/paul-pastourmatzis-mqO0Rf-PUMs-unsplash.jpg')",
      },
      boxShadow: {
        "border-t": "inset 0 1px 0 0 rgb(var(--border))",
        "border-b": "inset 0 -1px 0 0 rgb(var(--border))",
        "border-r": "inset -1px 0 0 0 rgb(var(--border))",
        "border-l": "inset 1px 0 0 0 rgb(var(--border))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config

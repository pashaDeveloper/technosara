import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        integralCF: ["var(--font-integralCF)"],
        satoshi: ["var(--font-satoshi)"]
      },
      screens: {
        xs: "375px"
      },
      width: {
        frame: "77.5rem"
      },
      maxWidth: {
        frame: "77.5rem"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        palette: {
          fill: "rgb(var(--color-bg) / <alpha-value>)",
          card: "rgb(var(--color-bg-side) / <alpha-value>)",
          dark: "rgb(var(--color-bg-dark) / <alpha-value>)"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      keyframes: {
        sidenavLTR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0px)" },
        },
        sidenavRTL: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0px)" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
         dropDown: {
          "0%": { opacity: "0", transform: "scaleY(0)" },
          "100%": { opacity: "1", transform: "scaleY(1)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
       sidenavLTREntering: "sidenavLTR 0.3s ease-in-out forwards",
        sidenavRTLEntering: "sidenavRTL 0.3s ease-in-out forwards",
        sidenavLTRExit: "sidenavLTR 0.3s ease-in-out reverse forwards",
        sidenavRTLExit: "sidenavRTL 0.3s ease-in-out reverse forwards",
        fadeEntering: "fade 0.3s forwards",
        fadeExit: "fade 0.3s reverse forwards",
        dropDown: "dropDown 0.3s forwards",
        dropDownExit: "dropDown 0.3s reverse forwards",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
  safelist: ["backdrop-blur-[2px]"]
};
export default config;

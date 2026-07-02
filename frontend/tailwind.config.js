/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      colors: {
        primary: {
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },

        secondary: {
          500: "#7C3AED",
          600: "#6D28D9",
        },

        accent: {
          400: "#22D3EE",
          500: "#06B6D4",
        },

        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },

        bg: {
          base: "#F8FAFC",
          surface: "#FFFFFF",
          elevated: "#F1F5F9",
        },
      },

      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #6366F1 0%, #7C3AED 50%, #06B6D4 100%)",

        "gradient-card":
          "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)))",

        "gradient-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
      },

      backdropBlur: {
        glass: "16px",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        card: "0 12px 30px rgba(15, 23, 42, 0.08)",
        glow: "0 0 24px rgba(99, 102, 241, 0.12)",
        "glow-lg": "0 0 50px rgba(99, 102, 241, 0.18)",
        glass: "0 8px 32px rgba(0,0,0,0.08)",
      },

      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },

      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },

        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },

        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(99,102,241,0.2)",
          },
          "50%": {
            boxShadow: "0 0 50px rgba(99,102,241,0.45)",
          },
        },

        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to: { backgroundPosition: "200% center" },
        },

        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },

        fadeUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      screens: {
        xs: "375px",
      },
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        TalentLensAI: {
          primary: "#6366F1",
          secondary: "#7C3AED",
          accent: "#06B6D4",
          neutral: "#475569",

          "base-100": "#F8FAFC",
          "base-200": "#E2E8F0",
          "base-300": "#FFFFFF",

          info: "#06B6D4",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],

    darkTheme: "TalentLensAI",

    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
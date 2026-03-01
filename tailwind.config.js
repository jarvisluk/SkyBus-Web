/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
        },
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
        },
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        border: "var(--color-border)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        md: "var(--border-radius)",
        lg: "var(--border-radius)",
        xl: "var(--border-radius)",
        "2xl": "var(--border-radius)",
        "3xl": "var(--border-radius)",
        full: "var(--border-radius)",
      },
      borderWidth: {
        DEFAULT: "var(--border-width)",
      },
      boxShadow: {
        sm: "var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) var(--shadow-color)",
        DEFAULT: "var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) var(--shadow-color)",
        md: "var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) var(--shadow-color)",
        lg: "var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) var(--shadow-color)",
        xl: "var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) var(--shadow-color)",
        "2xl": "var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) var(--shadow-color)",
      },
      fontFamily: {
        sans: "var(--font-family)",
      },
      fontWeight: {
        normal: "var(--font-weight)",
        bold: "var(--font-weight-bold)",
      },
      spacing: {
        'mtr-stripe': "var(--mtr-stripe-height)",
      }
    },
  },
  plugins: [],
}

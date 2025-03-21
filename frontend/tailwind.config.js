/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",
        primaryContent: "var(--color-primary-content)",
        secondary: "var(--color-secondary)",
        secondaryHover: "var(--color-secondary-hover)",
        secondaryContent: "var(--color-secondary-content)",
        accent: "var(--color-accent)",
        accentHover: "var(--color-accent-hover)",
        accentContent: "var(--color-accent-content)",
        neutral: "var(--color-neutral)",
        neutralContent: "var(--color-neutral-content)",
        gray: "var(--color-gray)",
        base100: "var(--color-base-100)",
        base200: "var(--color-base-200)",
        base300: "var(--color-base-300)",
        baseContent: "var(--color-base-content)",
        info: "var(--color-info)",
        infoContent: "var(--color-info-content)",
        success: "var(--color-success)",
        successContent: "var(--color-success-content)",
        warning: "var(--color-warning)",
        warningContent: "var(--color-warning-content)",
        error: "var(--color-error)",
        errorContent: "var(--color-error-content)",
      }
    },
  },
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: "var(--border)",
        background: "var(--bg)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "var(--bg-dark)",
          foreground: "var(--text-primary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "var(--bg-dark)",
          foreground: "var(--text-primary)",
        },
        input: {
          DEFAULT: "var(--bg-darker)",
        },
      },
      borderRadius: {
        lg: "var(--tw-radius)",
        md: "calc(var(--tw-radius) - 2px)",
        sm: "calc(var(--tw-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "typing": {
          "0%, 60%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-3px)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-in-from-bottom": {
          from: { opacity: 0, transform: "translateY(5px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "typing-1": "typing 1.4s infinite ease-in-out",
        "typing-2": "typing 1.4s infinite ease-in-out 0.2s",
        "typing-3": "typing 1.4s infinite ease-in-out 0.4s",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-in": "slide-in-from-bottom 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
} 
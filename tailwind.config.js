/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E1E2F",       // Deep navy background
        secondary: "#2D2D44",     // Slightly lighter dark
        accent: "#8E44AD",        // Vibrant purple
        accent2: "#E67E22",       // Warm orange
        textPrimary: "#FFFFFF",   // Main text
        textSecondary: "#AAAAAA", // Subtext
        textContrast: "#000000",  // Black text
        border: "#3E3E50",        // Divider lines
        error: "#E74C3C",         // Red error
        success: "#27AE60",       // Green success
        warning: "#F1C40F",       // Yellow warning
      },
    },
  },
  plugins: [],
}


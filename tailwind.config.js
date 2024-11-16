/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            h1: { color: "#1a202c" },
            h2: { color: "#1a202c" },
            li: { marginTop: "0.25em", marginBottom: "0.25em" },
            // Add more customizations as needed
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

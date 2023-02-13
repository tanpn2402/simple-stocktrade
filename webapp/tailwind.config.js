/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      "light",
      {
        "green-light": {
          "color-scheme": "light",
          primary: "#34d399",
          "primary-content": "#ffffff",
          secondary: "#67e8f9",
          "secondary-content": "#ffffff",
          accent: "#1FB2A5",
          "accent-content": "#163835",
          neutral: "#3d4451",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937"
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")]
}
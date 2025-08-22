/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'color-bg': '#202124',
        'color-surface': '#292a2d',
        'color-border': '#5f6368',
        'color-text': '#e8eaed',
        'color-text-secondary': '#9aa0a6',
        'color-accent': '#5765F2',
        'color-hover': '#3c4043',
        'color-active': '#5f6368',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        chrome: {
          "primary": "#5765F2",
          "secondary": "#9aa0a6", 
          "accent": "#5765F2",
          "neutral": "#292a2d",
          "base-100": "#202124",
          "base-200": "#292a2d",
          "base-300": "#3c4043",
          "base-content": "#e8eaed",
          "info": "#8ab4f8",
          "success": "#81c995",
          "warning": "#fdd663",
          "error": "#f28b82",
        }
      }
    ],
  },
}
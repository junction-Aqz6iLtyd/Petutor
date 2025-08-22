/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // Chrome 다크모드 색상 스키마
        'chrome-bg': '#202124',        // Chrome 다크모드 배경
        'chrome-surface': '#292a2d',   // Chrome 카드/패널 배경
        'chrome-border': '#5f6368',    // Chrome 경계선
        'chrome-text': '#e8eaed',      // Chrome 기본 텍스트
        'chrome-text-secondary': '#9aa0a6', // Chrome 보조 텍스트
        'chrome-accent': '#8ab4f8',    // Chrome 파란색 액센트
        'chrome-hover': '#3c4043',     // Chrome 호버 상태
        'chrome-active': '#5f6368',    // Chrome 활성 상태
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        chrome: {
          "primary": "#8ab4f8",
          "secondary": "#9aa0a6", 
          "accent": "#8ab4f8",
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
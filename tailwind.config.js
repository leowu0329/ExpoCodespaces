/** @type {import('tailwindcss').Config} */
module.exports = {
  // 確保掃描到 App.js 及 src 資料夾下的所有 JS/JSX 檔案
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
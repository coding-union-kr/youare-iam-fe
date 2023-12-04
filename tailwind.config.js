/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      primary: '#FF9081',
      secondary: '#F7CBC5',
      accent: '#FF6162',
      yellow: '#F6F7C1',
    },
    fontFamily: {
      sans: ['Pretendard', 'Arial', 'sans-serif'],
      neo: ['Neo둥근모', 'neodgm', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#FF9081',
          secondary: '#F7CBC5',
          accent: '#FF6162',
          yellow: '#F6F7C1',
        },
      },
    ],
  },
};

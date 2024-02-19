/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      primary: '#FF9081',
      secondary: '#F7CBC5',
      accent: '#FF6162',
      yellow: '#F6F7C1',
      white: '#FFFFFF',
      'gray-dark': '#656565',
      gray: '#9F9F9F',
      'gray-light': '#BDBDBD',
    },
    fontFamily: {
      neo: ['var(--local-neo-font)', 'sans-serif'],
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
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
    ],
  },
};

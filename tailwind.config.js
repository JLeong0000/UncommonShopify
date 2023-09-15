import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    fontFamily: {
      inter: ['Inter', 'san-serif'],
      bebasneue: ['"Bebas Neue"', 'san-serif'],
    },
    extend: {
      colors: {
        darkGrey: '#131313',
      },
      backgroundImage: {
        image: "url('./public/Dirt texture.jpg')",
      },
    },
  },
};

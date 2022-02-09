const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.tsx',
    './app/**/*.jsx',
    './app/**/*.js',
    './app/**/*.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
};

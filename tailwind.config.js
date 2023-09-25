const colors = require('tailwindcss/colors')
const { borderRadius, boxShadow } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    input: {
      appearance: 'none',
    },
    extend: {
      colors: {
        currentColor: colors.color,
        gray: {
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '',
        },
        yellow: {
          100: '#f9d889',
          200: '#f9c64e',
          300: '#ecbd2c',
          400: '#cc9f13',
          500: '#a57d00',
        },
        red: {
          100: '#dea7a7',
          200: '#e68a8a',
          300: '#d54e4e',
          400: '#cc2f00',
          500: '#ac0404',
        },
        blue: {
          100: '#77aaff',
          200: '#99ccff',
          300: '#bbeeff',
          400: '#5588ff',
          500: '#3366ff',
        },
      },
      backgroundColor: {
        primary: {
          DEFAULT: '#f4c430',
          100: '#FFAC1C',
          200: '#E49B0F',
        },
        secondary: colors.blue[500],
        info: '#99ccff',
        warning: '#cc2f00',
        danger: '#ac0404',
        light: '#f8f9fa',
        dark: '#212529',
        success: colors.green[700],
      },
      borderColor: {
        primary: {
          DEFAULT: '#f9c64e',
          300: colors.yellow[300],
          400: colors.yellow[400],
        },
      },
    },
    styles: ['./src/styles/main.scss'],
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        input: {
          '@apply bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3':
            {},
          '&:focus': {
            'outline-offset': '0px',
            'outline-color': colors.yellow[400],
          },
        },
        textarea: {
          '@apply bg-gray-200 text-gray-700 border  border-gray-300 rounded py-2 px-3':
            {},
          '&:focus': {
            'outline-offset': '0px',
            'outline-color': colors.yellow[400],
          },
        },
        'input:text-gray': {
          color: colors.gray,
        },
        span: {
          'font-size': '1rem',
          'line-height': '1rem',
          color: colors.gray[700],
        },
        a: {
          color: colors.gray[600],
          'font-weight': 700,
          'font-size': '0.875rem',
          'line-height': '1.25rem',
          display: 'inline-block',
          'vertical-align': 'baseline',
          '&:hover': {
            color: colors.gray[800],
          },
          '&:active': {
            color: colors.gray[800],
          },
        },
        form: {
          '@apply p-4 border rounded-md border border-gray-300 shadow-md': {},
        },
        select: {
          borderRadius: borderRadius.md,
        },
      })
    },
  ],
}

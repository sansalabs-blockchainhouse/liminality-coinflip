/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        // eslint-disable-next-line prettier/prettier
        'body': 'Nunito Sans, sans-serif',
        // eslint-disable-next-line prettier/prettier
        'text': 'Nunito Sans, sans-serif'
      },
      colors: {
        highlight: '#ff00b2',
        hoverColor: '#f1af09',
        brand: {
          'light-blue': 'var(--brand-blue)',
          'dark-blue': 'var(--brand-dark-blue)',
          pink: 'var(--brand-pink)',
          purple: '#000'
        }
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(178.69deg, #001432 3%, #000B1D 98.79%)',
        'red-gradient': 'linear-gradient(94.19deg, #FFFFFF 17.55%, #E61464 76.27%)',
        'list-gradient': 'linear-gradient(180deg, #001432 0%, rgba(0, 20, 50, 0) 100%)',
        'border-gradient':
          'linear-gradient( 90deg, rgba(230,20,100,0), rgba(230,20,100,1), rgba(230,20,100,0) )',
        'recent-gradient': 'linear-gradient(90deg, #ff00b2 0%, #F6BCF0 100%)',
        'button-gradient': 'linear-gradient(180deg, rgba(230, 20, 100, 0) 10.44%, #E61464 83.55%)',
        'connect-gradient': 'linear-gradient(89.93deg, #FEC53C 0.06%, #ED8E47 99.11%)'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
};

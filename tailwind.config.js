/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        header: '600px',
      },
      height: {
        cart: 'calc(100vh - 182.39px)',
        detailModal: 'calc(100vh - 104px)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

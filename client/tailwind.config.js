/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                'sans': [ ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
}


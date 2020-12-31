const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        // classes that are generated dynamically, e.g. `rounded-${size}` and must
        // be kept
        safeList: [],
        content: [
            './index.html',
            './src/**/*.vue',
            './src/**/*.js',
            // etc.
        ],
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
    theme: {
        extend: {
            fontWeight: ['hover', 'focus'],
            fontFamily: {
                sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
            },
            colors: {
                reisishot: {
                    DEFAULT: '#27ae60',
                    light: '#2ecc71'
                }
            }
        },
    },
}

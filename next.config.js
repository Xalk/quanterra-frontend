const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
    i18n: {
        locales: ['en', 'ua'],
        defaultLocale: 'en',
        // localeDetection: false
    },
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    compiler: {
        styledComponents: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
        '@mui/material': {
            transform: '@mui/material/{{member}}',
        }
    }
}

const path = require('path')

const { sources } = require('next/dist/compiled/webpack/webpack')

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  staticPageGenerationTimeout: 60 * 10,
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
}

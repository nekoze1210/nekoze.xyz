const path = require('path')

const { sources } = require('next/dist/compiled/webpack/webpack')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'blog.nekoze.xyz',
          },
        ],
        destination: '/posts/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/posts/:path*',
        destination: 'https://blog.nekoze.xyz/:path*',
        permanent: false,
        basePath: false,
      },
    ]
  },
}

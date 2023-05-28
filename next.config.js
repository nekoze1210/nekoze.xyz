const path = require('path')

const { sources } = require('next/dist/compiled/webpack/webpack')

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  // output: 'export',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  staticPageGenerationTimeout: 60 * 10,
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: process.env.BLOG_SITE_URL,
  //         },
  //       ],
  //       destination: '/posts/:path*',
  //     },
  //   ]
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/posts/:path*',
  //       destination: `${process.env.BLOG_SITE_URL}/posts/:path*`,
  //       permanent: false,
  //       basePath: false,
  //     },
  //   ]
  // },
}

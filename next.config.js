/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    ...nextConfig,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true, // This makes it a 308 permanent redirect
        },
      ];
    },
  };
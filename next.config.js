/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [`${process.env.CUSTOM_AWS_S3_BUCKET_NAME}.s3.amazonaws.com`],
  },
}

module.exports = nextConfig

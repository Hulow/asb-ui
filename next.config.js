/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ASB_BASE_URL: process.env.ASB_BASE_URL,
    ASB_KEY_URL: process.env.ASB_KEY_URL,
    CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

module.exports = nextConfig;

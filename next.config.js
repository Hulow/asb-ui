/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ASB_BASE_URL: process.env.NEXT_PUBLIC_ASB_BASE_URL,
    NEXT_PUBLIC_ASB_KEY_URL: process.env.NEXT_PUBLIC_ASB_KEY_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_API_SECRET:
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  asbBaseUrl: process.env.NEXT_PUBLIC_ASB_BASE_URL,
  asbKeyUrl: process.env.NEXT_PUBLIC_ASB_KEY_URL,
};

export default nextConfig;

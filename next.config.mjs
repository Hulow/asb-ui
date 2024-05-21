/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    asbBaseUrl: process.env.ASB_BASE_URL,
    asbKeyUrl: process.env.ASB_KEY_URL,
  },
};

export default nextConfig;

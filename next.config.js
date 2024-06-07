require('dotenv').config();
module.exports = {
  // Your Next.js config options...
  reactStrictMode: true,

  // Define public runtime variables
  env: {
    NEXT_PUBLIC_ASB_BASE_URL: process.env.NEXT_PUBLIC_ASB_BASE_URL,
    NEXT_PUBLIC_ASB_KEY_URL: process.env.NEXT_PUBLIC_ASB_KEY_URL,
  },
};

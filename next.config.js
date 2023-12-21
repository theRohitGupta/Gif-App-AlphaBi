/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
      // Environment Variables
  env: {
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    GIPHY_API_KEY: process.env.GIPHY_API_KEY,
    NEXT_PUBLIC_GIPHY_API_URL: process.env.NEXT_PUBLIC_GIPHY_API_URL,
  },
}

module.exports = nextConfig

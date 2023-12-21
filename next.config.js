/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        firebaseKey: process.env.FIREBASE_KEY,
      },    
}

module.exports = nextConfig

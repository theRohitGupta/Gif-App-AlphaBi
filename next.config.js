/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        firebaseKey: process.env.FIREBASE_KEY,
        giphyApiKey: process.env.GIPHY_API_KEY,
        giphyApiUrl: process.env.GIPHY_API_URL,
      },    
}

module.exports = nextConfig

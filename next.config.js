/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    }
  }
}

module.exports = nextConfig 
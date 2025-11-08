/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only ignore ESLint during builds in production, not development
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // Only ignore TypeScript errors during builds in production, not development
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
  },
  // Add experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig

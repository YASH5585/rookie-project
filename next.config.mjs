/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  compress: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "recharts",
      "@react-three/drei"
    ]
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Career Intelligence Portfolio',
    NEXT_PUBLIC_VERSION: '1.0.0',
  }
};

export default nextConfig;
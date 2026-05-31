/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier"],
};

module.exports = nextConfig;
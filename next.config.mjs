/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: "aware-mallard-516.convex.cloud"
      }
    ]
  }
};

export default nextConfig;

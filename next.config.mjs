/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep preview HMR from overwriting production chunks during validation.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  images: {
    // Next 16 will require declaring the quality values used by next/image.
    qualities: [75, 90, 92],
  },
};

export default nextConfig;

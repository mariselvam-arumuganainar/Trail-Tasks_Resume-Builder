/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify will handle this automatically
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;

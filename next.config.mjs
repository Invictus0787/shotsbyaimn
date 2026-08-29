/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add remote hosts here if you ever load images from an external CDN.
      // Example:
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

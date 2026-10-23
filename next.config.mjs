/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the whole site is prerendered to plain HTML/CSS/JS so it can
  // be served straight off Cloudflare Pages (no server runtime required).
  output: "export",
  trailingSlash: true,
  images: {
    // No Next.js image optimizer in a static export.
    unoptimized: true,
  },
};

export default nextConfig;

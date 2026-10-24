/** @type {import('next').NextConfig} */
// Set NEXT_PUBLIC_BASE_PATH when the site is published as a GitHub Pages
// *project* site (https://<user>.github.io/<repo>/). Leave it empty for a
// user/apex site so every asset stays at the domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  // Pure static export: everything is prerendered to HTML/CSS/JS so it can be
  // served from any static host (GitHub Pages, Cloudflare Pages, Vercel, R2).
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // No image optimizer in a static export.
    unoptimized: true,
  },
};

export default nextConfig;

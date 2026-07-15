/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_EXPORT === 'true' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // TODO: When deploying to Cloudflare Pages + Functions with adapter:
  // Integrate @cloudflare/next-on-pages or confirm direct support.
  // Edge runtime can be specified per route handler via `export const runtime = 'edge';`
  experimental: {
    // Example placeholders:
    // serverActions: true,
  }
};
export default nextConfig;
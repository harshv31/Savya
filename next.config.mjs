// Static export for GitHub Pages is enabled only when DEPLOY_TARGET=gh-pages
// (set by the deploy workflow). Local `npm run dev` / `npm run build` are
// unaffected, so all dynamic features stay available for other hosts.
const isPages = process.env.DEPLOY_TARGET === 'gh-pages';
const repo = 'Savya'; // GitHub Pages serves the site at /<repo>/

// Expose the base path to client code (used by lib/images.ts to prefix local
// image paths). Single source of truth: the `repo` constant above.
if (isPages) process.env.NEXT_PUBLIC_BASE_PATH = `/${repo}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // GitHub Pages has no image-optimization server, so serve images as-is.
    unoptimized: isPages,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  ...(isPages && {
    output: 'export',
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
    trailingSlash: true,
  }),
};

export default nextConfig;

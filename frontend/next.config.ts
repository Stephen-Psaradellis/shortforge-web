import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A stray lockfile higher up the tree otherwise makes Next guess the wrong root.
  outputFileTracingRoot: process.cwd(),
  // The OG image reads static TTFs at request time; make sure they ship with the function.
  outputFileTracingIncludes: {
    '/opengraph-image': ['./src/assets/fonts/**/*'],
    '/twitter-image': ['./src/assets/fonts/**/*'],
  },
  async redirects() {
    return [
      { source: '/services', destination: '/automation', permanent: true },
      { source: '/work', destination: '/work/chicago-street-markets', permanent: false },
    ];
  },
};

export default nextConfig;

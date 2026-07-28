import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    qualities: [40, 60, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920]
  },
  async redirects() {
    return [
      {
        source: '/:locale/blog',
        destination: '/:locale/guides',
        permanent: true,
      },
      // Specific slug rename must come before the generic blog->guides passthrough.
      {
        source: '/:locale/blog/bail-process-in-india',
        destination: '/:locale/guides/bail-process-in-lucknow-courts',
        permanent: true,
      },
      {
        source: '/:locale/blog/:slug',
        destination: '/:locale/guides/:slug',
        permanent: true,
      },
    ];
  }
};

export default withNextIntl(nextConfig);

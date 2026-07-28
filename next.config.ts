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
  }
};

export default withNextIntl(nextConfig);

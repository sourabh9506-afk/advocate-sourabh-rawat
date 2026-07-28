const fs = require('fs')
const path = require('path')

const LOCALES = ['en', 'hi']
const PRACTICE_AREAS = ['criminal-law', 'civil-law', 'family-law', 'police-station']
const LOCATIONS = ['madiyaon-chamber', 'kaiserbagh-chamber', 'district-court-lucknow', 'high-court-lucknow-bench']

// Mirrors src/lib/routes.ts (kept in plain JS here since next-sitemap.config.js
// runs in plain Node, not through the Next.js/TS toolchain). Both read the same
// content/ directories, so the two can't drift apart in practice.
function getSlugsFromDir(dirName) {
  const contentDir = path.join(process.cwd(), 'content', dirName)
  if (!fs.existsSync(contentDir)) return []

  const slugs = new Set()
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.md')) continue
    const segments = file.replace(/\.md$/, '').split('.')
    if (segments.length > 1) segments.pop()
    slugs.add(segments.join('.'))
  }
  return Array.from(slugs)
}

const PUBLIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/guides',
  '/services',
  ...PRACTICE_AREAS.map((area) => `/practice-areas/${area}`),
  ...LOCATIONS.map((slug) => `/locations/${slug}`),
  ...getSlugsFromDir('guides').map((slug) => `/guides/${slug}`),
  ...getSlugsFromDir('services').map((slug) => `/services/${slug}`),
]

function priorityFor(publicPath) {
  if (publicPath === '/') return 1.0
  if (publicPath === '/about' || publicPath === '/contact') return 0.8
  if (publicPath.startsWith('/practice-areas/')) return 0.8
  if (publicPath.startsWith('/services/')) return 0.85
  if (publicPath.startsWith('/locations/')) return 0.8
  if (publicPath.startsWith('/guides/')) return 0.75
  return 0.7
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://advocatelucknow.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  additionalPaths: async () => {
    const lastmod = new Date().toISOString()

    return PUBLIC_PATHS.flatMap((publicPath) =>
      LOCALES.map((locale) => ({
        loc: `/${locale}${publicPath === '/' ? '' : publicPath}`,
        changefreq: 'weekly',
        priority: priorityFor(publicPath),
        lastmod,
        alternateRefs: [
          ...LOCALES.map((altLocale) => ({
            href: `https://advocatelucknow.in/${altLocale}${publicPath === '/' ? '' : publicPath}`,
            hreflang: altLocale === 'en' ? 'en-IN' : 'hi-IN',
            hrefIsAbsolute: true,
          })),
          {
            href: `https://advocatelucknow.in/en${publicPath === '/' ? '' : publicPath}`,
            hreflang: 'x-default',
            hrefIsAbsolute: true,
          },
        ],
      }))
    )
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}

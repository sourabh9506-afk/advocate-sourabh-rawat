/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://advocatelucknow.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  additionalPaths: async (config) => {
    const paths = [
      '/en',
      '/hi',
      '/en/about',
      '/hi/about',
      '/en/contact',
      '/hi/contact',
      '/en/practice-areas/criminal-law',
      '/hi/practice-areas/criminal-law',
      '/en/practice-areas/civil-law',
      '/hi/practice-areas/civil-law',
      '/en/practice-areas/family-law',
      '/hi/practice-areas/family-law',
      '/en/practice-areas/police-station',
      '/hi/practice-areas/police-station',
    ]

    return paths.map((path) => ({
      loc: path,
      changefreq: 'weekly',
      priority:
        path === '/en' || path === '/hi' ? 1.0
        : path.includes('about') || path.includes('contact') ? 0.8
        : path.includes('practice-areas') ? 0.8
        : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://advocatelucknow.in${path.replace(/^\/(en|hi)/, '/en')}`,
          hreflang: 'en-IN',
        },
        {
          href: `https://advocatelucknow.in${path.replace(/^\/(en|hi)/, '/hi')}`,
          hreflang: 'hi-IN',
        },
      ],
    }))
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}

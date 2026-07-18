module.exports = {
  siteUrl: 'https://advocatesourabhrawat.in',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  alternateRefs: [
    { href: 'https://advocatesourabhrawat.in/en', hreflang: 'en-IN' },
    { href: 'https://advocatesourabhrawat.in/hi', hreflang: 'hi-IN' },
  ],
  priority: 0.7,
  changefreq: 'weekly',
  transform: async (config, path) => {
    if (path.includes('/blog/') && !path.endsWith('/blog')) {
      return { loc: path, priority: 0.9, changefreq: 'monthly' }
    }
    if (path === '/en' || path === '/hi') {
      return { loc: path, priority: 1.0, changefreq: 'weekly' }
    }
    return { loc: path, priority: 0.7, changefreq: 'weekly' }
  }
}

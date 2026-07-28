import fs from 'fs';
import path from 'path';

function getSlugsFromDir(dirName: string): string[] {
  const contentDir = path.join(process.cwd(), 'content', dirName);
  if (!fs.existsSync(contentDir)) return [];

  const slugs = new Set<string>();
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.md')) continue;
    // Filename format: slug.locale.md (e.g. bail-process-in-india.en.md)
    const segments = file.replace(/\.md$/, '').split('.');
    if (segments.length > 1) segments.pop();
    slugs.add(segments.join('.'));
  }
  return Array.from(slugs);
}

const PRACTICE_AREAS = ['criminal-law', 'civil-law', 'family-law', 'police-station'];
const LOCATIONS = ['madiyaon-chamber', 'kaiserbagh-chamber', 'district-court-lucknow', 'high-court-lucknow-bench'];

export const PUBLIC_PATHS: string[] = [
  '/',
  '/about',
  '/contact',
  '/guides',
  '/services',
  ...PRACTICE_AREAS.map((area) => `/practice-areas/${area}`),
  ...LOCATIONS.map((slug) => `/locations/${slug}`),
  ...getSlugsFromDir('guides').map((slug) => `/guides/${slug}`),
  ...getSlugsFromDir('services').map((slug) => `/services/${slug}`),
];

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'guides');

export interface GuideFaq {
  q: string;
  a: string;
}

export type GuideTopic = 'Criminal' | 'Family' | 'Civil';

export interface Guide {
  slug: string;
  locale: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  reviewedBy: string;
  topic: GuideTopic;
  faqs: GuideFaq[];
  related: string[];
  content: string;
}

function readGuideFiles(): { file: string; slug: string; locale: string }[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      // Filename format: slug.locale.md (e.g. how-to-file-fir-in-lucknow.en.md)
      const segments = file.replace(/\.md$/, '').split('.');
      const locale = segments.length > 1 ? (segments.pop() as string) : 'en';
      const slug = segments.join('.');
      return { file, slug, locale };
    });
}

export function getAllGuideSlugs(): string[] {
  const slugs = new Set<string>();
  for (const { slug } of readGuideFiles()) {
    slugs.add(slug);
  }
  return Array.from(slugs);
}

export function getAllGuides(locale: string): Guide[] {
  return readGuideFiles()
    .filter((entry) => entry.locale === locale)
    .map((entry) => getGuideBySlug(entry.slug, entry.locale) as Guide)
    .filter((guide): guide is Guide => guide !== null)
    .sort((a, b) => a.h1.localeCompare(b.h1));
}

export function getGuideBySlug(slug: string, locale: string): Guide | null {
  const fullPath = path.join(contentDir, `${slug}.${locale}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    locale,
    title: data.title || '',
    description: data.description || '',
    h1: data.h1 || '',
    updated: data.updated || '',
    reviewedBy: data.reviewedBy || 'Adv. Sourabh Rawat',
    topic: (data.topic || 'Criminal') as GuideTopic,
    faqs: data.faqs || [],
    related: data.related || [],
    content,
  };
}

/** True if an English-locale guide file exists for this slug (used for the /hi fallback). */
export function hasEnglishFallback(slug: string): boolean {
  return fs.existsSync(path.join(contentDir, `${slug}.en.md`));
}

/** Extract H2 headings from markdown body to build a table of contents. */
export function extractHeadings(content: string): { text: string; slug: string }[] {
  const lines = content.split('\n');
  const headings: { text: string; slug: string }[] = [];
  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const text = match[1].trim();
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ text, slug });
    }
  }
  return headings;
}

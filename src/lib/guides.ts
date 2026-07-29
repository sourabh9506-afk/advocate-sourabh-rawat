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

/**
 * Turn heading text into a URL anchor.
 *
 * Unicode-aware on purpose. The previous version used `[^\w\s-]`, and `\w`
 * without the `u` flag means [A-Za-z0-9_] — so every Devanagari character was
 * stripped and the Hindi guides collapsed to duplicate anchors ('-' x3,
 * '-fir-' x3), breaking their tables of contents.
 *
 * \p{M} (combining marks) matters as much as \p{L} here: Devanagari vowel signs
 * are marks, not letters, so \p{L}\p{N} alone mangles गाइड -> गइड. Keeping marks
 * gives readable anchors: यह-गाइड-किसके-लिए-है.
 *
 * Single source of truth: the guide page imports this so the TOC links and the
 * rendered heading ids cannot drift apart. Do not re-implement it elsewhere.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract H2 headings from markdown body to build a table of contents.
 * Anchors are de-duplicated (`foo`, `foo-2`, ...) so two headings that reduce
 * to the same slug still get unique, stable ids.
 */
export function extractHeadings(content: string): { text: string; slug: string }[] {
  const lines = content.split('\n');
  const headings: { text: string; slug: string }[] = [];
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const text = match[1].trim();
      const base = slugifyHeading(text) || 'section';
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      headings.push({ text, slug: count === 0 ? base : `${base}-${count + 1}` });
    }
  }
  return headings;
}

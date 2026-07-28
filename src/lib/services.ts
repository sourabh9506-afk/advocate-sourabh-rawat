import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'services');

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  locale: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  related: string[];
  faqs: ServiceFaq[];
  content: string;
}

function readServiceFiles(): { file: string; slug: string; locale: string }[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      // Filename format: slug.locale.md (e.g. bail-lawyer-in-lucknow.en.md)
      const segments = file.replace(/\.md$/, '').split('.');
      const locale = segments.length > 1 ? (segments.pop() as string) : 'en';
      const slug = segments.join('.');
      return { file, slug, locale };
    });
}

export function getAllServiceSlugs(): string[] {
  const slugs = new Set<string>();
  for (const { slug } of readServiceFiles()) {
    slugs.add(slug);
  }
  return Array.from(slugs);
}

export function getAllServices(locale: string): ServicePage[] {
  return readServiceFiles()
    .filter((entry) => entry.locale === locale)
    .map((entry) => getServiceBySlug(entry.slug, entry.locale) as ServicePage)
    .filter((service): service is ServicePage => service !== null);
}

export function getServiceBySlug(slug: string, locale: string): ServicePage | null {
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
    related: data.related || [],
    faqs: data.faqs || [],
    content,
  };
}

/** True if an English-locale service file exists for this slug (used for the /hi fallback). */
export function hasEnglishFallback(slug: string): boolean {
  return fs.existsSync(path.join(contentDir, `${slug}.en.md`));
}

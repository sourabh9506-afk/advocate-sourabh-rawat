import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  locale: string;
  author?: string;
}

export function getAllPosts(locale: string): BlogPost[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Filename format: slug.locale.md or slug.md
      // We expect filenames like: bail-process-in-india.en.md
      const segments = file.replace(/\.md$/, '').split('.');
      const postLocale = segments.length > 1 ? segments.pop() : 'en';
      const slug = segments.join('.');

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || 'Adv. Sourabh Rawat',
        locale: postLocale || 'en',
        content
      };
    })
    .filter(post => post.locale === locale)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const posts = getAllPosts(locale);
  return posts.find(post => post.slug === slug) || null;
}

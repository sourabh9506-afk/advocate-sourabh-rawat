import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const posts = getAllPosts(locale);
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};
  
  const siteUrl = 'https://advocatesourabhrawat.in';
  const path = `/${locale}/blog/${slug}`;

  return {
    title: `${post.title} | Advocate Sourabh Rawat`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${siteUrl}${path}`,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }]
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatesourabhrawat.in/${locale}` },
    { name: 'Legal Blog', url: `https://advocatesourabhrawat.in/${locale}/blog` },
    { name: post.title, url: `https://advocatesourabhrawat.in/${locale}/blog/${slug}` }
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Advocate Sourabh Rawat",
      "logo": {
        "@type": "ImageObject",
        "url": "https://advocatesourabhrawat.in/images/og-image.jpg"
      }
    }
  };

  return (
    <main className="bg-cream min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div className="bg-navy text-white pt-20 md:pt-32 pb-10 md:pb-16 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-sm font-semibold mb-8">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-white/70 uppercase tracking-wider">
              <div className="flex items-center gap-2"><Calendar size={16} className="text-gold" /> {post.date}</div>
              <div className="flex items-center gap-2"><User size={16} className="text-gold" /> {post.author}</div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-12 mt-8 md:mt-12">
        <ScrollReveal>
          <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-p:text-dark/80 prose-li:text-dark/80">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </ScrollReveal>
      </div>
    </main>
  );
}

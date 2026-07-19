import { getAllPosts } from '@/lib/blog';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { ArrowRight, Calendar, User } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = 'https://advocatelucknow.in';
  
  return {
    title: 'Legal Blog & Insights | Advocate Sourabh Rawat',
    description: 'Read the latest legal insights, case analyses, and updates on Indian law by Advocate Sourabh Rawat.',
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        'en-IN': `${siteUrl}/en/blog`,
        'hi-IN': `${siteUrl}/hi/blog`,
        'x-default': `${siteUrl}/en/blog`,
      }
    }
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatelucknow.in/${locale}` },
    { name: 'Legal Blog', url: `https://advocatelucknow.in/${locale}/blog` }
  ]);

  return (
    <main className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="bg-navy text-white pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <ScrollReveal>
            <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-4">Insights</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">Legal <span className="gold">Blog</span></h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Updates, legal analysis, and practical insights on the Indian judicial system.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-12 md:py-24 px-4 md:px-12 max-w-5xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center text-dark/60 py-12">
            <p>No blog posts found for this language yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post, idx) => (
              <ScrollReveal key={post.slug} delay={idx * 0.1}>
                <div className="bg-white border border-dark/10 rounded-lg p-8 shadow-[0_4px_24px_rgba(27,42,74,0.04)] h-full flex flex-col transition-all hover:shadow-[0_8px_32px_rgba(27,42,74,0.08)] hover:-translate-y-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4 line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="flex items-center gap-4 text-xs font-semibold text-dark/45 uppercase tracking-wider mb-6">
                    <div className="flex items-center gap-1"><Calendar size={14} className="text-gold" /> {post.date}</div>
                    <div className="flex items-center gap-1"><User size={14} className="text-gold" /> {post.author}</div>
                  </div>
                  <p className="text-dark/70 text-sm leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-gold font-bold text-sm hover:text-gold-dark transition-colors mt-auto">
                    Read Full Article <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

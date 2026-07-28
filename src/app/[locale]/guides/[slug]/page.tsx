import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getTranslations } from 'next-intl/server';
import { getGuideBySlug, getAllGuideSlugs, hasEnglishFallback, extractHeadings } from '@/lib/guides';
import { getServiceBySlug } from '@/lib/services';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import LegalDisclaimer from '@/components/shared/LegalDisclaimer';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

function resolveGuide(locale: string, slug: string) {
  const guide = getGuideBySlug(slug, locale);
  if (guide) return { guide, isFallback: false };

  if (locale !== 'en' && hasEnglishFallback(slug)) {
    const fallback = getGuideBySlug(slug, 'en');
    if (fallback) return { guide: fallback, isFallback: true };
  }

  return { guide: null, isFallback: false };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const { guide } = resolveGuide(locale, slug);
  if (!guide) return {};

  const siteUrl = 'https://advocatelucknow.in';
  const path = `/${locale}/guides/${slug}`;

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'en-IN': `${siteUrl}/en/guides/${slug}`,
        'hi-IN': `${siteUrl}/hi/guides/${slug}`,
        'x-default': `${siteUrl}/en/guides/${slug}`,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url: `${siteUrl}${path}`,
      modifiedTime: guide.updated,
      images: [{
        url: 'https://advocatelucknow.in/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Advocate Sourabh Rawat — High Court Lucknow',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://advocatelucknow.in/images/og-image.jpg'],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const { guide, isFallback } = resolveGuide(locale, slug);

  if (!guide) {
    notFound();
  }

  const common = await getTranslations({ locale, namespace: 'common' });
  const siteUrl = 'https://advocatelucknow.in';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteUrl}/${locale}` },
    { name: 'Legal Guides', url: `${siteUrl}/${locale}/guides` },
    { name: guide.h1, url: `${siteUrl}/${locale}/guides/${slug}` },
  ]);
  const faqSchema = generateFAQSchema(guide.faqs);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    dateModified: guide.updated,
    inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
    author: { '@id': `${siteUrl}/#person` },
    publisher: { '@id': siteUrl },
  };

  const toc = extractHeadings(guide.content);
  const relatedServices = guide.related
    .map((relSlug) => getServiceBySlug(relSlug, 'en'))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="sec-full subpage-hero" style={{ background: 'var(--navy)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-gold transition-colors">Legal Guides</Link>
              <span>/</span>
              <span className="text-white/80">{guide.h1}</span>
            </div>
            <p className="sec-label">Legal Guide</p>
            <h1 className="sec-title" style={{ color: 'var(--white)', fontSize: '48px', marginBottom: '16px' }}>{guide.h1}</h1>
            <p className="text-sm text-white/60">
              Last reviewed: {guide.updated} · Reviewed by {guide.reviewedBy}, Advocate, High Court Lucknow Bench
            </p>
          </ScrollReveal>
        </div>
      </div>

      {isFallback && (
        <div className="bg-gold/10 border-b border-gold/20 py-3 px-4 text-center">
          <p className="text-sm text-navy/70">हिंदी संस्करण जल्द आएगा। (Hindi version coming soon.)</p>
        </div>
      )}

      <section className="practice-area-body">
        <div className="practice-area-grid">
          <div>
            <ScrollReveal>
              <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-p:text-dark/80 prose-li:text-dark/80 prose-table:text-sm">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => {
                      const text = String(children);
                      return <h2 id={slugify(text)}>{children}</h2>;
                    },
                  }}
                >
                  {guide.content}
                </ReactMarkdown>
              </article>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="practice-area-sidebar-card">
              {toc.length > 0 && (
                <div className="mb-8">
                  <h3 className="sec-title" style={{ fontSize: '18px', marginBottom: '12px' }}>In This Guide</h3>
                  <nav className="flex flex-col gap-2">
                    {toc.map((item) => (
                      <a
                        key={item.slug}
                        href={`#${item.slug}`}
                        className="text-sm text-dark/70 hover:text-gold transition-colors"
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
              <div className="border-t border-dark/10 pt-6">
                <h3 className="sec-title" style={{ fontSize: '20px', marginBottom: '12px' }}>Need Help With This?</h3>
                <p className="sec-sub" style={{ marginBottom: '20px', fontSize: '14px' }}>
                  Direct consultation with Advocate Sourabh Rawat.
                </p>
                <Link href="/contact" className="btn-gold w-full justify-center mb-4">
                  {common('bookConsultation')} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {guide.faqs.length > 0 && (
        <section className="bg-cream py-20">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-gold text-sm uppercase tracking-wide">{common('faqLabel')}</span>
                <h2 className="text-3xl font-serif text-navy mt-2">{guide.h1} — {common('faqHeading')}</h2>
              </div>
              <FAQAccordion items={guide.faqs} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="bg-white py-10 border-t border-dark-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-dark-50 uppercase tracking-wide mb-5">
              {locale === 'hi' ? 'संबंधित सेवाएं' : 'Need Help With This? See Our Services'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/50 text-navy font-medium text-sm rounded hover:bg-gold hover:text-white hover:border-gold transition-all"
                >
                  {service.h1} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <LegalDisclaimer />
    </main>
  );
}

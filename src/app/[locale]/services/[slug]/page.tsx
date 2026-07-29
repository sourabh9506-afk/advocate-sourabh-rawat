import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getServiceBySlug, getAllServiceSlugs, hasEnglishFallback } from '@/lib/services';
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from '@/lib/schema';
import { BUSINESS } from '@/lib/business';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import LegalDisclaimer from '@/components/shared/LegalDisclaimer';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

function resolveService(locale: string, slug: string) {
  const service = getServiceBySlug(slug, locale);
  if (service) return { service, isFallback: false };

  if (locale !== 'en' && hasEnglishFallback(slug)) {
    const fallback = getServiceBySlug(slug, 'en');
    if (fallback) return { service: fallback, isFallback: true };
  }

  return { service: null, isFallback: false };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { service } = resolveService(locale, slug);
  if (!service) return {};

  const siteUrl = 'https://advocatelucknow.in';
  const path = `/${locale}/services/${slug}`;

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'en-IN': `${siteUrl}/en/services/${slug}`,
        'hi-IN': `${siteUrl}/hi/services/${slug}`,
        'x-default': `${siteUrl}/en/services/${slug}`,
      },
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `${siteUrl}${path}`,
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

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { service, isFallback } = resolveService(locale, slug);

  if (!service) {
    notFound();
  }

  const common = await getTranslations({ locale, namespace: 'common' });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatelucknow.in/${locale}` },
    { name: 'Services', url: `https://advocatelucknow.in/${locale}/services` },
    { name: service.h1, url: `https://advocatelucknow.in/${locale}/services/${slug}` },
  ]);
  const faqSchema = generateFAQSchema(service.faqs);
  const serviceSchema = generateServiceSchema(service.h1);

  const waLink = `https://wa.me/${BUSINESS.phone.wa}?text=${encodeURIComponent(`Namaste, I need help regarding ${service.h1}`)}`;

  return (
    <main className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="sec-full subpage-hero" style={{ background: 'var(--navy)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
              <span>/</span>
              <span className="text-white/80">{service.h1}</span>
            </div>
            <p className="sec-label">Service</p>
            <h1 className="sec-title subpage-h1" style={{ color: 'var(--white)', marginBottom: '16px' }}>{service.h1}</h1>
            <p className="sec-sub subpage-lede" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '700px' }}>{service.description}</p>
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
              <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-p:text-dark/80 prose-li:text-dark/80">
                <ReactMarkdown>{service.content}</ReactMarkdown>
              </article>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="practice-area-sidebar-card">
              <h3 className="sec-title card-h3" style={{ marginBottom: '16px' }}>Consult on This Matter</h3>
              <p className="sec-sub card-text" style={{ marginBottom: '32px' }}>
                Direct consultation with Advocate Sourabh Rawat. Fee discussed transparently before engagement.
              </p>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold w-full justify-center mb-4">
                {common('whatsappNow')} <ArrowRight size={18} />
              </a>
              <a href={`tel:${BUSINESS.phone.tel}`} className="btn-navy w-full justify-center">
                {common('callDirectly')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="bg-cream py-20">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-gold text-sm uppercase tracking-wide">{common('faqLabel')}</span>
                <h2 className="text-3xl font-serif text-navy mt-2">{service.h1} — {common('faqHeading')}</h2>
              </div>
              <FAQAccordion items={service.faqs} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {service.related.length > 0 && (
        <section className="bg-white py-10 border-t border-dark-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-dark-50 uppercase tracking-wide mb-5">
              {locale === 'hi' ? 'संबंधित सेवाएं' : 'Related Services'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {service.related.map((relatedSlug) => {
                const relatedService = getServiceBySlug(relatedSlug, 'en');
                if (!relatedService) return null;
                return (
                  <Link
                    key={relatedSlug}
                    href={`/services/${relatedSlug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/50 text-navy font-medium text-sm rounded hover:bg-gold hover:text-white hover:border-gold transition-all"
                  >
                    {relatedService.h1} <ArrowRight size={14} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <LegalDisclaimer />
    </main>
  );
}

import { getAllGuides, type GuideTopic } from '@/lib/guides';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LegalDisclaimer from '@/components/shared/LegalDisclaimer';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { ArrowRight } from 'lucide-react';

const TOPIC_ORDER: GuideTopic[] = ['Criminal', 'Family', 'Civil'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = 'https://advocatelucknow.in';

  return {
    title: 'Legal Guides | Advocate Sourabh Rawat',
    description: 'Practical, plain-language guides on FIRs, bail, divorce, maintenance, property partition and more — written by Advocate Sourabh Rawat for the general public.',
    alternates: {
      canonical: `${siteUrl}/${locale}/guides`,
      languages: {
        'en-IN': `${siteUrl}/en/guides`,
        'hi-IN': `${siteUrl}/hi/guides`,
        'x-default': `${siteUrl}/en/guides`,
      },
    },
    openGraph: {
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

export default async function GuidesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Guides are English-only until Phase 5; list the EN set regardless of locale
  // so /hi/guides isn't empty (each card links through to the fallback-rendered page).
  const guides = getAllGuides('en');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatelucknow.in/${locale}` },
    { name: 'Legal Guides', url: `https://advocatelucknow.in/${locale}/guides` },
  ]);

  const grouped = TOPIC_ORDER.map((topic) => ({
    topic,
    items: guides.filter((g) => g.topic === topic),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-navy text-white pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <ScrollReveal>
            <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-4">Legal Guides</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">Legal <span className="gold">Guides</span></h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Plain-language explainers on FIRs, bail, divorce, maintenance, property and more — written and reviewed
              by Advocate Sourabh Rawat to help you understand the process before you need a lawyer.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-12 md:py-24 px-4 md:px-12 max-w-5xl mx-auto">
        {guides.length === 0 ? (
          <div className="text-center text-dark/60 py-12">
            <p>Guides coming soon.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map((group) => (
              <div key={group.topic}>
                <h2 className="font-serif text-2xl font-bold text-navy mb-8 pb-3 border-b border-gold/30">
                  {group.topic} Law
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {group.items.map((guide, idx) => (
                    <ScrollReveal key={guide.slug} delay={idx * 0.05}>
                      <div className="bg-white border border-dark/10 rounded-lg p-8 shadow-[0_4px_24px_rgba(27,42,74,0.04)] h-full flex flex-col transition-all hover:shadow-[0_8px_32px_rgba(27,42,74,0.08)] hover:-translate-y-1">
                        <h3 className="font-serif text-xl font-bold text-navy mb-3">
                          <Link href={`/guides/${guide.slug}`}>{guide.h1}</Link>
                        </h3>
                        <p className="text-dark/70 text-sm leading-relaxed mb-6 flex-grow">
                          {guide.description}
                        </p>
                        <Link href={`/guides/${guide.slug}`} className="inline-flex items-center gap-2 text-gold font-bold text-sm hover:text-gold-dark transition-colors mt-auto">
                          Read Guide <ArrowRight size={16} />
                        </Link>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <LegalDisclaimer />
    </main>
  );
}

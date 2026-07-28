import { getAllServices } from '@/lib/services';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LegalDisclaimer from '@/components/shared/LegalDisclaimer';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = 'https://advocatelucknow.in';

  return {
    title: 'Legal Services in Lucknow | Advocate Sourabh Rawat',
    description: 'Bail, anticipatory bail, FIR quashing, divorce, custody, maintenance, property disputes and more — legal services in Lucknow courts.',
    alternates: {
      canonical: `${siteUrl}/${locale}/services`,
      languages: {
        'en-IN': `${siteUrl}/en/services`,
        'hi-IN': `${siteUrl}/hi/services`,
        'x-default': `${siteUrl}/en/services`,
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

export default async function ServicesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Service pages are English-only until Phase 5; list the EN set regardless of locale
  // so /hi/services isn't empty (each card links through to the fallback-rendered page).
  const services = getAllServices('en');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatelucknow.in/${locale}` },
    { name: 'Services', url: `https://advocatelucknow.in/${locale}/services` },
  ]);

  return (
    <main className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-navy text-white pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <ScrollReveal>
            <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-4">Legal Services</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">Services in <span className="gold">Lucknow</span></h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Specific legal matters handled by Advocate Sourabh Rawat across District Court Lucknow and the High Court Lucknow Bench.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-12 md:py-24 px-4 md:px-12 max-w-5xl mx-auto">
        {services.length === 0 ? (
          <div className="text-center text-dark/60 py-12">
            <p>Service pages coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <ScrollReveal key={service.slug} delay={idx * 0.05}>
                <div className="bg-white border border-dark/10 rounded-lg p-8 shadow-[0_4px_24px_rgba(27,42,74,0.04)] h-full flex flex-col transition-all hover:shadow-[0_8px_32px_rgba(27,42,74,0.08)] hover:-translate-y-1">
                  <h2 className="font-serif text-xl font-bold text-navy mb-3">
                    <Link href={`/services/${service.slug}`}>{service.h1}</Link>
                  </h2>
                  <p className="text-dark/70 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-gold font-bold text-sm hover:text-gold-dark transition-colors mt-auto">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      <LegalDisclaimer />
    </main>
  );
}

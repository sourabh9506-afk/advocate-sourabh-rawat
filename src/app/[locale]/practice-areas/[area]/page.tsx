import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import { Link } from '@/i18n/routing';

const validAreas = ['criminal-law', 'civil-law', 'family-law', 'police-station'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string, area: string }> }) {
  const { locale, area } = await params;
  if (!validAreas.includes(area)) {
    return {};
  }
  
  const t = await getTranslations({ locale, namespace: `areas.${area}` });
  const siteUrl = 'https://advocatelucknow.in';
  const path = `/${locale}/practice-areas/${area}`;

  return {
    title: t('title'),
    description: t('desc'),
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'en-IN': `${siteUrl}/en/practice-areas/${area}`,
        'hi-IN': `${siteUrl}/hi/practice-areas/${area}`,
        'x-default': `${siteUrl}/en/practice-areas/${area}`,
      }
    },
    openGraph: {
      title: t('title'),
      description: t('desc'),
      url: `${siteUrl}${path}`,
      images: [{
        url: 'https://advocatelucknow.in/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Advocate Sourabh Rawat — High Court Lucknow',
      }]
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://advocatelucknow.in/images/og-image.jpg'],
    },
  };
}

export default async function PracticeAreaPage({ params }: { params: Promise<{ locale: string, area: string }> }) {
  const { locale, area } = await params;
  
  if (!validAreas.includes(area)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `areas.${area}` });
  const common = await getTranslations({ locale, namespace: 'common' });
  const areaFaqs = await getTranslations({ locale, namespace: 'areaFaq' });
  const faqItems = areaFaqs.raw(area) as { q: string; a: string }[];

  // t('title') is the full SEO <title> (includes "| Advocate Sourabh Rawat"); heading is the
  // clean keyword phrase for display use (H1, breadcrumb, WhatsApp text).
  const heading = t('title').split(' | ')[0];

  // Schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatelucknow.in/${locale}` },
    { name: 'Practice Areas', url: `https://advocatelucknow.in/${locale}#practice` },
    { name: heading, url: `https://advocatelucknow.in/${locale}/practice-areas/${area}` }
  ]);
  const faqSchema = generateFAQSchema(faqItems);

  const waLink = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246'}?text=${encodeURIComponent(`Namaste, I need help with ${heading}`)}`;

  // Convert translation list to an array properly
  // Next-intl doesn't return raw arrays easily unless we use rich formatting or specific keys,
  // but we can just map over a known length or use raw() if we defined it as an array.
  // In JSON, services is an array, we can use raw to get the array.
  const services = t.raw('services') as string[];

  // Location-specific content: criminal-law gets two chamber cards + an FIR quashing
  // explainer; family-law/civil-law get a single court-jurisdiction section.
  type LocationCard = { heading: string; content: string };
  type ListLocationSection = { title: string; content: string; matters?: string[]; areas?: string[]; note?: string };

  const criminalLocation = area === 'criminal-law'
    ? (t.raw('locationSection') as { title: string; kaiserbagh: LocationCard; madiyaon: LocationCard })
    : null;
  const firQuashSection = area === 'criminal-law'
    ? (t.raw('firQuashSection') as { title: string; content: string; steps: string[]; note: string })
    : null;
  const listLocation = (area === 'family-law' || area === 'civil-law')
    ? (t.raw('locationSection') as ListLocationSection)
    : null;
  const listLocationItems = listLocation?.matters ?? listLocation?.areas ?? [];

  // Long-tail informational guides: always-visible prose, not accordions, for crawlability.
  type SimpleGuide = { title: string; content: string };
  const bailGuide = area === 'criminal-law' ? (t.raw('bailGuide') as SimpleGuide) : null;
  const firGuide = area === 'criminal-law' ? (t.raw('firGuide') as SimpleGuide) : null;
  const divorceGuide = area === 'family-law' ? (t.raw('divorceGuide') as SimpleGuide) : null;
  const propertyGuide = area === 'civil-law' ? (t.raw('propertyGuide') as SimpleGuide) : null;
  const rightsGuide = area === 'police-station' ? (t.raw('rightsGuide') as SimpleGuide) : null;

  return (
    <main className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="sec-full subpage-hero" style={{ background: 'var(--navy)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <ScrollReveal>
            <p className="sec-label">Practice Area</p>
            <h1 className="sec-title" style={{ color: 'var(--white)', fontSize: '48px', marginBottom: '16px' }}>{heading}</h1>
            <p className="sec-sub" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '700px' }}>{t('desc')}</p>
          </ScrollReveal>
        </div>
      </div>

      <section className="practice-area-body">
        <div className="practice-area-grid">
          <div>
            <ScrollReveal>
              <h2 className="sec-title" style={{ fontSize: '32px', marginBottom: '16px' }}>Overview</h2>
              <div className="sec-line" style={{ margin: '0 0 32px 0' }}></div>
              <p className="sec-sub" style={{ maxWidth: 'none', marginBottom: '48px', color: 'var(--dark-70)' }}>
                {t('content')}
              </p>
              
              <h3 className="sec-title" style={{ fontSize: '28px', marginBottom: '24px' }}>Our Services</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {services.map((service, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <CheckCircle2 size={24} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '16px', color: 'var(--navy)', lineHeight: 1.6, fontWeight: 500 }}>{service}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="practice-area-sidebar-card">
              <h3 className="sec-title" style={{ fontSize: '24px', marginBottom: '16px' }}>Need Immediate Help?</h3>
              <p className="sec-sub" style={{ marginBottom: '32px', fontSize: '14px' }}>
                Consult Advocate Sourabh Rawat directly for honest, result-oriented legal counsel.
              </p>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold w-full justify-center mb-4">
                {common('whatsappNow')} <ArrowRight size={18} />
              </a>
              <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+919026349246'}`} className="btn-navy w-full justify-center">
                {common('callDirectly')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {criminalLocation && (
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-navy text-center mb-12">{criminalLocation.title}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {([criminalLocation.kaiserbagh, criminalLocation.madiyaon]).map((card, idx) => (
                  <div key={idx} className="bg-navy rounded-lg p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin size={22} className="text-gold flex-shrink-0" />
                      <h3 className="text-xl font-serif text-gold">{card.heading}</h3>
                    </div>
                    <p className="text-cream/80 leading-relaxed">{card.content}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {firQuashSection && (
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <h3 className="text-2xl font-serif text-navy mb-4">{firQuashSection.title}</h3>
              <p className="text-dark/80 leading-relaxed mb-8">{firQuashSection.content}</p>
              <ol className="space-y-4 mb-8">
                {firQuashSection.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-gold font-serif text-2xl font-bold flex-shrink-0 w-8">{idx + 1}</span>
                    <span className="text-dark/80 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="italic text-dark/60 text-sm">{firQuashSection.note}</p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {listLocation && (
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-navy mb-4">{listLocation.title}</h2>
              <p className="text-dark/80 leading-relaxed mb-8">{listLocation.content}</p>
              <ul className="space-y-4 mb-8">
                {listLocationItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-gold flex-shrink-0 mt-1" />
                    <span className="text-dark/80">{item}</span>
                  </li>
                ))}
              </ul>
              {listLocation.note && (
                <p className="italic text-dark/60 text-sm">{listLocation.note}</p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {bailGuide && (
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="border-l-4 border-gold pl-6">
                <h2 className="text-2xl font-serif text-navy mb-4">{bailGuide.title}</h2>
                <p className="text-dark/80 text-base leading-relaxed">{bailGuide.content}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {firGuide && (
        <section className="bg-navy py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="border-l-4 border-gold pl-6">
                <h2 className="text-2xl font-serif text-cream mb-4">{firGuide.title}</h2>
                <p className="text-cream/80 text-base leading-relaxed">{firGuide.content}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {divorceGuide && (
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="border-l-4 border-gold pl-6">
                <h2 className="text-2xl font-serif text-navy mb-4">{divorceGuide.title}</h2>
                <p className="text-dark/80 text-base leading-relaxed">{divorceGuide.content}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {propertyGuide && (
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="border-l-4 border-gold pl-6">
                <h2 className="text-2xl font-serif text-navy mb-4">{propertyGuide.title}</h2>
                <p className="text-dark/80 text-base leading-relaxed">{propertyGuide.content}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {rightsGuide && (
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="border-l-4 border-gold pl-6">
                <h2 className="text-2xl font-serif text-navy mb-4">{rightsGuide.title}</h2>
                <p className="text-dark/80 text-base leading-relaxed">{rightsGuide.content}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-gold text-sm uppercase tracking-wide">
                {common('faqLabel')}
              </span>
              <h2 className="text-3xl font-serif text-navy mt-2">
                {heading} — {common('faqHeading')}
              </h2>
            </div>
            <FAQAccordion items={faqItems} />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

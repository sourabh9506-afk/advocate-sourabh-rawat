import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import LegalDisclaimer from '@/components/shared/LegalDisclaimer';
import { ArrowRight, MapPin, Phone, Clock, Navigation, Info } from 'lucide-react';
import { generateBreadcrumbSchema, generateFAQSchema, generateChamberSchema } from '@/lib/schema';
import { BUSINESS } from '@/lib/business';
import { getLocation, LOCATION_SLUGS } from '@/lib/locations';
import { getServiceBySlug } from '@/lib/services';
import { Link } from '@/i18n/routing';

const SITE = 'https://advocatelucknow.in';

export function generateStaticParams() {
  return LOCATION_SLUGS.map((slug) => ({ slug }));
}

interface LocationContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; content: string }[];
  areasServed?: string;
  faqs: { q: string; a: string }[];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!LOCATION_SLUGS.includes(slug)) return {};
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: `locations.${slug}` });
  const path = `/${locale}/locations/${slug}`;

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${SITE}${path}`,
      languages: {
        'en-IN': `${SITE}/en/locations/${slug}`,
        'hi-IN': `${SITE}/hi/locations/${slug}`,
        'x-default': `${SITE}/en/locations/${slug}`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE}${path}`,
      images: [{ url: `${SITE}/images/og-image.jpg`, width: 1200, height: 630, alt: 'Advocate Sourabh Rawat — High Court Lucknow' }],
    },
    twitter: { card: 'summary_large_image', images: [`${SITE}/images/og-image.jpg`] },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const location = getLocation(slug);
  if (!location) notFound();

  const t = await getTranslations({ locale, namespace: `locations.${slug}` });
  const labels = await getTranslations({ locale, namespace: 'locations.labels' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const content: LocationContent = {
    metaTitle: t('metaTitle'),
    metaDescription: t('metaDescription'),
    h1: t('h1'),
    intro: t('intro'),
    sections: t.raw('sections') as LocationContent['sections'],
    areasServed: location.kind === 'chamber' ? (t.raw('areasServed') as string) : undefined,
    faqs: t.raw('faqs') as LocationContent['faqs'],
  };

  const businessLoc = location.businessLocationId
    ? BUSINESS.locations.find((l) => l.id === location.businessLocationId)
    : undefined;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=15&output=embed`;
  const directionsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}`;

  const relatedServices = location.relatedServices
    .map((s) => getServiceBySlug(s, 'en'))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  // Schema: chambers get a Place-scoped LegalService; courts get breadcrumb only.
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${SITE}/${locale}` },
    { name: 'Locations', url: `${SITE}/${locale}/locations/${slug}` },
    { name: content.h1, url: `${SITE}/${locale}/locations/${slug}` },
  ]);
  const faqSchema = generateFAQSchema(content.faqs);
  const chamberSchema = location.kind === 'chamber' && location.businessLocationId
    ? generateChamberSchema(location.businessLocationId, `${SITE}/${locale}/locations/${slug}`)
    : null;

  return (
    <main className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {chamberSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(chamberSchema) }} />
      )}

      <div className="sec-full subpage-hero" style={{ background: 'var(--navy)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/80">{content.h1}</span>
            </div>
            <p className="sec-label">{location.kind === 'chamber' ? 'Chamber' : 'Court'}</p>
            <h1 className="sec-title subpage-h1-sm" style={{ color: 'var(--white)', marginBottom: '16px' }}>{content.h1}</h1>
            <p className="sec-sub subpage-lede" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '760px' }}>{content.intro}</p>
          </ScrollReveal>
        </div>
      </div>

      {location.kind === 'court' && (
        <div className="bg-gold/10 border-b border-gold/20 py-3 px-4">
          <p className="max-w-4xl mx-auto text-center text-sm text-navy/70 flex items-center justify-center gap-2">
            <Info size={15} className="text-gold shrink-0" /> {labels('courtNote')}
          </p>
        </div>
      )}

      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {content.sections.map((section, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div className="border-l-4 border-gold pl-6">
                  <h2 className="text-2xl font-serif text-navy mb-3">{section.heading}</h2>
                  <p className="text-dark/80 leading-relaxed">{section.content}</p>
                </div>
              </ScrollReveal>
            ))}

            {content.areasServed && (
              <ScrollReveal>
                <div className="bg-white border border-dark/10 rounded-lg p-6">
                  <h2 className="text-lg font-serif font-bold text-navy mb-2">{labels('areasServedTitle')}</h2>
                  <p className="text-dark/75 text-sm leading-relaxed">{content.areasServed}</p>
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.15}>
            <aside className="space-y-6">
              {businessLoc && (
                <div className="bg-navy rounded-2xl p-6 text-cream">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="text-cream/60 text-xs uppercase tracking-wide mb-0.5">{labels('address')}</div>
                        <div>{businessLoc.streetAddress}, {businessLoc.locality}, {businessLoc.region} {businessLoc.postalCode}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="text-cream/60 text-xs uppercase tracking-wide mb-0.5">{labels('phone')}</div>
                        <a href={`tel:${BUSINESS.phone.tel}`} className="hover:text-gold transition-colors">{BUSINESS.phone.display}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="text-cream/60 text-xs uppercase tracking-wide mb-0.5">{labels('hours')}</div>
                        <div>{BUSINESS.hours.weekday}</div>
                        <div>{BUSINESS.hours.saturday}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TODO photo: 2-3 real chamber photos (exterior with signage, interior) go here once provided */}

              <div className="rounded-2xl overflow-hidden border border-dark/10">
                <iframe
                  title={`${content.h1} — location on Google Maps`}
                  src={mapSrc}
                  width="100%"
                  height="240"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-navy font-semibold text-sm py-3 hover:bg-cream transition-colors"
                >
                  <Navigation size={16} className="text-gold" /> {labels('getDirections')}
                </a>
              </div>

              <a
                href={`https://wa.me/${BUSINESS.phone.wa}?text=${encodeURIComponent(`Namaste, I would like to consult regarding ${content.h1}`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold w-full justify-center"
              >
                {common('whatsappNow')} <ArrowRight size={18} />
              </a>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-white py-12 border-t border-dark-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-center text-lg font-serif font-bold text-navy mb-8">{labels('relatedServicesTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="bg-cream border border-dark/10 rounded-lg p-6 flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 className="font-serif text-lg font-bold text-navy mb-2">{service.h1}</h3>
                  <p className="text-dark/70 text-sm leading-relaxed mb-4 flex-grow">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm">{common('readMore')} <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.faqs.length > 0 && (
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center text-3xl font-serif text-navy mb-10">{labels('faqHeading')}</h2>
            <FAQAccordion items={content.faqs} />
          </div>
        </section>
      )}

      <LegalDisclaimer />
    </main>
  );
}

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Shield, Briefcase, MapPin, Clock, Scale, Building2, CircleCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import CTABanner from '@/components/home/CTABanner';
import { generateBreadcrumbSchema, generatePersonSchema } from '@/lib/schema';
import { Link } from '@/i18n/routing';

const areaSlugs = ['criminal-law', 'civil-law', 'family-law'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const siteUrl = 'https://advocatelucknow.in';
  const path = `/${locale}/about`;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'en-IN': `${siteUrl}/en/about`,
        'hi-IN': `${siteUrl}/hi/about`,
        'x-default': `${siteUrl}/en/about`,
      }
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
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

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const areas = t.raw('areas') as string[];
  const courts = t.raw('courts') as string[];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatelucknow.in/${locale}` },
    { name: t('name'), url: `https://advocatelucknow.in/${locale}/about` }
  ]);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246';
  const chambers = [
    { label: t('chamber1_label'), address: t('chamber1_address'), mapQuery: '26.9124,80.9515' },
    { label: t('chamber2_label'), address: t('chamber2_address'), mapQuery: '26.8467,80.9462' }
  ];

  const infoRows = [
    { icon: Shield, label: t('registration_label'), value: t('enrollment') },
    { icon: Briefcase, label: t('practice_label'), value: areas.join(', ') },
    { icon: MapPin, label: t('location_label'), value: t('location') },
    { icon: Clock, label: t('response_label'), value: t('response') }
  ];

  return (
    <main className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema()),
        }}
      />

      {/* Section A — Profile Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-20 lg:pt-32 pb-12 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <div className="border-l-2 border-gold pl-4">
              <p className="text-gold text-xs font-bold tracking-[3px] uppercase">{t('hero_label')}</p>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy mt-4">{t('name')}</h1>
            <div className="w-16 h-0.5 bg-gold mt-4 mb-6" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold bg-navy text-gold text-xs font-medium tracking-wide mb-6">
              <Shield size={14} />
              {t('enrollment')}
            </div>
            <div className="space-y-4 text-dark text-base leading-relaxed">
              <p>{t('bio_1')}</p>
              <p>{t('bio_2')}</p>
              <p>{t('bio_3')}</p>
            </div>
          </ScrollReveal>

          <div className="bg-navy rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full ring-4 ring-gold overflow-hidden">
                <Image
                  src="/images/team/sourabh.png"
                  alt={`${t('name')} — ${t('designation')}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                  loading="eager"
                  priority
                />
              </div>
              <h2 className="text-gold text-xl font-semibold mt-4">{t('name')}</h2>
              <p className="text-cream/70 text-sm">{t('designation')}</p>
            </div>

            <div className="h-px bg-white/10 my-6" />

            <div className="space-y-5">
              {infoRows.map((row, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <row.icon size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-cream/60 text-xs uppercase tracking-wide">{row.label}</div>
                    <div className="text-cream text-sm font-medium mt-0.5">{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section B — Practice Details */}
      <section className="bg-navy py-24">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal className="text-center mb-10">
            <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-3">{t('details_label')}</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">{t('practice_title')}</h2>
            <div className="w-16 h-0.5 bg-gold mt-4 mx-auto" />
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal delay={0}>
              <div className="bg-cream rounded-2xl p-8 shadow-lg h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Scale size={20} className="text-gold" />
                  </div>
                  <h3 className="text-navy font-semibold text-lg">{t('areas_label')}</h3>
                </div>
                <ul className="space-y-4">
                  {areas.map((area, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CircleCheck size={20} className="text-gold shrink-0" />
                      <Link href={`/practice-areas/${areaSlugs[idx]}`} className="text-gold text-sm hover:underline">
                        {area}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-cream rounded-2xl p-8 shadow-lg h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Building2 size={20} className="text-gold" />
                  </div>
                  <h3 className="text-navy font-semibold text-lg">{t('courts_label')}</h3>
                </div>
                <ul className="space-y-4">
                  {courts.map((court, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CircleCheck size={20} className="text-gold shrink-0" />
                      <span className="text-dark text-sm">{court}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section C — Chamber Locations */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-3">{t('visit_label')}</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">{t('chambers_title')}</h2>
            <div className="w-16 h-0.5 bg-gold mt-4 mx-auto" />
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {chambers.map((chamber, idx) => {
              const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Namaste, I would like to visit ${chamber.label} — ${chamber.address}`)}`;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="bg-navy rounded-2xl p-8 h-full flex flex-col">
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-gold shrink-0" />
                      <h3 className="text-gold font-semibold text-lg">{chamber.label}</h3>
                    </div>
                    <p className="text-cream/80 text-sm mt-2 leading-relaxed">{chamber.address}</p>

                    <div className="border-t border-gold/20 my-4" />

                    <div className="flex items-center gap-3 text-cream/70 text-sm">
                      <Clock size={16} className="text-gold shrink-0" />
                      <div>
                        <div>{t('hours_weekday')}</div>
                        <div>{t('hours_saturday')}</div>
                      </div>
                    </div>

                    <div className="border-t border-gold/20 my-4" />

                    <iframe
                      src={`https://maps.google.com/maps?q=${chamber.mapQuery}&z=15&output=embed`}
                      width="100%"
                      height="180"
                      style={{ border: 0, borderRadius: '8px' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      title={chamber.label}
                    />

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-sm py-3 rounded-lg transition-colors hover:bg-gold-dark"
                    >
                      {common('whatsappNow')} <ArrowRight size={16} />
                    </a>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}

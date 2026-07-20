import ScrollReveal from '@/components/shared/ScrollReveal';
import AppointmentForm from '@/components/contact/AppointmentForm';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const siteUrl = 'https://advocatelucknow.in';
  const path = `/${locale}/contact`;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'en-IN': `${siteUrl}/en/contact`,
        'hi-IN': `${siteUrl}/hi/contact`,
        'x-default': `${siteUrl}/en/contact`,
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

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'contact' });
  const ta = await getTranslations({ locale, namespace: 'about' });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatelucknow.in/${locale}` },
    { name: tc('meta_title'), url: `https://advocatelucknow.in/${locale}/contact` }
  ]);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246';

  const chambers = [
    { label: ta('chamber1_label'), address: ta('chamber1_address'), mapQuery: '26.9234755,80.9281100' },
    { label: ta('chamber2_label'), address: ta('chamber2_address'), mapQuery: '26.9124,80.9515' },
  ];

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
            <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-4">{tc('get_in_touch')}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Advocate <span className="text-gold">Sourabh Rawat</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              {tc('hero_desc')}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-12 md:py-20 px-4 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <ScrollReveal>
            <div className="space-y-10">

              <div>
                <h2 className="font-serif text-2xl font-bold text-navy mb-6">{tc('contact_details')}</h2>
                <div className="w-10 h-1 bg-gold mb-6 rounded-full" />
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-navy font-semibold text-sm mb-1">{tc('phone_label')}</div>
                      <a href="tel:+919026349246" className="text-dark/70 text-sm hover:text-navy transition-colors">
                        +91 90263 49246
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-navy font-semibold text-sm mb-1">{tc('email_label')}</div>
                      <a href="mailto:Sourabh9506@gmail.com" className="text-dark/70 text-sm hover:text-navy transition-colors">
                        Sourabh9506@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-navy mb-3">{tc('chambers_heading')}</h2>
                <div className="w-10 h-1 bg-gold mb-4 rounded-full" />
                <p className="text-dark/60 text-sm leading-relaxed mb-6">{tc('chambers_intro')}</p>

                <div className="space-y-6">
                  {chambers.map((chamber, idx) => {
                    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Namaste, I would like to visit ${chamber.label} — ${chamber.address}`)}`;
                    return (
                      <div key={idx} className="bg-navy rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin size={16} className="text-gold flex-shrink-0" />
                          <h3 className="text-gold font-semibold text-base">{chamber.label}</h3>
                        </div>
                        <p className="text-cream/80 text-sm leading-relaxed mb-3">{chamber.address}</p>

                        <div className="flex items-start gap-2 text-cream/60 text-xs mb-4">
                          <Clock size={13} className="text-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <div>{ta('hours_weekday')}</div>
                            <div>{ta('hours_saturday')}</div>
                          </div>
                        </div>

                        <iframe
                          src={`https://maps.google.com/maps?q=${chamber.mapQuery}&z=15&output=embed`}
                          width="100%"
                          height="160"
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
                          className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-xs py-2.5 rounded-lg hover:bg-gold/90 transition-colors"
                        >
                          WhatsApp <ArrowRight size={14} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-sm text-dark/70 mb-4">
              {tc('notSureText')}
              <Link href="/practice-areas/criminal-law" className="text-gold hover:underline">
                {tc('practiceAreasLink')}
              </Link>
            </p>
            <AppointmentForm />
          </ScrollReveal>

        </div>
      </section>
    </main>
  );
}

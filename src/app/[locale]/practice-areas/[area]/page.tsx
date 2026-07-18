import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Link } from '@/i18n/routing';

const validAreas = ['criminal-law', 'civil-law', 'family-law', 'police-station'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string, area: string }> }) {
  const { locale, area } = await params;
  if (!validAreas.includes(area)) {
    return {};
  }
  
  const t = await getTranslations({ locale, namespace: `areas.${area}` });
  const siteUrl = 'https://advocatesourabhrawat.in';
  const path = `/${locale}/practice-areas/${area}`;

  return {
    title: `${t('title')} | Advocate Sourabh Rawat`,
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
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }]
    }
  };
}

export default async function PracticeAreaPage({ params }: { params: Promise<{ locale: string, area: string }> }) {
  const { locale, area } = await params;
  
  if (!validAreas.includes(area)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `areas.${area}` });
  const common = await getTranslations({ locale, namespace: 'common' });

  // Schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatesourabhrawat.in/${locale}` },
    { name: 'Practice Areas', url: `https://advocatesourabhrawat.in/${locale}#practice` },
    { name: t('title'), url: `https://advocatesourabhrawat.in/${locale}/practice-areas/${area}` }
  ]);

  const waLink = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246'}?text=${encodeURIComponent(`Namaste, I need help with ${t('title')}`)}`;

  // Convert translation list to an array properly
  // Next-intl doesn't return raw arrays easily unless we use rich formatting or specific keys, 
  // but we can just map over a known length or use raw() if we defined it as an array.
  // In JSON, services is an array, we can use raw to get the array.
  const services = t.raw('services') as string[];

  return (
    <main className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="sec-full" style={{ background: 'var(--navy)', color: 'var(--white)', padding: '120px 48px 80px 48px', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,58,0.1)_0%,transparent_70%)]" />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <ScrollReveal>
            <p className="sec-label">Practice Area</p>
            <h1 className="sec-title" style={{ color: 'var(--white)', fontSize: '48px', marginBottom: '16px' }}>{t('title')}</h1>
            <p className="sec-sub" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '700px' }}>{t('desc')}</p>
          </ScrollReveal>
        </div>
      </div>

      <section style={{ padding: '96px 48px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '64px', alignItems: 'start' }}>
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
            <div style={{ background: 'var(--white)', border: '1px solid var(--dark-08)', borderRadius: '8px', padding: '32px', position: 'sticky', top: '96px', boxShadow: '0 4px 24px rgba(27,42,74,0.06)' }}>
              <h3 className="sec-title" style={{ fontSize: '24px', marginBottom: '16px' }}>Need Immediate Help?</h3>
              <p className="sec-sub" style={{ marginBottom: '32px', fontSize: '14px' }}>
                Consult Advocate Sourabh Rawat directly for honest, result-oriented legal counsel.
              </p>
              <a href={waLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--gold)', color: 'var(--white)', fontWeight: 700, padding: '14px 24px', borderRadius: '4px', textDecoration: 'none', marginBottom: '16px', transition: 'background 0.3s' }}>
                {common('whatsappNow')} <ArrowRight size={18} />
              </a>
              <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+919026349246'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', border: '1px solid var(--dark-08)', color: 'var(--navy)', fontWeight: 700, padding: '14px 24px', borderRadius: '4px', textDecoration: 'none', transition: 'all 0.3s' }}>
                {common('callDirectly')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

import ScrollReveal from '@/components/shared/ScrollReveal';
import AppointmentForm from '@/components/contact/AppointmentForm';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { generateBreadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = 'https://advocatesourabhrawat.in';
  const path = `/${locale}/contact`;

  return {
    title: 'Contact & Appointment | Advocate Sourabh Rawat',
    description: 'Book a legal consultation with Advocate Sourabh Rawat. Available for criminal, civil, and family matters in Lucknow.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'en-IN': `${siteUrl}/en/contact`,
        'hi-IN': `${siteUrl}/hi/contact`,
        'x-default': `${siteUrl}/en/contact`,
      }
    },
    openGraph: {
      title: 'Contact & Appointment | Advocate Sourabh Rawat',
      description: 'Book a legal consultation with Advocate Sourabh Rawat.',
      url: `${siteUrl}${path}`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }]
    }
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://advocatesourabhrawat.in/${locale}` },
    { name: 'Contact', url: `https://advocatesourabhrawat.in/${locale}/contact` }
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
            <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-4">Get In Touch</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">Contact <span className="gold">Us</span></h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Schedule a confidential consultation or reach out for immediate legal assistance.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-12 md:py-24 px-4 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <ScrollReveal>
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl font-bold text-navy mb-6">Chamber Location</h2>
                <div className="w-12 h-1 bg-gold mb-8 rounded-full"></div>
                <p className="text-dark/70 text-base leading-loose mb-8">
                  Conveniently located in the High Court premises for direct access to both District Court and High Court proceedings. Please schedule an appointment before visiting.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-navy font-semibold mb-1">Office Address</div>
                      <div className="text-dark/60 text-sm leading-relaxed">Chamber No. 45, High Court<br/>Lucknow Bench, Uttar Pradesh &mdash; 226001</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-blue/10 border border-blue/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-blue" />
                    </div>
                    <div>
                      <div className="text-navy font-semibold mb-1">Contact Number</div>
                      <a href="tel:+919026349246" className="text-dark/60 text-sm leading-relaxed block hover:text-navy transition-colors">+91 90263 49246</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-navy/5 border border-navy/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-navy" />
                    </div>
                    <div>
                      <div className="text-navy font-semibold mb-1">Email Address</div>
                      <a href="mailto:Sourabh9506@gmail.com" className="text-dark/60 text-sm leading-relaxed block hover:text-navy transition-colors">Sourabh9506@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-dark/10 rounded-lg h-64 flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(44,74,124,0.03)_0%,transparent_70%)]" />
                <Navigation size={48} className="text-blue opacity-30" />
                <span className="text-dark/45 text-sm font-medium">Interactive Map Loading...</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <AppointmentForm />
          </ScrollReveal>

        </div>
      </section>
    </main>
  );
}

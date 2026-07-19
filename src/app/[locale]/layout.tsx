import { Playfair_Display, Inter, Noto_Serif_Devanagari, Noto_Sans_Devanagari } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { generateLegalServiceSchema } from '@/lib/schema';
import '../globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter' });
const notoSerifDev = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: ['400', '600', '700'], variable: '--font-serif-dev' });
const notoSansDev = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '500', '600'], variable: '--font-sans-dev' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  
  const siteUrl = 'https://advocatelucknow.in';
  const path = `/${locale}`;

  return {
    metadataBase: new URL('https://advocatelucknow.in'),
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'en-IN': `${siteUrl}/en`,
        'hi-IN': `${siteUrl}/hi`,
        'x-default': `${siteUrl}/en`,
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      url: `${siteUrl}${path}`,
      siteName: 'Advocate Sourabh Rawat',
      title: t('meta_title'),
      description: t('meta_description'),
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
    verification: {
      google: 'uOjtJFJosK3pDPqucdhT-3BmSTi3SVhl0ugUNAgjWAw',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const legalServiceSchema = generateLegalServiceSchema(locale);

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable} ${notoSerifDev.variable} ${notoSansDev.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <TopBar />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export default function Navbar() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === 'en' ? 'hi' : 'en' });
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link href="/" className="nav-logo" onClick={() => window.location.href = `/${locale}`}>
          <div className="logo-mark"><span>SR</span></div>
          <div className="logo-text">
            <span className="logo-name">Adv. Sourabh Rawat</span>
            <span className="logo-sub">High Court &middot; Lucknow</span>
          </div>
        </Link>
        
        <div className="nav-links">
          <Link href="/">{t('home')}</Link>
          <Link href="/#practice">{t('practiceAreas')}</Link>
          <Link href="/about">{t('about')}</Link>
          <Link href="/#process">{t('consultation')}</Link>
          <Link href="/#reviews">{t('reviews')}</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#location">{t('contact')}</Link>
          <Link href="/#process" className="nav-cta">{t('bookNow')}</Link>
          <button onClick={toggleLocale} className="lang-switch" aria-label="Switch language">
            {locale === 'en' ? 'हिं' : 'EN'}
          </button>
        </div>

        <button
          onClick={toggleLocale}
          className="lang-switch lang-switch-mobile"
          aria-label="Switch language"
        >
          {locale === 'en' ? 'हिं' : 'EN'}
        </button>

        <div
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <div className={`mob-menu ${isOpen ? 'open' : ''}`} style={{ display: isOpen ? 'flex' : 'none' }}>
        <Link href="/#practice" onClick={() => setIsOpen(false)}>{t('practiceAreas')}</Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>{t('about')}</Link>
        <Link href="/#process" onClick={() => setIsOpen(false)}>{t('consultation')}</Link>
        <Link href="/#reviews" onClick={() => setIsOpen(false)}>{t('reviews')}</Link>
        <Link href="/#faq" onClick={() => setIsOpen(false)}>FAQ</Link>
        <Link href="/#location" onClick={() => setIsOpen(false)}>{t('contact')}</Link>
        <Link href="/#process" className="mob-cta" onClick={() => setIsOpen(false)}>{t('bookNow')}</Link>
        <button onClick={() => { toggleLocale(); setIsOpen(false); }} className="lang-switch" style={{ alignSelf: 'center', marginTop: '8px' }}>
          {locale === 'en' ? 'हिंदी में देखें' : 'View in English'}
        </button>
      </div>
    </>
  );
}

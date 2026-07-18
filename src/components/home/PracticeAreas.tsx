'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, Shield, Scale, FileX, Gavel, Home, Lock, DollarSign, Landmark, UserX, Users, Wallet, ShieldAlert, FileDown, MessageCircle, Phone, type LucideIcon } from 'lucide-react';

const categorySlug: Record<string, string> = {
  criminal: 'criminal-law',
  civil: 'civil-law',
  family: 'family-law',
  police: 'police-station'
};

type SubCard = {
  titleKey: string;
  descKey: string;
  tags: string[];
  icon: LucideIcon;
};

type Category = {
  key: string;
  number: string;
  hoverBorderClass: string;
  iconClasses: string;
  cards: SubCard[];
};

export default function PracticeAreas() {
  const t = useTranslations('practiceAreas');
  const common = useTranslations('common');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const categoryMeta = [
    { key: 'criminal', number: '01', hoverBorderClass: 'hover:border-t-gold', iconClasses: 'bg-gold/10 text-gold', icons: [Shield, Scale, FileX, Gavel], tagCounts: [2, 2, 2, 2] },
    { key: 'civil', number: '02', hoverBorderClass: 'hover:border-t-blue', iconClasses: 'bg-blue/10 text-blue', icons: [Home, Lock, DollarSign, Landmark], tagCounts: [3, 2, 2, 2] },
    { key: 'family', number: '03', hoverBorderClass: 'hover:border-t-navy', iconClasses: 'bg-navy/[0.08] text-navy', icons: [UserX, Users, Wallet, ShieldAlert], tagCounts: [2, 2, 2, 2] },
    { key: 'police', number: '04', hoverBorderClass: 'hover:border-t-gold', iconClasses: 'bg-gold/10 text-gold', icons: [Lock, FileDown, MessageCircle, Phone], tagCounts: [2, 2, 2, 2] }
  ];

  const categories: Category[] = categoryMeta.map(({ icons, tagCounts, ...meta }) => ({
    ...meta,
    cards: tagCounts.map((tagCount, i) => ({
      titleKey: String(i),
      descKey: String(i),
      tags: Array.from({ length: tagCount }, (_, k) => t(`categories.${meta.key}.cards.${i}.tags.${k}`)),
      icon: icons[i]
    }))
  }));

  return (
    <section id="practice" ref={sectionRef} className="sec-full bg-cream">
      <style dangerouslySetInnerHTML={{__html: `
        .cat-card {
          background: linear-gradient(135deg, rgba(201,150,58,0.25) 0%, rgba(201,150,58,0.1) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .cat-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle 400px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(201,150,58,0.25), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 0;
        }
        .cat-card:hover::before { opacity: 1; }
        .cat-card > * { position: relative; z-index: 1; }
      `}} />

      <div className="max-w-7xl mx-auto">
        <div className="reveal-element opacity-0 translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <p className="font-sans text-xs font-bold text-gold uppercase tracking-[2px] mb-2">{t('label')}</p>
          <h2 className="font-serif text-[42px] font-bold text-navy leading-[1.1]">
            {t('title')} <span className="text-gold">{t('titleGold')}</span>
          </h2>
          <div className="w-12 h-[2.5px] bg-gold my-5 rounded-[2px]" />
          <p className="font-sans text-[15px] text-dark/85 max-w-[600px] leading-[1.6]">{t('desc')}</p>
        </div>

        <div className="mt-[72px] flex flex-col gap-[72px] max-md:gap-12">
          {categories.map((cat) => (
            <CategoryBlock key={cat.key} cat={cat} t={t} />
          ))}
        </div>

        {/* Bottom CTA Row */}
        <div className="reveal-element opacity-0 translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-t border-dark/[0.08] mt-[72px] pt-12 text-center">
          <h3 className="font-sans text-lg font-semibold text-navy mb-2">{t('ctaTitle')}</h3>
          <p className="text-sm text-dark/85 mb-5">{t('ctaSub')}</p>
          <div className="flex gap-3 justify-center max-md:flex-col">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246'}`} target="_blank" rel="noreferrer" className="btn-gold">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.882l6.21-1.628A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.302-1.433l-.38-.225-3.684.966.982-3.587-.247-.394A9.93 9.93 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {common('whatsappNow')}
            </a>
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+919026349246'}`} className="btn-navy">
              <Phone size={16} />
              {common('callNow')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBlock({ cat, t }: { cat: Category; t: any }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, breakpoints: { '(min-width: 768px)': { active: false } } },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="mb-7 flex justify-between items-end max-md:flex-col max-md:items-start">
        <div>
          <div className="flex items-center">
            <span className="font-serif text-[13px] text-[#8A631B] font-extrabold tracking-[2px] mr-[14px]">{cat.number}</span>
            <h3 className="font-serif font-bold text-navy text-[28px]">{t(`categories.${cat.key}.title`)}</h3>
          </div>
          <div className="w-12 h-[2.5px] bg-gold mt-[10px] rounded-[2px] ml-8" />
        </div>
        <div className="pb-2 max-md:mt-4 max-md:ml-0">
          <p className="font-sans text-sm text-dark/85 max-w-[320px] leading-[1.6]">{t(`categories.${cat.key}.desc`)}</p>
        </div>
      </div>

      <div className="overflow-hidden p-3 -m-3" ref={emblaRef}>
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:flex max-md:gap-4">
          {cat.cards.map((card, j) => (
            <div key={j} className="min-w-0 max-md:flex-[0_0_100%]">
              <Link
                href={`/practice-areas/${categorySlug[cat.key]}`}
                className={`cat-card relative overflow-hidden h-full flex flex-col rounded-lg border border-gold/40 p-6 pt-5 border-t-3 border-t-transparent cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:ring-2 hover:ring-gold/40 hover:shadow-lg ${cat.hoverBorderClass}`}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${cat.iconClasses}`}>
                  <card.icon size={24} strokeWidth={1.75} />
                </div>
                <h4 className="font-serif font-semibold text-navy text-[17px] mt-4 mb-2">{t(`categories.${cat.key}.cards.${card.titleKey}.title`)}</h4>
                <p className="text-[13px] text-dark/85 leading-[1.65] mb-4">{t(`categories.${cat.key}.cards.${card.descKey}.desc`)}</p>
                <div className="mt-auto">
                  {card.tags.map((tag, k) => (
                    <span key={k} className="text-[10.5px] bg-cream text-dark/65 px-2.5 py-1 rounded mr-1.5 mb-1.5 inline-block">{tag}</span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden max-md:flex max-md:justify-center max-md:gap-4 max-md:mt-6">
        <button onClick={scrollPrev} disabled={!prevBtnEnabled} className="w-11 h-11 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-gold/25">
          <ChevronLeft size={24} />
        </button>
        <button onClick={scrollNext} disabled={!nextBtnEnabled} className="w-11 h-11 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-gold/25">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

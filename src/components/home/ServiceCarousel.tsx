"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const slideImages = [
  '/images/carousel/criminal-law.webp',
  '/images/carousel/civil-law.webp',
  '/images/carousel/family-law.webp',
  '/images/carousel/urgent-help.webp',
];

export default function ServiceCarousel() {
  const [cur, setCur] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const common = useTranslations('common');
  const c = useTranslations('carousel');

  const slides = [
    { id: 1, tag: c('s1Tag'), title: c('s1Title'), gold: c('s1Gold'), desc: c('s1Desc'), badges: [c('s1b1'), c('s1b2'), c('s1b3'), c('s1b4')], image: slideImages[0] },
    { id: 2, tag: c('s2Tag'), title: c('s2Title'), gold: c('s2Gold'), desc: c('s2Desc'), badges: [c('s2b1'), c('s2b2'), c('s2b3'), c('s2b4')], image: slideImages[1] },
    { id: 3, tag: c('s3Tag'), title: c('s3Title'), gold: c('s3Gold'), desc: c('s3Desc'), badges: [c('s3b1'), c('s3b2'), c('s3b3'), c('s3b4')], image: slideImages[2] },
    { id: 4, tag: c('s4Tag'), title: c('s4Title'), gold: c('s4Gold'), desc: c('s4Desc'), badges: [c('s4b1'), c('s4b2'), c('s4b3'), c('s4b4')], image: slideImages[3] },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCur((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCur((index % slides.length + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(cur + 1);
      else goTo(cur - 1);
    }
  };

  return (
    <div className="carousel-section sec-full">
      <div className="carousel-wrap">
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${cur * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="carousel-slide">
              <div className="slide-bg">
                <Image 
                  src={slide.image} 
                  alt={slide.tag} 
                  fill 
                  priority={index === 0}
                  quality={40}
                  className="slide-bg-img" 
                  sizes="100vw"
                />
                <div className="slide-bg-overlay"></div>
              </div>
              <div className="slide-content">
                <div className="slide-label">
                  <span className="w-3 h-3 rounded-full bg-gold inline-block mr-1"></span>
                  {slide.tag}
                </div>
                <h2 className="slide-title" style={{ whiteSpace: 'pre-line' }}>{slide.title}<span className="gold">{slide.gold}</span></h2>
                <p className="slide-desc">{slide.desc}</p>
                <div className="slide-tags">
                  {slide.badges.map(b => (
                    <span key={b} className="slide-tag">{b}</span>
                  ))}
                </div>
                <Link href="#process" className="slide-btn">
                  {common('consultNow')} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`c-dot ${i === cur ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="c-arrow" onClick={() => goTo(cur - 1)}><ArrowLeft size={16} /></button>
          <button className="c-arrow" onClick={() => goTo(cur + 1)}><ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    tag: 'Criminal Law',
    title: 'Strong Criminal\nDefense When It\n<span class="gold">Matters Most</span>',
    desc: 'Immediate legal representation for FIR, bail, anticipatory bail, and sessions court matters. Available for urgent situations across Lucknow.',
    badges: ['FIR Defense', 'Bail Applications', 'Anticipatory Bail', 'High Court Appeals'],
    image: '/images/carousel/criminal-law.webp'
  },
  {
    id: 2,
    tag: 'Civil Law',
    title: 'Protecting Your\nProperty & Civil\n<span class="gold">Rights</span>',
    desc: 'Expert representation in property disputes, civil injunctions, breach of contract, and recovery suits in District and High Court.',
    badges: ['Property Disputes', 'Civil Injunctions', 'Recovery Suits', 'Contract Disputes'],
    image: '/images/carousel/civil-law.webp'
  },
  {
    id: 3,
    tag: 'Family Law',
    title: 'Sensitive & Confidential\nFamily Law\n<span class="gold">Resolutions</span>',
    desc: 'Handling divorce, child custody, and domestic violence matters with the utmost confidentiality and care.',
    badges: ['Divorce Cases', 'Child Custody', 'Maintenance', 'Domestic Violence'],
    image: '/images/carousel/family-law.webp'
  },
  {
    id: 4,
    tag: 'Urgent Help',
    title: 'Immediate Police\nStation Legal\n<span class="gold">Assistance</span>',
    desc: 'On-site legal support during questioning, FIR filing, and preventing unlawful detention at any police station in Lucknow.',
    badges: ['On-site Support', 'FIR Assistance', 'Statement Recording', 'Protection'],
    image: '/images/carousel/urgent-help.webp'
  }
];

export default function ServiceCarousel() {
  const [cur, setCur] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const common = useTranslations('common');

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
                <h2 className="slide-title" dangerouslySetInnerHTML={{ __html: slide.title }} />
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

'use client';
import { MessageCircle, Clock, Scale, ShieldCheck, Lock, MapPin } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import { useTranslations } from 'next-intl';

export default function WhyChoose() {
  const t = useTranslations('whyChoose');

  const reasons = [
    {
      icon: <MessageCircle size={22} />,
      title: t('r1Title'),
      desc: t('r1Desc'),
      delay: 0.1
    },
    {
      icon: <Clock size={22} />,
      title: t('r2Title'),
      desc: t('r2Desc'),
      delay: 0.2
    },
    {
      icon: <Scale size={22} />,
      title: t('r3Title'),
      desc: t('r3Desc'),
      delay: 0.3
    },
    {
      icon: <ShieldCheck size={22} />,
      title: t('r4Title'),
      desc: t('r4Desc'),
      delay: 0.1
    },
    {
      icon: <Lock size={22} />,
      title: t('r5Title'),
      desc: t('r5Desc'),
      delay: 0.2
    },
    {
      icon: <MapPin size={22} />,
      title: t('r6Title'),
      desc: t('r6Desc'),
      delay: 0.3
    }
  ];

  return (
    <section id="why" className="sec-full">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
        <p className="sec-label">{t('label')}</p>
        <h2 className="sec-title">{t('title')} <span className="gold">{t('titleGold')}</span></h2>
        <div className="sec-line"></div>
        <p className="sec-sub">{t('subtitle')}</p>
      </ScrollReveal>
      
      <div className="why-grid">
        {reasons.map((r, idx) => (
          <ScrollReveal key={idx} delay={r.delay} className="h-full">
            <div 
              className="w-card h-full flex flex-col"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="w-icon">{r.icon}</div>
              <div className="w-title">{r.title}</div>
              <div className="w-desc flex-grow">{r.desc}</div>
            </div>
          </ScrollReveal>
        ))}
        </div>
      </div>
    </section>
  );
}

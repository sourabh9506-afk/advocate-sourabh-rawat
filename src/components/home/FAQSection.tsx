"use client";

import { useState } from 'react';
import { Plus, MessageSquare, Phone, Mail } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import { generateFAQSchema } from '@/lib/schema';
import { useTranslations } from 'next-intl';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
  ];

  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })));

  return (
    <section id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="faq-layout">
        <div>
          <ScrollReveal>
            <p className="sec-label">{t('label')}</p>
            <h2 className="sec-title">{t('title')} <span className="gold">{t('titleGold')}</span></h2>
            <div className="sec-line"></div>
          </ScrollReveal>

          <div className="faq-list mt-8">
            {faqs.map((faq, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
                  <div
                    className="faq-q"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    <div className="faq-q-text">{faq.q}</div>
                    <div className="faq-toggle"><Plus size={14} /></div>
                  </div>
                  <div className="faq-ans">{faq.a}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div>
          <ScrollReveal delay={0.2} direction="right">
            <div className="faq-sidebar">
              <div className="faq-sidebar-title">{t('sidebarTitle')}</div>
              <div className="faq-sidebar-sub">{t('sidebarSub')}</div>
              <div className="contact-opts">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246'}`} className="c-opt" target="_blank" rel="noreferrer">
                  <div className="c-opt-icon c-opt-wa"><MessageSquare size={18} /></div>
                  <div>
                    <div className="c-opt-label">WhatsApp</div>
                    <div className="c-opt-val">+91 90263 49246</div>
                  </div>
                </a>
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+919026349246'}`} className="c-opt">
                  <div className="c-opt-icon c-opt-call"><Phone size={18} /></div>
                  <div>
                    <div className="c-opt-label">{t('callLabel')}</div>
                    <div className="c-opt-val">+91 90263 49246</div>
                  </div>
                </a>
                <a href="mailto:Sourabh9506@gmail.com" className="c-opt">
                  <div className="c-opt-icon c-opt-mail"><Mail size={18} /></div>
                  <div>
                    <div className="c-opt-label">{t('emailLabel')}</div>
                    <div className="c-opt-val">Sourabh9506@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

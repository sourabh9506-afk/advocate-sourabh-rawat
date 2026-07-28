"use client";

import { MessageSquare, Phone, Mail } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import FAQAccordion from '../shared/FAQAccordion';
import { generateFAQSchema } from '@/lib/schema';
import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/business';

export default function FAQSection() {
  const t = useTranslations('faq');
  const faqs = t.raw('items') as { q: string; a: string }[];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <section id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="faq-layout">
        <div>
          <ScrollReveal>
            <FAQAccordion items={faqs} label={t('sectionLabel')} title={t('sectionTitle')} />
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal delay={0.2} direction="right">
            <div className="faq-sidebar">
              <div className="faq-sidebar-title">{t('sidebarTitle')}</div>
              <div className="faq-sidebar-sub">{t('sidebarSub')}</div>
              <div className="contact-opts">
                <a href={`https://wa.me/${BUSINESS.phone.wa}`} className="c-opt" target="_blank" rel="noreferrer">
                  <div className="c-opt-icon c-opt-wa"><MessageSquare size={18} /></div>
                  <div>
                    <div className="c-opt-label">WhatsApp</div>
                    <div className="c-opt-val">{BUSINESS.phone.display}</div>
                  </div>
                </a>
                <a href={`tel:${BUSINESS.phone.tel}`} className="c-opt">
                  <div className="c-opt-icon c-opt-call"><Phone size={18} /></div>
                  <div>
                    <div className="c-opt-label">{t('callLabel')}</div>
                    <div className="c-opt-val">{BUSINESS.phone.display}</div>
                  </div>
                </a>
                <a href={`mailto:${BUSINESS.email}`} className="c-opt">
                  <div className="c-opt-icon c-opt-mail"><Mail size={18} /></div>
                  <div>
                    <div className="c-opt-label">{t('emailLabel')}</div>
                    <div className="c-opt-val">{BUSINESS.email}</div>
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

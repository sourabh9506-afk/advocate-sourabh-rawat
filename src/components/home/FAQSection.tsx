"use client";

import { useState } from 'react';
import { Plus, MessageSquare, Phone, Mail } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import { generateFAQSchema } from '@/lib/schema';

const faqs = [
  {
    q: "Do you provide free consultations?",
    a: "Initial assessment over call or WhatsApp is free. However, a detailed strategic consultation (up to 45 mins) in the chamber or via scheduled call has a transparent fee of ₹5,000."
  },
  {
    q: "Which courts do you practice in?",
    a: "I actively practice at the District & Sessions Court in Lucknow as well as the High Court of Judicature at Allahabad, Lucknow Bench."
  },
  {
    q: "Can you help if an FIR has been filed against me?",
    a: "Yes, immediate legal assistance is available for FIR defense, including filing for anticipatory bail or regular bail in sessions court and High Court."
  },
  {
    q: "Do you handle civil and property disputes?",
    a: "Yes, we handle civil litigation including property disputes, civil injunctions, breach of contract, and recovery suits."
  },
  {
    q: "How will I be updated about my case?",
    a: "You have direct access to Advocate Sourabh. You will be updated directly via call or WhatsApp after every hearing, without having to chase assistants."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
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
            <p className="sec-label">Clarifications</p>
            <h2 className="sec-title">Common <span className="gold">Questions</span></h2>
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
              <div className="faq-sidebar-title">Still have questions?</div>
              <div className="faq-sidebar-sub">Reach out directly. We typically respond within 2 hours during working hours.</div>
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
                    <div className="c-opt-label">Call Us</div>
                    <div className="c-opt-val">+91 90263 49246</div>
                  </div>
                </a>
                <a href="mailto:Sourabh9506@gmail.com" className="c-opt">
                  <div className="c-opt-icon c-opt-mail"><Mail size={18} /></div>
                  <div>
                    <div className="c-opt-label">Email Us</div>
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

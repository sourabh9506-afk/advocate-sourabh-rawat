import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '../shared/ScrollReveal';

export default function ProcessSection() {
  const t = useTranslations('process');
  const waLink = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246'}?text=${encodeURIComponent('Namaste Advocate Sourabh ji, mujhe legal consultation chahiye.')}`;

  return (
    <section id="process">
      <div className="process-layout">
        <div>
          <ScrollReveal>
            <p className="sec-label">How It Works</p>
            <h2 className="sec-title">Consultation <span className="gold">Process</span></h2>
            <div className="sec-line"></div>
            <p className="sec-sub">Simple, confidential, and direct approach to legal representation.</p>
          </ScrollReveal>
          
          <div className="step-list mt-8">
            <ScrollReveal delay={0.1}>
              <div className="step">
                <div className="step-circle">1</div>
                <div>
                  <div className="step-title">Reach out</div>
                  <div className="step-desc">WhatsApp or call with a brief description of your legal matter.</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="step">
                <div className="step-circle">2</div>
                <div>
                  <div className="step-title">Initial assessment</div>
                  <div className="step-desc">Advocate Sourabh reviews your matter and responds within 2 hours. A brief call or meeting is scheduled.</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="step">
                <div className="step-circle">3</div>
                <div>
                  <div className="step-title">Strategic consultation</div>
                  <div className="step-desc">Detailed discussion in chamber or via call to outline the legal strategy, timelines, and transparent fee structure.</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        <div>
          <ScrollReveal delay={0.2} direction="right">
            <div className="fee-card">
              <div className="fee-card-head">
                <div className="fee-label">{t('feeLabel')}</div>
                <p className="text-cream/70 text-sm mb-4">{t('feeIntro')}</p>
              </div>
              <div className="fee-body">
                <div className="fee-list">
                  <div className="fee-row"><CheckCircle2 size={18} /> Direct access to Advocate Sourabh</div>
                  <div className="fee-row"><CheckCircle2 size={18} /> Honest assessment of case merits</div>
                  <div className="fee-row"><CheckCircle2 size={18} /> Clear roadmap for legal action</div>
                  <div className="fee-row"><CheckCircle2 size={18} /> Complete confidentiality maintained</div>
                </div>
                <a href={waLink} className="fee-cta" target="_blank" rel="noreferrer">
                  Book Consultation <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

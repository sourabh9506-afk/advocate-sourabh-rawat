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
            <p className="sec-label">{t('label')}</p>
            <h2 className="sec-title">{t('title')} <span className="gold">{t('titleGold')}</span></h2>
            <div className="sec-line"></div>
            <p className="sec-sub">{t('sub')}</p>
          </ScrollReveal>

          <div className="step-list mt-8">
            <ScrollReveal delay={0.1}>
              <div className="step">
                <div className="step-circle">1</div>
                <div>
                  <div className="step-title">{t('step1Title')}</div>
                  <div className="step-desc">{t('step1Desc')}</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="step">
                <div className="step-circle">2</div>
                <div>
                  <div className="step-title">{t('step2Title')}</div>
                  <div className="step-desc">{t('step2Desc')}</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="step">
                <div className="step-circle">3</div>
                <div>
                  <div className="step-title">{t('step3Title')}</div>
                  <div className="step-desc">{t('step3Desc')}</div>
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
                  <div className="fee-row"><CheckCircle2 size={18} /> {t('fee1')}</div>
                  <div className="fee-row"><CheckCircle2 size={18} /> {t('fee2')}</div>
                  <div className="fee-row"><CheckCircle2 size={18} /> {t('fee3')}</div>
                  <div className="fee-row"><CheckCircle2 size={18} /> {t('fee4')}</div>
                </div>
                <a href={waLink} className="fee-cta" target="_blank" rel="noreferrer">
                  {t('feeCta')} <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

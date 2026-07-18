'use client';
import { ShieldCheck, Clock, Users, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TrustStrip() {
  const t = useTranslations('trustStrip');
  return (
    <div className="trust-strip">
      <div className="trust-item">
        <div className="trust-icon t-gold"><ShieldCheck size={17} /></div>
        <span className="trust-text"><strong>{t('item1Bold')}</strong> &mdash; {t('item1')}</span>
      </div>
      <div className="trust-item">
        <div className="trust-icon t-blue"><Clock size={17} /></div>
        <span className="trust-text"><strong>{t('item2Bold')}</strong> &mdash; {t('item2')}</span>
      </div>
      <div className="trust-item">
        <div className="trust-icon t-navy"><Users size={17} /></div>
        <span className="trust-text"><strong>{t('item3Bold')}</strong> {t('item3')}</span>
      </div>
      <div className="trust-item">
        <div className="trust-icon t-gold"><FileText size={17} /></div>
        <span className="trust-text"><strong>{t('item4Bold')}</strong> {t('item4')}</span>
      </div>
    </div>
  );
}

import { useTranslations } from 'next-intl';
import ScrollReveal from '../shared/ScrollReveal';
import Image from 'next/image';
import { Shield, Calendar, MapPin, Clock, Phone, User } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('hero');
  const stats = useTranslations('stats');
  
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <ScrollReveal>
          <div className="hero-badge">{t('badge')}</div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="hero-title">
            Advocate<br/><span className="gold">Sourabh Rawat</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="hero-sub">{t('designation')}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="hero-desc" dangerouslySetInnerHTML={{ __html: t.raw('desc') || 'Dedicated legal representation with <strong>10+ years of practice</strong> across criminal, civil, and family courts in Lucknow. Direct access &mdash; no middlemen, no runaround.' }} />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="hero-btns">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246'}`} className="btn-gold" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.882l6.21-1.628A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.302-1.433l-.38-.225-3.684.966.982-3.587-.247-.394A9.93 9.93 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {t('ctaWhatsApp')}
            </a>
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+919026349246'}`} className="btn-navy">
              <Phone size={18} />
              {t('ctaCall')}
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <div className="hero-stats">
            <div className="h-stat"><div className="h-stat-num">10+</div><div className="h-stat-label">{stats('years')}</div></div>
            <div className="h-stat"><div className="h-stat-num">500+</div><div className="h-stat-label">{stats('cases')}</div></div>
            <div className="h-stat"><div className="h-stat-num">High Court</div><div className="h-stat-label">{stats('court')}</div></div>
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal direction="right" delay={0.2} className="hero-right">
        <div className="hero-card">
          <div className="hero-card-top">
            <div className="hero-avatar" style={{ padding: 0, overflow: 'hidden' }}>
              <Image src="/images/team/sourabh.png" alt="Adv. Sourabh Rawat" width={220} height={220} priority quality={60} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', transform: 'scale(1.7)', transformOrigin: 'center 15%' }} />
            </div>
            <div>
              <div className="hero-card-name">Adv. Sourabh Rawat</div>
              <div className="hero-card-desg">Advocate &middot; High Court Lucknow</div>
            </div>
          </div>
          <div className="hero-card-body">
            <div className="hero-card-row">
              <div className="hcr-icon ic-gold"><Shield size={15} /></div>
              <div><div className="hcr-label">Registration</div><div className="hcr-value">Bar Council of UP</div></div>
            </div>
            <div className="hero-card-row">
              <div className="hcr-icon ic-blue"><Calendar size={15} /></div>
              <div><div className="hcr-label">Practice</div><div className="hcr-value">Criminal, Civil, Family Law</div></div>
            </div>
            <div className="hero-card-row">
              <div className="hcr-icon ic-navy"><MapPin size={15} /></div>
              <div><div className="hcr-label">Location</div><div className="hcr-value">Lucknow, Uttar Pradesh</div></div>
            </div>
            <div className="hero-card-row">
              <div className="hcr-icon ic-gold"><Clock size={15} /></div>
              <div><div className="hcr-label">Response Time</div><div className="hcr-value">Within 2 Hours</div></div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

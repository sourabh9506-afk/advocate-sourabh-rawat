import { MessageSquare, Phone } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';

export default function CTABanner() {
  const waLink = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246'}`;

  return (
    <div className="cta-banner">
      <ScrollReveal>
        <h2 className="cta-banner-title">Need Immediate <span className="gold">Legal Assistance?</span></h2>
        <p className="cta-banner-sub">Don't delay. Early legal counsel often determines the outcome of your case.</p>
        <div className="cta-banner-btns">
          <a href={waLink} className="btn-gold" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.882l6.21-1.628A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.302-1.433l-.38-.225-3.684.966.982-3.587-.247-.394A9.93 9.93 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp Now
          </a>
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+919026349246'}`} className="btn-navy">
            <Phone size={18} />
            Call Directly
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}

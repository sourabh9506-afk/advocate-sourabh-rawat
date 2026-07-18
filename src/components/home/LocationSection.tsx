import { MapPin, Phone, Mail } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';

export default function LocationSection() {
  return (
    <section id="location" className="sec-full">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <p className="sec-label">Chamber Locations</p>
          <h2 className="sec-title">Find <span className="gold">Us</span></h2>
          <div className="sec-line"></div>
          <p className="sec-sub">We operate from two primary chambers in Lucknow for your convenience.</p>
        </ScrollReveal>
        
        <div className="loc-grid" style={{ alignItems: 'flex-start' }}>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-6">
              <a href="https://maps.google.com/maps?q=26.9234755,80.9281100" target="_blank" rel="noreferrer" className="map-box" style={{ height: '300px', display: 'block', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}></div>
                <iframe 
                  title="Chamber 1 Location on Google Maps"
                  src="https://maps.google.com/maps?q=26.9234755,80.9281100&z=15&output=embed"  
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy">
                </iframe>
              </a>
              <div className="loc-details" style={{ margin: 0 }}>
                <a href="https://maps.google.com/maps?q=26.9234755,80.9281100" target="_blank" rel="noreferrer" className="loc-row hover-fade" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'opacity 0.2s' }}>
                  <div className="loc-icon li-gold"><MapPin size={18} /></div>
                  <div>
                    <div className="loc-row-title">Chamber 1</div>
                    <div className="loc-row-val">616/188/A Semra Gaudhi, Near Primary School<br/>Thana Madiyaon, Lucknow</div>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} direction="right">
            <div className="flex flex-col gap-6">
              <a href="https://maps.google.com/maps?q=26.8565612,80.9319489" target="_blank" rel="noreferrer" className="map-box" style={{ height: '300px', display: 'block', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}></div>
                <iframe 
                  title="Chamber 2 Location on Google Maps"
                  src="https://maps.google.com/maps?q=26.8565612,80.9319489&z=15&output=embed"  
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy">
                </iframe>
              </a>
              <div className="loc-details" style={{ margin: 0 }}>
                <a href="https://maps.google.com/maps?q=26.8565612,80.9319489" target="_blank" rel="noreferrer" className="loc-row hover-fade" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'opacity 0.2s' }}>
                  <div className="loc-icon li-gold"><MapPin size={18} /></div>
                  <div>
                    <div className="loc-row-title">Chamber 2</div>
                    <div className="loc-row-val">Near CHC Building, Gate No. 8<br/>Kaiserbagh, Lucknow</div>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="w-full flex justify-center" style={{ marginTop: '100px', paddingTop: '40px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <ScrollReveal delay={0.3} direction="up" className="w-full max-w-4xl">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 bg-white p-6 md:p-8 rounded-2xl border border-solid border-[#2b2b2b14] shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
            <div className="loc-row">
              <div className="loc-icon li-blue"><Phone size={18} /></div>
              <div>
                <div className="loc-row-title">Contact Number</div>
                <a href="tel:+919026349246" className="loc-row-val" style={{ textDecoration: 'none', color: 'inherit' }}>+91 90263 49246</a>
              </div>
            </div>
            <div className="loc-row">
              <div className="loc-icon li-navy"><Mail size={18} /></div>
              <div>
                <div className="loc-row-title">Email Address</div>
                <a href="mailto:Sourabh9506@gmail.com" className="loc-row-val" style={{ textDecoration: 'none', color: 'inherit' }}>Sourabh9506@gmail.com</a>
              </div>
            </div>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

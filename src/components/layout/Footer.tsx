import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('nav');
  
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="f-brand-name">Adv. Sourabh Rawat</div>
          <div className="f-brand-sub">Advocate &middot; High Court Lucknow</div>
          <p className="f-brand-desc">
            Dedicated legal representation in criminal, civil, and family matters across Lucknow. 
            Direct, honest, and result-focused advocacy for over 10 years.
          </p>
        </div>
        <div className="f-col">
          <div className="f-col-title">{t('practiceAreas')}</div>
          <Link href="/practice-areas/criminal-law">Criminal Law</Link>
          <Link href="/practice-areas/civil-law">Civil Law</Link>
          <Link href="/practice-areas/family-law">Family Law</Link>
          <Link href="/practice-areas/police-station">Police Station</Link>
        </div>
        <div className="f-col">
          <div className="f-col-title">Quick Links</div>
          <Link href="/#home">{t('about')}</Link>
          <Link href="/#process">{t('consultation')}</Link>
          <Link href="/#reviews">{t('reviews')}</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#location">{t('contact')}</Link>
        </div>
        <div className="f-col">
          <div className="f-col-title">Contact</div>
          <p><a href="tel:+919026349246" style={{ color: 'inherit', textDecoration: 'none' }}>+91 90263 49246</a></p>
          <p><a href="mailto:Sourabh9506@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>Sourabh9506@gmail.com</a></p>
          <p style={{ lineHeight: '1.6' }}>
            <strong>Chamber 1:</strong> 616/188/A Semra Gaudhi, Thana Madiyaon<br/>
            <strong>Chamber 2:</strong> Near CHC Building, Gate 8, Kaiserbagh
          </p>
          <p style={{ marginTop: '8px', color: 'rgba(201,150,58,0.5)', fontSize: '12px' }}>
            Mon&ndash;Fri: 10AM &ndash; 6PM<br/>
            Sat: 10AM &ndash; 2PM
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="f-copy">&copy; {new Date().getFullYear()} Advocate Sourabh Rawat. All rights reserved. This website is an informational resource and does not constitute legal advice or solicitation.</span>
        <span className="bci-tag">BCI Compliant &middot; UP Bar Council Enrolled</span>
      </div>
    </footer>
  );
}

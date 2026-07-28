import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BUSINESS } from '@/lib/business';

const footerServices: { slug: string; label: string }[] = [
  { slug: 'bail-lawyer-in-lucknow', label: 'Bail Lawyer' },
  { slug: 'anticipatory-bail-lawyer-lucknow', label: 'Anticipatory Bail' },
  { slug: 'fir-quashing-lawyer-lucknow', label: 'FIR Quashing' },
  { slug: 'divorce-lawyer-in-lucknow', label: 'Divorce Lawyer' },
  { slug: '498a-defence-lawyer-lucknow', label: '498A Defence' },
  { slug: 'property-dispute-lawyer-lucknow', label: 'Property Disputes' },
  { slug: 'child-custody-lawyer-lucknow', label: 'Child Custody' },
  { slug: 'maintenance-lawyer-lucknow', label: 'Maintenance Cases' },
];

export default function Footer() {
  const t = useTranslations('nav');
  const [madiyaon, kaiserbagh] = BUSINESS.locations;

  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="f-brand-name">Adv. Sourabh Rawat</div>
          <div className="f-brand-sub">Advocate &middot; High Court Lucknow</div>
          <p className="f-brand-desc">
            Dedicated legal representation in criminal, civil, and family matters across Lucknow.
            Direct, honest advocacy for over 10 years.
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
          <div className="f-col-title">Services</div>
          {footerServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>{service.label}</Link>
          ))}
        </div>
        <div className="f-col">
          <div className="f-col-title">Quick Links</div>
          <Link href="/#home">{t('about')}</Link>
          <Link href="/#process">{t('consultation')}</Link>
          <Link href="/#reviews">{t('reviews')}</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/guides">{t('blog')}</Link>
          <Link href="/#location">{t('contact')}</Link>
        </div>
        <div className="f-col">
          <div className="f-col-title">Contact</div>
          <p><a href={`tel:${BUSINESS.phone.tel}`} style={{ color: 'inherit', textDecoration: 'none' }}>{BUSINESS.phone.display}</a></p>
          <p><a href={`mailto:${BUSINESS.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{BUSINESS.email}</a></p>
          <p style={{ lineHeight: '1.6' }}>
            <strong>{madiyaon.label}:</strong> {madiyaon.streetAddress}<br/>
            <strong>{kaiserbagh.label}:</strong> {kaiserbagh.streetAddress}
          </p>
          <p style={{ marginTop: '8px', color: 'rgba(201,150,58,0.5)', fontSize: '12px' }}>
            {BUSINESS.hours.weekday}<br/>
            {BUSINESS.hours.saturday}
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

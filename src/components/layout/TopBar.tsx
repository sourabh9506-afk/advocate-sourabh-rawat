import { Phone, Mail, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BUSINESS } from '@/lib/business';

export default function TopBar() {
  const t = useTranslations('nav');

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <a href={`tel:${BUSINESS.phone.tel}`}><Phone size={13} />{BUSINESS.phone.display}</a>
        <a href={`mailto:${BUSINESS.email}`}><Mail size={13} />{BUSINESS.email}</a>
        <span><Clock size={13} />{BUSINESS.hours.weekday}, {BUSINESS.hours.saturday}</span>
      </div>
      <div>
        <Link href="/#process">{t('bookNow')} &rarr;</Link>
      </div>
    </div>
  );
}

import { Phone, Mail, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function TopBar() {
  const t = useTranslations('nav');
  
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+919026349246'}`}><Phone size={13} />+91 90263 49246</a>
        <a href="mailto:Sourabh9506@gmail.com"><Mail size={13} />Sourabh9506@gmail.com</a>
        <span><Clock size={13} />Mon–Fri: 10AM – 6PM, Sat: 10AM – 2PM</span>
      </div>
      <div>
        <Link href="/#process">{t('bookNow')} &rarr;</Link>
      </div>
    </div>
  );
}

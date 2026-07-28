import { useTranslations } from 'next-intl';

export default function LegalDisclaimer() {
  const t = useTranslations('disclaimer');

  return (
    <div className="bg-cream border-t border-dark/10 py-6 px-4">
      <p className="max-w-4xl mx-auto text-center text-xs text-dark/50 leading-relaxed">
        {t('body')}
      </p>
    </div>
  );
}

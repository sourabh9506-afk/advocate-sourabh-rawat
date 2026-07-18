import { useTranslations } from 'next-intl';
import ScrollReveal from '../shared/ScrollReveal';
import Image from 'next/image';

export default function TeamSection() {
  const t = useTranslations('team');
  
  const associates = [
    {
      name: t('assoc1Name'),
      role: t('associate'),
      desc: t('assoc1Desc'),
      img: '/images/team/sandeep.webp',
      delay: 0.1
    },
    {
      name: t('assoc2Name'),
      role: t('associate'),
      desc: t('assoc2Desc'),
      img: '/images/team/ramesh.webp',
      delay: 0.2
    }
  ];

  return (
    <section id="team" className="sec-full">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <p className="sec-label">{t('label')}</p>
          <h2 className="sec-title">{t('title')} <span className="gold">{t('titleGold')}</span></h2>
          <div className="sec-line"></div>
          <p className="sec-sub">{t('subtitle')}</p>
        </ScrollReveal>

      <div className="team-container">
        {/* Principal Advocate */}
        <ScrollReveal delay={0.1}>
          <div className="team-principal">
            <div className="team-principal-img-wrap">
              <Image 
                src="/images/team/sourabh.png" 
                alt="Adv. Sourabh Rawat" 
                className="team-principal-img"
                width={220}
                height={220}
                quality={60}
              />
            </div>
            <div className="team-principal-content">
              <h3 className="team-name">Adv. Sourabh Rawat</h3>
              <div className="team-role">{t('principal')}</div>
              <p className="team-desc" style={{ marginTop: '16px' }}>{t('sourabhDesc')}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Associates */}
        <div className="team-grid">
          {associates.map((assoc, idx) => (
            <ScrollReveal key={idx} delay={assoc.delay}>
              <div className="team-card">
                <div className="team-assoc-img-wrap">
                  <Image src={assoc.img} alt={assoc.name} className="team-assoc-img" width={160} height={160} quality={60} />
                </div>
                <div className="team-info">
                  <h4 className="team-name">{assoc.name}</h4>
                  <div className="team-role">{assoc.role}</div>
                  <p className="team-desc">{assoc.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

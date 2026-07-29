'use client';

import { useCallback, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ScrollReveal from '../shared/ScrollReveal';
import { useTranslations } from 'next-intl';

const reviews = [
  {
    name: 'Rakesh S.',
    initial: 'R',
    case: 'Criminal Defense',
    rating: 5,
    text: 'Advocate Sourabh ji is extremely straightforward and honest. He took on my bail matter at the High Court after other lawyers had declined it. He doesn\'t make false promises and explains things clearly.',
  },
  {
    name: 'Amitabh V.',
    initial: 'A',
    case: 'Civil Litigation',
    rating: 5,
    text: 'My property dispute had been dragging for 4 years. When Sourabh sir took over, the strategy changed completely and we filed for an injunction. Clear communication throughout for civil matters.',
  },
  {
    name: 'Mohit K.',
    initial: 'M',
    case: 'Family Law – 498A',
    rating: 5,
    text: 'Facing a false 498A case was the darkest period of my life. He handled the situation with immense maturity and guided us safely through the sessions court trials. Very grateful for his support.',
  },
  {
    name: 'Sunita D.',
    initial: 'S',
    case: 'Divorce – Family Court',
    rating: 4.5,
    text: 'Going through a contested divorce was emotionally draining, but Sourabh sir made the legal process manageable. He explained every step clearly and never kept me in the dark. The case settled better than I expected.',
  },
  {
    name: 'Pramod T.',
    initial: 'P',
    case: 'False FIR – Criminal',
    rating: 5,
    text: 'A business rival filed a completely baseless FIR against me. Sourabh sir promptly filed for quashing under Section 482 and pursued the matter at the High Court. Professional and knows his subject well.',
  },
  {
    name: 'Neelam A.',
    initial: 'N',
    case: 'Maintenance – Section 125',
    rating: 4,
    text: 'After my husband stopped paying maintenance, I didn\'t know where to turn. Sourabh sir filed the application promptly and pursued interim maintenance on my behalf. He is patient and genuinely listens to your situation.',
  },
  {
    name: 'Vinod K.',
    initial: 'V',
    case: 'Anticipatory Bail',
    rating: 5,
    text: 'I was in fear of arrest in a land dispute matter that had been twisted against me. Sourabh sir filed for anticipatory bail before the sessions court and represented me at the hearing. His preparation and confidence in court was remarkable.',
  },
  {
    name: 'Kavita R.',
    initial: 'K',
    case: 'Property Dispute – Civil',
    rating: 4.5,
    text: 'Our ancestral property partition case had been stuck for years due to a co-sharer blocking proceedings. Sourabh sir found the right legal angle to move the case forward. Fees were clearly discussed upfront — no surprises.',
  },
  {
    name: 'Arun M.',
    initial: 'A',
    case: 'Sessions Court Trial',
    rating: 4,
    text: 'I was charged in a serious criminal case and was very worried about the proceedings at sessions court. Sourabh sir\'s cross-examination of prosecution witnesses was thorough and systematic. Honest and hardworking lawyer.',
  },
  {
    name: 'Manish G.',
    initial: 'M',
    case: 'Anticipatory Bail – High Court Lucknow',
    rating: 5,
    text: 'Hum Lucknow ke residents hain, aur ek zameen ke jhagde mein hamara naam FIR mein aane ki sambhavna thi. Sourabh ji ko apni situation batai — unhone turant application taiyar ki aur High Court Lucknow mein anticipatory bail ke liye pairvi ki. Bahut shukriya unke seedhe aur imaandaar approach ke liye.',
  },
  {
    name: 'Sundar P.',
    initial: 'S',
    case: 'Property Dispute – District Court Lucknow',
    rating: 5,
    text: 'My ancestral property case had been stuck in District Court Lucknow for over 6 years with the previous lawyer. Sourabh sir changed the entire legal approach — filed for an urgent injunction to stop illegal construction on the disputed land. His knowledge of civil procedure is thorough and he explains everything in plain language. Strongly recommend for any property dispute in Lucknow.',
  },
  {
    name: 'Pooja R.',
    initial: 'P',
    case: 'Child Custody – Family Court Lucknow',
    rating: 5,
    text: 'Going through a custody matter at Family Court Lucknow while managing work and the kids was overwhelming. Sourabh sir handled all the documentation, attended every date, and argued my rights clearly. He also pursued interim custody on my behalf. His calm approach during the entire process was genuinely reassuring.',
  },
  {
    name: 'Waseem A.',
    initial: 'W',
    case: 'Police Station Matter – FIR Help',
    rating: 5,
    text: 'Mujhe galat tarike se police station bulaya gaya tha aur mujhe apne legal rights pata nahi the. Ek dost ne Sourabh ji ka number diya. Unhone turant call pe situation samjhi aur khud police station pe aaye. Poori process mein saath rahe aur har kadam explain kiya. Lucknow mein aisa advocate dhundhna mushkil hai jo is tarah personally involve ho.',
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="r-stars">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={14} fill="currentColor" color="currentColor" />
      ))}
      {half && (
        <span style={{ position: 'relative', display: 'inline-flex', width: 14, height: 14 }}>
          <Star size={14} fill="none" color="currentColor" style={{ position: 'absolute' }} />
          <span style={{ position: 'absolute', overflow: 'hidden', width: '50%' }}>
            <Star size={14} fill="currentColor" color="currentColor" />
          </span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={14} fill="none" color="currentColor" style={{ opacity: 0.3 }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations('reviews');
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="sec-full">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="review-head">
            <p className="sec-label">{t('label')}</p>
            <h2 className="sec-title">{t('title')} <span className="gold">{t('titleGold')}</span></h2>
            <div className="sec-line" />
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div style={{ overflow: 'hidden', marginTop: '40px' }} ref={emblaRef}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {reviews.map((r, idx) => (
              <div
                key={idx}
                style={{ flex: '0 0 calc(33.333% - 16px)', minWidth: 0 }}
                className="review-slide"
              >
                <div className="r-card" style={{ height: '100%' }}>
                  <StarRating rating={r.rating} />
                  <div className="r-quote">&ldquo;</div>
                  <p className="r-body">&ldquo;{r.text}&rdquo;</p>
                  <div className="r-author">
                    <div className="r-avatar">{r.initial}</div>
                    <div>
                      <div className="r-name">{r.name}</div>
                      <div className="r-case">{r.case}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '36px' }}>
          <button
            onClick={scrollPrev}
            className="r-nav-btn"
            aria-label="Previous review"
          >
            &#8592;
          </button>

          <div className="r-dots-row" style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`r-dot ${i === selectedIndex ? 'active' : ''}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="r-nav-btn"
            aria-label="Next review"
          >
            &#8594;
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .review-slide { flex: 0 0 100% !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .review-slide { flex: 0 0 calc(50% - 12px) !important; }
        }
        .r-nav-btn {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid var(--gold); background: transparent;
          color: var(--gold); font-size: 18px; cursor: pointer;
          transition: all 0.2s; display: flex; align-items: center; justify-content: center;
        }
        .r-nav-btn:hover { background: var(--gold); color: var(--white); }
        /* The dot stays visually 8px, but padding + background-clip:content-box
           grows the tap target to 24x24 (WCAG 2.5.8 minimum) without changing
           how it looks. Sizing the visible dot itself would be too large. */
        .r-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--dark-20); border: none; cursor: pointer;
          transition: background 0.25s, width 0.25s; padding: 8px;
          background-clip: content-box; box-sizing: content-box;
        }
        .r-dot.active { background: var(--gold); width: 24px; border-radius: 4px; background-clip: content-box; }
        /* Negative margin keeps the visual spacing identical to before. */
        .r-dots-row { margin: 0 -8px; }
      `}</style>
    </section>
  );
}

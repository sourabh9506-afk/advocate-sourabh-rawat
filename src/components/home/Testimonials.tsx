import { Star } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';

export default function Testimonials() {
  return (
    <section id="reviews" className="sec-full">
      <div className="max-w-[1280px] mx-auto">
        <div className="review-head">
          <ScrollReveal>
        <p className="sec-label">Client Reviews</p>
        <h2 className="sec-title">What Clients <span className="gold">Say</span></h2>
        <div className="sec-line"></div>
          </ScrollReveal>
        </div>

        <div className="review-grid">
        <ScrollReveal delay={0.1}>
          <div className="r-card">
            <div className="r-stars">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" color="currentColor" />)}
            </div>
            <div className="r-quote">&ldquo;</div>
            <p className="r-body">
              "Advocate Sourabh ji is extremely straightforward and honest. He got me bail from the High Court when other lawyers said it was impossible. He doesn't make false promises but delivers real results."
            </p>
            <div className="r-author">
              <div className="r-avatar">R</div>
              <div>
                <div className="r-name">Rakesh S.</div>
                <div className="r-case">Criminal Defense</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="r-card">
            <div className="r-stars">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" color="currentColor" />)}
            </div>
            <div className="r-quote">&ldquo;</div>
            <p className="r-body">
              "My property dispute had been dragging for 4 years. When Sourabh sir took over, the strategy changed completely, and we won an injunction within a month. Highly recommended for civil matters."
            </p>
            <div className="r-author">
              <div className="r-avatar">A</div>
              <div>
                <div className="r-name">Amitabh V.</div>
                <div className="r-case">Civil Litigation</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="r-card">
            <div className="r-stars">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" color="currentColor" />)}
            </div>
            <div className="r-quote">&ldquo;</div>
            <p className="r-body">
              "Facing a false 498A case was the darkest period of my life. He handled the situation with immense maturity and guided us safely through the sessions court trials. Very grateful for his support."
            </p>
            <div className="r-author">
              <div className="r-avatar">M</div>
              <div>
                <div className="r-name">Mohit K.</div>
                <div className="r-case">Family Law</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

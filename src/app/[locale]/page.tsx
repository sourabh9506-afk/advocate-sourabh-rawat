import HeroSection from '@/components/home/HeroSection';
import ServiceCarousel from '@/components/home/ServiceCarousel';
import TrustStrip from '@/components/home/TrustStrip';
import PracticeAreas from '@/components/home/PracticeAreas';
import WhyChoose from '@/components/home/WhyChoose';
import TeamSection from '@/components/home/TeamSection';
import ProcessSection from '@/components/home/ProcessSection';
import Testimonials from '@/components/home/Testimonials';
import FAQSection from '@/components/home/FAQSection';
import LocationSection from '@/components/home/LocationSection';
import CTABanner from '@/components/home/CTABanner';


export default function Home() {
  return (
    <main>
      <ServiceCarousel />
      <HeroSection />
      <TrustStrip />
      <PracticeAreas />
      <WhyChoose />
      <TeamSection />
      <ProcessSection />
      <Testimonials />
      <FAQSection />
      <LocationSection />
      <CTABanner />
    </main>
  );
}

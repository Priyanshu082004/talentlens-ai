import { useScrollProgress } from '@hooks/useScrollProgress';
import Hero         from './sections/Hero';
import TrustedBy    from './sections/TrustedBy';
import Features     from './sections/Features';
import HowItWorks   from './sections/HowItWorks';
import AIShowcase   from './sections/AIShowcase';
import Testimonials from './sections/Testimonials';
import FAQ          from './sections/FAQ';
import CTASection   from './sections/CTASection';
import styles from './Landing.module.css';

export default function Landing() {
  const progress = useScrollProgress();

  return (
    <div className={styles.landing}>
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-hero z-[100] transition-all duration-75" style={{ width: `${progress}%` }} />

      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <AIShowcase />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  );
}

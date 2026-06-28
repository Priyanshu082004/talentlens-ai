import { useScrollProgress } from '@hooks/useScrollProgress.js';
import Hero         from './sections/Hero.jsx';
import TrustedBy    from './sections/TrustedBy.jsx';
import Features     from './sections/Features.jsx';
import HowItWorks   from './sections/HowItWorks.jsx';
import AIShowcase   from './sections/AIShowcase.jsx';
import Testimonials from './sections/Testimonials.jsx';
import FAQ          from './sections/FAQ.jsx';
import CTASection   from './sections/CTASection.jsx';
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

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// /* ── Hero entrance timeline ── */ one after the other, with slight overlap
export const heroTimeline = (container) => {
  if (!container) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from(container.querySelectorAll('.hero-eyebrow'), { y: 20, opacity: 0, duration: 0.5 })
    .from(container.querySelectorAll('.hero-headline'), { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
    .from(container.querySelectorAll('.hero-sub'),      { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
    .from(container.querySelectorAll('.hero-cta'),      { y: 15, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.3')
    .from(container.querySelectorAll('.hero-mockup'),   { y: 50, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6');
  return tl;
};

/* ── Stagger-reveal children on scroll ── */
export const staggerRevealOnScroll = (container, childSelector, options = {}) => {
  if (!container) return;
  const { stagger = 0.1, start = 'top 82%', duration = 0.65 } = options;
  const children = container.querySelectorAll(childSelector);
  if (!children.length) return;
  gsap.from(children, {
    scrollTrigger: { trigger: container, start, once: true },
    y: 40, opacity: 0, duration, ease: 'power3.out', stagger,
  });
};

/* ── Single element fade-up on scroll ── */
export const revealOnScroll = (el, options = {}) => {
  if (!el) return;
  const { y = 30, duration = 0.6, start = 'top 82%', delay = 0 } = options;
  gsap.from(el, {
    scrollTrigger: { trigger: el, start, once: true },
    y, opacity: 0, duration, delay, ease: 'power3.out',
  });
};

/* ── Orb parallax ── */
export const orbParallax = (el, distance = 180) => {
  if (!el) return;
  gsap.to(el, {
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 },
    y: -distance, ease: 'none',
  });
};

/* ── Pinned showcase section ── */
export const pinnedShowcase = (section, onProgress) => {
  if (!section) return;
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=180%',
    pin: true,
    scrub: 1,
    onUpdate: (self) => onProgress && onProgress(self.progress),
  });
};

/* ── GSAP counter animation ── */
export const counterAnimation = (el, endVal, duration = 1.5, delay = 0) => {
  if (!el) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: endVal,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.val); },
  });
};

/* ── SVG circle ring animation ── */
export const animateRing = (el, circumference, targetDash, duration = 1.5, delay = 0) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { strokeDashoffset: circumference },
    { strokeDashoffset: circumference - targetDash, duration, delay, ease: 'power2.out' }
  );
};

/* ── Cleanup all scroll triggers ── */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
};






// this fie handles animations for the site at one place 
// the animations handled are 
// Hero Animations
// Scroll Reveals
// Counters
// Parallax Orbs
// Pinned Sections
// SVG Rings
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate a horizontal marquee track that overflows.
 * Wraps content so it loops seamlessly.
 */
export const marqueeLoop = (track, speed = 1) => {
  if (!track) return;
  const totalW = track.scrollWidth / 2;
  gsap.to(track, {
    x: -totalW,
    duration: totalW / (50 * speed),
    ease: 'none',
    repeat: -1,
  });
};

/**
 * Text split char-by-char reveal (requires element with textContent).
 */
export const splitTextReveal = (el, options = {}) => {
  if (!el) return;
  const { start = 'top 85%', stagger = 0.03 } = options;
  const chars = el.textContent.split('');
  el.innerHTML = chars.map((c) => `<span style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  gsap.from(el.querySelectorAll('span'), {
    scrollTrigger: { trigger: el, start, once: true },
    y: 30, opacity: 0, duration: 0.5, ease: 'power3.out', stagger,
  });
};

/**
 * Horizontal scroll section — pin parent, scroll children horizontally.
 */
export const horizontalScrollSection = (wrapper, track) => {
  if (!wrapper || !track) return;
  const totalWidth = track.scrollWidth - wrapper.offsetWidth;
  gsap.to(track, {
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
    x: -totalWidth,
    ease: 'none',
  });
};

/**
 * Scroll progress bar — fill a DOM element width based on page scroll.
 */
export const scrollProgressBar = (barEl) => {
  if (!barEl) return;
  gsap.to(barEl, {
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: (self) => {
        barEl.style.width = `${self.progress * 100}%`;
      },
    },
    ease: 'none',
  });
};

/**
 * Parallax background shift.
 */
export const parallaxBackground = (el, yPercent = -20) => {
  if (!el) return;
  gsap.to(el, {
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    yPercent,
    ease: 'none',
  });
};







// Marquee Effects
// Text Reveal Effects
// Horizontal Scrolling Sections
// Scroll Progress Bars
// Background Parallax
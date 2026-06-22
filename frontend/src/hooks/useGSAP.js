import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Runs a GSAP context scoped to a container ref.
 * Automatically reverts all animations on unmount — the correct
 * pattern for GSAP inside React function components.
 *
 * Usage:
 *   const ref = useGSAP(() => {
 *     gsap.from('.hero-headline', { y: 40, opacity: 0 });
 *   });
 *   return <section ref={ref}>...</section>;
 */
export const useGSAP = (callback, deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(callback, ref.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};

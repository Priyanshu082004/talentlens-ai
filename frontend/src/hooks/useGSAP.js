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
    const ctx = gsap.context(()=>{callback(ref.current);}, ref.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};


// This code defines a custom React hook called `useGSAP` that allows you to run GSAP animations within a React component.
//  It takes a callback function and an optional dependency array as arguments. The hook creates a reference to a DOM element 
// and runs the provided callback function within a GSAP context, ensuring that all animations are scoped to the referenced element.
//  When the component unmounts, the hook automatically reverts all animations to prevent memory leaks or unintended side effects.
//  This pattern is useful for integrating GSAP animations into React function components while maintaining proper cleanup.
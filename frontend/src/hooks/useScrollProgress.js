import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;

};

// This code defines a custom React hook called `useScrollProgress` that tracks the scroll progress of the document.
// It uses the `useState` and `useEffect` hooks to manage the progress state and handle scroll events.
// The hook calculates the scroll progress as a percentage of the document height and updates the state accordingly.  
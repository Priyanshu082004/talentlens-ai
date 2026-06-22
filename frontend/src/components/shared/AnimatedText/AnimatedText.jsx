import { motion } from 'framer-motion';

/**
 * Reveals text word-by-word (Framer Motion) on mount/inView.
 * For char-by-char GSAP-powered reveals, use the
 * `splitTextReveal` helper in animations/scrollAnimations.js instead.
 */
export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.04,
  once = true,
}) {
  const words = text.split(' ');

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word = {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-40px' }}
        style={{ display: 'inline' }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={word} style={{ display: 'inline-block', marginRight: '0.25em' }}>
            {w}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

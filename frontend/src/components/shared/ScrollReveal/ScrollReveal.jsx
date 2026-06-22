import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '@animations/framerVariants';

const VARIANT_MAP = {
  up:    fadeInUp,
  left:  fadeInLeft,
  right: fadeInRight,
  scale: scaleIn,
};

/**
 * Declarative scroll-triggered reveal wrapper built on Framer Motion's
 * whileInView. For GSAP ScrollTrigger-powered reveals (pinning, scrub,
 * parallax), use the helpers in animations/gsap.config.js directly.
 *
 * Usage:
 *   <ScrollReveal direction="up" delay={0.1}>
 *     <Card>...</Card>
 *   </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  once = true,
  className = '',
}) {
  const variants = VARIANT_MAP[direction] || fadeInUp;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

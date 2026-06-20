/*  Framer Motion variant library */

/* Page transitions */
export const pageTransition = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

/* Fade only */
export const fadeIn = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.35 } },
  exit:     { opacity: 0, transition: { duration: 0.2 } },
};

/* Fade + rise */
export const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* Fade + left */
export const fadeInLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/* Fade + right */
export const fadeInRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/* Scale in */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
};

/* Stagger parent */
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/* Stagger child */
export const staggerItem = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* Card hover lift */
export const cardHover = {
  rest:  { scale: 1,    boxShadow: '0 0 0px rgba(99,102,241,0)' },
  hover: { scale: 1.02, boxShadow: '0 0 32px rgba(99,102,241,0.25)',
           transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

/* Modal */
export const modalBackdrop = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

export const modalPanel = {
  hidden:  { opacity: 0, scale: 0.95, y: 12 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
  exit:    { opacity: 0, scale: 0.97, y: 6,  transition: { duration: 0.2 } },
};

/* Sidebar */
export const sidebarVariants = {
  expanded:  { width: 240, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  collapsed: { width: 64,  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

/* Upload zone states */
export const uploadZoneVariants = {
  idle:     { borderColor: 'rgba(99,102,241,0.2)',  backgroundColor: 'rgba(15,23,42,0)',    scale: 1 },
  hover:    { borderColor: 'rgba(99,102,241,0.5)',  backgroundColor: 'rgba(99,102,241,0.03)', scale: 1 },
  dragging: { borderColor: '#6366F1',               backgroundColor: 'rgba(99,102,241,0.07)', scale: 1.01 },
  success:  { borderColor: '#10B981',               backgroundColor: 'rgba(16,185,129,0.05)', scale: 1 },
  error:    { borderColor: '#EF4444',               backgroundColor: 'rgba(239,68,68,0.05)',  scale: 1 },
};

/* Progress bar fill */
export const progressFill = (pct) => ({
  initial:  { width: '0%' },
  animate:  { width: `${pct}%`, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
});

/* Accordion */
export const accordionContent = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
  exit:    { height: 0, opacity: 0,      transition: { duration: 0.2 } },
};

/* Toast / notification slide-in */
export const toastSlide = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: 60, transition: { duration: 0.2 } },
};

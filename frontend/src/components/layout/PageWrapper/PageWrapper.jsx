import { motion } from 'framer-motion';
import { pageTransition } from '@animations/framerVariants.js';
import clsx from 'clsx';

/**
 * Generic page-level wrapper that applies the standard page
 * transition and consistent max-width / padding. Use inside
 * route components when you don't need the full layout (e.g.
 * nested settings tabs).
 */
export default function PageWrapper({ children, className = '', narrow = false }) {
  return (
    <motion.div
      {...pageTransition}
      className={clsx(narrow ? 'max-w-3xl' : 'max-w-7xl', 'mx-auto w-full', className)}
    >
      {children}
    </motion.div>
  );
}





// be careful not to use PageWrapper for full route pages
//  and animate the parent layout with the same transition
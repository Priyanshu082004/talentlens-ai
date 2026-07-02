import { motion } from 'framer-motion';
import clsx from 'clsx';
import { cardHover } from '@animations/framerVariants';

export default function GlassCard({
  children,
  className = '',
  hover = false,
  glow = false,
  padding = true,
  onClick,
  ...props
}) {
  const Tag =
  onClick
    ? motion.button
    : hover
      ? motion.div
      : 'div';
  const motionProps = hover ? { variants: cardHover, initial: 'rest', whileHover: 'hover' } : {};

  return (
    <Tag
      onClick={onClick}
      className={clsx(
        'glass rounded-2xl relative overflow-hidden',
        padding && 'p-6',
        glow && 'shadow-glow',
        onClick && 'cursor-pointer',
        className
      )}
      {...motionProps}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

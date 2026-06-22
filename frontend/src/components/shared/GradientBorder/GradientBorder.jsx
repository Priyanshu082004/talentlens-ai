import clsx from 'clsx';

/**
 * Wraps children in an animated gradient border ring.
 * Useful for highlighting a single "featured" card (e.g. a
 * recommended plan or the active step in a flow).
 */
export default function GradientBorder({
  children,
  className = '',
  animated = false,
  borderWidth = 1,
  radius = 16,
}) {
  return (
    <div
      className={clsx('relative', animated && 'animate-gradient-shift', className)}
      style={{
        borderRadius: radius,
        padding: borderWidth,
        background: 'linear-gradient(135deg, #6366F1, #7C3AED, #06B6D4, #6366F1)',
        backgroundSize: animated ? '300% 300%' : '100% 100%',
      }}
    >
      <div
        className="bg-bg-surface h-full w-full"
        style={{ borderRadius: radius - borderWidth }}
      >
        {children}
      </div>
    </div>
  );
}

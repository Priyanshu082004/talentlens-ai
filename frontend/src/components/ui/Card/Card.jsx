import clsx from 'clsx';

/**
 * Basic surface card — flat, non-glass alternative to GlassCard.
 * Use for nested content inside a GlassCard, or where a glass
 * effect would be too heavy (e.g. dense lists, tables).
 */
export default function Card({
  children,
  className = '',
  padding = true,
  bordered = true,
  onClick,
  ...props
}) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={clsx(
        'bg-bg-surface rounded-2xl',
        'transition-all duration-200',
        bordered && 'border border-slate-200',
        padding && 'p-6',
        onClick &&
          'w-full text-left cursor-pointer hover:border-slate-300 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
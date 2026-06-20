import clsx from 'clsx';

const variants = {
  primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  danger:  'bg-red-500/10    text-red-400    border-red-500/20',
  muted:   'bg-white/5       text-gray-400   border-white/10',
  cyan:    'bg-cyan-500/10   text-cyan-400   border-cyan-500/20',
};

export default function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
        'text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

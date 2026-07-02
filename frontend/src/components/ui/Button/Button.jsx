import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary:   'bg-primary-500 hover:bg-primary-600 text-white shadow-glow hover:shadow-glow-lg border-transparent',
  secondary: 'bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200',
  ghost:     'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100',
  danger:    'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium',
        'border transition-all duration-200 cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Loading…</span>
        </>
      ) : children}
    </motion.button>
  );
}

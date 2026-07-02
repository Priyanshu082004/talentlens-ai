import { motion } from 'framer-motion';
import clsx from 'clsx';

const colorMap = {
  primary: 'from-primary-500 to-secondary-500',
  success: 'from-emerald-500 to-teal-500',
  warning: 'from-amber-500   to-orange-500',
  danger:  'from-red-500     to-rose-500',
  cyan:    'from-cyan-500    to-blue-500',
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'primary',
  label,
  showValue = true,
  height = 8,
  className = '',
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-slate-600">{pct}%</span>}
        </div>
      )}
      <div className="w-full rounded-full overflow-hidden bg-slate-100" style={{ height }}>
        <motion.div
          className={clsx('h-full rounded-full bg-gradient-to-r', colorMap[color])}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}


// This code defines a reusable ProgressBar component in React that displays a horizontal progress bar with customizable properties.
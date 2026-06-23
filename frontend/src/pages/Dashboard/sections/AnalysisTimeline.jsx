import { motion } from 'framer-motion';
import { Upload, FileSearch, Cpu, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

const STEPS = [
  { label: 'Upload',      icon: Upload,      desc: 'PDF received' },
  { label: 'Parsing',     icon: FileSearch,  desc: 'Extracting text' },
  { label: 'AI Analysis', icon: Cpu,         desc: 'Gemini processing' },
  { label: 'Complete',    icon: CheckCircle, desc: 'Results ready' },
];

export default function AnalysisTimeline({ currentStep = 0 }) {
  return (
    <div className="flex items-start gap-0 w-full">
      {STEPS.map(({ label, icon: Icon, desc }, i) => {
        const done   = i < currentStep;
        const active = i === currentStep;
        const future = i > currentStep;
        const isLast = i === STEPS.length - 1;

        return (
          <div key={label} className="flex-1 flex flex-col items-center relative">
            {!isLast && (
              <div className="absolute top-5 left-1/2 w-full h-0.5 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}

            <motion.div
              animate={{ scale: active ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: active ? Infinity : 0, repeatType: 'loop' }}
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center border-2 relative z-10 mb-2 transition-all duration-300',
                done   && 'border-primary-500 bg-primary-500/20',
                active && 'border-primary-400 bg-primary-500/10 shadow-glow',
                future && 'border-white/10 bg-bg-surface',
              )}
            >
              <Icon size={16} className={clsx(done && 'text-primary-400', active && 'text-primary-300', future && 'text-gray-700')} />
            </motion.div>

            <p className={clsx('text-xs font-medium text-center transition-colors', done || active ? 'text-white' : 'text-gray-700')}>{label}</p>
            <p className={clsx('text-[10px] text-center mt-0.5 hidden sm:block transition-colors', active ? 'text-primary-400' : 'text-gray-700')}>
              {active ? desc : done ? '✓' : '…'}
            </p>
          </div>
        );
      })}
    </div>
  );
}

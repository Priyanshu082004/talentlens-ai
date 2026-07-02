import { motion } from 'framer-motion';
import GlassCard from '@components/ui/GlassCard/GlassCard';
import Badge from '@components/ui/Badge/Badge';
import clsx from 'clsx';

const SEVERITY_ORDER = ['high', 'medium', 'low'];
const SEVERITY_CONFIG = {
  high:   { variant: 'danger',  label: 'Critical gap',  color: '#DC2626' },
  medium: { variant: 'warning', label: 'Moderate gap',  color: '#D97706' },
  low:    { variant: 'muted',   label: 'Minor gap',     color: '#94A3B8' },
};

export default function SkillGap({ skillGaps = [] }) {
  const total   = skillGaps.length;
  const grouped = SEVERITY_ORDER.reduce((acc, sev) => {
    acc[sev] = skillGaps.filter((s) => s.severity === sev);
    return acc;
  }, {});

  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-slate-900 text-sm mb-5">Skill Gap Analysis</h3>

      {!total ? (
        <p className="text-xs text-slate-400">No skill gaps detected — your skills align well with the role.</p>
      ) : (
        <>
          {/* Severity bar */}
          <div className="flex h-2 rounded-full overflow-hidden w-full mb-4">
            {SEVERITY_ORDER.map((sev) => {
              const pct = (grouped[sev].length / total) * 100;
              if (!pct) return null;
              return (
                <motion.div key={sev} initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
                  style={{ background: SEVERITY_CONFIG[sev].color }} />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-5">
            {SEVERITY_ORDER.map((sev) => grouped[sev].length > 0 && (
              <div key={sev} className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full" style={{ background: SEVERITY_CONFIG[sev].color }} />
                {SEVERITY_CONFIG[sev].label} ({grouped[sev].length})
              </div>
            ))}
          </div>

          {SEVERITY_ORDER.map((sev) => grouped[sev].length > 0 && (
            <div key={sev} className="mb-4 last:mb-0">
              <p className={clsx('text-xs font-bold uppercase tracking-widest mb-2',
                sev === 'high' && 'text-red-500',
                sev === 'medium' && 'text-amber-600',
                sev === 'low' && 'text-slate-400',
              )}>
                {sev} severity
              </p>
              <div className="flex flex-wrap gap-2">
                {grouped[sev].map(({ skill }) => (
                  <Badge key={skill} variant={SEVERITY_CONFIG[sev].variant}>{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </GlassCard>
  );
}
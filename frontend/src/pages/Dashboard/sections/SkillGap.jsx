import { motion } from 'framer-motion';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import Badge from '@components/ui/Badge/Badge.jsx';
import clsx from 'clsx';

/**
 * SkillGap
 * We group by severity and display each group with a colour-coded badge.
 * severity → badge variant mapping:
 *   high   → danger  (red)
 *   medium → warning (amber)
 *   low    → muted   (gray)
 */

const SEVERITY_ORDER = ['high', 'medium', 'low'];

const SEVERITY_CONFIG = {
  high:   { variant: 'danger',  label: 'Critical gap',   color: '#EF4444' },
  medium: { variant: 'warning', label: 'Moderate gap',   color: '#F59E0B' },
  low:    { variant: 'muted',   label: 'Minor gap',      color: '#64748B' },
};

function SeverityBar({ skillGaps }) {
  const total  = skillGaps.length;
  if (!total) return null;
  const counts = { high: 0, medium: 0, low: 0 };
  skillGaps.forEach(({ severity }) => { if (counts[severity] !== undefined) counts[severity]++; });

  return (
    <div className="flex h-2 rounded-full overflow-hidden w-full mb-6">
      {SEVERITY_ORDER.map((sev) => {
        const pct = (counts[sev] / total) * 100;
        if (!pct) return null;
        return (
          <motion.div
            key={sev}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: SEVERITY_CONFIG[sev].color }}
          />
        );
      })}
    </div>
  );
}

export default function SkillGap({ skillGaps = [] }) {
  // Group by severity
  const grouped = SEVERITY_ORDER.reduce((acc, sev) => {
    acc[sev] = skillGaps.filter((s) => s.severity === sev);
    return acc;
  }, {});

  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-white text-sm mb-4">Skill Gap Analysis</h3>

      {!skillGaps.length ? (
        <p className="text-xs text-gray-600">No skill gaps detected — your skills align well with the role.</p>
      ) : (
        <>
          {/* Severity distribution bar */}
          <SeverityBar skillGaps={skillGaps} />

          {/* Legend */}
          <div className="flex gap-4 mb-5">
            {SEVERITY_ORDER.map((sev) => (
              grouped[sev].length > 0 && (
                <div key={sev} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full" style={{ background: SEVERITY_CONFIG[sev].color }} />
                  {SEVERITY_CONFIG[sev].label} ({grouped[sev].length})
                </div>
              )
            ))}
          </div>

          {/* Grouped skill lists */}
          {SEVERITY_ORDER.map((sev) => (
            grouped[sev].length > 0 && (
              <div key={sev} className="mb-4 last:mb-0">
                <p className={clsx(
                  'text-xs font-semibold uppercase tracking-widest mb-2',
                  sev === 'high'   && 'text-red-400',
                  sev === 'medium' && 'text-amber-400',
                  sev === 'low'    && 'text-gray-500',
                )}>
                  {sev} severity
                </p>
                <div className="flex flex-wrap gap-2">
                  {grouped[sev].map(({ skill }) => (
                    <Badge key={skill} variant={SEVERITY_CONFIG[sev].variant}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          ))}
        </>
      )}
    </GlassCard>
  );
}

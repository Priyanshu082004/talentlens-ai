import { CheckCircle, XCircle } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import ProgressBar from '@components/ui/ProgressBar/ProgressBar.jsx';
import Badge from '@components/ui/Badge/Badge.jsx';

export default function SkillGap({ skillGap = {} }) {
  const matched = skillGap.matched || [];
  const missing = skillGap.missing || [];
  const total   = matched.length + missing.length;
  const pct     = total ? Math.round((matched.length / total) * 100) : 0;

  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-white text-sm mb-5">Skill Gap Analysis</h3>
      <ProgressBar
        label="Overall skill match"
        value={pct}
        color={pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'}
        className="mb-6"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs font-medium text-emerald-400 mb-2 flex items-center gap-1.5">
            <CheckCircle size={11} /> Matched ({matched.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {matched.map((s) => <Badge key={s} variant="success">{s}</Badge>)}
            {!matched.length && <p className="text-xs text-gray-600">None detected</p>}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1.5">
            <XCircle size={11} /> Missing ({missing.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.map((s) => <Badge key={s} variant="danger">{s}</Badge>)}
            {!missing.length && <p className="text-xs text-gray-600">None missing — great!</p>}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

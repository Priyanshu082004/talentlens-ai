import GlassCard from '@components/ui/GlassCard/GlassCard';
import CircularProgress from '@components/ui/CircularProgress/CircularProgress';
import { scoreLabel } from '@utils/formatScore';

/**
 * Standalone ATS score card — shows the circular ring plus a
 * qualitative label underneath. Used inside AnalysisResults.
 */
export default function ATSScoreCard({ score = 0, label = 'ATS Score' }) {
  return (
    <GlassCard className="flex flex-col items-center py-8">
      <CircularProgress score={score} label={label} animate />
      <p className="text-xs text-gray-500 mt-3">{scoreLabel(score)} — based on keyword match, formatting, and role relevance</p>
    </GlassCard>
  );
}

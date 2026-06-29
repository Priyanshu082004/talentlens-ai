import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import CircularProgress from '@components/ui/CircularProgress/CircularProgress.jsx';
import { scoreLabel } from '@utils/formatScore.js';

/**
 * ATSScoreCard
 *
 * Displays the matchScore returned by the backend.
 * Backend field: interviewReport.matchScore (0–100)
 */
export default function ATSScoreCard({ score = 0, label = 'Match Score' }) {
  return (
    <GlassCard className="flex flex-col items-center py-8">
      <CircularProgress score={score} label={label} animate />
      <p className="text-xs text-gray-500 mt-3 text-center max-w-[180px]">
        {scoreLabel(score)} — resume vs. job description match
      </p>
    </GlassCard>
  );
}

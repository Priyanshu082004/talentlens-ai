import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, SortAsc, SortDesc, ChevronRight } from 'lucide-react';
import { fetchHistory, fetchReportById } from '@redux/slices/resumeSlice.js';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import Badge from '@components/ui/Badge/Badge.jsx';
import Input from '@components/ui/Input/Input.jsx';
import { staggerContainer, staggerItem } from '@animations/framerVariants.js';
import { formatDateTime } from '@utils/formatScore.js';
import { ROUTES } from '@constants/routes.js';

/**
 * AnalysisHistory
 *
 * Backend list response (GET /api/interview):
 * { message, interviewReports: [{ _id, title, matchScore, createdAt, updatedAt }] }
 */
function ScoreBadge({ score }) {
  const variant = score >= 80 ? 'success' : score >= 60 ? 'warning' : 'danger';
  return <Badge variant={variant}>{score} / 100</Badge>;
}

export default function AnalysisHistory() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { history, isLoadingHistory } = useSelector((s) => s.resume);

  const [query,   setQuery]   = useState('');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => { dispatch(fetchHistory()); }, [dispatch]);

  const filtered = history
    .filter((h) => (h.title || '').toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      sortDir === 'desc'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

const handleOpen = async (id) => {
  const result = await dispatch(fetchReportById(id));

  if (!result.error) {
    navigate(ROUTES.ANALYSIS);
  }
};
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="w-full max-w-7xl mx-auto space-y-8">
      <motion.div variants={staggerItem}>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Analysis History</h1>
        <p className="text-sm text-gray-500">All your previous interview report analysis.</p>
      </motion.div>

      <motion.div variants={staggerItem} className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search by job title…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={Search}
          />
        </div>
        <button
          onClick={() => setSortDir((d) => d === 'desc' ? 'asc' : 'desc')}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all"
        >
          {sortDir === 'desc' ? <SortDesc size={15} /> : <SortAsc size={15} />}
          {sortDir === 'desc' ? 'Newest first' : 'Oldest first'}
        </button>
      </motion.div>

      {isLoadingHistory ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 skeleton" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div variants={staggerItem}>
          <GlassCard className="text-center py-12">
            <FileText size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              {query ? 'No reports match your search.' : 'No analysis yet. Upload your first resume to get started.'}
            </p>
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} className="space-y-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item._id}
                variants={staggerItem}
                layout
              >
                <GlassCard
                  padding={false}
                  className="px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:border-primary-500/30 transition-colors"
                  onClick={() => handleOpen(item._id)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-primary-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.title || 'Interview Report'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDateTime(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {item.matchScore != null && <ScoreBadge score={item.matchScore} />}
                    <ChevronRight size={16} className="text-gray-600" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filtered.length > 0 && (
        <motion.p variants={staggerItem} className="text-xs text-gray-600 text-center">
          {filtered.length} {filtered.length === 1 ? 'report' : 'reports'} found
        </motion.p>
      )}
    </motion.div>
  );
}

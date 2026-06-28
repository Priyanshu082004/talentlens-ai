import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, Trash2, SortAsc, SortDesc } from 'lucide-react';
import { fetchHistory, deleteAnalysis } from '@redux/slices/resumeSlice.js';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import Button from '@components/ui/Button/Button.jsx';
import Badge from '@components/ui/Badge/Badge.jsx';
import Input from '@components/ui/Input/Input.jsx';
import { staggerContainer, staggerItem } from '@animations/framerVariants.js';
import { formatDateTime } from '@utils/formatScore.js';

function ScoreBadge({ score }) {
  const variant = score >= 80 ? 'success' : score >= 60 ? 'warning' : 'danger';
  return <Badge variant={variant}>{score} / 100</Badge>;
}

export default function AnalysisHistory() {
  const dispatch = useDispatch();
  const { history, isLoadingHistory } = useSelector((s) => s.resume);

  const [query, setQuery] = useState('');
  const [sortDir, setSortDir] = useState('desc');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { dispatch(fetchHistory()); }, [dispatch]);

  const filtered = history
    .filter((h) => (h.fileName || '').toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sortDir === 'desc'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt));

  const handleDelete = async (id) => {
    setDeleting(id);
    await dispatch(deleteAnalysis(id));
    setDeleting(null);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 max-w-4xl">
      <motion.div variants={staggerItem}>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Analysis History</h1>
        <p className="text-sm text-gray-500">All your previous resume analyses — searchable and sortable.</p>
      </motion.div>

      <motion.div variants={staggerItem} className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <Input placeholder="Search by filename…" value={query} onChange={(e) => setQuery(e.target.value)} icon={Search} />
        </div>
        <Button variant="ghost" size="md" onClick={() => setSortDir((d) => d === 'desc' ? 'asc' : 'desc')}>
          {sortDir === 'desc' ? <SortDesc size={15} /> : <SortAsc size={15} />}
          {sortDir === 'desc' ? 'Newest first' : 'Oldest first'}
        </Button>
      </motion.div>

      {isLoadingHistory ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 skeleton" />)}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div variants={staggerItem}>
          <GlassCard className="text-center py-12">
            <FileText size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">{query ? 'No analyses match your search.' : 'No analyses yet.'}</p>
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} className="space-y-3">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div key={item._id || item.id} variants={staggerItem} exit={{ opacity: 0, x: -20, height: 0 }} layout>
                <GlassCard padding={false} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-primary-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.fileName || `Resume analysis ${i + 1}`}</p>
                      <p className="text-xs text-gray-500">{formatDateTime(item.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {item.atsScore != null && <ScoreBadge score={item.atsScore} />}
                    <Button variant="danger" size="sm" loading={deleting === (item._id || item.id)} onClick={() => handleDelete(item._id || item.id)}>
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filtered.length > 0 && (
        <motion.p variants={staggerItem} className="text-xs text-gray-600 text-center">
          {filtered.length} {filtered.length === 1 ? 'analysis' : 'analyses'} found
        </motion.p>
      )}
    </motion.div>
  );
}










//  check Api response for id or _id

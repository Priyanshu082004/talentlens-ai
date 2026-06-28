import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RefreshCw, FileText, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { fetchHistory, clearAnalysis } from '@redux/slices/resumeSlice.js';
import ResumeUpload     from './sections/ResumeUpload.jsx';
import AnalysisTimeline from './sections/AnalysisTimeline.jsx';
import AnalysisResults  from './sections/AnalysisResults.jsx';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import Button    from '@components/ui/Button/Button.jsx';
import { staggerContainer, staggerItem } from '@animations/framerVariants.js';
import { ROUTES } from '@constants/routes.js';
import { formatDate } from '@utils/formatScore.js';
import styles from './Dashboard.module.css';

function StatCard({ label, value, icon: Icon, color}) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="text-3xl font-bold font-mono text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </GlassCard>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { history, isLoadingHistory, isAnalyzing, analysisResult, currentStep, error } = useSelector((s) => s.resume);

  useEffect(() => { dispatch(fetchHistory()); }, [dispatch]);

  const avgScore = history.length
    ? Math.round(history.reduce((s, h) => s + (h.atsScore || 0), 0) / history.length)
    : 0;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className={`${styles.dashboard} space-y-8 max-w-4xl`}>
      {/* Header */}
      <motion.div variants={staggerItem} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">
            {greeting()}, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-gray-500 text-sm">Here's your resume analysis overview.</p>
        </div>
        {analysisResult && (
          <Button variant="ghost" size="sm" onClick={() => dispatch(clearAnalysis())}>
            <RefreshCw size={14} /> New analysis
          </Button>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem} className="grid sm:grid-cols-3 gap-5">
        <StatCard label="Total analyses"    value={history.length}              icon={FileText}   color="#6366F1" />
        <StatCard label="Average ATS score" value={avgScore || '—'}             icon={TrendingUp} color="#10B981" />
        <StatCard label="Latest score"      value={history[0]?.atsScore || '—'} icon={Clock}      color="#06B6D4" />
      </motion.div>

      {/* Upload / analysis flow */}
      <AnimatePresence>
        {!analysisResult && (
          <motion.div variants={staggerItem} exit={{ opacity: 0, height: 0, overflow: 'hidden' }}>
            <GlassCard>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">Analyze a new resume</p>
              <ResumeUpload />
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isAnalyzing || analysisResult) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} variants={staggerItem}>
            <GlassCard>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-5">Analysis progress</p>
              <AnalysisTimeline currentStep={currentStep} />
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {analysisResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AnalysisResults result={analysisResult} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent history */}
      {!analysisResult && history.length > 0 && (
        <motion.div variants={staggerItem}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-white text-lg">Recent analyses</h2>
            <button onClick={() => navigate(ROUTES.HISTORY)} className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {history.slice(0, 4).map((item) => (
              <GlassCard key={item._id || item.id} padding={false} className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                    <FileText size={15} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.fileName || 'Resume'}</p>
                    <p className="text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold font-mono ${item.atsScore >= 80 ? 'text-emerald-400' : item.atsScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                    {item.atsScore}
                  </span>
                  <span className="text-xs text-gray-600">/ 100</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      )}

      {!history.length && !isLoadingHistory && !analysisResult && (
        <motion.div variants={staggerItem}>
          <GlassCard className="text-center py-10">
            <FileText size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No analyses yet. Upload your first resume above to get started.</p>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
}

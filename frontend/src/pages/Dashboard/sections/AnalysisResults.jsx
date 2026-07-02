import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Brain, MessageCircle, Download } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
// import Badge from '@components/ui/Badge/Badge';
import ATSScoreCard from './ATSScoreCard.jsx';
import SkillGap from './SkillGap.jsx';
import Suggestions from './Suggestions.jsx';
import { staggerContainer, staggerItem, accordionContent } from '@animations/framerVariants.js';
import resumeService from '@services/resumeService.js';
import Button from '@components/ui/Button/Button.jsx';
import {Toast} from '@components/ui/Toast/Toast.jsx';

/**
 * AnalysisResults
 *
 * Renders the full interviewReport returned by the backend.
 *
 * Backend shape:
 * {
 *   _id, title, matchScore,
 *   technicalQuestions:  [{ question, intention, answer }],
 *   behavioralQuestions: [{ question, intention, answer }],
 *   skillGaps:           [{ skill, severity }],
 *   preparationPlan:     [{ day, focus, tasks[] }],
 * }
 */

/* ── Question accordion (shared for technical + behavioral) ── */
function QAAccordion({ questions = [], label, icon: Icon, accentColor = 'text-primary-400' }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <GlassCard>
      <h3 className={`font-display font-semibold text-slate-900 text-sm mb-4 flex items-center gap-2`}>
        <Icon size={14} className={accentColor} />
        {label}
        <span className="ml-auto text-xs text-slate-500 font-normal font-mono">{questions.length} questions</span>
      </h3>
      <div className="space-y-2">
        {questions.map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-start justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className={`text-xs font-mono ${accentColor} mt-0.5 shrink-0`}>Q{i + 1}</span>
                  <span className="text-sm text-slate-700 leading-snug">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 mt-0.5"
                >
                  <ChevronDown size={15} className="text-slate-400" />
                </motion.div>
              </button>

              {openIdx === i && (
                <motion.div
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-slate-200">
                    {/* Intention chip */}
                    {item.intention && (
                      <div className="pt-3 pb-2">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                          Interviewer's intent
                        </span>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed italic">
                          {item.intention}
                        </p>
                      </div>
                    )}
                    {/* Model answer */}
                    {item.answer && (
                      <div className="pt-2">
                        <span className={`text-xs font-medium ${accentColor}`}>How to answer</span>
                        <p className="text-sm text-slate-700 leading-relaxed mt-1">{item.answer}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
    </GlassCard>
  );
}

/* ── PDF download button ── */
function PDFDownload({ reportId }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!reportId) return;
    setLoading(true);
    try {
      const blob = await resumeService.downloadResumePdf(reportId);
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `resume_${reportId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      Toast.success('Resume PDF downloaded!');
    } catch {
      Toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" size="sm" loading={loading} onClick={handleDownload}>
      <Download size={14} /> Download ATS Resume PDF
    </Button>
  );
}

/* ── Root export ── */
export default function AnalysisResults({ result }) {
  if (!result) return null;

  const {
    _id,
    title             = '',
    matchScore        = 0,
    technicalQuestions  = [],
    behavioralQuestions = [],
    skillGaps           = [],
    preparationPlan     = [],
  } = result;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5 mt-8"
    >
      {/* Job title + PDF download */}
      <motion.div variants={staggerItem} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          {title && (
            <>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Analysis for</p>
              <h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>
            </>
          )}
        </div>
        {_id && <PDFDownload reportId={_id} />}
      </motion.div>

      {/* Match score — single score, full width */}
      <motion.div variants={staggerItem}>
        <GlassCard className="flex flex-col items-center py-8">
          <ATSScoreCard score={matchScore} label="Match Score" />
          <p className="text-xs text-slate-500 mt-3 text-center">
            How well your resume matches the target job description
          </p>
        </GlassCard>
      </motion.div>

      {/* Skill Gaps */}
      <motion.div variants={staggerItem}>
        <SkillGap skillGaps={skillGaps} />
      </motion.div>

      {/* Technical Questions */}
      <motion.div variants={staggerItem}>
        <QAAccordion
          questions={technicalQuestions}
          label="Technical Interview Questions"
          icon={Brain}
          accentColor="text-primary-400"
        />
      </motion.div>

      {/* Behavioral Questions */}
      <motion.div variants={staggerItem}>
        <QAAccordion
          questions={behavioralQuestions}
          label="Behavioural Interview Questions"
          icon={MessageCircle}
          accentColor="text-accent-500"
        />
      </motion.div>

      {/* Preparation Plan */}
      <motion.div variants={staggerItem}>
        <Suggestions preparationPlan={preparationPlan} />
      </motion.div>
    </motion.div>
  );
}







//  check this for ui changes at the end 
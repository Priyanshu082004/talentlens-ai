import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ChevronDown, Tag, MessageSquare } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import Badge from '@components/ui/Badge/Badge.jsx';
import ATSScoreCard from './ATSScoreCard.jsx';
import SkillGap from './SkillGap.jsx';
import Suggestions from './Suggestions.jsx';
import { staggerContainer, staggerItem, accordionContent } from '@animations/framerVariants.js';

function StrengthsWeaknesses({ strengths = [], weaknesses = [] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <GlassCard>
        <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
          <CheckCircle size={15} className="text-emerald-400" /> Strengths
        </h3>
        <ul className="space-y-2.5">
          {strengths.map((s, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-2.5 text-sm text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              {s}
            </motion.li>
          ))}
          {!strengths.length && <p className="text-xs text-gray-600">No strengths detected.</p>}
        </ul>
      </GlassCard>

      <GlassCard>
        <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
          <XCircle size={15} className="text-red-400" /> Weaknesses
        </h3>
        <ul className="space-y-2.5">
          {weaknesses.map((w, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-2.5 text-sm text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              {w}
            </motion.li>
          ))}
          {!weaknesses.length && <p className="text-xs text-gray-600">No weaknesses detected.</p>}
        </ul>
      </GlassCard>
    </div>
  );
}

function Keywords({ keywords = [], skillGap = {} }) {
  const missing = new Set(skillGap.missing || []);
  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
        <Tag size={14} className="text-primary-400" /> Keyword Optimization
      </h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw) => <Badge key={kw} variant={missing.has(kw) ? 'danger' : 'primary'}>{kw}</Badge>)}
        {!keywords.length && <p className="text-xs text-gray-600">No keywords extracted.</p>}
      </div>
      <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-primary-500/40" /> Found in resume</div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-red-500/40" /> Missing / add these</div>
      </div>
    </GlassCard>
  );
}

//  the above isused to display the ski,ll gapps with help set.has whichg is much faster than array.includes

function InterviewQA({ questions = [] }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
        <MessageSquare size={14} className="text-accent-500" /> Interview Questions & Model Answers
      </h3>
      <div className="space-y-2">
        {questions.map((item, i) => (
          <div key={i} className="border border-white/5 rounded-xl overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-start justify-between px-4 py-3 text-left hover:bg-white/3 transition-colors gap-3">
              <div className="flex items-start gap-2.5">
                <span className="text-xs font-mono text-primary-400 mt-0.5 shrink-0">Q{i + 1}</span>
                <span className="text-sm text-gray-300 leading-snug">{item.q || item.question}</span>
              </div>
              <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-0.5">
                <ChevronDown size={15} className="text-gray-600" />
              </motion.div>
            </button>
            {openIdx === i && (
              <motion.div variants={accordionContent} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                <div className="px-4 pb-4 pt-3 border-t border-white/5">
                  <p className="text-xs font-medium text-accent-500 mb-1.5">Model Answer</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.a || item.answer}</p>
                </div>
              </motion.div>
            )}
          </div>
        ))}
        {!questions.length && <p className="text-xs text-gray-600">No interview questions generated.</p>}
      </div>
    </GlassCard>
  );
}

export default function AnalysisResults({ result }) {
  if (!result) return null;

  const {
    atsScore = 0,
    jobReadinessScore = 0,
    strengths = [],
    weaknesses = [],
    suggestions = [],
    skillGap = {},
    keywords = [],
    interviewQuestions = [],
  } = result;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-5 mt-8">
      <motion.div variants={staggerItem} className="grid sm:grid-cols-2 gap-5">
        <ATSScoreCard score={atsScore} label="ATS Score" />
        <ATSScoreCard score={jobReadinessScore} label="Job Readiness" />
      </motion.div>

      <motion.div variants={staggerItem}>
        <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <SkillGap skillGap={skillGap} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Suggestions suggestions={suggestions} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Keywords keywords={keywords} skillGap={skillGap} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <InterviewQA questions={interviewQuestions} />
      </motion.div>
    </motion.div>
  );
}
